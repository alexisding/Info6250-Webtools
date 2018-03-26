const wordList = require('./wordlist');

let wordIdList = {};
let secretId = '';
let filteredList = wordList;

const wordListCode = {
  all: function() {
    filteredList = wordList;
    return wordList;
  },

  wordIdList: function() {
    return wordIdList;
  },

  idList: function() {
    let usedIds = [];
    while (usedIds.length !== wordList.length) {
      let id = Math.floor( Math.random() * wordList.length);
      if(!usedIds.includes(id)) {
        usedIds.push(id);
      }
    }
    return usedIds;
  },

  // randomly pick up a number and assign to secretId
  randomPickId: function() {
    secretId = Math.floor( Math.random() * wordList.length);
  },

  // return secrestId;
  pickedId: function() {
    return secretId;
  },

  // get secrectWord by secrectId
  pickWord: function() {
    secretWord = wordIdList[secretId];
    return secretWord;
  },

  countSimilarLetters: function(guess, secret) {
    const guessWord = guess.toUpperCase();
    const secretWord = secret.toUpperCase();
    let count = 0;
    let baseArr = secretWord.split('');
    for(let guessLetter of guessWord) {
      for(let baseLetter of baseArr) {
        if(guessLetter === baseLetter) {
          count += 1;
          baseArr.splice(baseArr.indexOf(baseLetter), 1);
          break;
        }
      }
    }
    return count;
  },

  // countSimilarLetters: function(guess, secret) {
  //   const guessWord = guess.toUpperCase();
  //   const secretWord = secret.toUpperCase();
  //   let map = new Map();
  //   for(let letter of secret) {
  //     if(!map.has(letter)) {
  //       map.set(letter, 1);
  //     } else {
  //       let count = map.get(letter) + 1;
  //       map.set(letter, count);
  //     }
  //   }
  //   let count = 0;
  //   for(let letter of guess) {
  //     if(map.has(letter) && map.get(letter) > 0) {
  //       map.set(letter, map.get(letter) - 1);
  //       count++;
  //     }
  //   }
  //   return count;
  // },

  pickGuessWord: function(guessWord, matched) {
    filteredList = wordListCode.filter(guessWord, matched);
    return filteredList[0];
  },

  filter: function(guessWord, matched) {
    let wordsLeft = [];
    for(let word of filteredList) {
      let count = wordListCode.countSimilarLetters(word, guessWord);
      if(count === matched) {
        wordsLeft.push(word);
      }
    }
    console.log("Number of qualified guess words left: " + wordsLeft.length);
    return wordsLeft;
  },

  findIdByWord: function(word) {
    for(let i = 0; i < wordList.length; i++) {
      if(word === wordList[i]) {
        return idList[i];
      }
    }
  }
};

function combineWordToId() {
  let wordId = {};
  let i = 0;
  for(let word of wordList) {
    wordId[idList[i]] = word;
    i++;
  }
  return wordId;
}

let idList = wordListCode.idList();
wordIdList = combineWordToId();

module.exports = wordListCode;
