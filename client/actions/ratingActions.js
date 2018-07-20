export function ratingAppearingUpdate(ratingAppearing){
    return {
        type: 'ratingAppearingUpdated',
        ratingAppearing: ratingAppearing
    }
}
export function isFirstTimeUpdate(isFirstTime){
    return {
        type: 'isFirstTimeUpdated',
        isFirstTime: isFirstTime
    }
}