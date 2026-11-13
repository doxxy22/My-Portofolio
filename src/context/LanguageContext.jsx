import { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      certificates: "Certificates",
      education: "Education",
      contact: "Contact",
      cv: "CV",
      downloadCv: "Download CV",
      contactBtn: "Contact",
      contactMe: "Contact Me"
    },
    hero: {
      openToWork: "Open to Work",
      greeting: "👋 Hello, world!",
      im: "I'm",
      roles: [
        "Software Developer",
        "Web Developer",
        "Fresh Graduate",
        "Problem Solver"
      ],
      codeLines: [
        { text: "const developer = {", color: "text-blue-400" },
        { text: '  name: "Rido Anugrah",', color: "text-green-400" },
        { text: '  role: "Fresh Graduate",', color: "text-green-400" },
        { text: '  degree: "S.Kom — Computer Science",', color: "text-yellow-400" },
        { text: '  passion: "Building solutions",', color: "text-green-400" },
        { text: "};", color: "text-blue-400" }
      ],
      bio: "Fresh Graduate in Computer Science passionate about building reliable, scalable, and user-focused software solutions. Ready to contribute and grow through real-world projects with clean code and modern web technologies.",
      viewProjects: "View My Projects",
      downloadCv: "Download CV"
    },
    about: {
      number: "01",
      title: "About Me",
      subtitle: "Get to know who I am and what drives me",
      roleBadge: "Fresh Graduate — S.Kom",
      whoIAm: "WHO I AM",
      bio: "I am a Fresh Graduate in Computer Science with a strong interest in software development, web development, programming, databases, and machine learning. I have gained practical experience through a Web Developer internship and various academic projects.",
      interests: {
        cs: "Computer Science",
        software: "Software Development",
        web: "Web Development",
        ml: "Machine Learning",
        location: "Tangerang, Indonesia"
      },
      stats: {
        degree: "Degree",
        internship: "Internship",
        projectsBuilt: "Projects Built",
        technologies: "Technologies"
      }
    },
    experience: {
      number: "02",
      title: "Experience",
      subtitle: "My professional journey so far",
      readArticle: "Read Published Article",
      items: [
        {
          id: 1,
          title: "Web Developer Intern",
          company: "PT DIGITAL ANGKASA INDONESIA",
          location: "South Tangerang, Indonesia",
          year: "2025",
          description: [
            "Developed and maintained websites based on project requirements and user needs.",
            "Developed backend using PHP and frontend using HTML, CSS, JavaScript.",
            "Managed MySQL database using XAMPP for efficient data management.",
            "Performed debugging and troubleshooting to improve application stability.",
            "Collaborated with team members during development, testing, and feature improvement."
          ]
        },
        {
          id: 2,
          title: "E-commerce Seller & Store Administrator",
          company: "Dhori Store (Lazada)",
          location: "South Tangerang, Indonesia",
          year: "2021 - Present",
          description: [
            "Run an online store on Lazada as owner and sole admin: Dhori Store.",
            "Manage a catalog of 26 products, inputting and updating listings, including titles, descriptions, and images.",
            "Register the store for Lazada campaigns and promotions.",
            "Reply to buyer chats and handle customer questions through the seller account, maintaining a 94% positive seller rating."
          ]
        },
        {
          id: 3,
          title: "Community Service — Front-End Trainer",
          company: "Universitas Pamulang × SMK Negeri 3 Tangerang Selatan",
          location: "South Tangerang, Indonesia",
          year: "2025",
          description: [
            "Contributed to a Community Service program providing front-end development training using HTML and CSS to students of SMK Negeri 3 Tangerang Selatan.",
            "Involved in delivering course materials, workshops, and mentoring students in building web portfolios and digital CVs.",
            "Helped participants understand personal information structuring and personal branding to enhance their readiness for the professional world."
          ]
        }
      ]
    },
    projects: {
      number: "03",
      title: "Featured Projects",
      subtitle: "A selection of projects I've worked on",
      projectPrefix: "PROJECT",
      andManyMore: "And Many More...",
      items: [
        {
          id: 1,
          title: "Scholarship Management Web Application",
          description: "Developed a web-based application for managing and recording scholarships awarded to outstanding students."
        },
        {
          id: 2,
          title: "DooMovie — Movie Discovery Platform",
          description: "Implemented movie search and dynamic movie data retrieval through API integration."
        },
        {
          id: 3,
          title: "Ninety Eight Training Camp",
          description: "A promotional static website for Ninety Eight Training Camp, a landing page for a premium boxing gym and training camp."
        },
        {
          id: 4,
          title: "Programmatic Video with Remotion",
          description: "Created motion graphics and animated videos entirely with code using Remotion and React. Frame-accurate animations, dynamic data-driven content, and export to real video files — no traditional video editor needed.",
          videoLabel: "Select Video Showcase",
          nowPlaying: "Now Playing"
        }
      ]
    },
    skills: {
      number: "04",
      title: "Technical Skills",
      subtitle: "Technologies and tools I work with",
      featured: "Featured",
      categories: {
        languages: "Programming Languages",
        web: "Web Development",
        databases: "Database",
        tools: "Tools & Frameworks",
        ml: "Data & Machine Learning",
        video: "Video Creation & Editing"
      },
      videoDescription: "Building programmatic videos with React & Remotion — frame-accurate animations rendered as real video files."
    },
    certificates: {
      title: "Certificates",
      subtitle: "Professional certifications & achievements",
      viewCertificate: "View Certificate",
      items: [
        {
          id: 1,
          title: "Google Analytics Certification",
          date: "September 2026",
          description: "Completed the Google Analytics Certification with competencies in website performance measurement, user data analysis, insight interpretation, and leveraging data to support data-driven decision making."
        },
        {
          id: 2,
          title: "AI Capabilities and Limitations",
          date: "September 2026",
          description: "Completed Generative AI training covering concepts, mechanisms, and limitations of generative AI models. Learned the differences between Generative AI and classification/prediction AI, pretraining and fine-tuning processes, Next Token Prediction mechanisms, and factors affecting model knowledge and accuracy such as knowledge cutoff, training coverage, and context window."
        },
        {
          id: 3,
          title: "HTML, CSS, JavaScript",
          date: "October 2024",
          description: "Applied HTML concepts to build well-organized web page structures, implemented CSS to create structured, consistent, and responsive web designs, and utilized JavaScript concepts to add dynamic behavior and interactivity to web pages."
        }
      ]
    },
    education: {
      title: "Education",
      subtitle: "My academic background",
      degree: "Bachelor of Computer Science",
      location: "South Tangerang, Indonesia",
      thesisLabel: "Final Project / Thesis",
      thesisTitle: "Analysis of the Effectiveness of the Cosine Similarity Method for Plagiarism Detection in Academic Documents"
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "I'm currently open to opportunities in software development and web development. Feel free to reach out directly via email or phone.",
      email: "Email",
      phone: "Phone",
      sendEmail: "Hire Me — Send Email",
      chatWhatsapp: "Chat on WhatsApp"
    },
    footer: {
      role: "Fresh Graduate | Software Developer",
      rights: "All rights reserved.",
      builtWith: "Built with",
      using: "using React & Tailwind CSS"
    }
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      experience: "Pengalaman",
      projects: "Proyek",
      skills: "Keahlian",
      certificates: "Sertifikat",
      education: "Pendidikan",
      contact: "Kontak",
      cv: "CV",
      downloadCv: "Unduh CV",
      contactBtn: "Kontak",
      contactMe: "Hubungi Saya"
    },
    hero: {
      openToWork: "Tersedia untuk Kerja",
      greeting: "👋 Halo, dunia!",
      im: "Saya",
      roles: [
        "Software Developer",
        "Web Developer",
        "Fresh Graduate",
        "Problem Solver"
      ],
      codeLines: [
        { text: "const developer = {", color: "text-blue-400" },
        { text: '  name: "Rido Anugrah",', color: "text-green-400" },
        { text: '  role: "Fresh Graduate",', color: "text-green-400" },
        { text: '  degree: "S.Kom — Teknik Informatika",', color: "text-yellow-400" },
        { text: '  passion: "Membangun solusi digital",', color: "text-green-400" },
        { text: "};", color: "text-blue-400" }
      ],
      bio: "Lulusan Baru Teknik Informatika dengan minat besar dalam membangun solusi perangkat lunak yang andal, skalabel, dan berpusat pada pengguna. Siap berkontribusi dan berkembang melalui proyek nyata dengan kode bersih dan teknologi web modern.",
      viewProjects: "Lihat Proyek Saya",
      downloadCv: "Unduh CV"
    },
    about: {
      number: "01",
      title: "Tentang Saya",
      subtitle: "Mengenal lebih dekat siapa saya dan apa yang memotivasi saya",
      roleBadge: "Lulusan Baru — S.Kom",
      whoIAm: "TENTANG SAYA",
      bio: "Saya adalah Lulusan Baru Teknik Informatika dengan minat kuat dalam pengembangan perangkat lunak, pengembangan web, pemrograman, basis data, dan machine learning. Memiliki pengalaman praktis melalui magang Web Developer serta berbagai proyek akademik.",
      interests: {
        cs: "Ilmu Komputer",
        software: "Pengembangan Software",
        web: "Pengembangan Web",
        ml: "Machine Learning",
        location: "Tangerang, Indonesia"
      },
      stats: {
        degree: "Gelar",
        internship: "Magang",
        projectsBuilt: "Proyek Selesai",
        technologies: "Teknologi"
      }
    },
    experience: {
      number: "02",
      title: "Pengalaman",
      subtitle: "Perjalanan profesional saya sejauh ini",
      readArticle: "Baca Artikel Publikasi",
      items: [
        {
          id: 1,
          title: "Web Developer Intern",
          company: "PT DIGITAL ANGKASA INDONESIA",
          location: "Tangerang Selatan, Indonesia",
          year: "2025",
          description: [
            "Mengembangkan dan memelihara website sesuai kebutuhan proyek dan pengguna.",
            "Mengembangkan backend menggunakan PHP dan frontend menggunakan HTML, CSS, JavaScript.",
            "Mengelola basis data MySQL menggunakan XAMPP untuk pengelolaan data yang efisien.",
            "Melakukan debugging dan troubleshooting untuk meningkatkan stabilitas aplikasi.",
            "Berkolaborasi dengan anggota tim dalam pengembangan, pengujian, dan penyempurnaan fitur."
          ]
        },
        {
          id: 2,
          title: "E-commerce Seller & Store Administrator",
          company: "Dhori Store (Lazada)",
          location: "Tangerang Selatan, Indonesia",
          year: "2021 - Sekarang",
          description: [
            "Menjalankan toko online di Lazada sebagai pemilik dan admin tunggal: Dhori Store.",
            "Mengelola katalog berisi 26 produk, menginput dan memperbarui listing, termasuk judul, deskripsi, dan gambar.",
            "Mendaftarkan toko untuk mengikuti kampanye dan promosi resmi Lazada.",
            "Membalas chat pembeli dan menangani pertanyaan pelanggan melalui akun penjual, mempertahankan rating penjual positif 94%."
          ]
        },
        {
          id: 3,
          title: "Community Service — Front-End Trainer",
          company: "Universitas Pamulang × SMK Negeri 3 Tangerang Selatan",
          location: "Tangerang Selatan, Indonesia",
          year: "2025",
          description: [
            "Berkontribusi dalam program Pengabdian Kepada Masyarakat (PKM) memberikan pelatihan front-end development menggunakan HTML dan CSS kepada siswa SMKN 3 Tangerang Selatan.",
            "Terlibat dalam penyampaian materi kursus, workshop, dan membimbing siswa dalam membangun portofolio web dan CV digital.",
            "Membantu peserta memahami struktur informasi pribadi dan personal branding untuk meningkatkan kesiapan memasuki dunia profesional."
          ]
        }
      ]
    },
    projects: {
      number: "03",
      title: "Proyek Unggulan",
      subtitle: "Koleksi proyek yang pernah saya kembangkan",
      projectPrefix: "PROYEK",
      andManyMore: "Dan Masih Banyak Lagi...",
      items: [
        {
          id: 1,
          title: "Aplikasi Web Pengelolaan Beasiswa",
          description: "Mengembangkan aplikasi berbasis web untuk mengelola dan mencatat penerima beasiswa bagi siswa-siswi berprestasi."
        },
        {
          id: 2,
          title: "DooMovie — Platform Eksplorasi Film",
          description: "Mengimplementasikan fitur pencarian film dan pengambilan data film dinamis secara real-time melalui integrasi TMDB API."
        },
        {
          id: 3,
          title: "Ninety Eight Training Camp",
          description: "Website promosi untuk Ninety Eight Training Camp, landing page modern untuk sasana tinju dan pusat pelatihan kebugaran premium."
        },
        {
          id: 4,
          title: "Video Terprogram dengan Remotion",
          description: "Membuat motion graphic dan animasi video secara penuh menggunakan kode dengan Remotion dan React. Animasi akurat per frame, konten berbasis data dinamis, dan rendering ke file video MP4 nyata tanpa software pengedit video konvensional.",
          videoLabel: "Pilih Hasil Video",
          nowPlaying: "Sedang Diputar"
        }
      ]
    },
    skills: {
      number: "04",
      title: "Keahlian Teknis",
      subtitle: "Teknologi dan tools yang saya kuasai",
      featured: "Unggulan",
      categories: {
        languages: "Bahasa Pemrograman",
        web: "Pengembangan Web",
        databases: "Basis Data",
        tools: "Tools & Framework",
        ml: "Data & Machine Learning",
        video: "Pembuatan & Editing Video"
      },
      videoDescription: "Membangun video terprogram dengan React & Remotion — animasi presisi per frame yang dirender menjadi file video nyata."
    },
    certificates: {
      title: "Sertifikat",
      subtitle: "Sertifikasi profesional & pencapaian",
      viewCertificate: "Lihat Sertifikat",
      items: [
        {
          id: 1,
          title: "Google Analytics Certification",
          date: "September 2026",
          description: "Menyelesaikan Sertifikasi Google Analytics dengan kompetensi dalam pengukuran performa website, analisis data pengguna, interpretasi wawasan, dan pemanfaatan data untuk pengambilan keputusan berbasis data."
        },
        {
          id: 2,
          title: "AI Capabilities and Limitations",
          date: "September 2026",
          description: "Menyelesaikan pelatihan Generative AI yang mencakup konsep, mekanisme, dan batasan model generative AI. Mempelajari perbedaan Generative AI dengan klasifikasi/prediksi, proses pretraining & fine-tuning, Next Token Prediction, serta faktor yang mempengaruhi akurasi model seperti context window dan knowledge cutoff."
        },
        {
          id: 3,
          title: "HTML, CSS, JavaScript",
          date: "Oktober 2024",
          description: "Menerapkan konsep HTML untuk menyusun struktur halaman web yang rapi, mengimplementasikan CSS untuk desain web terstruktur, konsisten, dan responsif, serta memanfaatkan JavaScript untuk interaktivitas dinamis."
        }
      ]
    },
    education: {
      title: "Pendidikan",
      subtitle: "Latar belakang akademik saya",
      degree: "Sarjana Komputer (S.Kom) - Teknik Informatika",
      location: "Tangerang Selatan, Indonesia",
      thesisLabel: "Tugas Akhir / Skripsi",
      thesisTitle: "Analisis Efektivitas Metode Cosine Similarity untuk Deteksi Plagiarisme pada Dokumen Akademik"
    },
    contact: {
      title: "Mari Bekerja Sama",
      subtitle: "Saat ini saya terbuka untuk peluang kerja di bidang pengembangan perangkat lunak dan web development. Jangan ragu untuk menghubungi saya melalui email atau telepon.",
      email: "Email",
      phone: "Telepon",
      sendEmail: "Rekrut Saya — Kirim Email",
      chatWhatsapp: "Hubungi via WhatsApp"
    },
    footer: {
      role: "Lulusan Baru | Software Developer",
      rights: "Semua hak dilindungi undang-undang.",
      builtWith: "Dibuat dengan",
      using: "menggunakan React & Tailwind CSS"
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "id" || saved === "en") return saved;
    }
    return "en"; // Default to 'en' (English)
  });

  const setLanguage = (lang) => {
    if (lang === "id" || lang === "en") {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang;
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
