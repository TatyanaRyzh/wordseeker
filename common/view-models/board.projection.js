import buildBoard from '../../board'
import words from '../../words'

const buildGameBoard = buildBoard.bind(null, words, {
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
	  ...(buildGameBoard())
  })
}
