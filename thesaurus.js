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

const renderResponse = function( string ) {
    $('.typing-indicator-li').remove();
    const msgHTML = `<li>
    <div class="message-block col s12 valign-wrapper">
        <div class="message-bubble response-msg">
            <p>${string}</p>
        </div>
        <div 
        style="margin:0 5px" class="button valign-wrapper"> <img height="15" width="15" src="Twitter_Social_Icon_Rounded_Square_Color.svg" alt="twitter icon"><a style="color:#1DA1F2; text-decoration:none; margin:0 5px;" target="_blank" href="https://twitter.com/intent/tweet?text=${string}" data-size="large"> Tweet This!</a>
        </div>
    </div>
  <li>`;
    $('.conversation').append(msgHTML);
    scrollToBottom(); // scroll conversation to bottom 
    console.log(`renderResponse successfully called for ${string}`)
  };


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
            console.log(synonyms)
        });
        getRandWord(words, synonyms);
        newSentence = sentenceString.join(" ");
        console.log ('new sentence = ', newSentence );
        renderResponse( newSentence );
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
        console.log(word, newWord);
        wordReplace(word, newWord);
    }
};

const changeTense = function(origWord, verbTense, verb) {
    const data = nlp(verb);
    let changedVerb = '';
    console.log(data.debug(), data.verbs());
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

const wordReplace = function (oldWord, newWord) {
    console.log(sentenceString);
    var index = sentenceString.findIndex(function (value) {
        return value.toLowerCase() === oldWord.toLowerCase();
    });
    console.log(index, oldWord)
    if (index !== -1) {
        sentenceString[index] = newWord;
    }
    console.log(sentenceString);
}

