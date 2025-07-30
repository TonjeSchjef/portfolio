// Language toggle functionality
class LanguageToggle {
  constructor() {
    this.currentLang = "no"; // Default language
    this.body = document.body;
    this.desktopToggle = document.getElementById("languageToggleDesktop");
    this.mobileToggle = document.getElementById("languageToggleMobile");

    this.init();
  }

  init() {
    // Check if language is saved in localStorage
    const savedLang = localStorage.getItem("preferred-language");
    if (savedLang && (savedLang === "no" || savedLang === "en")) {
      this.currentLang = savedLang;
      this.updateLanguage();
    }

    // Add click event listeners to both desktop and mobile toggles
    if (this.desktopToggle) {
      this.addToggleListeners(this.desktopToggle);
    }
    if (this.mobileToggle) {
      this.addToggleListeners(this.mobileToggle);
    }
  }

  addToggleListeners(toggleElement) {
    const langOptions = toggleElement.querySelectorAll(".lang-option");

    langOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedLang = option.getAttribute("data-lang");
        if (selectedLang !== this.currentLang) {
          this.currentLang = selectedLang;
          this.updateLanguage();
          this.saveLanguagePreference();
        }
      });
    });
  }

  updateLanguage() {
    // Update body data attribute
    this.body.setAttribute("data-lang", this.currentLang);

    // Update document language
    document.documentElement.lang = this.currentLang;

    // Update active states on both desktop and mobile toggles
    this.updateToggleStates(this.desktopToggle);
    this.updateToggleStates(this.mobileToggle);

    this.updatePlaceholders();
  }

  updateToggleStates(toggleElement) {
    if (!toggleElement) return;

    const langOptions = toggleElement.querySelectorAll(".lang-option");

    langOptions.forEach((option) => {
      const optionLang = option.getAttribute("data-lang");
      if (optionLang === this.currentLang) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }

  updatePlaceholders() {
    const inputs = document.querySelectorAll('[data-placeholder-no][data-placeholder-en]');
    inputs.forEach(input => {
      input.placeholder = input.getAttribute(`data-placeholder-${this.currentLang}`);
    });
  }


  saveLanguagePreference() {
    localStorage.setItem("preferred-language", this.currentLang);
  }
}

// Mobile menu toggle
class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById("mobile-toggle");
    this.navMenu = document.getElementById("nav-menu");
    this.init();
  }

  init() {
    if (this.menuToggle && this.navMenu) {
      this.menuToggle.addEventListener("click", () => {
        this.navMenu.classList.toggle("active");
      });

      // Close menu when clicking on links
      const navLinks = this.navMenu.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.navMenu.classList.remove("active");
        });
      });
    }
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  new LanguageToggle();
  new MobileMenu();
});

