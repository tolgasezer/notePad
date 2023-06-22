const addNoteBtn = document.querySelector('.notes_add');
const notesListArea = document.querySelector('.notes_list');
const notesListEl = document.querySelector('.notes_list-item');


document.createElement('div');


const createNewNote = () =>{
    const copyNotesListEl = notesListEl.cloneNode(true);
    notesListArea.append(copyNotesListEl);
};


const notesClickHandler = (event) => {
    const selectedNote = event.target.closest('.notes_list-item');
    if(!selectedNote){return};
    selectEl(selectedNote);

};

const selectEl = (target) =>{
    target.classList.add('selected');
}



notesListArea.addEventListener('click',notesClickHandler)
addNoteBtn.addEventListener('click',createNewNote);