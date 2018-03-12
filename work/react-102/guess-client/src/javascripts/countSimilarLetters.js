export const countSimilarLetters = (guessWord, baseWord) => {
	let count = 0;
	let baseArr = baseWord.split('');
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
};