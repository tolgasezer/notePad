const addNoteBtn = document.querySelector('.notes_add');
const notesListArea = document.querySelector('.notes_list');
const notesListEl = document.querySelector('.notes_list-item');
console.log(notesListEl);

const createNewNote = () =>{
    const copyNotesListEl = notesListEl.cloneNode(true);
    notesListArea.append(copyNotesListEl);
};


addNoteBtn.addEventListener('click',createNewNote);