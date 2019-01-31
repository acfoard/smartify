const sentence = "When I became President, ISIS was out of control in Syria & running rampant. Since then tremendous progress made, especially over last 5 weeks. Caliphate will soon be destroyed, unthinkable two years ago. Negotiating are proceeding well in Afghanistan after 18 years of fighting";

const candidates = [];
const selectedWords = [];
const getCandidates = function() {
    const data = nlp(sentence);
    //Get adejctives and store as array
    const adjReturn = data.adjectives();
    const adjectives = [];
    for (let i=0; i<adjReturn.list.length; i++) {
        adjectives.push(adjReturn.list[i].terms[0].normal);
    }

    //Get verbs and store as object w/ word & tense
    const verbReturn = data.verbs().data();
    const verbs = [];
    for (let i=0; i<verbReturn.length; i++) {
        let verb = verbReturn[i].parts.verb;
        let tense = verbReturn[i].interpret.tense;
        let verbObj = {
            word: verb,
            tense: tense,
        };
        verbs.push(verbObj);
    }

    //Combine verbs.word & adjectives to give us candidates for change
    for (let i=0; i<adjectives.length; i++) {
        candidates.push(adjectives[i]);
    }
    for (let i=0; i<verbs.length; i++) {
        candidates.push(verbs[i].word);
    }
    console.log(candidates);
    return candidates;
}

const getWordsToChange = function() {
    getCandidates();
    let selected = [];
    if (candidates.length < 6) {
        selectedWords = candidates;
    } else { 
        const shuffled = candidates.sort(() => 0.5 - Math.random());
        selected = shuffled.slice(0, 5);
        selectedWords.push(selected);        
    }
}
console.log(selectedWords);

getWordsToChange();