import React from 'react';

const GameList = ({games}) => {
  return (
    <div>
      <h2>Your Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;