const addNoteBtn = document.querySelector('.notes_add');
const notesListArea = document.querySelector('.notes_list');
const notesListEl = document.querySelector('.notes_list-item');
const upArrow = document.getElementsByClassName('notes__arrow-up');
const downArrow = document.querySelector('.notes__arrow-down');

const notes = [];
let title = 'something';
let body = 'something different';
let selectedNote = null;

const newNoteFUnc = () => {
  const title = prompt('Not Basligi:');
  if (!title) return;
  const description = prompt('Not Icerigi');
  const newNote = { title: title, body: description };
  if (title && description) {
    notes.push(newNote);
    saveNotesLocalStorageAndRender();
  }
};

//*********

// listeye tek not ekleme func
// rendernoteslist icindeki dongude her bir not icin listeye tek not ekleme cagrilir
//rendernotelist(){
//  notes.forEach((note) => {
//  if(isLastItem) return
//    renderNoteItem(note);
//  });
//}

//*********

const renderNotesList = () => {
  notesListArea.innerHTML = '';

  notes.forEach((note, index) => {
    //index i butonlara ekleyecegim eventlistener icin kullanacagim unutma!
    const notesListItem = document.createElement('div');
    notesListItem.classList.add('notes_list-item');

    const noteTitle = document.createElement('div');
    noteTitle.classList.add('notes__small-title');
    noteTitle.textContent = note.title;

    const noteBody = document.createElement('div');
    noteBody.style.display = 'none';
    noteBody.classList.add('notes__body');
    noteBody.textContent = note.body;

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('notes__list-item--button-group');
    //butonlara eventlistener icin moveUp moveDown fonksiyonu yaz. shuffle a benzer olacak
    // tempval= currentindex sonra currentIndex =  currentInd+1 currentInd+1 = tempVal olacak digeri icin +1 yerine -1
    if (index > 0) {
      const upArrow = document.createElement('button');
      upArrow.classList.add('notes__arrow-up');
      upArrow.textContent = '⬆';
      upArrow.setAttribute('type', 'button');
      btnGroup.appendChild(upArrow);
      upArrow.addEventListener('click', () => {
        moveNoteUp(index);
      });
    }

    if (index < notes.length - 1) {
      const downArrow = document.createElement('button');
      downArrow.classList.add('notes__arrow-down');
      downArrow.textContent = '⬇';
      downArrow.setAttribute('type', 'button');
      btnGroup.appendChild(downArrow);
      downArrow.addEventListener('click', () => {
        moveNoteDown(index);
      });
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('notes__delete-icon');
    deleteBtn.textContent = '␡';
    deleteBtn.setAttribute('type', 'button');
    btnGroup.appendChild(deleteBtn);

    notesListItem.appendChild(noteTitle);
    notesListItem.appendChild(noteBody);
    notesListItem.appendChild(btnGroup);
    notesListArea.appendChild(notesListItem);

    deleteBtn.addEventListener('click', () => {
      deleteNote(index);
    });
  });
  console.log(notes);
};

const saveNotesLocalStorageAndRender = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotesList();
};

const loadNotesFromStorage = () => {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes.push(...JSON.parse(storedNotes));
  }
  renderNotesList();
};

const notesClickHandler = (event) => {
  const selectedNote = event.target.closest('.notes_list-item');

  if (!selectedNote) {
    return;
  }

  selectEl(selectedNote);
  showFullNote(selectedNote);
};

const selectEl = (target) => {
  //dusundugum gibi calismiyor
  console.log(target.classList);
  if (!target.classList.contains('notes__arrow-up') || !target.classList.contains('notes__arrow-down')) {
    if (selectedNote) {
      selectedNote.classList.remove('selected');
    }
    target.classList.add('selected');
    selectedNote = target;
  } else {
    if (selectedNote) {
      selectedNote.classList.remove('selected');
      selectedNote = null;
    }
  }
};

//not icerigi goster
const showFullNote = (target) => {
  //id ile secmek daha iyi olabilir
  const title = document.querySelector('h1');
  const body = document.querySelector('p');
  title.textContent = target.querySelector('.notes__small-title').textContent;
  body.textContent = target.querySelector('.notes__body').textContent;
};

//notlar yukari donlar assa
const moveNoteUp = (index) => {
  if (index > 0) {
    let temp = notes[index];
    notes[index] = notes[index - 1];
    notes[index - 1] = temp;
    saveNotesLocalStorageAndRender();
  }
};

// Notlar asagi
const moveNoteDown = (index) => {
  if (index < notes.length - 1) {
    let temp = notes[index];
    notes[index] = notes[index + 1];
    notes[index + 1] = temp;
    saveNotesLocalStorageAndRender();
  }
};

const deleteNote = (index) => {
  notes.splice(index, 1);
  saveNotesLocalStorageAndRender();
};

loadNotesFromStorage();

notesListArea.addEventListener('click', notesClickHandler);
addNoteBtn.addEventListener('click', newNoteFUnc);
