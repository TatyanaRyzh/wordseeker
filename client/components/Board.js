import { connectViewModel } from 'resolve-redux'
import { bindActionCreators } from 'redux'

import React from 'react'
import Letter from './Letter.js'


const viewModelName = 'board';
const aggregateId = 'root';

const SIZE = 12;
const LETTER_SIZE = 6.1;
const DIMENTION = "vh";


function defineForm(points) {
    let firstX = points[0].x;
    let firstY = points[0].y;

    let direction = "positive";
    let angle = 90;

    if (points.length === 1) {
        direction = "oneLetter";
    } else {
        let secondX = points[1].x;
        let secondY = points[1].y;

        if (firstX === secondX) {
            direction = firstY < secondY ? "positive" : "negative";
        } else if (firstY === secondY) {
            angle = 0;
            direction = firstX < secondX ? "positive" : "negative";
        } else if ((firstX < secondX) && (firstY < secondY)) {
            angle = 45;
            direction = "positive";
        } else if ((firstX > secondX) && (firstY > secondY)) {
            angle = 45;
            direction = "negative";
        } else if ((firstX > secondX) && (firstY < secondY)) {
            angle = 135;
            direction = "positive";
        } else if ((firstX < secondX) && (firstY > secondY)) {
            angle = 135;
            direction = "negative";
        }
    }

    return { direction: direction, angle: angle };
}

function selectWord(word, index) {
    let points = word.coords;

    if (!points.length) {
        return;
    }

    let form = defineForm(points);
    let angle = form.angle;
    let direction = form.direction;

    let length = points.length;

    let wordWidth = angle === 0 ? LETTER_SIZE * length : LETTER_SIZE;
    let wordHeight = angle === 0 ? LETTER_SIZE : LETTER_SIZE * length;

    let translateX = direction === "positive" ? points[0].x : points[length - 1].x;
    let translateY = direction === "positive" ? points[0].y : points[length - 1].y;

    let marginY = 0;
    let marginX = 0;

    if (angle === 45 || angle === 135) {
        wordWidth = Math.sqrt(Math.pow(LETTER_SIZE, 2) + Math.pow(LETTER_SIZE, 2)) * length;
        wordHeight = LETTER_SIZE;
        marginY = LETTER_SIZE / 2;
        if (angle === 135) {
            marginX = -LETTER_SIZE;
        }
    }

    angle = angle === 90 ? 0 : angle;
    translateX = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateX + " - " + marginX + DIMENTION + ")";
    translateY = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateY + " - " + marginY + DIMENTION + ")";

    return (<div className="word" key={index}
        style={{
            pointerEvents: "none",
            position: "absolute",
            width: wordWidth + DIMENTION,
            height: wordHeight + DIMENTION,
            backgroundColor: word.isMine ? "#3c4da9" : "#bebebe",
            borderRadius: "30px",
            opacity: "0.35",
            transformOrigin: "left center",
            transform: "translate(" + translateX + ", " + translateY + ") rotate(" + angle + "deg)"
        }}>
    </div>);
}

let isSelectingProcess = false
let currentLetterX;
let currentLetterY;

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.addProcessCoord = this.addProcessCoord.bind(this);

        this.state = {
            coords: [],
        }
    }

    addProcessCoord(eventType, coords) {
        let array = this.state.coords.slice();

        if (eventType === "down") {
            isSelectingProcess = true;
            array.push({ x: currentLetterX, y: currentLetterY });
            this.setState({ coords: array });
        }

        if (eventType === "over") {
            currentLetterX = coords.x;
            currentLetterY = coords.y;

            if (isSelectingProcess) {
                let form = defineForm([{ x: array[0].x, y: array[0].y }, { x: currentLetterX, y: currentLetterY }]);
                let direction = form.direction;
                let angle = form.angle;

                let arrayX = array[0].x;
                let arrayY = array[0].y;

                let horLength = currentLetterX - arrayX;
                let verLength = currentLetterY - arrayY;

                if (angle === 0 || angle === 90) {
                    array = [array[0]];

                    if (direction === "positive" && angle === 0) {
                        for (let i = 1; i <= currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: currentLetterY });
                        }
                    } else if (direction === "negative" && angle === 0) {
                        for (let i = 1; i <= arrayX - currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: currentLetterY });
                        }
                    } else if (direction === "positive" && angle === 90) {
                        for (let i = 1; i <= currentLetterY - arrayY; i++) {
                            array.push({ x: currentLetterX, y: arrayY + i });
                        }
                    } else if (direction === "negative" && angle === 90) {
                        for (let i = 1; i <= arrayY - currentLetterY; i++) {
                            array.push({ x: currentLetterX, y: arrayY - i });
                        }
                    }
                } else if (Math.abs(horLength) === Math.abs(verLength)) {
                    array = [array[0]];
                    
                    if (direction === "positive" && angle === 45) {
                        for (let i = 1; i <= currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: arrayY + i });
                        }
                    } else if (direction === "negative" && angle === 45) {
                        for (let i = 1; i <= arrayX - currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: arrayY - i });
                        }
                    } else if (direction === "positive" && angle === 135) {
                        for (let i = 1; i <= arrayX - currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: arrayY + i });
                        }
                    } else {
                        for (let i = 1; i <= currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: arrayY - i });
                        }
                    }
                }

                this.setState({ coords: array });
            }
        }

        if (eventType === "up") {
            this.props.selectWord(this.props.aggregateId, {userId: '', points: array})
            console.log("!")
            isSelectingProcess = false;
            this.setState({ coords: [] });
        }
    }

    render() {
        let props = this.props;

        let board = props.board;
        let selectedWords = props.selectedWords;
        let isLoaded = props.isLoaded;

        if (!isLoaded) {
            return (<div></div>);
        }

        let letters = [];
        let selectedWordsMarkup = [];
        let index = 0;

        if (!Array.isArray(board)) return null;

        for (let cell = 0; cell < SIZE; cell++) {
            for (let row = 0; row < SIZE; row++) {
                letters.push(<Letter
                    key={SIZE * cell + (row + 1)}
                    coords={{ x: row, y: cell }}
                    value={board[cell][row]}
                    addFunc={this.addProcessCoord}
                />);
            }
        }

        for (index; index < selectedWords.length; index++) {
            selectedWordsMarkup.push(selectWord(selectedWords[index], index));
        }

        return (
            <div className="board"
                onMouseDown={() => { this.addProcessCoord("down") }}
                onMouseUp={() => { this.addProcessCoord("up") }}
            >
                {letters}
                {selectedWordsMarkup}
                {selectWord({ isMine: true, coords: this.state.coords }, index)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const result = {
        viewModelName,
        aggregateId,
        isLoaded: false
    }

    const viewState = state.viewModels[viewModelName][aggregateId]
    if (viewState && Array.isArray(viewState.square)) {
        result.board = viewState.square
        result.selectedWords = viewState.selectedWords
        result.allWordsCount = viewState.allWordsCount
        result.isLoaded = true
    }

    return result
}


const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(props.aggregateActions, dispatch)

export default connectViewModel(mapStateToProps, mapDispatchToProps)(Board)
