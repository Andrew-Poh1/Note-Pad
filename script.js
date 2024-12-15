//DOC elements
const noteForm = document.getElementById("noteForm");
const noteContainer = document.getElementById("notes-container");


//array to store said notes
let notes = [];

//Handle form submission
noteForm.addEventListener('submit', function (event){
    event.preventDefault(); // stops the page from submitting normally.


    // the title and content submitted
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;

    // create a notes objects and push it to array
    const note = {
        id: Date.now(), // returns the number of milliseconds that have elapsed since the Unix epoch, which is January 1, 1970 at 00:00:00 UTC. which also gives it a unique ID of sorts.
        title: title,
        content: content
    };
    notes.push(note);
    saveNotes() //save the updated notes array to local storage

    //Clear the form with built in javascript function woo
    noteForm.reset();

    //update the display
    displayNotes();
})

// Function to display the notes and create html for them
function displayNotes() {
    notesContainer.innerHTML = ''; //clear the current notes

    //Loop through the notes and create HTML for each
    notes.forEach((note) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

//last but not least delete de notes
function deleteNote(id){
    notes = notes.filter(note => note.id !== id); //notes array now equalls every note that does not have the id of the input id
    displayNotes();
    saveNotes();//save notes after delete
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////



//Local storage is seperated because I find it difficult atm and I don't want to add more files

//first things first add notes to local storage
function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

//load de notes from local storage on page load
function loadNotes(){
    const storedNotes = localStorage.getItem('notes');
    if(storedNotes){ //if stored notes is true (exists) then
        notes = JSON.parse(storedNotes); //unstringify notes array
    }
}



//on page load, aka load notes from local storage if any
loadNotes();
displayNotes();

