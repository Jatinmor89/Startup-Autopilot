// Typing animation
const texts = ['Full Stack Web Developer', 'MERN Stack Developer', 'React & Node.js Dev', 'Open to Internships 🚀'];
let textIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const current = texts[textIndex];
  if (isDeleting) {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; setTimeout(type, 500); return; }
  } else {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(type, 1500); return; }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.section, .project-card, .skill-card, .info-card, .contact-card');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

// Mobile nav toggle
document.getElementById('navToggle')?.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '100%';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'rgba(10,10,15,0.95)';
  links.style.padding = '1rem 2rem';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});
