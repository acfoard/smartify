// input box character counter
$(document).ready(function () {
  $('input#input_text, textarea#textarea2').characterCounter();
});

// sidenav
$(document).ready(function () {
  $('.sidenav').sidenav();
});

// modal
$(document).ready(function () {
  $('.modal').modal();
});

// fades out welcome message
// $("#welcomeText").delay(2000).fadeOut(2000);

// onSubmit => runInput(string) take in and save input message from the input form
const runInput = function (e) {
  e.preventDefault;
  // validate string
  switch (inputString) {
    case '':
      alert('Please enter text before hitting submit');
      break;
    case inputString.length > 260:
      alert('Please limit your input text to 260 characters')
      break;
    default:
  }

  // save val() and trim();

  // renderInput() on page as a chat bubble sitting at bottom of page 

  // renderTypingIndicator()

  // call getResponse()
}




// call renderResponse


// call 





// Add event listener to form to run runInput() on 'click' or 'enter'
$('#inputForm').on('submit', runInput);
