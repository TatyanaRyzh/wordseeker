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
    let position;
    let direction;

    if (firstX === secondX) {
        position = "vertical";
        direction = firstY < secondY ? "positive" : "negative";
    } else if (firstY === secondY) {
        position = "horizontal";
        direction = firstX < secondX ? "positive" : "negative";
    } else if ((firstX < secondX) && (firstY < secondY)) {
        position = "diagonal1";
        direction =  "positive";
    } else if ((firstX > secondX) && (firstY > secondY)) {
        position = "diagonal1";
        direction =  "negative";
    } else if ((firstX > secondX) && (firstY < secondY)) {
        position = "diagonal2";
        direction =  "positive";
    } else if ((firstX < secondX) && (firstY > secondY)) {
        position = "diagonal2";
        direction =  "negative";
    }

    return [position, direction];
}

function selectWord(word) {
    let points = word.coords;
    let form = defineForm(points);

    let translateX = form[1] === "positive" ? points[0].x : points[points.length - 1].x;
    let translateY = form[1] === "positive" ? points[0].y : points[points.length - 1].y;
    let wordLength = LETTER_SIZE * points.length + DIMENTION;

    if (form[0] === "diagonal1") {
        let scaleLength = Math.sqrt(Math.pow(LETTER_SIZE, 2) + Math.pow(LETTER_SIZE, 2)) * points.length;
        let rotation = 45;
        if (form[1] === "positive") {
            return (<div className="word"
            style={{
                position: "absolute",
                width: scaleLength + DIMENTION,
                height: LETTER_SIZE + DIMENTION,
                backgroundColor: word.isMine ? "#3c4da9" : "#bebebe",
                borderRadius: "30px",
                opacity: "0.35",
                transformOrigin: "left center",
                transform: "translate(calc(6.1vh * " + translateX  + "), calc((6.1vh * " + translateY  + ") - " + LETTER_SIZE / 2 + "vh)) rotate(" + rotation + "deg)"
            }}>
        </div>);
        }
    }
        
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
        selectedWordsMarkup.push(selectWord(selectedWords[i]));
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
      /*selectedWords:  [
        { coords: [{ x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }], isMine: true },
        { coords: [{ x: 10, y: 4 }, { x: 10, y: 3 }, { x: 10, y: 2 }, { x: 10, y: 1 }], isMine: false },
        { coords: [{ x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }], isMine: true },
        { coords: [{ x: 6, y: 11 }, { x: 5, y: 11 }, { x: 4, y: 11 }, { x: 3, y: 11 }, { x: 2, y: 11 }, { x: 1, y: 11 }], isMine: false }
    ]*/
    selectedWords : [
        { coords: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }], isMine: true },
        { coords: [{ x: 4, y: 4 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 7 }], isMine: true }
    ]
  })
  
  export default connectViewModel(mapStateToProps)(Board)
