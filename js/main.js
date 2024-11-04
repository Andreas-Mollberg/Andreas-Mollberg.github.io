function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }

    updateActiveLink(sectionId);
}

function updateActiveLink(sectionId) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === sectionId) {
            link.classList.add('active');
        }
    });
}

function initNotes() {
    const saveNoteButton = document.getElementById('save-note');
    const repoInput = document.getElementById('repo-input');
    const observationInput = document.getElementById('observation-input');
    const notesList = document.getElementById('notes-list');

    saveNoteButton.addEventListener('click', () => {
        const repoName = repoInput.value.trim();
        const observation = observationInput.value.trim();

        if (repoName && observation) {
            createNoteCard(repoName, observation);
            repoInput.value = '';
            observationInput.value = '';
            saveNotes();
        }
    });

    loadNotes();
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});