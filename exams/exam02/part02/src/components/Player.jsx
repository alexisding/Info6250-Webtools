import React from 'react';

const Player = ({player, secret}) => {
  return (
    <div className="player">
      <h2>{player}</h2>
      <h2>Secret word: <span className="secret">{secret}</span></h2>
    </div>
  );
};

export default Player;
