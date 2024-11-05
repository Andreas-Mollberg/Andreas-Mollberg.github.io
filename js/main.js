document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const projectCards = document.querySelectorAll('.project-card');
    let db;
    let editingNoteId = null;

    const request = indexedDB.open('notesDB', 1);

    request.onerror = function(event) {
        console.error("Database error:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        loadNotes();
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("repo", "repo", { unique: false });
        objectStore.createIndex("observation", "observation", { unique: false });
    };

    document.getElementById('save-note').addEventListener('click', function() {
        const repoInput = document.getElementById('repo-input').value;
        const observationInput = document.getElementById('observation-input').value;

        if (editingNoteId) {
            const transaction = db.transaction(["notes"], "readwrite");
            const objectStore = transaction.objectStore("notes");
            const request = objectStore.put({ id: editingNoteId, repo: repoInput, observation: observationInput });

            request.onsuccess = function() {
                editingNoteId = null;
                document.getElementById('save-note').textContent = "Save Note";
                clearInputs();
                loadNotes();
            };
        } else {
            const transaction = db.transaction(["notes"], "readwrite");
            const objectStore = transaction.objectStore("notes");
            const note = { repo: repoInput, observation: observationInput };
            const request = objectStore.add(note);

            request.onsuccess = function() {
                clearInputs();
                loadNotes();
            };
        }
    });

    function clearInputs() {
        document.getElementById('repo-input').value = '';
        document.getElementById('observation-input').value = '';
    }

    function loadNotes() {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = "";

        const transaction = db.transaction(["notes"], "readonly");
        const objectStore = transaction.objectStore("notes");

        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const note = cursor.value;
                const noteElement = document.createElement('div');
                noteElement.classList.add('note-card');
                noteElement.innerHTML = `
                    <h4>${note.repo}</h4>
                    <p>${note.observation}</p>
                    <button class="edit-note">Edit</button>
                    <button class="delete-note">Delete</button>
                `;

                noteElement.querySelector('.edit-note').addEventListener('click', function() {
                    document.getElementById('repo-input').value = note.repo;
                    document.getElementById('observation-input').value = note.observation;
                    editingNoteId = note.id;
                    document.getElementById('save-note').textContent = "Update Note";
                });

                noteElement.querySelector('.delete-note').addEventListener('click', function() {
                    const deleteTransaction = db.transaction(["notes"], "readwrite");
                    const deleteObjectStore = deleteTransaction.objectStore("notes");
                    deleteObjectStore.delete(note.id).onsuccess = function() {
                        loadNotes();
                    };
                });

                notesList.appendChild(noteElement);
                cursor.continue();
            }
        };
    }

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
