import React from 'react';

const GuessButton = ({onClick, text, disabled}) => {
  return (
    <button className="guess-button" onClick={onClick} disabled={!disabled}>{text}</button>
  );
};
export default GuessButton;