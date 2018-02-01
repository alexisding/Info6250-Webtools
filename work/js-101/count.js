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
    for(let i of baseWord) {
        for(let j of guess) {
            if(i === j) {
                count += 1;
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
