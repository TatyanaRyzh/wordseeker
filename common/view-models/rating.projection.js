export default {
    Init: () => ([]),

    SELECT_WORD: (state, { payload: { userId, word } }) => {
      const nextState = [...state]
      let currentUserRating = nextState.find(({ userId: id }) => ( userId === id ))
      if(!currentUserRating) {
        nextState.push({ userId, score: word.length })
      } else {
        currentUserRating.score += word.length
      }

      nextState.sort((a, b) => (a.score < b.score))

      for(let i = 0; i< nextState.length; i++) {
        nextState[i] = { ...nextState[i] }
      }
      console.log(nextState);
      return nextState
    }
}
  