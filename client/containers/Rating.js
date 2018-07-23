import React from 'react'
import { connectViewModel } from 'resolve-redux'
import {ratingAppearingUpdate, isFirstTimeUpdate} from '../actions/ratingActions'

const viewModelName = 'rating';
const aggregateId = '*';

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
        if (i < 3) divClass += " topUser";
        if (arr[i].userId == myId) divClass += " me";
        list.push(<div className={divClass} key={i}><div className="place">{(i+1)}</div><div className="avatar">{getLetters(userName)}</div><div className="userName">{userName}</div><div className="userScore">{arr[i].score}</div></div>);
    }
    return list;
}

function findMyPlace(rating, myId){
    for (let i = 0; i < rating.length; i++){
        if (rating[i].userId == myId) return (i + 1);
    }
}
let test = "none";

function handleButtonClick() {
    console.log(test);
    test = 'none';
}
const Rating = (props) => {
    let inRating = false;
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
        test = "block"
        ratingAppearing = props.ratingAppearingUpdate(true).ratingAppearing;
    }
    if (!inRating && ratingAppearing === true) {
        ratingAppearing = props.ratingAppearingUpdate(false).ratingAppearing;
    }

    return (
        <div className="rating">
            <div className="ratingTop">
                <div className="ratingTitle">Rating</div>
                <div className="myRating">{findMyPlace(props.rating, props.userId)}</div>
            </div>
            {props.rating.length ? getTopUsers(props.rating, props.userId) : null}

            <div className="fixedoverlay" id="fixedoverlay" style={{display: test}} onClick={handleButtonClick}></div>
            <div className="congratulations" id="congratulations" style={{display: test}}>
            <div className="congratulations-content">
                <div className="congratulations-title">Congratulations!</div>
                <img className="reward" src="./reward.svg"></img>
                <p>Name Name</p>
                <p>Поздравляем! Вы попали в ТОП10 рейтинга!</p>
            </div>
            <div className="congratulations-share-wrapper">
                <a href="http://twitter.com/share?text=Wordseeker Game&url=" title="Share in Twitter" target="_blank" className="congratulations-share"><img className="congratulations-share-twitter" src="./twitter.svg"></img>Share in Twitter</a>
            </div>
        </div>

    </div>)
}

/*
let fixedoverlay = document.getElementById('fixedoverlay');
let congratulations = document.getElementById('congratulations');

fixedoverlay .onclick = function(){
    fixedoverlay.style.display = 'none';
    congratulations.style.display = 'none';
}

function congratulate(){
    fixedoverlay.style.display = 'block';
    congratulations.style.display = 'block';
}

*/

const mapStateToProps = state => {
    return {
        viewModelName,
        aggregateId,
        rating: state.viewModels[viewModelName][aggregateId],
        userId: state.jwt.userId,
        ratingAppearing: state.rating.ratingAppearing,
        isFirstTime: state.rating.isFirstTime,
    }
}

const mapDispatchToProps = (dispatch) => ({
    ratingAppearingUpdate: (ratingAppearing) => dispatch(ratingAppearingUpdate(ratingAppearing)),
    isFirstTimeUpdate: (isFirstTime) => dispatch(isFirstTimeUpdate(isFirstTime))
})
export default connectViewModel(mapStateToProps, mapDispatchToProps)(Rating)