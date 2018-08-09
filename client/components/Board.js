import { connectViewModel } from 'resolve-redux'
import { bindActionCreators } from 'redux'

import React from 'react'
import Letter from './Letter.js'


const viewModelName = 'board';
const aggregateId = 'root';

const SIZE = 12;
const LETTER_SIZE = 6.1;
const DIMENTION = "vh";


export function defineForm(points) {
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

export function selectWord(points, wordType, index) {
    if (!points.length) {
        return;
    }

    let form = defineForm(points);
    let angle = form.angle;
    let direction = form.direction;

    let length = points.length;
    let color;

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

    translateX = "calc(" + LETTER_SIZE + DIMENTION + " * " + translateX + " - " + marginX + DIMENTION + ")";
    translateY = "calc(" + LETTER_SIZE + DIMENTION + " * " + translateY + " - " + marginY + DIMENTION + ")";

    if (wordType === "mine") {
color = "#3c4da9";

    } else if (wordType === "process") {
        color = "#0c25ad";

    } else {
        color = "#bebebe";

    }

    return (<div className="word" key={index}
        style={{
            pointerEvents: "none",
            position: "absolute",
            width: wordWidth + DIMENTION,
            height: wordHeight + DIMENTION,
            backgroundColor: color,
            borderRadius: "30px",
            opacity: wordType === "mine" ? "0.3" : "0.5",
            transformOrigin: "left center",
            transform: "translate(" + translateX + ", " + translateY + ") rotate(" + angle + "deg)"
        }}>
    </div>);
}

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.addProcessCoord = this.addProcessCoord.bind(this);
        this.isSelectingProcess = false;
        this.currentLetterX = null
        this.currentLetterY = null

        this.state = {
            coords: [],
        }
    }

    addProcessCoord(eventType, coords) {
        let array = this.state.coords.slice();

        if (eventType === "down") {
            this.isSelectingProcess = true;
            array.push({ x: this.currentLetterX, y: this.currentLetterY });
            this.setState({ coords: array });
        }

        if (eventType === "over") {
            this.currentLetterX = coords.x;
            this.currentLetterY = coords.y;

            if (this.isSelectingProcess) {
                let form = defineForm([{ x: array[0].x, y: array[0].y }, { x: this.currentLetterX, y: this.currentLetterY }]);
                let direction = form.direction;
                let angle = form.angle;

                let arrayX = array[0].x;
                let arrayY = array[0].y;

                let horLength = this.currentLetterX - arrayX;
                let verLength = this.currentLetterY - arrayY;

                if (angle === 0 || angle === 90) {
                    array = [array[0]];

                    if (direction === "positive" && angle === 0) {
                        for (let i = 1; i <= this.currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: this.currentLetterY });
                        }
                    } else if (direction === "negative" && angle === 0) {
                        for (let i = 1; i <= arrayX - this.currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: this.currentLetterY });
                        }
                    } else if (direction === "positive" && angle === 90) {
                        for (let i = 1; i <= this.currentLetterY - arrayY; i++) {
                            array.push({ x: this.currentLetterX, y: arrayY + i });
                        }
                    } else if (direction === "negative" && angle === 90) {
                        for (let i = 1; i <= arrayY - this.currentLetterY; i++) {
                            array.push({ x: this.currentLetterX, y: arrayY - i });
                        }
                    }
                } else if (Math.abs(horLength) === Math.abs(verLength)) {
                    array = [array[0]];

                    if (direction === "positive" && angle === 45) {
                        for (let i = 1; i <= this.currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: arrayY + i });
                        }
                    } else if (direction === "negative" && angle === 45) {
                        for (let i = 1; i <= arrayX - this.currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: arrayY - i });
                        }
                    } else if (direction === "positive" && angle === 135) {
                        for (let i = 1; i <= arrayX - this.currentLetterX; i++) {
                            array.push({ x: arrayX - i, y: arrayY + i });
                        }
                    } else {
                        for (let i = 1; i <= this.currentLetterX - arrayX; i++) {
                            array.push({ x: arrayX + i, y: arrayY - i });
                        }
                    }
                }

                this.setState({ coords: array });
            }
        }

        if (eventType === "up") {
            this.props.selectWord(this.props.aggregateId, { userId: this.props.userId, points: array })
            this.isSelectingProcess = false;
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
            selectedWordsMarkup.push(selectWord(selectedWords[index].coords, this.props.userId === selectedWords[index].userId ? "mine" : "", index));
        }

        return (
            <div className="board"
                onMouseDown={() => { this.addProcessCoord("down") }}
                onMouseUp={() => { this.addProcessCoord("up") }}
            >
                {letters}
                {selectedWordsMarkup}
                {selectWord(this.state.coords, "process", index)}
            </div>
        )
    }
}

export const mapStateToProps = state => {
    const result = {
        viewModelName,
        aggregateId,
        isLoaded: false
    }

    const viewState = state.viewModels[viewModelName][aggregateId]
    if (viewState && Array.isArray(viewState.square)) {
        result.userId = state.jwt.userId;
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
