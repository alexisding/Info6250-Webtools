export const pickWord = (wordList) => {
  return wordList[Math.floor( Math.random() * wordList.length)];
};
