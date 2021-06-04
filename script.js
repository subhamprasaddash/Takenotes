console.log('Js is linked successfully');
shownotes();
//If add note button is pressed add it to the local storage
//Working of add notes button
var addBtn= document.getElementById("addBtn");
addBtn.addEventListener("click", function (event) {
	var addTxt= document.getElementById("addTxt");
	var addTitle= document.getElementById("addTitle")
	var notes= localStorage.getItem("notes");
	if(notes == null){
		notesObj=[];
	}	
	else{
		notesObj= JSON.parse(notes);
	}
	var textObj={
		title: addTitle.value,
		text: addTxt.value
	}
	notesObj.push(textObj);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value="";
	addTitle.value="";
	shownotes();
});
// Function to show the text in local storage
// the function makes a card and shows the entered text
function shownotes () {
	var notes= localStorage.getItem("notes");
	if(notes == null){
		notesObj=[];
	}	
	else{
		notesObj= JSON.parse(notes);
	}
	var html="";
	notesObj.forEach(function(element,index) {
		html+= `
	  	    <div class="noteCard card card1  mx-2 my-2 " style="width: 18rem">
	  	      <div class="card-body">
	  	        <h5 class="card-title">${element.title}</h5>
	  	        <p class="card-text">${element.text} </p>
	  	        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
	  	      </div>
	  	    </div>`
	});
	var notesElm= document.getElementById("notes");
	if (notesObj.length != 0){
		notesElm.innerHTML= html;
	} 
	else{
		notesElm.innerHTML=`<h6>Nothing to show</h6>`;
	}
}
// working of the delete button
//delete button will clear the value stored in the local storage too

function deleteNote(index) { 
	var notes= localStorage.getItem("notes");
	if(notes == null){
		notesObj=[];
	}	
	else{
		notesObj= JSON.parse(notes);
	}
	notesObj.splice( index,1);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	shownotes();
}	

//Function for the search bar
var search= document.getElementById("srhTxt");
search.addEventListener("input",function(){
	var inputValue = search.value.toLowerCase();

	var noteCards= document.getElementsByClassName("noteCard");
	Array.from(noteCards).forEach(function(element){
		var cardTxt = element.getElementsByTagName("p")[0].innerText;
		var cardTitle = element.getElementsByTagName("h5")[0].innerText;
		if(cardTxt.includes(inputValue) || cardTitle.includes(inputValue)){
			element.style.display= "block";
		}
		else{
			element.style.display = "none";
		}
		});
});