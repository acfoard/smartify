const sentence = "When I became President, ISIS was out of control in Syria & running rampant. Since then tremendous progress made, especially over last 5 weeks. Caliphate will soon be destroyed, unthinkable two years ago. Negotiating are proceeding well in Afghanistan after 18 years of fighting";


const test = function() {
    let data = nlp(sentence);
    adjReturn = data.adjectives();
    for (i=0; i<adjReturn.list.length; i++) {
        console.log(adjReturn.list[i].terms[0].normal);
    }
    verbReturn = data.verbs().data();
    for (i=0; i<verbReturn.length; i++) {
        console.log(verbReturn[i].parts.verb);
        console.log(verbReturn[i].interpret.tense);
    }   
}


test();