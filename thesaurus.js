const key = `?key=6abb23cc-f20a-4a93-b5fe-cafee8b78d5b`;
const baseURL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/';

const synonyms = {};
const wordReplacement = function (keyWord) {
    $.ajax({
        url: baseURL + keyWord + key,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (!synonyms[keyWord]) {
            synonyms[keyWord] = {
                verbs: [],
                adjectives: [],
            }
        }
        for (let i = 0; i < response.length; i++) {
            if (response[i].fl === "verb") {
                const flatSynonyms = mergeArrays(response[i].meta.syns);
                synonyms[keyWord].verbs = synonyms[keyWord].verbs.concat(flatSynonyms);
            } else if (response[i].fl === "adjective") {
                const flatSynonyms = mergeArrays(response[i].meta.syns);
                synonyms[keyWord].adjectives = synonyms[keyWord].adjectives.concat(flatSynonyms);
            }
        }
        console.log(synonyms)
    });
};

function mergeArrays (arrayOfArrays) {
    let flatArray = [];
    for (let i = 0; i < arrayOfArrays.length; i++) {
        flatArray = flatArray.concat(arrayOfArrays[i]);
    }
    
    return flatArray;
}

const listReplacement = function () {
    const words = getWordsToChange();
    for (let i = 0; i < words.length; i++) {
        wordReplacement(words[i]);
    }
};

listReplacement();