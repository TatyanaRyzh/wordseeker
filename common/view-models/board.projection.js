export default {
  Init: () => ({}),
  BUILD_BOARD: (state, { payload: { square, words } }) => {
    return {
      ...state,
      square,
      allWordsCount: words.length,
      selectedWords: []
    }
  },
  SELECT_WORD: (state, { payload: { points, word } }) => {
    return {
      ...state,
      selectedWords: state.selectedWords.concat({ points, word })
    }
  }
}
