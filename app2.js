// Notlar için bir dizi oluşturun
var notes = [];

// HTML elementlerini seçin
var addNoteBtn = document.getElementById("addNoteBtn");
var noteList = document.getElementById("noteList");
var noteTitle = document.getElementById("noteTitle");
var noteDescription = document.getElementById("noteDescription");

// "Not Al" düğmesine tıklama olayı dinleyicisi ekleyin
addNoteBtn.addEventListener("click", function() {
  var title = prompt("Not Başlığı:");
  var description = prompt("Not Açıklaması:");

  // Yeni not nesnesini oluşturun ve diziye ekleyin
  var newNote = { title: title, description: description };
  notes.push(newNote);

  // Not listesini güncelleyin
  renderNoteList();
});

// Notları listeye ekleme fonksiyonu
function renderNoteList() {
  noteList.innerHTML = "";

  // Her bir not için liste öğeleri oluşturun
  notes.forEach(function(note, index) {
    var li = document.createElement("li");
    var titleSpan = document.createElement("span");
    titleSpan.textContent = note.title;
    titleSpan.addEventListener("click", function() {
      showNoteDetails(index);
    });

    var upArrow = document.createElement("span");
    upArrow.textContent = "⬆";
    upArrow.addEventListener("click", function() {
      moveNoteUp(index);
    });

    var downArrow = document.createElement("span");
    downArrow.textContent = "⬇";
    downArrow.addEventListener("click", function() {
      moveNoteDown(index);
    });

    li.appendChild(titleSpan);
    li.appendChild(upArrow);
    li.appendChild(downArrow);
    noteList.appendChild(li);
  });
}

// Seçili notun detaylarını gösterme fonksiyonu
function showNoteDetails(index) {
  var selectedNote = notes[index];
  noteTitle.textContent = selectedNote.title;
  noteDescription.textContent = selectedNote.description;
}

// Notu yukarı taşıma fonksiyonu
function moveNoteUp(index) {
  if (index > 0) {
    var temp = notes[index];
    notes[index] = notes[index - 1];
    notes[index - 1] = temp;
    renderNoteList();
  }
}

// Notu aşağı taşıma fonksiyonu
function moveNoteDown(index) {
  if (index < notes.length - 1) {
    var temp = notes[index];
    notes[index] = notes[index + 1];
    notes[index + 1] = temp;
    renderNoteList();
  }
}

// Sayfa yüklendiğinde not listesini göster
window.addEventListener("load", function() {
  renderNoteList();
});
