import { connectViewModel } from 'resolve-redux'

import React from 'react'
import Letter from './Letter.js'

const viewModelName = 'board'
const aggregateId = 'root'

const SIZE = 12
const LETTER_SIZE = 6.1
const DIMENTION = 'vh'

function defineForm(points) {
  let firstX = points[0].x
  let firstY = points[0].y
  let secondX = points[1].x
  let secondY = points[1].y

  let direction = 'positive'
  let angle = 90

  if (firstX === secondX) {
    direction = firstY < secondY ? 'positive' : 'negative'
  } else if (firstY === secondY) {
    angle = 0
    direction = firstX < secondX ? 'positive' : 'negative'
  } else if (firstX < secondX && firstY < secondY) {
    angle = 45
    direction = 'positive'
  } else if (firstX > secondX && firstY > secondY) {
    angle = 45
    direction = 'negative'
  } else if (firstX > secondX && firstY < secondY) {
    angle = 135
    direction = 'positive'
  } else if (firstX < secondX && firstY > secondY) {
    angle = 135
    direction = 'negative'
  }
  return { direction: direction, angle: angle }
}

function selectWord(word, index) {
  let points = word.coords
  let form = defineForm(points)
  let angle = form.angle
  let direction = form.direction
  let length = points.length

  let wordWidth = angle === 0 ? LETTER_SIZE * length : LETTER_SIZE
  let wordHeight = angle === 0 ? LETTER_SIZE : LETTER_SIZE * length

  let translateX = direction === 'positive' ? points[0].x : points[length - 1].x
  let translateY = direction === 'positive' ? points[0].y : points[length - 1].y

  let marginY = 0
  let marginX = 0

  if (angle === 45 || angle === 135) {
    wordWidth =
      Math.sqrt(Math.pow(LETTER_SIZE, 2) + Math.pow(LETTER_SIZE, 2)) * length
    wordHeight = LETTER_SIZE
    marginY = LETTER_SIZE / 2
    if (angle === 135) {
      marginX = LETTER_SIZE
    }
  }

  angle = angle === 90 ? 0 : angle
  translateX =
    'calc(' +
    LETTER_SIZE +
    DIMENTION +
    '* ' +
    translateX +
    ' - ' +
    marginX +
    DIMENTION +
    ')'
  translateY =
    'calc(' +
    LETTER_SIZE +
    DIMENTION +
    '* ' +
    translateY +
    ' - ' +
    marginY +
    DIMENTION +
    ')'

  return (
    <div
      className="word"
      key={index}
      style={{
        position: 'absolute',
        width: wordWidth + DIMENTION,
        height: wordHeight + DIMENTION,
        backgroundColor: word.isMine ? '#3c4da9' : '#bebebe',
        borderRadius: '30px',
        opacity: '0.35',
        transformOrigin: 'left center',
        transform:
          'translate(' +
          translateX +
          ', ' +
          translateY +
          ') rotate(' +
          angle +
          'deg)'
      }}
    />
  )
}

const Board = ({ board, selectedWords, allWordsCount, isLoaded }) => {
  if (!isLoaded) {
    return <div />
  }

  let letters = []
  let selectedWordsMarkup = []

  for (let cell = 0; cell < SIZE; cell++) {
    for (let row = 0; row < SIZE; row++) {
      letters.push(
        <Letter key={SIZE * cell + (row + 1)} value={board[cell][row]} />
      )
    }
  }

  for (let i = 0; i < selectedWords.length; i++) {
    selectedWordsMarkup.push(selectWord(selectedWords[i], i))
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
  if (viewState && Array.isArray(viewState.square)) {
    result.board = viewState.square
    result.selectedWords = viewState.selectedWords
    result.allWordsCount = viewState.allWordsCount
    result.isLoaded = true
  }

  return result
}

export default connectViewModel(mapStateToProps)(Board)
