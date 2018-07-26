export default {
    Init: () => ([]),
    /*SEND_MESSAGE: (state, event) => {
      return {
        ...state,
        [event.aggregateId]: {
            text: event.payload.text, 
            time: event.payload.time,
            username: event.payload.username
        }
      }
    }*/
    SEND_MESSAGE: (state, event) => {
      const messages = [...state];
      messages.push({
        text: event.payload.text, 
        time: event.payload.time,
        username: event.payload.username
      })
      return messages
    }
}