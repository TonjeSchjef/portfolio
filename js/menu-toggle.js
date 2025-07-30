// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});