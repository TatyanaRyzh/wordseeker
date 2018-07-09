import React from 'react'
import Letter from './Letter.js'

const SIZE = 12;
const LETTER_SIZE = 6.1;
const DIMENTION = "vh";



function defineForm(points) {
    let firstX = points[0].x;
    let firstY = points[0].y;
    let secondX = points[1].x;
    let secondY = points[1].y;
    let position;
    let direction;

    if (firstX === secondX) {
        position = "vertical";
        direction = firstY < secondY ? "positive" : "negative";
    } else {
        position = "horizontal";
        direction = firstX < secondX ? "positive" : "negative";
    }

    return [position, direction];
}

function selectWord(points) {
    let form = defineForm(points);

    let translateX = form[1] === "positive" ? points[0].x : points[points.length - 1].x;
    let translateY = form[1] === "positive" ? points[0].y : points[points.length - 1].y;
    let wordLength = LETTER_SIZE * points.length + DIMENTION;
    
    return (<div className="word"
        style={{
            position: "absolute",
            width: form[0] === "vertical" ? LETTER_SIZE + DIMENTION : wordLength,
            height: form[0] === "vertical" ? wordLength : LETTER_SIZE + DIMENTION,
            backgroundColor: "#3c4da9",
            borderRadius: "30px",
            opacity: "0.35",
            transform: "translate(calc(" + LETTER_SIZE + DIMENTION + " * " + translateX + "), calc(" + LETTER_SIZE + DIMENTION + " * " + translateY + "))"
        }}>
    </div>);
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentDidMount() {
        window.onresize = () => {
        };
    }


    render() {
        let letters = [];
        let board = this.props.board;
        let points = this.props.points;
        let points2 = this.props.points2;
        let test = this.props.test;

        for (let cell = 0; cell < SIZE; cell++) {
            for (let row = 0; row < SIZE; row++) {
                if (cell === points[0].y && row === points[0].x) {
                    letters.push(<Letter key={SIZE * cell + (row + 1)} value={board[cell][row]} points={points} />);
                } else {
                    letters.push(<Letter key={SIZE * cell + (row + 1)} value={board[cell][row]} />);
                }
            }
        }
        let selectedWords = [];
        for (let num = 0; num < 4; num++) {
            selectedWords.push(selectWord(test[num]));
        }

        return (
            <div className="board">
                {letters}
                {selectedWords}
            </div>
        )
    }
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
    let points = [{ x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }];
    let points2 = [{ x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }];

    let test = [[{ x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }],
    [{ x: 10, y: 4 }, { x: 10, y: 3 }, { x: 10, y: 2 }, { x: 10, y: 1 }],
    [{ x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }],
    [{ x: 6, y: 11 }, { x: 5, y: 11 }, { x: 4, y: 11 }, { x: 3, y: 11 }, { x: 2, y: 11 }, { x: 1, y: 11 }]];

    return (
        <div>
            <Board board={arr} points2={points2} points={points} test={test} />
        </div>
    )
}
