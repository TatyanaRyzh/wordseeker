import React from 'react'

const Chat = () => (
    <div className="chat">
        <div className="chatTitle">Chat</div>

        <div className="messages">
            <div className="chatMessage">
                <div className="chatName">John Melton</div>
                <div className="chatText">ok
                    <div className="chatTime">18:40</div>
                </div> 
            </div>

            <div className="chatMessage myMessage">
                <div className="chatName">Author</div>
                <div className="chatText">
                    The create-resolve-app package is used to create a reSolve-based application. You can use it to get one of the examples, or create an empty application. By default, create-resolve-app generates an empty Hello World application. You can start working on your new reSolve application in just 2 minutes using npx!
                    <div className="chatTime">18:44</div>
                </div> 
            </div>

            <div className="chatMessage myMessage">
                <div className="chatName">Author</div>
                <div className="chatText">
                    The create-resolve-app package is used to create a reSolve-based application. You can use it to get one of the examples, or create an empty application. By default, create-resolve-app generates an empty Hello World application. You can start working on your new reSolve application in just 2 minutes using npx!
                    <div className="chatTime">18:44</div>
                </div> 
            </div>

            <div className="chatMessage myMessage">
                <div className="chatName">Author</div>
                <div className="chatText">
                    The create-resolve-app package is used to create a reSolve-based application. You can use it to get one of the examples, or create an empty application. By default, create-resolve-app generates an empty Hello World application. You can start working on your new reSolve application in just 2 minutes using npx!
                    <div className="chatTime">18:44</div>
                </div> 
            </div>

            <div className="chatMessage myMessage">
                <div className="chatName">Author</div>
                <div className="chatText">
                    The create-resolve-app package is used to create a reSolve-based application. You can use it to get one of the examples, or create an empty application. By default, create-resolve-app generates an empty Hello World application. You can start working on your new reSolve application in just 2 minutes using npx!
                    <div className="chatTime">18:44</div>
                </div> 
            </div>
        </div>

        <div className="enteryField">
            <input className="inputMessage" type="text" placeholder="Text..."/> 
            <img className="send" src="./send.svg"></img>  
        </div>
    </div>
)

export default Chat
