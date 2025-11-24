/**
 * Chris Carson Music Website - Main JavaScript
 *
 * This file contains all client-side functionality for the website including:
 * - Mobile navigation menu toggle
 * - Bokeh particle effect animation in hero section
 * - Active navigation link highlighting on scroll
 * - Smooth scrolling for anchor links
 *
 * @author Chris Carson Music
 */

/**
 * Mobile Navigation Toggle
 * Handles the hamburger menu functionality for mobile devices
 */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when any navigation link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/**
 * Bokeh Particle Effect
 * Creates a subtle animated bokeh effect in the hero section
 * with slow-moving light orbs in warm and cool tones
 */
const canvas = document.getElementById('bokeh-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

/**
 * Resize the canvas to match its container dimensions
 * Ensures proper rendering at the correct resolution
 */
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/**
 * Particle class representing a single bokeh light orb
 * Each particle has position, size, speed, color, and opacity
 */
class Particle {
  constructor() {
    this.reset();
    // Initialize particles at random positions on first load
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  /**
   * Reset particle properties with new random values
   * Called when a particle exits the canvas or on initialization
   */
  reset() {
    this.x = Math.random() * canvas.width;
    this.size = Math.random() * 80 + 40; // Size between 40-120px
    this.y = -this.size - 20; // Start above canvas (fully outside viewport)
    this.speedY = Math.random() * 0.15 + 0.05; // Vertical speed (0.05-0.2)
    this.speedX = (Math.random() - 0.5) * 0.15; // Horizontal drift (-0.075 to 0.075)
    this.opacity = Math.random() * 0.3 + 0.1; // Opacity (0.1-0.4)

    // Color variations - warm and cool tones for visual interest
    const colors = [
      'rgba(255, 223, 186, ', // warm peach
      'rgba(186, 225, 255, ', // cool blue
      'rgba(255, 255, 255, ', // white
      'rgba(255, 240, 200, ', // warm yellow
      'rgba(200, 220, 255, '  // light blue
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Update particle position and handle edge wrapping
   */
  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Wrap around edges - particles exit fully before resetting
    // This prevents visible flashing when particles enter/exit
    if (this.y > canvas.height + this.size + 20) {
      this.reset();
    }
    if (this.x < -this.size - 20) {
      this.x = canvas.width + this.size + 20;
    }
    if (this.x > canvas.width + this.size + 20) {
      this.x = -this.size - 20;
    }
  }

  /**
   * Draw particle with radial gradient for authentic bokeh blur effect
   */
  draw() {
    ctx.beginPath();

    // Create radial gradient from center to edge for soft, blurred appearance
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, this.color + (this.opacity * 0.8) + ')');
    gradient.addColorStop(0.4, this.color + (this.opacity * 0.4) + ')');
    gradient.addColorStop(1, this.color + '0)'); // Fade to transparent at edges

    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Initialize particle array based on canvas width
 * Creates 5-8 particles depending on screen size
 */
function initParticles() {
  particles = [];
  const particleCount = Math.min(8, Math.floor(canvas.width / 150));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

/**
 * Animation loop - continuously updates and renders particles
 */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  animationId = requestAnimationFrame(animate);
}

// Initialize bokeh effect
resizeCanvas();
initParticles();
animate();

/**
 * Handle window resize with debouncing
 * Reinitializes canvas and particles after resize completes
 */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    initParticles();
  }, 250);
});

/**
 * Clip canvas to hero section bounds
 * Keeps the canvas fixed (like background image) but only visible within hero section
 * The canvas is positioned fixed at 94px (navbar height) from top of viewport
 */
function updateCanvasClip() {
  const heroSection = document.getElementById('home');
  const rect = heroSection.getBoundingClientRect();

  // Only show canvas when hero section is in viewport
  if (rect.bottom > 94 && rect.top < window.innerHeight) {
    // Calculate how much to clip from top and bottom
    // topClip: when hero scrolls up past navbar, clip the top
    // bottomClip: when hero scrolls down below viewport, clip the bottom
    const topClip = Math.max(0, rect.top - 94);
    const bottomClip = Math.max(0, 94 + canvas.height - rect.bottom);
    canvas.style.clipPath = `inset(${topClip}px 0px ${bottomClip}px 0px)`;
    canvas.style.opacity = '1';
  } else {
    // Hide canvas when hero section is completely out of view
    canvas.style.opacity = '0';
  }
}

// Initialize canvas clipping and update on scroll
updateCanvasClip();
window.addEventListener('scroll', updateCanvasClip);

/**
 * Update active navigation link based on scroll position
 * Highlights the nav link corresponding to the current section in view
 */
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  // Find which section is currently in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // 150px offset accounts for navbar and provides better UX
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  // Update active class on navigation links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

/**
 * Smooth scroll behavior for anchor links
 * Accounts for fixed navbar height when scrolling to sections
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Subtract 100px to account for fixed navbar height
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
