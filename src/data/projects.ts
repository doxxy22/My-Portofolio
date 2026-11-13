export const projects = [
  {
    id: 1,
    title: "Scholarship Management Web Application",
    description: "Developed a web-based application for managing and recording scholarships awarded to outstanding students.",
    tech: ["PHP", "MySQL", "CSS", " JavaScript"],
    image: "/assets/beasiswa.png",
    github: "https://github.com/doxxy22/app_beasiswa",
  },
  {
    id: 2,
    title: "DooMovie — Movie Discovery Platform",
    description: "Implemented movie search and dynamic movie data retrieval through API integration.",
    tech: ["JavaScript", "HTML", "CSS", "TMDB API"],
    image: "/assets/movie.png",
    github: "https://github.com/doxxy22/doomovie",
    demo: "https://doomovies.netlify.app"
  },
  {
    id: 3,
    title: "Ninety Eight Training Camp",
    description: "A promotional static website for Ninety Eight Training Camp, a landing page for a premium boxing gym and training camp.",
    tech: ["JavaScript", "HTML", "CSS"],
    image: "/assets/camp.png",
    github: "https://github.com/doxxy22/ninetyeight-camp",
    demo: "https://ninetyeight-camp.vercel.app"
  },
  {
    id: 4,
    title: "Programmatic Video with Remotion",
    description: "Created motion graphics and animated videos entirely with code using Remotion and React.",
    tech: ["Remotion", "React.js", "JavaScript", "Motion Graphics"],
    video: "/assets/pyramid.mp4",
    videos: [
      { id: "pyramid", title: "Pyramid Motion", src: "/assets/pyramid.mp4" },
      { id: "prison", title: "Prison Narrative", src: "/assets/prison.mp4" },
      { id: "pirate", title: "Pirate Adventure", src: "/assets/pirate.mp4" },
    ]
  }
];
