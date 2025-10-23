import React, { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import RobotImageProfile from './assets/robot.png';
import UserImageProfile from './assets/user.png';
import './App.css';
<script type="text/babel">
    function ChatBox({ chatMessages, setchatMessages }) {
      const [inputText, setInputText] = React.useState("");

      function saveInputText(event) {
        setInputText(event.target.value);
      }

      function sendMessage() {
       const newChatMessages=[...chatMessages,{ message: inputText, sender: "user", id: crypto.randomUUID() },]
        setchatMessages(newChatMessages);
        const response=Chatbot.getResponse(inputText);
         setchatMessages([
          ...newChatMessages,
          { message: response, sender: "robot", id: crypto.randomUUID() },
        ]);
        setInputText("");
      }

      return (
        <div className="chat-box">
          <input className="input-text"
            type="text"
            placeholder="Send your message here..."
            size="30"
            value={inputText}
            onChange={saveInputText}
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      );
    }

    function ChatMessageList({ chatMessages }) {
      const chatMessageRef = React.useRef(null);
      React.useEffect(() => {
        const containerElement = chatMessageRef.current;
        if (containerElement) {
          containerElement.scrollTop = containerElement.scrollHeight;
        }
      }, [chatMessages]);
      
      return (
        <div className="chat-message-list" ref={chatMessageRef}>
          {chatMessages.map((msgObj) => (
            <ChatMessage
              key={msgObj.id}
              message={msgObj.message}
              sender={msgObj.sender}
            />
          ))}
        </div>
      );
    }

    function ChatMessage({ message, sender }) {
      return (
        <div className={sender === "user" ? "chat-message user" : "chat-message robot"}>
          {sender === "robot" && (
            <img src="./robot.png" alt="robot" width="50" />
          )}
          <span style={{ margin: "0 10px", backgroundColor: "rgb(238,238,238)", borderRadius: "10px", padding: "5px 10px" }}>{message}</span>
          {sender === "user" && <img src="./user.png" alt="user" width="50" />}
        </div>
      );
    }

    function App() {
      const [chatMessages, setchatMessages] = React.useState([
        { message: "Hello Chat.", sender: "user", id: "id1" },
        { message: "How are you.", sender: "robot", id: "id2" },
        { message: "Not bad.", sender: "user", id: "id3" },
        { message: "Great Chat.", sender: "robot", id: "id4" },
      ]);

      return (
        <div className="app">
         
          <ChatMessageList chatMessages={chatMessages} />
           <ChatBox
            chatMessages={chatMessages}
            setchatMessages={setchatMessages}
          />
        </div>
      );
    }

    const container = document.querySelector(".js-container");
    ReactDOM.createRoot(container).render(<App />);
  </script>
</body>
</html>
