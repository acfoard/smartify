

let word = "run";
const key = `?key=6abb23cc-f20a-4a93-b5fe-cafee8b78d5b`;
const baseURL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/';

const wordVerb = [];
const wordAdj = [];
const wordReplacement = function (keyWord) {
    $.ajax({
        url: baseURL + keyWord + key,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            if (response[i].fl === "verb") {
                const verbList = [];
                verbList.push(keyWord);
                for (let j = 0; j < response[i].meta.syns.length; j++) {
                    for (let k = 0; k < response[i].meta.syns[j].length; k++) {
                        verbList.push(response[i].meta.syns[j][k]);
                    }
                }
                wordVerb.push(verbList);
            } else if (response[i].fl === "adjective") {
                for (let j = 0; j < response[i].meta.syns.length; j++) {
                    for (let k = 0; k < response[i].meta.syns[j].length; k++) {
                        wordAdj.push(response[i].meta.syns[j][k]);
                    }
                }
            }
        }
    });

};

const listReplacement = function () {
    getWordsToChange();
    for (let i = 0; i < selectedWords[0].length; i++) {
        wordReplacement(selectedWords[0][i]);
    }
    console.log(wordVerb, wordAdj);
};

listReplacement();

// [""0""].meta.syns[""0""][""0""]