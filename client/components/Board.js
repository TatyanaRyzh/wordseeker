import React from 'react'
import Letter from './Letter.js'

import { connectViewModel } from 'resolve-redux'

const Board = ({ board }) => {
  if (!Array.isArray(board)) return null
  const size = 12
  let letters = []

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      letters.push(<Letter key={size * i + (j + 1)} value={board[i][j]} />)
    }
  }

  return <div className="board">{letters}</div>
}

const viewModelName = 'board'
const aggregateId = '*'

const mapStateToProps = state => ({
  viewModelName,
  aggregateId,
  board: !!state.viewModels[viewModelName][aggregateId]
    ? state.viewModels[viewModelName][aggregateId].board
    : null
})

export default connectViewModel(mapStateToProps)(Board)
