// Before Twilio can send your application webhook requests, you'll need to make your 
// application accessible over the Internet. While you can do that in any number of ways, 
// we recommend a tool called ngrok, which gives your local development server a publicly accessible URL. 

// now let's try dynamic replies... a reply that changes with a given input body:

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser'); // needed for dynamic replies
const smartify = require('./smartify-np'); // let's see what happens.. 


const app = express();

app.use( bodyParser.urlencoded({ extended: false }) ); // needed for dynamic replies

app.post('/sms', (req, res) => {
    const incomingMsg = req.body.Body;
    const reply = function(newSentence) {
        const twiml = new MessagingResponse();  
        twiml.message( newSentence );
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    };  

    smartify.getResponse( incomingMsg , reply);
});

http.createServer(app).listen(1337, () => {
    console.log( 'Express server listening on port 1337' );
});





// to launch the server do both of these in different tabs in the terminal
// node server.js
 // &
 // ./ngrok http 1337   ***note: might need to reset the http address on twilio for the number 

