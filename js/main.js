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

    saveNoteButton.addEventListener('click', () => {
        const repoName = repoInput.value.trim();
        const observation = observationInput.value.trim();

        if (repoName && observation) {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');

            noteCard.innerHTML = `
                <h4>Repository: ${repoName}</h4>
                <p>Observation: ${observation}</p>
                <button class="delete-note">Delete</button>
            `;

            notesList.appendChild(noteCard);

            repoInput.value = '';
            observationInput.value = '';

            const deleteButton = noteCard.querySelector('.delete-note');
            deleteButton.addEventListener('click', () => {
                notesList.removeChild(noteCard);
            });
        }
    });
});
