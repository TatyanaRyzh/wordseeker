import { connectViewModel } from 'resolve-redux'

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

function selectWord(word) {
    let points = word.coords;
    let form = defineForm(points);

    let translateX = form[1] === "positive" ? points[0].x : points[points.length - 1].x;
    let translateY = form[1] === "positive" ? points[0].y : points[points.length - 1].y;
    let wordLength = LETTER_SIZE * points.length + DIMENTION;

    return (<div className="word"
        style={{
            position: "absolute",
            width: form[0] === "vertical" ? LETTER_SIZE + DIMENTION : wordLength,
            height: form[0] === "vertical" ? wordLength : LETTER_SIZE + DIMENTION,
            backgroundColor: word.isMine ? "#3c4da9" : "#bebebe",
            borderRadius: "30px",
            opacity: "0.35",
            transform: "translate(calc(" + LETTER_SIZE + DIMENTION + " * " + translateX + "), calc(" + LETTER_SIZE + DIMENTION + " * " + translateY + "))"
        }}>
    </div>);
}

const Board = ({ board, selectedWords, allWordsCount, isLoaded }) => {
	if(!isLoaded) {
		return (<div />)
	}
	
    let letters = [];
    let selectedWordsMarkup = [];

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

const mapStateToProps = state => {
	const result = {
		viewModelName,
        aggregateId,
        isLoaded: false
	}
	
	const viewState = state.viewModels[viewModelName][aggregateId]
	if(viewState && Array.isArray(viewState.square)) {
		result.board = viewState.square
		result.selectedWords = viewState.selectedWords
		result.allWordsCount = viewState.allWordsCount
		result.isLoaded = true
	}
	
	return result
}

export default connectViewModel(mapStateToProps)(Board)
