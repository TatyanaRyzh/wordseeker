import React from 'react'
import Letter from './Letter.js'


const Board = ({ board, points }) => {
    const size = 12;
    let letters = [];

    for (let cell = 0; cell < size; cell++) {
        for (let row = 0; row < size; row++) {
            if  (cell === points[0].y && row === points[0].x){
                letters.push(<Letter key={size * cell + (row + 1)} value={board[cell][row]} points={points}/>);
            } else {
                letters.push(<Letter key={size * cell + (row + 1)} value={board[cell][row]}/>);
            }
        }
    }

    return (
        <div className="board">
            {letters}
            <div className="word" 
                style={{
                    width: 4*(points[points.length-1].x - points[0].x + 1) + "vw", 
                    height: 6*(points[points.length - 1].y - points[0].y + 1) +"vh", 
                    backgroundColor: "red", 
                    opacity: "0.2", 
                    transform: "translate(calc(4vw * " + points[0].x + "), calc(6vh * " + points[0].y + ")"
                }}>
            </div>
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
    let points = [{x:3,y:4},{x:3,y:5},{x:3,y:6},{x:3,y:7}];

    return (<Board board={arr} points={points} />)
}
