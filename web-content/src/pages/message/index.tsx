import { useState } from "react";
import "./index.css";

const mockFriends = [
  { id: 1, name: "Alice", lastMessage: "just now" },
  { id: 2, name: "Bob", lastMessage: "1 hour ago" },
  { id: 3, name: "Charlie", lastMessage: "2 hours ago" },
];

const Message = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [inputText, setInputText] = useState("");

  const openChat = (friend) => {
    setSelectedFriend(friend);
  };

  const closeChat = () => {
    setSelectedFriend(null);
  };

  const mockMessages = [
    { id: 1, sender: "Alice", text: "Hi there!", timestamp: "10:00 AM" },
    { id: 2, sender: "You", text: "Hello!", timestamp: "10:01 AM" },
    { id: 3, sender: "Alice", text: "How are you?", timestamp: "10:02 AM" },
  ];

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      // 这里可以添加发送消息的逻辑
      console.log("Sending message:", inputText);
      setInputText("");
    }
  };

  return (
    <div className="message-page">
      {/* <h1>Chat Friends List</h1> */}
      <ul className="chat-list">
        {mockFriends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => openChat(friend)}
            className="chat-list-item"
          >
            <img
              src="https://th.bing.com/th/id/OIP.RTUkorUEnVUk044LNJAhdQHaHa?rs=1&pid=ImgDetMain"
              alt="User Avatar"
            />
            <div className="details">
              <h5>{friend.name}</h5>
              <p>{friend.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>

      {selectedFriend && (
        <div className="chat-modal" onClick={closeChat}>
          <div className="chat-content" onClick={(e) => e.stopPropagation()}>
            <div onClick={closeChat} style={{ paddingLeft: "1rem" }}>
              返回
            </div>
            <div style={{ fontSize: "1.5rem" }}> {selectedFriend.name}</div>
            <div style={{ paddingRight: "1rem" }}>设置</div>
          </div>
          <div className="chat-body">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "You" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      message.sender === "You" ? "#FFC0CB" : "#F1F0F0",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "70%",
                  }}
                >
                  <p style={{ margin: "0", fontSize: "14px" }}>
                    {message.text}
                  </p>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="chat-input"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
