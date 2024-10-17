document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initNotes();
    showSection('home');
});

function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

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

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => createNoteCard(note.repoName, note.observation));
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-card').forEach(noteCard => {
        const repoName = noteCard.querySelector('h4').textContent.replace('Repository: ', '').trim();
        const observation = noteCard.querySelector('p').textContent.replace('Observation: ', '').trim();
        notes.push({ repoName, observation });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNoteCard(repoName, observation) {
    const notesList = document.getElementById('notes-list');
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');

    noteCard.innerHTML = `
        <h4>Repository: ${repoName}</h4>
        <p>Observation: ${observation}</p>
        <button class="delete-note">Delete</button>
    `;

    notesList.appendChild(noteCard);

    const deleteButton = noteCard.querySelector('.delete-note');
    deleteButton.addEventListener('click', () => {
        notesList.removeChild(noteCard);
        saveNotes();
    });
}
