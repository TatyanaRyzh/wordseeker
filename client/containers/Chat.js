import React from 'react'

const Chat = () => (
    <div className="chat">
        <div className="chatTitle">Chat</div>

        <div className="enteryField">
            <input className="inputMessage" type="text" placeholder="Text..."/> 
            <img className="send" src="./send.svg"></img>  
        </div>
    </div>
)

export default Chat
