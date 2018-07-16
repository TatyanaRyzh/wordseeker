export default {
    Init: () => ({}),
    CREATE_USER: (state, event) => {
      return {
        ...state,
        [event.aggregateId]: {
            userId: event.aggregateId,
            username: event.payload.username,
        }
      }
    },
    UPDATE_USERNAME: (state, event) => {
      return {
        ...state,
        [event.aggregateId]: {
          ...state[event.aggregateId],
          username: event.payload.username
        }
      }
    }
  }
  