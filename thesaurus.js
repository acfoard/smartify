const key = `?key=6abb23cc-f20a-4a93-b5fe-cafee8b78d5b`;
const baseURL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/';

const synonyms = {};
const wordReplacement = function (keyWord) {
    return $.ajax({
        url: baseURL + keyWord + key,
        method: "GET"
    })
};

function mergeArrays(arrayOfArrays) {
    let flatArray = [];
    for (let i = 0; i < arrayOfArrays.length; i++) {
        flatArray = flatArray.concat(arrayOfArrays[i]);
    }

    return flatArray;
}

const listReplacement = function () {
    const words = getWordsToChange();
    console.log(words);
    const promises = [];
    for (let i = 0; i < words.length; i++) {
        const promise = wordReplacement(words[i].word);
        promises.push(promise);
    }
    Promise.all(promises).then(function (wordResponses) {
        wordResponses.forEach(function (response, i) {
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
            // const newWord = swapWord(words[i], synonyms[words[i].word]);
            console.log(synonyms)
        });
        //Get random words to replace original words
        getRandWord(words, synonyms);
        //need function to change the getRandWord verbs back to their proper tense


        //need function to replace old words with new words


        //need function to render to the screen
    });
};


const getRandWord = function(origArr, returnObj) {
    for (let i=0; i<origArr.length; i++) {
        let wordType = '';
        const word = origArr[i].word;
        if (origArr[i].isVerb === true) {
            wordType = 'verbs';
            const randIndex = [Math.floor(Math.random()*returnObj[`${word}`][`${wordType}`].length)];
            let newWord = returnObj[`${word}`][`${wordType}`][randIndex];
            console.log (randIndex);
            console.log(newWord);
        } else {
            wordType = 'adjectives';
            const randIndex = [Math.floor(Math.random()*returnObj[`${word}`][`${wordType}`].length)];
            const newWord = returnObj[`${word}`][`${wordType}`][randIndex];
            console.log (randIndex);
            console.log(newWord);
        };
        
    }
};

const changeTense = function(origArray, verb) {
    const data = nlp(verb);
    const tenseChange = origArray[i].tense;
    if (tenseChange === "Past") {
        const changedVerb = data.verbs().toPastTense();
    } else if (tenseChange === "Present") {
        const changedVerb = data.verbs().toPresentTense();
    } else {
        const changedVerb = data.verbs().toFutureTense();
    };
    console.log(changedVerb);
     
};
// function swapWord (origWord, possibleWords) {
//     let newWord;
//     if (origWord.tense === "verb") {
//         const newWord = randomWord(possibleWords.verbs);
//     } else if () {
//         /// get a random adj
//     }
//     return newWord;
// }

listReplacement();