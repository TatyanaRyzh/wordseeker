import React from 'react'
import { connectViewModel } from 'resolve-redux'

const viewModelName = 'rating';
const aggregateId = 'root';

let ratingAppearing = false;
let isFirstTime = true;

function getLetters(userName){
    let arr = userName.split(" ");
    if (arr[1]) return (arr[0][0] + arr[1][0]).toUpperCase();
    return arr[0][0].toUpperCase();
}
function getTopUsers(rating){
    let list = [];
    for (let i = 0; i < rating.length; i++){
        list.push(<div className="participant"><div className="place">{(i+1)}</div><div className="avatar">{getLetters(rating[i].userName)}</div><div className="userName">{rating[i].userName}</div></div>);
    }
    return list;
}


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

/*
{
            const list = [];
            for (let i = 0; i < rating.length; i++){
                list.push(<div className="participant"><div className="place">(i+1)</div><div className="avatar">getLetters(rating[i].userName)</div><div className="userName">rating[i].userName</div></div>);
            }
            return ${list};
        }
*/