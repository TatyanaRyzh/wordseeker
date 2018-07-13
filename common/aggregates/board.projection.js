import { SearchWord, CompareWord } from '../search.js'
import buildBoard from '../board.js'
import words from '../words.js'

export default {
  Init: () => ({}),
  BUILD_BOARD: (state, { payload: { square, words } }) => {
    return {
      ...state,
      square,
      words,
      selectedWords: []
    }
  },
  SELECT_WORD: (state, { payload: { userId, points, word } }) => {
    return {
      ...state,
      selectedWords: state.selectedWords.concat({ userId, points, word })
    }
  }
}
