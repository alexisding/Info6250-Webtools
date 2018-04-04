import React from 'react';
import config from '../config'

const GuessList = ({history}) => {
  const historyGuess = history.map(({guessWord, matched}, index) => {
    const textStyle = {
      color: config.textStyle.textStyle
    };
    return (
      <li key={index}>
        Guess: <span style={textStyle}>{guessWord}</span>;
        Letters in common: <span style={textStyle}>{matched}</span>
      </li>
    );
  });

  return (
    <div className="guess-history">
      <h3>Guess History:</h3>
      <ul className="guess-list">
        {historyGuess}
      </ul>
    </div>
  );
};

export default GuessList;
