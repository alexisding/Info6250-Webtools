const baseWord = 'PARTS';
const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];

function countLetterInSamePosition(baseWord, guess) {
    let count = 0;
    let minLength = Math.min(baseWord.length, guess.length);
    for(let i = 0; i < minLength; i++) {
        if(baseWord[i] === guess[i]) {
            count += 1;
        }
    }
    return count;
}

function countMatchingLetters(baseWord, guess) {
    let count = 0;
    let baseArr = baseWord.split(""); // convert string to array
    for(let guessLetter of guess) {
        for(let baseLetter of baseArr) {
            if(guessLetter === baseLetter) {
                count += 1;
                baseArr.splice(baseArr.indexOf(baseLetter), 1); // remove matched letters
                break;
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
