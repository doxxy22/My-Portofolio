const fs = require("fs");
const path = require("path");

class SimplePdfBuilder {
  constructor() {
    this.pages = [];
    this.currentPage = null;
    this.pageWidth = 595.28; // A4 width in pt
    this.pageHeight = 841.89; // A4 height in pt
  }

  addPage() {
    if (this.currentPage) {
      this.pages.push(this.currentPage);
    }
    this.currentPage = {
      commands: [],
    };
    return this.currentPage;
  }

  // Color helpers: r, g, b between 0 and 1
  setFillColor(r, g, b) {
    this.currentPage.commands.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
  }

  setStrokeColor(r, g, b) {
    this.currentPage.commands.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG`);
  }

  setLineWidth(width) {
    this.currentPage.commands.push(`${width.toFixed(2)} w`);
  }

  drawRect(x, y, w, h, fill = true, stroke = false) {
    const op = fill && stroke ? "B" : fill ? "f" : "s";
    this.currentPage.commands.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${op}`);
  }

  drawRoundedRect(x, y, w, h, r = 4, fill = true, stroke = false) {
    // Approximate rounded rect with bezier curves
    const k = 0.5522847498;
    const kr = k * r;
    const op = fill && stroke ? "B" : fill ? "f" : "s";
    
    const cmds = [
      `${(x + r).toFixed(2)} ${y.toFixed(2)} m`,
      `${(x + w - r).toFixed(2)} ${y.toFixed(2)} l`,
      `${(x + w - r + kr).toFixed(2)} ${y.toFixed(2)} ${(x + w).toFixed(2)} ${(y + r - kr).toFixed(2)} ${(x + w).toFixed(2)} ${(y + r).toFixed(2)} c`,
      `${(x + w).toFixed(2)} ${(y + h - r).toFixed(2)} l`,
      `${(x + w).toFixed(2)} ${(y + h - r + kr).toFixed(2)} ${(x + w - r + kr).toFixed(2)} ${(y + h).toFixed(2)} ${(x + w - r).toFixed(2)} ${(y + h).toFixed(2)} c`,
      `${(x + r).toFixed(2)} ${(y + h).toFixed(2)} l`,
      `${(x + r - kr).toFixed(2)} ${(y + h).toFixed(2)} ${x.toFixed(2)} ${(y + h - r + kr).toFixed(2)} ${x.toFixed(2)} ${(y + h - r).toFixed(2)} c`,
      `${x.toFixed(2)} ${(y + r).toFixed(2)} l`,
      `${x.toFixed(2)} ${(y + r - kr).toFixed(2)} ${(x + r - kr).toFixed(2)} ${y.toFixed(2)} ${(x + r).toFixed(2)} ${y.toFixed(2)} c`,
      op
    ];
    this.currentPage.commands.push(cmds.join(" "));
  }

  drawLine(x1, y1, x2, y2) {
    this.currentPage.commands.push(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l s`);
  }

  escapeText(str) {
    return String(str || "")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[\u2013\u2014]/g, "-") // en-dash, em-dash
      .replace(/[\u2018\u2019]/g, "'") // curly single quotes
      .replace(/[\u201C\u201D]/g, '"') // curly double quotes
      .replace(/[\u2022\u25B8]/g, "*") // bullet
      .replace(/[^\x20-\x7E]/g, " "); // fallback non-ascii
  }

  drawText(text, x, y, font = "/F1", size = 10, color = [0.1, 0.1, 0.1]) {
    this.setFillColor(color[0], color[1], color[2]);
    const escaped = this.escapeText(text);
    this.currentPage.commands.push(`BT ${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escaped}) Tj ET`);
  }

  // Simple text wrapping helper
  wrapText(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const w of words) {
      if ((currentLine + " " + w).trim().length <= maxChars) {
        currentLine = (currentLine + " " + w).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = w;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  compile() {
    if (this.currentPage) {
      this.pages.push(this.currentPage);
      this.currentPage = null;
    }

    const objects = [];
    const addObject = (content) => {
      objects.push(content);
      return objects.length;
    };

    // Object 1: Catalog
    // Object 2: Pages
    // Object 3: Font Regular (Helvetica)
    // Object 4: Font Bold (Helvetica-Bold)
    // Object 5: Font Oblique (Helvetica-Oblique)
    const fontRegularId = 3;
    const fontBoldId = 4;
    const fontObliqueId = 5;

    const pageCount = this.pages.length;
    const pageObjectIds = [];
    const contentObjectIds = [];

    // Pre-calculate IDs
    // Catalog = 1, Pages = 2, Font1 = 3, Font2 = 4, Font3 = 5
    let currentObjId = 6;
    for (let i = 0; i < pageCount; i++) {
      pageObjectIds.push(currentObjId++);
      contentObjectIds.push(currentObjId++);
    }

    // Build objects
    // 1: Catalog
    const catalogObj = `<< /Type /Catalog /Pages 2 0 R >>`;
    // 2: Pages
    const kidsStr = pageObjectIds.map((id) => `${id} 0 R`).join(" ");
    const pagesObj = `<< /Type /Pages /Kids [${kidsStr}] /Count ${pageCount} >>`;
    // 3, 4, 5: Fonts
    const font1 = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
    const font2 = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
    const font3 = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>`;

    const allObjects = [catalogObj, pagesObj, font1, font2, font3];

    for (let i = 0; i < pageCount; i++) {
      const page = this.pages[i];
      const contentId = contentObjectIds[i];
      const pageObj = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageWidth} ${this.pageHeight}] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> >>`;
      allObjects.push(pageObj);

      const streamContent = page.commands.join("\n");
      const streamLen = Buffer.byteLength(streamContent, "utf-8");
      const contentObj = `<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`;
      allObjects.push(contentObj);
    }

    // Generate output with byte offsets
    let out = "%PDF-1.4\n";
    const offsets = [];
    for (let i = 0; i < allObjects.length; i++) {
      offsets.push(Buffer.byteLength(out, "utf-8"));
      out += `${i + 1} 0 obj\n${allObjects[i]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(out, "utf-8");
    out += `xref\n0 ${allObjects.length + 1}\n`;
    out += "0000000000 65535 f \n";
    for (const off of offsets) {
      out += String(off).padStart(10, "0") + " 00000 n \n";
    }
    out += `trailer\n<< /Size ${allObjects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    return Buffer.from(out, "utf-8");
  }
}

// Generate the complete Portfolio PDF
function generatePortfolioPdf() {
  const doc = new SimplePdfBuilder();

  // Colors
  const cPrimary = [0.08, 0.12, 0.25]; // Slate dark (#141e40)
  const cAccent = [0.145, 0.388, 0.922]; // Modern blue (#2563eb)
  const cAccentBg = [0.93, 0.96, 1.0]; // Light blue fill
  const cAccentBorder = [0.75, 0.85, 0.98]; // Light blue border
  const cTextDark = [0.06, 0.09, 0.16]; // #0f172a
  const cTextMuted = [0.38, 0.44, 0.52]; // #64748b
  const cCardBg = [0.97, 0.98, 0.99]; // Light card bg
  const cCardBorder = [0.9, 0.92, 0.95];

  // Helper for Section Header
  function drawSectionHeader(title, y) {
    doc.setFillColor(cAccent[0], cAccent[1], cAccent[2]);
    doc.drawRoundedRect(40, y - 2, 4, 18, 2, true, false);
    doc.drawText(title.toUpperCase(), 52, y + 2, "/F2", 12, cPrimary);
    doc.setStrokeColor(cCardBorder[0], cCardBorder[1], cCardBorder[2]);
    doc.setLineWidth(0.8);
    doc.drawLine(52 + title.length * 7.5 + 10, y + 6, 555, y + 6);
  }

  // Helper for Badge
  function drawBadge(text, x, y, width) {
    doc.setFillColor(cAccentBg[0], cAccentBg[1], cAccentBg[2]);
    doc.setStrokeColor(cAccentBorder[0], cAccentBorder[1], cAccentBorder[2]);
    doc.setLineWidth(0.6);
    doc.drawRoundedRect(x, y - 2, width, 14, 4, true, true);
    doc.drawText(text, x + 5, y + 2, "/F1", 7.5, cAccent);
  }

  // Footer on each page
  function drawFooter(pageNum, totalPages) {
    doc.setStrokeColor(cCardBorder[0], cCardBorder[1], cCardBorder[2]);
    doc.setLineWidth(0.6);
    doc.drawLine(40, 35, 555, 35);

    doc.drawText("Rido Anugrah, S.Kom - Software Developer Portfolio", 40, 22, "/F1", 8, cTextMuted);
    doc.drawText(`Page ${pageNum} of ${totalPages}`, 510, 22, "/F2", 8, cAccent);
  }

  // ==========================================
  // PAGE 1: Profile, About, Skills, Education
  // ==========================================
  doc.addPage();

  // Top Accent Header Banner
  doc.setFillColor(cPrimary[0], cPrimary[1], cPrimary[2]);
  doc.drawRoundedRect(40, 715, 515, 95, 8, true, false);

  // Decorative inner line
  doc.setFillColor(cAccent[0], cAccent[1], cAccent[2]);
  doc.drawRoundedRect(40, 715, 6, 95, 3, true, false);

  // Name & Title
  doc.drawText("RIDO ANUGRAH, S.Kom", 60, 775, "/F2", 20, [1, 1, 1]);
  doc.drawText("Software Developer | Web Developer | Fresh Graduate", 60, 755, "/F1", 10.5, [0.75, 0.85, 1.0]);

  // Contact Info row inside banner
  const contactText = "Email: ridoanugrah2209@gmail.com  |  Phone: +62 813-1688-7410  |  South Tangerang, Indonesia";
  doc.drawText(contactText, 60, 735, "/F1", 8.5, [0.85, 0.9, 0.95]);

  const linksText = "GitHub: github.com/doxxy22   |   LinkedIn: linkedin.com/in/rido-anugrah-a694ba335";
  doc.drawText(linksText, 60, 722, "/F1", 8.5, [0.65, 0.8, 1.0]);

  let curY = 685;

  // --- SECTION: ABOUT ME ---
  drawSectionHeader("About Me", curY);
  curY -= 20;

  const bio = "Fresh Graduate in Computer Science (S.Kom) from Universitas Pamulang with a strong foundation in software engineering, full-stack web development, and machine learning. Experienced in building production web applications, managing MySQL databases, and developing programmatic animations using React and Remotion. Detail-oriented, adaptable, and passionate about creating reliable, user-friendly digital solutions.";
  const bioLines = doc.wrapText(bio, 102);
  for (const line of bioLines) {
    doc.drawText(line, 45, curY, "/F1", 9.5, cTextDark);
    curY -= 13;
  }
  curY -= 10;

  // --- SECTION: TECHNICAL SKILLS ---
  drawSectionHeader("Technical Skills", curY);
  curY -= 20;

  const skillGroups = [
    { title: "Programming Languages", skills: ["Java", "Python", "JavaScript", "C++", "SQL", "Dart"] },
    { title: "Web Development", skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "PHP"] },
    { title: "Database Systems", skills: ["MySQL", "SQL Server", "phpMyAdmin", "Database Design"] },
    { title: "Tools & Frameworks", skills: ["Git", "GitHub", "VS Code", "Android Studio", "Flutter", "XAMPP", "Vite", "Tailwind CSS"] },
    { title: "Data & Machine Learning", skills: ["Pandas", "NumPy", "Scikit-learn", "TF-IDF Vectorizer", "Cosine Similarity"] },
    { title: "Video Creation & Editing (Code-Driven)", skills: ["Remotion", "React.js", "Motion Graphics", "Programmatic Video", "Premiere Pro", "After Effects"] }
  ];

  for (const group of skillGroups) {
    doc.drawText(group.title + ":", 45, curY, "/F2", 9, cPrimary);
    
    // Draw badges
    let bx = 195;
    for (const s of group.skills) {
      const bw = s.length * 5.2 + 10;
      if (bx + bw > 550) {
        curY -= 16;
        bx = 195;
      }
      drawBadge(s, bx, curY - 2, bw);
      bx += bw + 5;
    }
    curY -= 18;
  }
  curY -= 8;

  // --- SECTION: EDUCATION ---
  drawSectionHeader("Education", curY);
  curY -= 20;

  // Univ card box
  doc.setFillColor(cCardBg[0], cCardBg[1], cCardBg[2]);
  doc.setStrokeColor(cCardBorder[0], cCardBorder[1], cCardBorder[2]);
  doc.drawRoundedRect(40, curY - 60, 515, 75, 6, true, true);

  doc.drawText("UNIVERSITAS PAMULANG", 55, curY + 2, "/F2", 11, cPrimary);
  doc.drawText("Bachelor of Computer Science (Sarjana Komputer - S.Kom)", 55, curY - 12, "/F2", 9.5, cAccent);
  doc.drawText("2022 - 2026  |  South Tangerang, Banten, Indonesia", 355, curY + 2, "/F1", 8.5, cTextMuted);

  doc.drawText("Final Project / Undergraduate Thesis:", 55, curY - 28, "/F2", 8.5, cPrimary);
  const thesis = "\"Analysis of the Effectiveness of the Cosine Similarity Method for Plagiarism Detection in Academic Documents\" (Implementation of TF-IDF feature extraction & cosine similarity algorithms to measure text similarities).";
  const thesisLines = doc.wrapText(thesis, 96);
  let ty = curY - 40;
  for (const tl of thesisLines) {
    doc.drawText(tl, 55, ty, "/F3", 8.5, cTextDark);
    ty -= 11;
  }

  drawFooter(1, 3);

  // ==========================================
  // PAGE 2: Experience & Certifications
  // ==========================================
  doc.addPage();
  curY = 790;

  drawSectionHeader("Professional & Leadership Experience", curY);
  curY -= 22;

  // Exp 1: Web Developer Intern
  doc.drawText("Web Developer Intern", 45, curY, "/F2", 11, cPrimary);
  doc.drawText("2025", 510, curY, "/F2", 9.5, cAccent);
  doc.drawText("PT DIGITAL ANGKASA INDONESIA  -  South Tangerang, Indonesia", 45, curY - 13, "/F2", 9, cAccent);
  curY -= 26;

  const exp1Bullets = [
    "Developed and maintained web applications aligned with project requirements and client business logic.",
    "Engineered robust backend architecture using PHP and built interactive frontends with HTML, CSS, and JavaScript.",
    "Administered relational MySQL databases using XAMPP, writing optimized queries for data integrity and speed.",
    "Conducted comprehensive debugging and troubleshooting sessions to improve application performance and stability.",
    "Collaborated cross-functionally with team members across feature development, code reviews, and testing cycles."
  ];

  for (const b of exp1Bullets) {
    doc.drawText("*", 50, curY, "/F2", 10, cAccent);
    const lines = doc.wrapText(b, 98);
    for (const l of lines) {
      doc.drawText(l, 60, curY, "/F1", 9, cTextDark);
      curY -= 12;
    }
  }
  curY -= 8;

  // Exp 2: Lazada Seller
  doc.drawText("E-commerce Seller & Store Administrator", 45, curY, "/F2", 11, cPrimary);
  doc.drawText("2021 - Present", 475, curY, "/F2", 9.5, cAccent);
  doc.drawText("Dhori Store (Lazada Marketplace)  -  South Tangerang, Indonesia", 45, curY - 13, "/F2", 9, cAccent);
  doc.drawText("Store URL: https://www.lazada.co.id/shop/dhori-store/", 45, curY - 24, "/F1", 8, cTextMuted);
  curY -= 37;

  const exp2Bullets = [
    "Operate and scale an active e-commerce store on the Lazada marketplace platform as owner and sole administrator.",
    "Manage a comprehensive catalog of 26+ products, optimizing listing titles, copywriting, and visual assets.",
    "Strategically register and align store inventory with official Lazada promotional campaigns and seasonal sales.",
    "Handle buyer inquiries and technical customer support with high responsiveness, achieving a 94% positive seller rating."
  ];

  for (const b of exp2Bullets) {
    doc.drawText("*", 50, curY, "/F2", 10, cAccent);
    const lines = doc.wrapText(b, 98);
    for (const l of lines) {
      doc.drawText(l, 60, curY, "/F1", 9, cTextDark);
      curY -= 12;
    }
  }
  curY -= 8;

  // Exp 3: Community Service PKM
  doc.drawText("Community Service (PKM) - Front-End Web Trainer", 45, curY, "/F2", 11, cPrimary);
  doc.drawText("2025", 510, curY, "/F2", 9.5, cAccent);
  doc.drawText("Universitas Pamulang x SMK Negeri 3 Tangerang Selatan  -  South Tangerang, Indonesia", 45, curY - 13, "/F2", 9, cAccent);
  doc.drawText("Published Article: https://jurnalmahasiswa.com/index.php/appa/article/view/2232", 45, curY - 24, "/F1", 8, cTextMuted);
  curY -= 37;

  const exp3Bullets = [
    "Spearheaded a Community Service Program providing front-end web development training using HTML and CSS for students of SMKN 3 Tangsel.",
    "Delivered structured workshops, instructional lectures, and hands-on guidance on building web portfolios and digital CVs.",
    "Mentored students on personal branding, digital portfolio presentation, and essential preparation for IT careers.",
    "Authored and published an academic journal article documenting the methodology, training metrics, and program outcomes."
  ];

  for (const b of exp3Bullets) {
    doc.drawText("*", 50, curY, "/F2", 10, cAccent);
    const lines = doc.wrapText(b, 98);
    for (const l of lines) {
      doc.drawText(l, 60, curY, "/F1", 9, cTextDark);
      curY -= 12;
    }
  }
  curY -= 15;

  // --- SECTION: CERTIFICATIONS ---
  drawSectionHeader("Certifications & Achievements", curY);
  curY -= 22;

  const certs = [
    {
      title: "Google Analytics Certification",
      issuer: "Google",
      date: "September 2026",
      desc: "Demonstrated competencies in digital analytics, website traffic & behavior measurement, event tracking, custom reporting, and leveraging analytics data for strategic data-driven decisions."
    },
    {
      title: "AI Capabilities and Limitations",
      issuer: "Anthropic",
      date: "September 2026",
      desc: "Comprehensive training on generative AI fundamentals, Next Token Prediction, pretraining vs. fine-tuning, knowledge cutoff considerations, context windows, and practical guardrails."
    },
    {
      title: "HTML, CSS, JavaScript Certification",
      issuer: "SoloLearn",
      date: "October 2024",
      desc: "Proficiency in modern semantic HTML5 page structuring, responsive CSS layout styling (Flexbox/Grid), and vanilla JavaScript programming for dynamic web interactivity."
    }
  ];

  for (const cert of certs) {
    doc.drawText(cert.title, 45, curY, "/F2", 10, cPrimary);
    doc.drawText(`${cert.issuer}  |  ${cert.date}`, 390, curY, "/F1", 8.5, cTextMuted);
    curY -= 13;

    const lines = doc.wrapText(cert.desc, 102);
    for (const l of lines) {
      doc.drawText(l, 45, curY, "/F1", 8.5, cTextDark);
      curY -= 11;
    }
    curY -= 7;
  }

  drawFooter(2, 3);

  // ==========================================
  // PAGE 3: Featured Projects & Portfolio Details
  // ==========================================
  doc.addPage();
  curY = 790;

  drawSectionHeader("Featured Projects", curY);
  curY -= 22;

  const projects = [
    {
      num: "01",
      title: "Programmatic Video Creation with Remotion",
      role: "Lead Creator & Developer",
      tags: ["Remotion", "React.js", "JavaScript", "Motion Graphics", "FFmpeg Rendering"],
      desc: "Built animated motion graphics and commercial-grade video sequences entirely through React code using the Remotion framework. Showcases 6 diverse video productions: Web Scrolling, Pyramid Motion, Prison Narrative, Pirate Adventure, Dream Sequence, and Quran Typography. Frame-accurate, parameterized, and data-driven video composition."
    },
    {
      num: "02",
      title: "Scholarship Management Web Application (App Beasiswa)",
      role: "Full-Stack Web Developer",
      github: "https://github.com/doxxy22/app_beasiswa",
      tags: ["PHP", "MySQL", "JavaScript", "CSS3", "Apache / XAMPP"],
      desc: "Engineered a web application dedicated to managing scholarship applications, student eligibility evaluation, and institutional record keeping. Implemented relational MySQL database schemas, administrative dashboard controls, search filtering, and CRUD operations for managing student recipients."
    },
    {
      num: "03",
      title: "DooMovie - Interactive Movie Discovery Platform",
      role: "Front-End Developer",
      demo: "https://doomovies.netlify.app",
      github: "https://github.com/doxxy22/doomovie",
      tags: ["JavaScript (ES6+)", "TMDB REST API", "HTML5", "CSS3", "Netlify Deployment"],
      desc: "Designed and deployed a responsive web platform that connects to the TMDB API to deliver real-time movie exploration, search auto-complete, genre filtering, and detailed movie profiles. Focused on smooth client-side state handling, dynamic DOM rendering, and optimized API requests."
    },
    {
      num: "04",
      title: "Ninety Eight Training Camp - Promotional Platform",
      role: "Front-End Developer",
      demo: "https://ninetyeight-camp.vercel.app",
      github: "https://github.com/doxxy22/ninetyeight-camp",
      tags: ["JavaScript", "HTML5", "Modern CSS", "Responsive Design", "Vercel Deployment"],
      desc: "Created a promotional landing page for Ninety Eight Training Camp, a premium boxing gym and training center. Features high-impact visual design, program breakdown, class schedule showcases, trainer profiles, and mobile-first responsive design for customer conversion."
    }
  ];

  for (const proj of projects) {
    // Project card box
    const cardHeight = 85;
    doc.setFillColor(cCardBg[0], cCardBg[1], cCardBg[2]);
    doc.setStrokeColor(cCardBorder[0], cCardBorder[1], cCardBorder[2]);
    doc.drawRoundedRect(40, curY - cardHeight + 15, 515, cardHeight, 6, true, true);

    // Number + Title
    doc.drawText(proj.num, 50, curY - 2, "/F2", 13, cAccent);
    doc.drawText(proj.title, 75, curY - 2, "/F2", 10.5, cPrimary);

    let linkStr = proj.role;
    if (proj.demo) linkStr += `  |  Demo: ${proj.demo}`;
    if (proj.github) linkStr += `  |  Code: ${proj.github}`;
    doc.drawText(linkStr, 75, curY - 15, "/F1", 7.5, cTextMuted);

    // Description
    const lines = doc.wrapText(proj.desc, 98);
    let dy = curY - 27;
    for (const l of lines) {
      doc.drawText(l, 50, dy, "/F1", 8.2, cTextDark);
      dy -= 10.5;
    }

    // Tech badges at bottom of card
    let tx = 50;
    for (const t of proj.tags) {
      const tw = t.length * 4.8 + 8;
      drawBadge(t, tx, dy - 2, tw);
      tx += tw + 4;
    }

    curY -= cardHeight + 12;
  }

  // Bottom Notice
  curY -= 5;
  doc.setFillColor(cAccentBg[0], cAccentBg[1], cAccentBg[2]);
  doc.drawRoundedRect(40, curY - 20, 515, 30, 6, true, false);
  doc.drawText("Looking for an ambitious Software Developer or Web Developer for your team?", 50, curY - 2, "/F2", 9, cPrimary);
  doc.drawText("Contact Rido Anugrah at ridoanugrah2209@gmail.com or WhatsApp +62 813-1688-7410", 50, curY - 14, "/F1", 8.5, cAccent);

  drawFooter(3, 3);

  const pdfBuffer = doc.compile();
  return pdfBuffer;
}

// Write to files
const outputPath = path.join(__dirname, "..", "Portfolio-Rido-Anugrah.pdf");
const publicOutputPath = path.join(__dirname, "..", "public", "assets", "Portfolio-Rido-Anugrah.pdf");

const pdf = generatePortfolioPdf();
fs.writeFileSync(outputPath, pdf);
fs.writeFileSync(publicOutputPath, pdf);

console.log("Successfully generated Portfolio PDF!");
console.log("Output 1:", outputPath, "Size:", fs.statSync(outputPath).size, "bytes");
console.log("Output 2:", publicOutputPath, "Size:", fs.statSync(publicOutputPath).size, "bytes");

