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
      
      function sorting(a, b){
        return b.score - a.score;
      }
      nextState.sort(sorting)

      for(let i = 0; i< nextState.length; i++) {
        nextState[i] = { ...nextState[i] }
      }
      return nextState
    }
}
  