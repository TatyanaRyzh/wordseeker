const initialState = {
    text: ''
}

const chat = function (state = initialState, action) {
    switch (action.type) {
        case 'SendMessage':{  
            return {
                ...state,
                text: action.text
            };
        }
        default: {
            return state
        }
    }
}

export default chat