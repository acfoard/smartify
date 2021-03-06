const key = [`?key=6abb23cc-f20a-4a93-b5fe-cafee8b78d5b` , `?key=9b4c0aa8-af73-492c-89ef-9edb3067b787`];
const baseURL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/';
let keyIndex = '1'

const synonyms = {};

const changeKeyIndex = function() {
    if (keyIndex === '0') {
        keyIndex = '1'
    } else {
        keyIndex = '0'
    };
};

const wordReplacement = function (keyWord) {
    changeKeyIndex();
    return $.ajax({
        url: baseURL + keyWord + key[keyIndex],
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

const renderResponse = function( string ) {
    cleanText = string.replace(/<\/?[^>]+(>|$)/g, "");
    $('.typing-indicator-li').remove();
    const msgHTML = `<li>
    <div class="message-block col s12 valign-wrapper">
        <div class="message-bubble response-msg">
            <p>${string}</p>
        </div>
        <div 
        style="margin:0 5px" class="button valign-wrapper"> <img height="15" width="15" src="icons/twitterLogo.svg" alt="twitter icon"><a style="color:#1DA1F2; text-decoration:none; margin:0 5px;" target="_blank" href="https://twitter.com/intent/tweet?text=${cleanText}" data-size="large"> Tweet This!</a>
        </div>
    </div>
  <li>`;
    $('.conversation').append(msgHTML);
    scrollToBottom(); // scroll conversation to bottom 
    console.log(`renderResponse successfully called for ${string}`)
  };


const listReplacement = function () {
    const words = getWordsToChange();
    const promises = [];
    for (let i = 0; i < words.length; i++) {
        const promise = wordReplacement(words[i].word);
        promises.push(promise);
    }
    console.log("promises = ", promises);
    Promise.all(promises).then(function (wordResponses) {
        wordResponses.forEach(function (response, i) {
            if (!synonyms[words[i].word]) {
                synonyms[words[i].word] = {
                    verbs: [],
                    adjectives: [],
                }
            }
            console.log('response = ', response);
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
        console.log(synonyms);
        getRandWord(words, synonyms);
        newSentence = sentenceString.join(" ");
        renderResponse( newSentence );
    });
};

const getRandWord = function(origArr, returnObj) {
    for (let i=0; i<origArr.length; i++) {
        const word = origArr[i].word;
        let newWord = word;
        if (origArr[i].isVerb === true) {
            const verbTense = origArr[i].tense
            const verbSynonyms = returnObj[word].verbs;
            let count = 0;
            while (verbSynonyms.length > 0 && newWord === word || newWord === '' && count < verbSynonyms.length) {
                count++;
                const randIndex = Math.floor(Math.random()*verbSynonyms.length);
                const baseWord = verbSynonyms[randIndex];
                newWord = changeTense(word, verbTense, baseWord);
            }
        } else {
            const adjSynonyms = returnObj[word].adjectives;
            let count = 0;
            while (adjSynonyms.length > 0 && newWord === word && count < adjSynonyms.length) {
                count++;
                const randIndex = Math.floor(Math.random()*adjSynonyms.length);
                newWord = adjSynonyms[randIndex];
            }

        };
        wordReplace(word, newWord, i);
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
        if (origWord.endsWith("s")) {
            tempVerb = data.verbs().toPresentTense();
            changedVerb = tempVerb.out("normal");
        } else {
            tempVerb = data.verbs();
            changedVerb = tempVerb.out("normal");
        }
    } 
    return changedVerb;
};

const wordReplace = function (oldWord, newWord, index) {
    newWord = `<span id = ${index} class='replacedWord' data-old-word=${oldWord}>${newWord}</span>`;
    var index = sentenceString.findIndex(function (value) {
        return value.toLowerCase() === oldWord.toLowerCase();
    });
    if (index !== -1) {
        sentenceString[index] = newWord;
    }
}