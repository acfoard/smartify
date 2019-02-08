const nlp = require('compromise'); // compromise js
const axios = require('axios');
const server = require('./server');

let sentence;
let newSentence = '';
let sentenceString;

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

const key = `?key=6abb23cc-f20a-4a93-b5fe-cafee8b78d5b`;
const baseURL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/';
const synonyms = {};


function mergeArrays(arrayOfArrays) {
    let flatArray = [];
    for (let i = 0; i < arrayOfArrays.length; i++) {
        flatArray = flatArray.concat(arrayOfArrays[i]);
    }
    return flatArray;
}

const wordReplacement = function (keyWord) {
    return axios.get(baseURL + keyWord + key)
    };

const listReplacement = function (reply) {
    const words = getWordsToChange();
    const promises = [];
    for (let i = 0; i < words.length; i++) {
        const thisPromise = wordReplacement(words[i].word);
        promises.push(thisPromise);
    };
    Promise.all(promises).then(function (wordResponses) {
        wordResponses.forEach(function (response, i) {
            response = response.data;
            if (!synonyms[words[i].word]) {
                synonyms[words[i].word] = {
                    verbs: [],
                    adjectives: [],
                }
            }
            for (let j = 0; j < response.length; j++) {
                if (response[j].fl === "verb") {
                    const flatSynonyms = mergeArrays(response[j].meta.syns);
                    synonyms[words[i].word].verbs = synonyms[words[i].word].verbs.concat(flatSynonyms);
                } else if (response[j].fl === "adjective") {
                    const flatSynonyms = mergeArrays(response[j].meta.syns);
                    synonyms[words[i].word].adjectives = synonyms[words[i].word].adjectives.concat(flatSynonyms);
                }
            }
        });
        getRandWord(words, synonyms);
        newSentence = sentenceString.join(" ");
        console.log('see a sentence here? ', newSentence);
        reply(newSentence);
    });
};

const getRandWord = function(origArr, returnObj) {
    for (let i=0; i<origArr.length; i++) {
        let wordType = '';
        const word = origArr[i].word;
        let newWord = '';
        if (origArr[i].isVerb === true) {
            const verbTense = origArr[i].tense
            wordType = 'verbs';
            do {
                const randIndex = Math.floor(Math.random()*returnObj[word][wordType].length);
                let baseWord = returnObj[word][wordType][randIndex];
                newWord = changeTense(word, verbTense, baseWord);
            } while (newWord === '');
        } else {
            wordType = 'adjectives';
            const randIndex = Math.floor(Math.random()*returnObj[word][wordType].length);
            newWord = returnObj[word][wordType][randIndex];
        };
        wordReplace(word, newWord);
    }
};

const changeTense = function(origWord, verbTense, verb) {
    const data = nlp(verb);
    let changedVerb = '';
    let tempVerb = '';
    if (origWord.endsWith("ing")) {
        tempVerb = data.verbs().toGerund();
        changedVerb = tempVerb.out("normal");
        changedVerb = changedVerb.replace('is ','');
    }
    else if (verbTense === "Past") {
        tempVerb = data.verbs().toPastTense();
        changedVerb = tempVerb.out("normal");
    } else {
        tempVerb = data.verbs();
        changedVerb = tempVerb.out("normal");
    } 
    return changedVerb;
};

const wordReplace = function (oldWord, newWord) {
    var index = sentenceString.findIndex(function (value) {
        return value.toLowerCase() === oldWord.toLowerCase();
    });
    if (index !== -1) {
        sentenceString[index] = newWord;
    }
}


// Exports for server
module.exports = {
    getResponse: function (inputString, replyfunc) {
        sentence= inputString;
        sentenceString = sentence.split(" ");
        const reply = replyfunc;
        listReplacement(reply);
    },
  };