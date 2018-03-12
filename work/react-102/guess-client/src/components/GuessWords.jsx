import React from 'react';

const GuessWords = ({guessWord, onUpdateWord, onCount, isValid}) => {
	const handleChange = (event) => {
		onUpdateWord(event.target.value.toUpperCase());
	}; 

	const onSubmit = (event) => {
		if (event.key === 'Enter' && isValid) {
			onCount();
		}
	};

	return (
		<div className="form">
			<input 
				className="guess" 
				name="guess" 
				placeholder="Please enter a 5-letter word" 
				value={guessWord}
				onChange={handleChange}
				// disabled={disabled}
				onKeyPress={onSubmit} />
		</div>
	);
};

export default GuessWords;