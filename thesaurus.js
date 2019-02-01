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
    const promises = [];
    for (let i = 0; i < words.length; i++) {
        const promise = wordReplacement(words[i].word);
        promises.push(promise);
    }
    Promise.all(promises).then(function (wordResponses) {
        wordResponses.forEach(function (response, i) {
            console.log(words[i].word);
            if (!synonyms[words[i].word]) {
                synonyms[words[i].word] = {
                    verbs: [],
                    adjectives: [],
                }
            }
            console.log(synonyms[words[i].word]);
            for (let j = 0; j < response.length; j++) {
                if (response[j].fl === "verb") {
                    const flatSynonyms = mergeArrays(response[j].meta.syns);
                    synonyms[words[i].word].verbs = synonyms[words[i].word].verbs.concat(flatSynonyms);
                } else if (response[j].fl === "adjective") {
                    const flatSynonyms = mergeArrays(response[j].meta.syns);
                    synonyms[words[i].word].adjectives = synonyms[words[i].word].adjectives.concat(flatSynonyms);
                }
            }
            const newWord = swapWord(words[i], synonyms[words[i].word]);
            console.log(synonyms)
        });
        
    });
};

function swapWord (origWord, possibleWords) {
    let newWord;
    if (origWord.tense === "verb") {
        const newWord = randomWord(possibleWords.verbs);
    } else if () {
        /// get a random adj
    }
    return newWord;
}

listReplacement();