export default {
    createUser(state, command) {
        return {
            type: 'CREATE_USER',
            payload: {
                username: command.payload.username
            }
        }
    },
    updateUsername(state, command) {
        return {
            type: 'UPDATE_USERNAME',
            payload: {
                username: command.payload.username
            }
        }
    }
}
