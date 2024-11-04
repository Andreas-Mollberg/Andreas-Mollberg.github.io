document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const projectCards = document.querySelectorAll('.project-card');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('home').style.display = 'block';

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const targetSectionId = this.getAttribute('href').substring(1);

            sections.forEach(section => section.style.display = 'none');

            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }

            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', function(event) {
        
            if (window.innerWidth <= 1024) {
                if (event.target.tagName === 'A') {
                
                    return;
                }

                event.preventDefault();
                this.classList.toggle('clicked');

            
                projectCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('clicked');
                    }
                });
            }
        });

    
        const viewLink = card.querySelector('.view-more');
        viewLink.addEventListener('click', function(event) {
            event.stopPropagation(); 
        });
    });
});
