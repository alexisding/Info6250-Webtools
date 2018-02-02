const baseWord = 'PARTS';
const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];

function countLetterInSamePosition(baseWord, guess) {
    let count = 0;
    for(let i = 0; i < baseWord.length; i++) {
        for(let j = 0; j < guess.length; j++) {
            if(baseWord[i] === guess[j] && i === j) {
                count += 1;
            }
        }
    }
    return count;
}

function countMatchingLetters(baseWord, guess) {
    let count = 0;
    let matchingLetters = []; // a help array to store matching letters
    let guessArr = guess.split(""); // convert string to array
    for(let baseLetter of baseWord) {
        // remove repeated letter for cases like "STREE" "TREES" -- 5 letter match, instead of 4
        if(matchingLetters.includes(baseLetter)) {
            let index = matchingLetters.indexOf(baseLetter);
            matchingLetters.splice(index, 1);
        }
        for(let guessLetter of guessArr) {
            if(baseLetter === guessLetter && !matchingLetters.includes(guessLetter)) {
                matchingLetters.push(guessLetter);
                count += 1;
                guessArr.splice(guessArr.indexOf(guessLetter), 1); // remove matched letter to avoid repeated match
            }
        }
    }
    return count;
}

function guess(baseWord, guesses) {
    for(let guess of guesses) {
        console.log(baseWord, guess, countLetterInSamePosition(baseWord, guess), countMatchingLetters(baseWord, guess));
    }
}

guess(baseWord, guesses);
