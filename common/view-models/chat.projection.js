export default {
    Init: () => ({}),
    SEND_MESSAGE: (state, event) => {
        return {
          ...state,
          [event.aggregateId]: {
            ...state[event.aggregateId],
            message: event.payload.message
          }
        }
    },
  }