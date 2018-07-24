import React from 'react'

const Chat = () => (
    <div className="chat">
        <div className="chatTitle">Chat</div>

        <div className="chatMessage">
            <div className="chatName">John Melton</div>
            <div className="chatText">ok
                <div className="chatTime">18:40</div>
            </div> 
        </div>

        <div className="chatMessage myMessage">
            <div className="chatName">John Melton</div>
            <div className="chatText">ok
                <div className="chatTime">18:40</div>
            </div> 
        </div>

        <div className="enteryField">
            <input className="inputMessage" type="text" placeholder="Text..."/> 
            <img className="send" src="./send.svg"></img>  
        </div>
    </div>
)

export default Chat
