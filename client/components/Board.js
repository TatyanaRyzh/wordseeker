import React from 'react'
import Letter from './Letter.js'


const Board = ({ board }) => {
    const size = 12;
    let letters = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            letters.push(<Letter key={size * i + (j + 1)} value={board[i][j]} />);
        }
    }

    return (
        <div className="board">
            {letters}
        </div>
    )
}

// export default Board

export default () => {
    let arr = [];
    for (let i = 0; i < 12; i++) {
        let arr2 = [];
        for (let j = 0; j < 12; j++) {
            arr2.push('a');
        }
        arr.push(arr2);
    }

    return (<Board board={arr} />)
}
