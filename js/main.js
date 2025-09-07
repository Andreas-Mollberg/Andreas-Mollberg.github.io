document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const projectCards = document.querySelectorAll('.project-card');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const sections = document.querySelectorAll('.content-section');
  sections.forEach(s => s.style.display = 'none');
  document.getElementById('home').style.display = 'block';

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const id = link.getAttribute('href').slice(1);
      sections.forEach(s => s.style.display = 'none');
      const target = document.getElementById(id);
      if (target) target.style.display = 'block';

      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  projectCards.forEach(card => {
    card.addEventListener('click', e => {
      if (window.innerWidth <= 1024) {
        if (e.target.tagName === 'A') return;
        e.preventDefault();
        card.classList.toggle('clicked');
        projectCards.forEach(other => {
          if (other !== card) other.classList.remove('clicked');
        });
      }
    });
    const viewLink = card.querySelector('.view-more');
    if (viewLink) viewLink.addEventListener('click', e => e.stopPropagation());
  });
});
