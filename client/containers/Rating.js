import React from 'react'
import { connectViewModel } from 'resolve-redux'


const viewModelName = 'rating';
const aggregateId = '*';

let ratingAppearing = false;
let isFirstTime = true;

function getLetters(userName){
    if (!userName) return;
    let arr = userName.split(" ");
    if (arr[1]) return (arr[0][0] + arr[1][0]).toUpperCase();
    return arr[0][0].toUpperCase();
}
function getTopUsers(arr, myId){
    let list = [];
    let length = arr.length > 10 ? 10 : arr.length;
    for (let i = 0; i < length; i++){
        let userName = arr[i].username;
        let divClass = "participant";
        if (i < 3) divClass = "participant topUser";
        if (arr[i].userId == myId) divClass = "participant me";
        list.push(<div className={divClass} key={i}><div className="place">{(i+1)}</div><div className="avatar">{getLetters(userName)}</div><div className="userName">{userName}</div><div className="userScore">{arr[i].score}</div></div>);
    }
    return list;
}

function findMyPlace(rating, myId){
    let index;
    for (let i = 0; i < rating.length; i++){
        if (rating[i].userId == myId) return (i + 1);
    }
    console.log('Ошибка! Вы отсутсвуете в рейтингу');
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
            <div className="ratingTop">
                <div className="ratingTitle">Rating</div>
                <div className="myRating">{findMyPlace(rating, userId)}</div>
            </div>
            {rating.length ? getTopUsers(rating, userId) : null}
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