export default {
    Init: () => ([]),
    CREATE_USER: (state, event) => {
      return [
        ...state,
        {
          userId: event.aggregateId,
          username: event.payload.username,
          score: 0
        }
      ]
    },
    UPDATE_USERNAME: (state, event) => {
      
      return state.map(
        ({ userId, ...other}) => (userId === event.aggregateId) ? (
          { userId, ...other, username: event.payload.username }
        ) : (
          { userId, ...other}
        )
      )
    },
    SELECT_WORD: (state, { payload: { userId, word } }) => {
 
      const nextState = [...state]
      let currentUserRating = nextState.find(({ userId: id }) => ( userId === id ))
       if(!currentUserRating) {
         currentUserRating = { userId, score: word.length }
         nextState.push(currentUserRating)
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
  