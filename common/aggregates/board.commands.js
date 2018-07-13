import { SearchWord, CompareWord } from '../search.js'
import buildBoard from '../board.js'
import words from '../words.js'

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
  buildBoard: (state, { payload: secretKey }) => {
    if (secretKey !== 'LKNFo0e59n8t90w3n8ct90aw4nt09wa4n8rx90cn3a9r') {
      throw new Error('Operation not allowed')
    }
    return {
      type: 'BUILD_BOARD',
      payload: buildGameBoard()
    }
  },

  selectWord: (state, { payload: { userId, points } }) => {
    const word = SearchWord(state.square, points)
    if (CompareWord(state.words, word)) {
      return {
        type: 'SELECT_WORD',
        payload: {
          userId,
          points,
          word
        }
      }
    } else {
      throw new Error('Word not found')
    }
  }
}
