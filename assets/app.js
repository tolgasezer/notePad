const addNoteBtn = document.querySelector(".notes_add");
const notesListArea = document.querySelector(".notes_list");
const notesListEl = document.querySelector(".notes_list-item");
const upArrow = document.getElementsByClassName("notes__arrow-up");
const downArrow = document.querySelector(".notes__arrow-down");
let title = "something";
let body = "something different";
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

const newNoteFUnc = () => {
  const title = prompt("Not Basligi:");
  const description = prompt("Not Icerigi");
  const newNote = { title: title, body: description };
  notes.push(newNote);
  saveNotesLocalStorage();
  renderNotesList();
};
//html in icinde durmasin diye kendimi yersiz karmasaya soktum. Bir kolay yolu olmali
const renderNotesList = () => {
  notesListArea.innerHTML = '';
  
  notes.forEach((note, index) => {
    //index i butonlara ekleyecegim eventlistener icin kullanacagim unutma!
    const notesListItem = document.createElement("div");
    notesListItem.classList.add("notes_list-item");
    
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("notes__small-title");
    noteTitle.textContent = note.title;

    const noteBody = document.createElement("div");
    noteBody.style.display = "none";
    noteBody.classList.add("notes__body");
    noteBody.textContent = note.body;

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("notes__list-item--button-group");
    //butonlara eventlistener icin moveUp moveDown fonksiyonu yaz. shuffle a benzer olacak
    // tempval= currentindex sonra currentIndex =  currentInd+1 currentInd+1 = tempVal olacak digeri icin +1 yerine -1  
    const upArrow = document.createElement("button");
    upArrow.classList.add("notes__arrow-up");
    upArrow.textContent = "⬆";
    upArrow.setAttribute("type", "button");
   
    

    const downArrow = document.createElement("button");
    downArrow.classList.add("notes__arrow-down");
    downArrow.textContent = "⬇";
    downArrow.setAttribute("type", "button");
    if(index > 0 ){
      btnGroup.appendChild(upArrow);

    }

    if(index < notes.length -1){
      btnGroup.appendChild(downArrow);
    }
   
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("notes__delete-icon");
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("type", "button");
    notesListItem.appendChild(deleteBtn)
    
    notesListItem.appendChild(noteTitle);
    notesListItem.appendChild(noteBody);
    notesListItem.appendChild(btnGroup);
    notesListArea.appendChild(notesListItem);
    upArrow.addEventListener('click', ()=>{moveNoteUp(index)});
    downArrow.addEventListener('click', ()=>{moveNoteDown(index)});
    deleteBtn.addEventListener('click', ()=>{deleteNote(index)} );
  });
  console.log(notes);
};

const saveNotesLocalStorage = () =>{
  localStorage.setItem('notes', JSON.stringify(notes));
};

const loadNotesFromStorage = () =>{
  const storedNotes = localStorage.getItem('notes');
  if(storedNotes){
    notes = JSON.parse(storedNotes);
  }
};


let selectedNote = null;
const notesClickHandler = (event) => {
  const selectedNote = event.target.closest(".notes_list-item");

  if (!selectedNote) {
    return;
  }

  selectEl(selectedNote);
  showFullNote(selectedNote);
};

const selectEl = (target) => {
  //dusundugum gibi calismiyor
  if (
    !target.classList.contains("notes__arrow-up") &&
    !target.classList.contains("notes__arrow-down")
  ) {
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


//not icerigi goster
const showFullNote = (target) => {
  const title = document.querySelector("h1");
  const body = document.querySelector("p");
  title.textContent = target.querySelector(".notes__small-title").textContent;
  body.textContent = target.querySelector(".notes__body").textContent;
};

//notlar yukari

const moveNoteUp = (index)=> {
  if (index > 0) {
    let temp = notes[index];
    notes[index] = notes[index - 1];
    notes[index - 1] = temp;
    saveNotesLocalStorage();
    renderNotesList();
  }
}

// Notlar asagi
const moveNoteDown = (index) => {
  if (index < notes.length - 1) {
    let temp = notes[index];
    notes[index] = notes[index + 1];
    notes[index + 1] = temp;
    saveNotesLocalStorage();
    renderNotesList();
  }
}

const deleteNote = (index) =>{
  notes.splice(index, 1);
  saveNotesLocalStorage();
  renderNotesList();
}

loadNotesFromStorage();
renderNotesList();

notesListArea.addEventListener("click", notesClickHandler);
addNoteBtn.addEventListener("click", newNoteFUnc);
//upArrow.addEventListener("click", moveNoteUp(index));
//downArrow.addEventListener("click",moveNoteDown(index));

