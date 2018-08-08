import React from 'react'
import { connectViewModel } from 'resolve-redux'
import {sendMessage} from '../actions/chatActions'

const viewModelName = 'chat';
const aggregateId = '*';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.input = "";
        this.state = { text: ""}
    }

    recieveText(e) {
        this.input = e.target;
        this.setState({text: e.target.value})
    }

    sendText() {
        if (this.state.text !== '') {
            this.props.sendMessage(this.props.userId, this.state.text, this.props.userName);
            this.setState({text: ''})
        }
    }   

    buttonHandler(e){
        if (e.which == 13) this.sendText();
    }

    componentDidUpdate(snapshot) {
        if (snapshot !== null) {
          const list = this.listRef.current;
          list.scrollTop = list.scrollHeight;
        }
    }

    render() {
        function getMessages(arr, myId){
            let list = [];
            for (let i = 0; i < arr.length; i++){
                let divClass = "chatMessage";
                if (arr[i].userId == myId) divClass += " myMessage";
                list.push(
                    <div className={divClass} key={i}>
                        <div className="chatName">{arr[i].username}</div>
                        <div className="chatText">{arr[i].text}
                            <div className="chatTime">{arr[i].time}</div>
                        </div>
                    </div>);
            }
            return list;
        }
        return (
            <div className="chat">
                <div className="chatTitle">Chat</div>
                <div className="messages" ref={this.listRef}>
                    {this.props.messages ? getMessages(this.props.messages, this.props.userId) : null}
                </div>

                <div className="enteryField">
                    <input className="inputMessage" type="text" placeholder="Text..." value={this.state.text} onChange={(e) => this.recieveText(e)} onKeyDown={(e) => this.buttonHandler(e)}/> 
                    <img className="send" src="./Send.svg" onClick={this.sendText.bind(this, this.props.userId)}></img>  
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        viewModelName,
        aggregateId,
        messages: state.viewModels[viewModelName][aggregateId],
        userName: state.viewModels['users'][aggregateId][state.jwt.userId] ? state.viewModels['users'][aggregateId][state.jwt.userId].username : null,
        userId: state.jwt.userId,
    }
}

function mapDispatchToProps(dispatch, { aggregateActions }){
    return {
        sendMessage: (userId, text, userName) => dispatch(aggregateActions.sendMessage(userId, {text: text, username: userName, userId: userId}))
    }
}

export default connectViewModel(mapStateToProps, mapDispatchToProps)(Chat)
