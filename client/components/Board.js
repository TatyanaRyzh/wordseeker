import React from 'react'
import ReactDOM from 'react-dom'
import Letter from './Letter.js'

const size = 12;
let letters = [];

function defenitionForm(points) {
    if (points[0].x == points[1].x && points[0].y < points[1].y) {
        return "vertical+"
    } else if (points[0].x < points[1].x && points[0].y == points[1].y) {
        return "horizontal+"
    } else if (points[0].x == points[1].x && points[0].y > points[1].y) {
        return "vertical-"
    } else if (points[0].x > points[1].x && points[0].y == points[1].y) {
        return "horizontal-"
    }
}

function select(points) {
    switch (defenitionForm(points)) {
        case "vertical+":
            return (<div className="word"
                style={{
                    position: "absolute",
                    width: "calc(" + 4 * (points[points.length - 1].x - points[0].x + 1) + "vw - 20px)",
                    height: 6 * (points[points.length - 1].y - points[0].y + 1) + "vh",
                    backgroundColor: "#3c4da9",
                    borderRadius: "30px",
                    opacity: "0.35",
                    transform: "translate(calc(4vw * " + points[0].x + " + 10px), calc(6vh * " + points[0].y + "))"
                }}>
            </div>);
        case "vertical-":
            return (<div className="word"
                style={{
                    position: "absolute",
                    width: "calc(" + 4 * (points[points.length - 1].x - points[0].x + 1) + "vw - 20px)",
                    height: 6 * (points[0].y - points[points.length - 1
                    ].y + 1) + "vh",
                    backgroundColor: "#3c4da9",
                    borderRadius: "30px",
                    opacity: "0.35",
                    transform: "translate(calc(4vw * " + points[points.length - 1].x + " + 10px), calc(6vh * " + points[points.length - 1].y + "))"
                }}>
            </div>);
        case "horizontal+":
            return (<div className="word"
                style={{
                    position: "absolute",
                    width: 4 * (points[points.length - 1].x - points[0].x + 1) + "vw",
                    height: 6 * (points[points.length - 1].y - points[0].y + 1) + "vh",
                    backgroundColor: "#3c4da9",
                    borderRadius: "30px",
                    opacity: "0.35",
                    transform: "translate(calc(4vw * " + points[0].x + "), calc(6vh * " + points[0].y + "))"
                }}>
            </div>);
        case "horizontal-":
            return (<div className="word"
                style={{
                    position: "absolute",
                    width: 4 * (points[0].x - points[points.length - 1].x + 1) + "vw",
                    height: 6 * (points[points.length - 1].y - points[0].y + 1) + "vh",
                    backgroundColor: "#3c4da9",
                    borderRadius: "30px",
                    opacity: "0.35",
                    transform: "translate(calc(4vw * " + points[points.length - 1].x + "), calc(6vh * " + points[points.length - 1].y + "))"
                }}>
            </div>);
        default:
            break;
    }

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
        let board = this.props.board;
        let points = this.props.points;
        let points2 = this.props.points2;
        let test = this.props.test;

        for (let cell = 0; cell < size; cell++) {
            for (let row = 0; row < size; row++) {
                if (cell === points[0].y && row === points[0].x) {
                    letters.push(<Letter key={size * cell + (row + 1)} value={board[cell][row]} points={points} />);
                } else {
                    letters.push(<Letter key={size * cell + (row + 1)} value={board[cell][row]} />);
                }
            }
        }
        let selectedWords = [];
        for (let num = 0; num < 4; num++) {
            selectedWords.push(select(test[num]));
        }

        return (
            <div className="board">
                {letters}
                {selectedWords}
                {console.log(selectedWords)}
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
            <Board board={arr} points2={points2} points={points} test={test}/>
        </div>
    )
}
