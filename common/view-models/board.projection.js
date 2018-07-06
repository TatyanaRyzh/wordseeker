import createBoard from '../../board'
import words from '../../words'

const createGameBoard = createBoard.bind(null, words, {
  w: 12,
  h: 12,
  directions: [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]
})

export default {
  Init: () => ({
    board: createGameBoard()
  })
}
