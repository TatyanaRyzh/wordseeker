export default {
    
  sendMessage(state, command) {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
      return {
          type: 'SEND_MESSAGE',
          payload: {
                text: command.payload.text,
                time: hours + ':' + minutes,
                username: command.payload.username,
                userId: command.payload.userId
          }
      }
  }
}