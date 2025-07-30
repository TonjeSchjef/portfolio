
const projectsData = [
  {
    id: 1,
    name: {
      no: "Garnio App",
      en: "Garnio App"
    },
    shortDescription: {
      no: "Nettsted med nyttige verktøy for strikkere",
      en: "Website with useful tools for knitters"
    },
    fullDescription: {
      no: "Et fullstendig e-handel nettsted bygget fra bunnen av med vanilla JavaScript. Prosjektet inkluderer produktvisning, handlekurv-funksjonalitet og en responsiv design som fungerer på alle enheter.",
      en: "A complete e-commerce website built from scratch with vanilla JavaScript. The project includes product display, shopping cart functionality, and a responsive design that works on all devices."
    },
    technologies: ["html", "css", "javascript"],
    features: {
      no: ["Responsiv design", "Handlekurv funksjonalitet", "Produktfiltrering", "LocalStorage integrasjon"],
      en: ["Responsive design", "Shopping cart functionality", "Product filtering", "LocalStorage integration"]
    },
    images: {
      thumbnail: "/assets/projects/project1-thumb.jpg",
      screenshots: [
        "/assets/projects/project1-home.jpg",
        "/assets/projects/project1-product.jpg",
        "/assets/projects/project1-cart.jpg"
      ]
    },
    liveUrl: "https://your-project1.netlify.app",
    githubUrl: "https://github.com/yourusername/project1",
    date: "2024-12-01",
    featured: true
  },
  {
    id: 2,
    name: {
      no: "Blogg Plattform",
      en: "Blog Platform"
    },
    shortDescription: {
      no: "Moderne bloggplattform med CMS",
      en: "Modern blog platform with CMS"
    },
    fullDescription: {
      no: "En dynamisk bloggplattform med innebygd CMS (Content Management System). Brukere kan opprette, redigere og slette blogginnlegg. Inkluderer autentisering og kommentarfunksjonalitet.",
      en: "A dynamic blog platform with built-in CMS (Content Management System). Users can create, edit, and delete blog posts. Includes authentication and comment functionality."
    },
    technologies: ["html", "css", "javascript", "design"],
    features: {
      no: ["Brukerautentisering", "CRUD operasjoner", "Kommentarsystem", "Responsiv design"],
      en: ["User authentication", "CRUD operations", "Comment system", "Responsive design"]
    },
    images: {
      thumbnail: "/assets/projects/project2-thumb.jpg",
      screenshots: [
        "/assets/projects/project2-home.jpg",
        "/assets/projects/project2-post.jpg",
        "/assets/projects/project2-admin.jpg"
      ]
    },
    liveUrl: "https://your-project2.netlify.app",
    githubUrl: "https://github.com/yourusername/project2",
    date: "2024-11-15",
    featured: true
  },
  {
    id: 3,
    name: {
      no: "Portfolio Nettside",
      en: "Portfolio Website"
    },
    shortDescription: {
      no: "Personlig portfolio med moderne animasjoner",
      en: "Personal portfolio with modern animations"
    },
    fullDescription: {
      no: "Min personlige portfolio-nettside med fokus på moderne design og smooth animasjoner. Bygget med ren HTML, CSS og JavaScript for optimal ytelse.",
      en: "My personal portfolio website focusing on modern design and smooth animations. Built with pure HTML, CSS, and JavaScript for optimal performance."
    },
    technologies: ["html", "css", "javascript"],
    features: {
      no: ["Smooth scroll", "Mørk modus", "Flerspråklig støtte", "Kontaktskjema"],
      en: ["Smooth scroll", "Dark mode", "Multi-language support", "Contact form"]
    },
    images: {
      thumbnail: "/assets/projects/project3-thumb.jpg",
      screenshots: [
        "/assets/projects/project3-home.jpg",
        "/assets/projects/project3-about.jpg",
        "/assets/projects/project3-contact.jpg"
      ]
    },
    liveUrl: "https://your-portfolio.netlify.app",
    githubUrl: "https://github.com/yourusername/portfolio",
    date: "2024-10-20",
    featured: false
  }
];