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
  e.preventDefault();
  const inputString = $('.inputString').val().trim(); // save val() and trim();
  $('.inputString').val(''); // sets input back to empty
// validate string
  if ( inputString.length ==0 ) {
      M.toast({html: 'Please enter a Tweet!'});
  } else if ( inputString.length > 260 ) {
      M.toast({html: 'Your Tweet is too long!'});
  } else {
      renderInput( inputString );
      // renderTypingIndicator(); // while response='';
      getResponse( inputString );
  };
};


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
  const newString = string + ' some fancy new words';
  const msgHTML = `<li>
  <div class="message-block col s12 valign-wrapper">
      <div class="message-bubble response-msg">
          <p>${newString}</p>
      </div>
      <div 
      style="margin:0 5px" class="button valign-wrapper"> <img height="15" width="15" src="Twitter_Social_Icon_Rounded_Square_Color.svg" alt="twitter icon"><a style="color:#1DA1F2; text-decoration:none; margin:0 5px;" target="_blank" href="https://twitter.com/intent/tweet?text=${newString}" data-size="large"> Tweet This!</a>
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
$('#submitBtn').on('click', runInput);


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


