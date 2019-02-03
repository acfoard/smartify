const sentence = "Running fast, the big dog barked.";

const getCandidates = function() {
    const candidates = [];
    const data = nlp(sentence);
    //Get adejctives and store as array
    const adjReturn = data.adjectives();
    const adjectives = [];
    for (let i=0; i<adjReturn.list.length; i++) {
        let isVerb = false;
        let adj = adjReturn.list[i].terms[0].normal;
        let adjObj = {
            isVerb: isVerb,
            word: adj,
        }
        candidates.push(adjObj);
    }

    //Get verbs and store as object w/ word & tense
    const verbReturn = data.verbs().data();
    for (let i=0; i<verbReturn.length; i++) {
        let isVerb = true;
        let verb = verbReturn[i].parts.verb;
        let tense = verbReturn[i].interpret.tense;
        let verbObj = {
            isVerb: isVerb,
            word: verb,
            tense: tense,
        };
        candidates.push(verbObj);
    }

    //Combine verbs.word & adjectives to give us candidates for change
    for (let i=0; i<adjectives.length; i++) {
        candidates.push(adjectives[i]);
    }
    return candidates;
}

const getWordsToChange = function() {
    const candidates = getCandidates();
    let selectedWords = [];
    if (candidates.length < 6) {
        selectedWords = candidates;
    } else { 
        const shuffled = candidates.sort(() => 0.5 - Math.random());
        selectedWords = shuffled.slice(0, 5);
    }
    return selectedWords;
}
