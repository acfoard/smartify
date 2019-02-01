// input box character counter
$(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });

// sidenav
$(document).ready(function(){
 $('.sidenav').sidenav();
});

// modal
$(document).ready(function(){
 $('.modal').modal();
});

// fades out welcome message
// $("#welcomeText").delay(2000).fadeOut(2000);


// onSubmit => runInput(string) take in and save input message from the input form
const runInput = function(e) {
  e.preventDefault;
  const inputString = $('.inputString').val().trim(); // save val() and trim();
  $('.inputString').val(''); // sets input back to empty
// validate string
  switch ( inputString ) {
    case '': 
      alert('Please enter text before hitting submit');
      break;
    case inputString.length > 260: 
      alert('Please limit your input text to 260 characters');
      break;
    default:
      console.log( inputString );
      renderInput( inputString );
      // renderTypingIndicator(); // while response='';
      getResponse( inputString );
  };
}


const renderInput = function( string ) {
  const msgHTML = `<li>
  <div class="message-block col s12">
      <div class="message-bubble input-msg">
          <p>${string}</p>
      </div>
  </div>
<li>`;
  $('.conversation').append(msgHTML);
  scrollToBottom();
};

const getResponse = function ( string ) {
  console.log(`getResponse successfully called for ${string}`)
  renderResponse( string )
};

const renderResponse = function( string ) {
  // create HTML w/ twitter button
  const msgHTML = `<li>
  <div class="message-block col s12">
      <div class="message-bubble response-msg">
          <p>${string + 'some new words'}</p>
      </div>
  </div>
<li>`;
  $('.conversation').append(msgHTML);
  scrollToBottom(); // scroll conversation to bottom 
  console.log(`renderResponse successfully called for ${string}`)
};



// Make the chat show most recent bubbles by default (auto scroll to bottom)
const scrollToBottom = function() {
  console.log('convo scroll height', document.querySelector(".conversation").scrollHeight)
  console.log('window scroll height', document.querySelector("#conversationWindow").scrollHeight)
  // $('.conversation').scrollTop = $('.conversation').scrollHeight;
  const element = document.getElementById("conversation");
  element.scrollIntoView();
  element.scrollIntoView(false);
  element.scrollIntoView({block: "end"});
  element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}



// Add event listener to form to run runInput() on 'click' or 'enter'
$('#inputForm').on('submit', runInput);

// Get the input field
var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
$('.input-field').on("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    $("#submitBtn").click();
  }
});