class ProjectsManager {
  constructor() {
    this.projects = projectsData;
    this.currentFilter = 'all';
    this.currentLang = document.body.getAttribute('data-lang') || 'no';
    this.projectsContainer = null;
    this.filterButtons = null;
    
    this.init();
  }

  init() {
    // Vent til DOM er lastet
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }

    // Lytt til språkendringer
    this.observeLanguageChanges();
  }

  setup() {
    this.projectsContainer = document.querySelector('.portfolio-container');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    if (this.projectsContainer) {
      this.renderProjects();
      this.setupFilterButtons();
    }
  }

  observeLanguageChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-lang') {
          this.currentLang = document.body.getAttribute('data-lang');
          this.renderProjects();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }

  setupFilterButtons() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.currentFilter = e.target.getAttribute('data-filter');
        this.updateActiveFilter(e.target);
        this.renderProjects();
      });
    });
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  filterProjects() {
    if (this.currentFilter === 'all') {
      return this.projects;
    }
    
    return this.projects.filter(project => 
      project.technologies.includes(this.currentFilter)
    );
  }

  renderProjects() {
    if (!this.projectsContainer) return;

    const filteredProjects = this.filterProjects();
    this.projectsContainer.innerHTML = '';

    filteredProjects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      this.projectsContainer.appendChild(projectCard);
    });

    // Legg til fade-in animasjon
    this.animateProjectCards();
  }

  createProjectCard(project) {
    const card = document.createElement('a');
    card.href = `project-detail.html?id=${project.id}`;
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    // Sjekk om prosjektet er featured
    if (project.featured) {
      card.classList.add('featured');
    }

    card.innerHTML = `
      <div class="screenshots-container">
        <img src="${project.images.thumbnail}" alt="${project.name[this.currentLang]}" class="screenshot screenshot-main" loading="lazy">
        <div class="project-overlay">
          <div class="project-technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      </div>
      <h2 class="project-name">${project.name[this.currentLang]}</h2>
      <p class="project-description">${project.shortDescription[this.currentLang]}</p>
      <div class="project-links">
        <span class="view-project">
          ${this.currentLang === 'no' ? 'Se prosjekt' : 'View project'} →
        </span>
      </div>
    `;

    // Forhindre standard lenkeoppførsel for knapper
    card.addEventListener('click', (e) => {
      if (e.target.closest('.project-links a')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    return card;
  }

  animateProjectCards() {
    const cards = this.projectsContainer.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
}

// Initialiser prosjektmanager
const projectsManager = new ProjectsManager();

// Funksjon for å hente prosjektdetaljer (brukes på project-detail.html)
function getProjectById(id) {
  return projectsData.find(project => project.id === parseInt(id));
}

// Eksporter for bruk i andre filer
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, getProjectById };
}