import React from 'react'
import { connectViewModel } from 'resolve-redux'
import {usernameUpdate} from '../actions/userActions'
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

function findMyPlace(rating, myId, state){
    for (let i = 0; i < rating.length; i++){
        if (rating[i].userId == myId) {
            return i
        }
    }
}

class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.state = { flagCongratulation: 'none', flagWelcome: 'none', flagFixedoverlay: 'none', text: '' }
    }

    handleButton() {
        this.setState({flagCongratulation: 'none', flagWelcome: 'none', flagFixedoverlay: 'none'});
    }

    recieveText(e) {
        this.setState({text: e.target.value})
    }

    startButton() {
        if (this.state.text === "") {
            this.props.usernameUpdate("Unknown");
        } else { 
            this.props.usernameUpdate(this.state.text);
        }
        this.handleButton();
    }

    congratulation() {
        this.setState({flagCongratulation: 'block', flagFixedoverlay: 'block'});
    }

    welcome() {
        this.setState({flagWelcome: 'block', flagFixedoverlay: 'block'});
    }

    render() {
        let props = this.props;
        let inRating = false;
        let isFirstTime = props.isFirstTime;
        let ratingAppearing = props.ratingAppearing;
        
        if (props.rating && props.rating.length) {
            props.rating.forEach((item, index) => {
                if (item.userId === props.userId && index < 10) {
                    inRating = true;
                }
            })
            if (isFirstTime === true) {
                isFirstTime = props.isFirstTimeUpdate(false).isFirstTime;
                props.rating.forEach((item) => {
                    if (item.userId === props.userId && item.score === 0) {
                        this.welcome();
                    }
                })
                if (inRating) {
                    ratingAppearing = props.ratingAppearingUpdate(true).ratingAppearing;
                }
            }
        }
        if (inRating && ratingAppearing === false) {
            this.congratulation();
            ratingAppearing = props.ratingAppearingUpdate(true).ratingAppearing;
        }
        if (!inRating && ratingAppearing === true) {
            ratingAppearing = props.ratingAppearingUpdate(false).ratingAppearing;
        }
        
        let myIndex = findMyPlace(props.rating, props.userId);
        let myName = props.rating[myIndex] ? props.rating[myIndex].username : null;

        return (
            <div className="rating">
                <div className="ratingTop">
                    <div className="ratingTitle">Rating</div>
                    <div className="myRating">#{myIndex + 1}</div>
                </div>
                {props.rating.length ? getTopUsers(props.rating, props.userId) : null}
                
                <div className="fixedoverlay" style={{display: this.state.flagFixedoverlay}} onClick={ () => this.handleButton() }></div>
                <div className="congratulations" style={{display: this.state.flagCongratulation}}>
                    <div className="congratulations-content">
                        <div className="congratulations-title">Congratulations!</div>
                        <img className="reward" src="./reward.svg"></img>
                        <p>{myName}</p>
                        <p>You are one of the Top 10 Wordseeker players!</p> 
                        <p>It's worth sharing with friends ;)</p>
                    </div>
                    <div className="congratulations-share-wrapper">
                        <a href="http://twitter.com/share?text=Wordseeker Game&url=" title="Share in Twitter" target="_blank" className="congratulations-share"><img className="congratulations-share-twitter" src="./twitter.svg"></img>Share in Twitter</a>
                    </div>
                </div>

                <div className="fixedoverlay" style={{display: this.state.flagFixedoverlay}} onClick={ () => this.handleButton() }></div>
                <div className="welcome" style={{display: this.state.flagWelcome}}>
                    <div className="welcome-content">
                        <img className="logo-2" src="./resolve-logo-2.png" alt="Resolve logo"></img>
                        <div className="welcome-title">Hello!</div>
                        <p>Welcome to the Wordseeker&mdash;a reSolve live demo!</p> 
                        <p>Introduce yourself (you can do it later).</p>
                        <input className="input-username" type="text" placeholder="Username" maxLength="15" value={this.state.text} onChange={(e) => this.recieveText(e)}/>
                    </div>
                    <div className="start-button" onClick={() => this.startButton()}>Start</div>
                </div>

        </div>)
    }
}

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
    isFirstTimeUpdate: (isFirstTime) => dispatch(isFirstTimeUpdate(isFirstTime)),
    usernameUpdate: (username) => dispatch(usernameUpdate(username))
})
export default connectViewModel(mapStateToProps, mapDispatchToProps)(Rating)