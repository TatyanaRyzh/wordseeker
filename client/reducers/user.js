const initialState = {
    username: 'Unknown'
}

const user = function (state = initialState, action) {
    switch (action.type) {
        case 'UsernameUpdated':{
            return {
                ...state,
                username: action.username
            };
            break;
        }
        default: {
            return state
        }
    }
}

export default user