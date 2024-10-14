document.addEventListener('DOMContentLoaded', () => {
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
    }

    showSection('home');

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    const saveNoteButton = document.getElementById('save-note');
    const repoInput = document.getElementById('repo-input');
    const observationInput = document.getElementById('observation-input');
    const notesList = document.getElementById('notes-list');

    // Load saved notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => createNoteCard(note.repoName, note.observation));
    }

    // Save notes to localStorage
    function saveNotes() {
        const notes = [];
        notesList.querySelectorAll('.note-card').forEach(noteCard => {
            const repoName = noteCard.querySelector('h4').textContent.replace('Repository: ', '').trim();
            const observation = noteCard.querySelector('p').textContent.replace('Observation: ', '').trim();
            notes.push({ repoName, observation });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Create a note card
    function createNoteCard(repoName, observation) {
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

    // Handle the save note button click
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

    // Load notes on page load
    loadNotes();
});
