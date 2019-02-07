# Smartify
<h1> Description </h1>
  
<h3> What does Smartify Do? </h3>
  <p> Smartify is a web application that makes use of multiple web technologies. It allows a user to input text and return a 'Smartified' response. The application will take a random selection of adjectives and verbs from your input text and generate a response that makes you sound smarter! There are a few steps in between that we will discuss below.
  
 <h3> How does Smartify work? </h3>
  <ul> 
  <li>SMARTify utilizes two APIs: A Natural Language Processor called “Compromise” and Merriam-Websters’s Thesaurus API.
 </li>
  <li>Since our first initiative is to make you a better twitter user, we limit the input to 240 characters
 </li>
   <li>Twitter is 280 - we wanted to give SMARTify some cushion should it swap out smaller words for larger ones.
 </li>
 <li>Once the user inputs a message and submits it, Compromise grabs every verb and adjective that it can identify and stores it.
 </li>
   <li>If a word is identified as a verb we also store its conjugation.
 </li>
   <li>If there are 5 or less words grabbed by Compromise then the entire list gets run through the Thesaurus API.
 </li>
   <li>If there are 6 or more words then SMARTify will take a random 5 words from those selected to send to the Thesaurus.
 </li>
 <li>The Thesaurus returns a list of synonyms for each verb and adjective, we take those lists and store them in an object.
 </li>
 <li>The app then grabs a random synonym from the returned list. If the original word was identified as a verb, the app passes that word back through Compromise to conjugate it to the original word’s tense. Then we replace the words and re-render the sentence, giving you the SMARTify experience.
 </li>
 <li>Because of the way our code is set up, you can run a sentence through SMARTify over and over and rarely get a duplicate response.
 </li>
    </ul>
  
 <h3> What technologies does Smartify use? 
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>JSON</li>
    <li>Compromise(Natural Language Processor api)</li>
    <li>Merriam Webster Thesaurus(Thesaurus api)</li>
    <li>Google Materialize</li>
  </ul>
 </h3>
 
 <h3>What future development is planned for Smartify?</h3>
    <h4> Goals for the Future </h4>
    <ul>
  <li>Integrating with SMS so that you can text a string to the app and get a SMARTified text back
 </li>
  <li>Integrate with a back end so that we can use a better Natural Language Processor
 </li>
  <li>Compromise was the only NLP we could find that would work on the front end and it admittedly only covers about 80% of our language. We’re hoping that it can also help address our issues with context and meaning
 </li>
  <li>Add an option where you can interact with the replaced word and select from a list of synonyms to find the perfect synonym for your situation. 
 </li>
</ul>
