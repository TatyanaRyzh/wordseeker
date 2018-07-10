import { connectViewModel } from 'resolve-redux'

import React from 'react'
import Letter from './Letter.js'


const viewModelName = 'board';
const aggregateId = '*';

const SIZE = 12;
const LETTER_SIZE = 6.1;
const DIMENTION = "vh";


function defineForm(points) {
    let firstX = points[0].x;
    let firstY = points[0].y;
    let secondX = points[1].x;
    let secondY = points[1].y;

    let direction = "positive";
    let angle = 90;

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
    return { direction: direction, angle: angle };
}

function selectWord(word, index) {
    let points = word.coords;
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
            marginX = LETTER_SIZE;
        }
    }

    angle = angle === 90 ? 0 : angle;
    translateX = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateX + " - " + marginX + DIMENTION + ")";
    translateY = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateY + " - " + marginY + DIMENTION + ")";

    return (<div className="word" key={index}
        style={{
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

const Board = ({ board, selectedWords }) => {
    let letters = [];
    let selectedWordsMarkup = [];

    if (!Array.isArray(board)) return null;

    for (let cell = 0; cell < SIZE; cell++) {
        for (let row = 0; row < SIZE; row++) {
            letters.push(<Letter key={SIZE * cell + (row + 1)} value={board[cell][row]} />);
        }
    }

    for (let i = 0; i < selectedWords.length; i++) {
        selectedWordsMarkup.push(selectWord(selectedWords[i], i));
    }

    return (
        <div className="board">
            {letters}
            {selectedWordsMarkup}
        </div>
    )
}

const mapStateToProps = state => ({
    viewModelName,
    aggregateId,
    board: !!state.viewModels[viewModelName][aggregateId]
        ? state.viewModels[viewModelName][aggregateId].board
        : null,
    selectedWords: [
        { coords: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }], isMine: true }, //hor pos
        { coords: [{ x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 3 }], isMine: false }, // hor neg
        { coords: [{ x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }], isMine: true }, //ver pos
        { coords: [{ x: 9, y: 4 }, { x: 9, y: 3 }, { x: 9, y: 2 }, { x: 9, y: 1 }], isMine: false }, // ver neg
        { coords: [{ x: 6, y: 5 }, { x: 7, y: 6 }, { x: 8, y: 7 }, {x: 9, y: 8}, {x: 10, y: 9}], isMine: true }, //45 pos
        { coords: [{ x: 10, y: 10 }, { x: 9, y: 9 }, { x: 8, y: 8 }], isMine: false }, // 45 neg
        { coords: [{ x: 6, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 7 }, {x: 3, y: 8}, {x: 2, y: 9}], isMine: true }, //135 pos
        { coords: [{ x: 2, y: 8 }, { x: 3, y: 7 }, { x: 4, y: 6 }], isMine: false } // 135 neg
    ]
})

export default connectViewModel(mapStateToProps)(Board)
