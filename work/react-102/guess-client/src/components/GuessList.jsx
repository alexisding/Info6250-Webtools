import React from 'react';
import config from '../guess-config'

const GuessList = ({history}) => {
	const historyGuess = history.map(({guessWord, similarLetters}, index) => {
		const textStyle = {
			color: config.textStyle.textStyle
		};
		return (
			<li key={index}>
				Your guess: <span style={textStyle}>{guessWord}</span>; 
				Letters in common: <span style={textStyle}>{similarLetters}</span>
			</li>
		);
	});

	return (
		<div className="guess-history">
			<h3>Your Guess History:</h3>
			<ul className="guess-list">
				{historyGuess}
			</ul>
		</div>
	);
};

export default GuessList;