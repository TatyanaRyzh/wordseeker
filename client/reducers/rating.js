const initialState = {
    ratingAppearing: false,
    isFirstTime: true
}

const rating = function(state = initialState, action) {
    switch (action.type) {
        case "ratingAppearingUpdated":{
            if(state.ratingAppearing === action.ratingAppearing) {
                return state
            }
            return {
                ...state,
                ratingAppearing: action.ratingAppearing
            }
        }
        case "isFirstTimeUpdated":{
            if(state.isFirstTime === action.isFirstTime) {
                return state
            }
            return {
                ...state,
                isFirstTime: action.isFirstTime
            }
        }    
        default: {
            return state
        }
    }
}

export default rating