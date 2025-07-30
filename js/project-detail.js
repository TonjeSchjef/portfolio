// project-detail.js
class ProjectDetail {
  constructor() {
    this.projectId = this.getProjectIdFromUrl();
    this.project = null;
    this.currentLang = document.body.getAttribute('data-lang') || 'no';
    this.contentContainer = document.getElementById('projectContent');
    
    this.init();
  }

  init() {
    if (this.projectId) {
      this.loadProject();
      this.observeLanguageChanges();
    } else {
      this.showError();
    }
  }

  getProjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
  }

  loadProject() {
    // Hent prosjekt fra databasen (getProjectById funksjonen er definert i projects-data.js)
    this.project = getProjectById(this.projectId);
    
    if (this.project) {
      this.renderProject();
      document.title = `${this.project.name[this.currentLang]} - Tonje Schjefstad`;
    } else {
      this.showError();
    }
  }

  observeLanguageChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-lang') {
          this.currentLang = document.body.getAttribute('data-lang');
          if (this.project) {
            this.renderProject();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }

  renderProject() {
    const lang = this.currentLang;
    
    this.contentContainer.innerHTML = `
      <article class="project-detail">
        <header class="project-header">
          <h1 class="project-title">${this.project.name[lang]}</h1>
          <p class="project-subtitle">${this.project.shortDescription[lang]}</p>
          
          <div class="project-meta">
            <div class="project-date">
              <span class="lang-content lang-no">Fullført: </span>
              <span class="lang-content lang-en">Completed: </span>
              ${this.formatDate(this.project.date)}
            </div>
            <div class="project-actions">
              ${this.project.liveUrl ? `
                <a href="${this.project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                  <span class="lang-content lang-no">Se live</span>
                  <span class="lang-content lang-en">View Live</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              ` : ''}
              ${this.project.githubUrl ? `
                <a href="${this.project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
                  <span class="lang-content lang-no">Se kode</span>
                  <span class="lang-content lang-en">View Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              ` : ''}
            </div>
          </div>
        </header>

        <div class="project-gallery">
          ${this.project.images.screenshots.map((img, index) => `
            <img 
              src="${img}" 
              alt="${this.project.name[lang]} - Screenshot ${index + 1}" 
              class="project-screenshot"
              loading="${index === 0 ? 'eager' : 'lazy'}"
              onclick="openImageModal('${img}')"
            >
          `).join('')}
        </div>

        <div class="project-details">
          <section class="project-section">
            <h2>
              <span class="lang-content lang-no">Om prosjektet</span>
              <span class="lang-content lang-en">About the project</span>
            </h2>
            <p>${this.project.fullDescription[lang]}</p>
          </section>

          <section class="project-section">
            <h2>
              <span class="lang-content lang-no">Teknologier</span>
              <span class="lang-content lang-en">Technologies</span>
            </h2>
            <div class="tech-list">
              ${this.project.technologies.map(tech => `
                <span class="tech-badge tech-${tech}">${tech.toUpperCase()}</span>
              `).join('')}
            </div>
          </section>

          <section class="project-section">
            <h2>
              <span class="lang-content lang-no">Funksjoner</span>
              <span class="lang-content lang-en">Features</span>
            </h2>
            <ul class="features-list">
              ${this.project.features[lang].map(feature => `
                <li>${feature}</li>
              `).join('')}
            </ul>
          </section>
        </div>
      </article>
    `;

    // Re-apply language visibility
    this.updateLanguageVisibility();
  }

  updateLanguageVisibility() {
    // Denne funksjonen sørger for at riktig språk vises etter at innholdet er lastet dynamisk
    const langElements = this.contentContainer.querySelectorAll('.lang-content');
    langElements.forEach(element => {
      if (element.classList.contains(`lang-${this.currentLang}`)) {
        element.style.display = 'inline';
      } else {
        element.style.display = 'none';
      }
    });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(this.currentLang === 'no' ? 'nb-NO' : 'en-US', options);
  }

  showError() {
    this.contentContainer.innerHTML = `
      <div class="error-message">
        <h2>
          <span class="lang-content lang-no">Prosjekt ikke funnet</span>
          <span class="lang-content lang-en">Project not found</span>
        </h2>
        <p>
          <span class="lang-content lang-no">Beklager, vi kunne ikke finne dette prosjektet.</span>
          <span class="lang-content lang-en">Sorry, we couldn't find this project.</span>
        </p>
        <a href="index.html#projects" class="btn btn-primary">
          <span class="lang-content lang-no">Tilbake til prosjekter</span>
          <span class="lang-content lang-en">Back to projects</span>
        </a>
      </div>
    `;
    this.updateLanguageVisibility();
  }
}

// Image modal functionality
function openImageModal(imageSrc) {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${imageSrc}" alt="Project screenshot">
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close-modal')) {
      modal.remove();
    }
  });
  
  // Close with escape key
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectDetail();
});