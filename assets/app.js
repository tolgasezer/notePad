const addNoteBtn = document.querySelector('.notes_add');
const notesListArea = document.querySelector('.notes_list');
const notesListEl = document.querySelector('.notes_list-item');
let title = 'something';
let body= 'something different';
let notes = [];

/* <div class="notes_list">
                <div class="notes_list-item">
                    <div class="notes__small-title">Lecture Notes</div>
                    <div class="notes__list-item--button-group">
                        <button class="notes__arrow-up" type="button">&uarr;</button>
                        <button class="notes__arrow-down" type="button">&darr;</button>
                    </div>
                </div>
            </div> */

const createNewNote = () =>{
    const notesListItem = document.createElement('div');
    notesListItem.classList.add('notes_list-item');
    //create small title 
    const noteTitle = document.createElement('div') ;
    noteTitle.classList.add('notes__small-title');
    noteTitle.textContent=`${title}`;

    const noteBody = document.createElement('div');
    noteBody.style.display = 'none';
    noteBody.classList.add('notes__body');
    noteBody.textContent = `${body}`;

    //Create button group for the list item and arrow buttons
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('notes__list-item--button-group');

    const upArrow = document.createElement('button');
    upArrow.classList.add('notes__arrow-up');
    upArrow.textContent = '⬆';
    upArrow.setAttribute('type', 'button')
    
    const downArrow = document.createElement('button');
    downArrow.classList.add('notes__arrow-down');
    downArrow.textContent = '⬇';
    upArrow.setAttribute('type', 'button')

    btnGroup.appendChild(upArrow);
    btnGroup.appendChild(downArrow);
    notesListItem.appendChild(noteTitle);
    notesListItem.appendChild(noteBody);
    notesListItem.appendChild(btnGroup);
    notesListArea.appendChild(notesListItem)

    

};

let selectedNote = null;
const notesClickHandler = (event) => {
    const selectedNote = event.target.closest('.notes_list-item');
    
    if(!selectedNote){return};
    
    selectEl(selectedNote);
    showFullNote(selectedNote);

};

const selectEl = (target) => {
  if (!target.classList.contains("notes__arrow-up") && !target.classList.contains("notes__arrow-down")) {
    if (selectedNote) {
      selectedNote.classList.remove("selected");
    }
    target.classList.add("selected");
    selectedNote = target;
  } else {
    if (selectedNote) {
      selectedNote.classList.remove("selected");
      selectedNote = null;
    }
  }
};

const showFullNote = (target)=> {
    const title = document.querySelector('h1');
    const body = document.querySelector('p');
    title.textContent = target.querySelector('.notes__small-title').textContent;
    body.textContent = target.querySelector('.notes__body').textContent;
    

};



notesListArea.addEventListener('click',notesClickHandler)
addNoteBtn.addEventListener('click',createNewNote);