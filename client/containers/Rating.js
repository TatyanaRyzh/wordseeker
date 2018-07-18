import React from 'react'
import { connectViewModel } from 'resolve-redux'

const viewModelName = 'rating';
const aggregateId = 'root';

let ratingAppearing = false;
let isFirstTime = true;

const Rating = ({ rating, userId, inRating }) => {
    let ratingMe;

    if (inRating && !ratingAppearing) {
        ratingAppearing = true;
        ratingMe = "congratulation!"
    }

    if (!inRating && ratingAppearing) {
        ratingAppearing = false;
    }

    return (
        <div className="rating">
            {rating ? JSON.stringify(rating.slice(0, 10)) : null}
            {ratingMe}
        </div>)
}

const mapStateToProps = state => {
    let ratingList = state.viewModels[viewModelName][aggregateId];
    let userId = state.jwt.userId;
    let inRating = false;

    if (ratingList && ratingList.length) {
        ratingList.forEach((item, index) => {
            if (item.userId === userId && index <= 10) {
                inRating = true;
            }
        })
        if (isFirstTime) {
            isFirstTime = false;
            if (inRating) {
                ratingAppearing = true;
            }
        }
    }

    return {
        viewModelName,
        aggregateId,
        rating: state.viewModels[viewModelName][aggregateId],
        inRating: inRating,
        userId: state.jwt.userId
    }
}

export default connectViewModel(mapStateToProps)(Rating)
