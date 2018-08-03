export default {
    createUser(state, command) {
        return {
            type: 'CREATE_USER',
            payload: {
                username: command.payload.username,
                userId: command.payload.userId
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
    },
    updateUserScore(state, command){
        return {
            type: 'UPDATE_USER_SCORE',
            payload: {
                userScore: command.payload.userScore
            }
        }
    }
}
