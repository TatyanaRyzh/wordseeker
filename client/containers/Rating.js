import React from 'react'
import { connectViewModel } from 'resolve-redux'
import {ratingAppearingUpdate, isFirstTimeUpdate} from '../actions/ratingActions'

const viewModelName = 'rating';
const aggregateId = 'root';

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

const Rating = (props) => {
    if(!Array.isArray(props.rating)) { 
        return null
    }
    let inRating = false, ratingMe = null;
    let isFirstTime = props.isFirstTime;
    let ratingAppearing = props.ratingAppearing;

    if (props.rating && props.rating.length) {
        props.rating.forEach((item, index) => {
            if (item.userId === props.userId && index <= 10) {
                inRating = true;
            }
        })
        if (isFirstTime === true) {
            isFirstTime = props.isFirstTimeUpdate(false).isFirstTime;
            if (inRating) {
                ratingAppearing = props.ratingAppearingUpdate(true).ratingAppearing;
            }
        }
    }
    if (inRating && ratingAppearing === false) {
        alert("Congratulation!");
        ratingAppearing = props.ratingAppearingUpdate(true).ratingAppearing;
    }
    if (!inRating && ratingAppearing === true) {
        ratingAppearing = props.ratingAppearingUpdate(false).ratingAppearing;
    }
    
    
    return (
        <div className="rating">
            {props.rating ? JSON.stringify(props.rating.slice(0, 10)) : null}
        </div>)
}

const getRating = (state) => {
    try {
        return state.viewModels[viewModelName][aggregateId]
    } catch(err) {
        return null
    }
}

const mapStateToProps = state => ({
    viewModelName,
    aggregateId,
    rating: getRating(state),
    userId: state.jwt.userId,
    ratingAppearing: state.rating.ratingAppearing,
    isFirstTime: state.rating.isFirstTime,
})

const mapDispatchToProps = (dispatch) => ({
    ratingAppearingUpdate: (ratingAppearing) => dispatch(ratingAppearingUpdate(ratingAppearing)),
    isFirstTimeUpdate: (isFirstTime) => dispatch(isFirstTimeUpdate(isFirstTime))
})

export default connectViewModel(mapStateToProps, mapDispatchToProps)(Rating)

/*
{
            const list = [];
            for (let i = 0; i < rating.length; i++){
                list.push(<div className="participant"><div className="place">(i+1)</div><div className="avatar">getLetters(rating[i].userName)</div><div className="userName">rating[i].userName</div></div>);
            }
            return ${list};
        }
*/