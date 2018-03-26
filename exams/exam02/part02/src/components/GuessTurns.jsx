import React from 'react';

const GuessTurns = ({turns}) => {
  return (
    <h4 className="turns-status">
      Current turns:
      <span className="turns"> {turns}</span>
    </h4>
    );
};

export default GuessTurns;
