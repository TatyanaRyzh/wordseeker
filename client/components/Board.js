import React from 'react'
import Letter from './Letter.js'
const size = 12;
let letters = [];

for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++){
        letters.push(<Letter/>);
    }
}

const Board = () => (
  <div className="board">
    {letters}    
  </div>
)

export default Board
