// ========================================
// DOM Elements
// ========================================

const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const closeSidebar = document.querySelector('.close-sidebar');
const mainNavigation = document.querySelector('.main-navigation');
const navLinks = document.querySelectorAll('.nav-menu a, .sidebar-menu a, .sidebar-brands a');
const gujralImages = document.querySelectorAll('.gujral-image');
const submitButton = document.querySelector('.submit-button');

// ========================================
// Custom Cursor
// ========================================

const cursor = document.querySelector('.cursor-circle');
let cursorVisible = false;

// Show cursor only on desktop devices
if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
  cursor.style.display = 'block';
  cursorVisible = true;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add hover effect to interactive elements
  const hoverElements = document.querySelectorAll('a, button, .submit-button');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// ========================================
// Mobile Navigation Toggle
// ========================================

function toggleSidebar() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  sidebar.classList.toggle('active');
  sidebar.setAttribute('aria-hidden', isExpanded);
  
  // Prevent body scroll when sidebar is open
  document.body.style.overflow = isExpanded ? '' : 'hidden';
}

menuToggle.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', toggleSidebar);

// Close sidebar when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('active') && 
      !sidebar.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    toggleSidebar();
  }
});

// ========================================
// Gujral Image Slider
// ========================================

let currentImageIndex = 0;
let slideInterval;

function showNextImage() {
  // Remove active class from all images
  gujralImages.forEach(img => img.classList.remove('active'));
  
  // Move to next image
  currentImageIndex = (currentImageIndex + 1) % gujralImages.length;
  
  // Add active class to current image
  gujralImages[currentImageIndex].classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(showNextImage, 3000);
}

function stopSlider() {
  clearInterval(slideInterval);
}

// Start slider when first image is loaded
if (gujralImages.length > 0) {
  gujralImages[0].addEventListener('load', startSlider);
  
  // Pause slider on hover
  const gujralSection = document.querySelector('.gujral-section');
  gujralSection.addEventListener('mouseenter', stopSlider);
  gujralSection.addEventListener('mouseleave', startSlider);
}

// ========================================
// Form Submission
// ========================================

if (submitButton) {
  const form = submitButton.closest('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    
    let isValid = true;
    
    // Reset error states
    [name, email, message].forEach(field => {
      if (field) {
        field.style.borderColor = '';
      }
    });
    
    // Validate fields
    if (name && !name.value.trim()) {
      name.style.borderColor = 'red';
      isValid = false;
    }
    
    if (email && !email.value.trim()) {
      email.style.borderColor = 'red';
      isValid = false;
    } else if (email && !/\S+@\S+\.\S+/.test(email.value)) {
      email.style.borderColor = 'red';
      isValid = false;
    }
    
    if (message && !message.value.trim()) {
      message.style.borderColor = 'red';
      isValid = false;
    }
    
    if (isValid) {
      // Form submission logic would go here
      // For now, we'll just show a success message
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    }
  });
}

// ========================================
// Smooth Scrolling
// ========================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Check if it's an anchor link
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ========================================
// Scroll Animations
// ========================================

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .design-title, .design-description, .paradox-title, .paradox-description, .gujral-title, .gujral-quote, .art-title, .art-description, .casapop-title, .casapop-description, .arzaani-title, .arzaani-description');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .design-title, .design-description, .paradox-title, .paradox-description, .gujral-title, .gujral-quote, .art-title, .art-description, .casapop-title, .casapop-description, .arzaani-title, .arzaani-description');
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial check
  animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// ========================================
// Accessibility Enhancements
// ========================================

// Keyboard navigation for sidebar
document.addEventListener('keydown', (e) => {
  // Close sidebar with Escape key
  if (e.key === 'Escape' && sidebar.classList.contains('active')) {
    toggleSidebar();
  }
});

// Focus management for sidebar
sidebar.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusableElements = sidebar.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
});

// ========================================
// Performance Optimizations
// ========================================

// Lazy loading for images and videos
document.addEventListener('DOMContentLoaded', () => {
  const lazyElements = document.querySelectorAll('img[loading="lazy"], video[preload="none"]');
  
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'IMG') {
            element.loading = 'eager';
          } else if (element.tagName === 'VIDEO') {
            element.preload = 'auto';
          }
          
          lazyObserver.unobserve(element);
        }
      });
    });
    
    lazyElements.forEach(element => lazyObserver.observe(element));
  }
});

// ========================================
// Touch Device Optimizations
// ========================================

// Remove hover effects on touch devices
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
}