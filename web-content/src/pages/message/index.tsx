import { useState } from "react";
import "./index.css";

const mockFriends = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const Message = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const openChat = (friend) => {
    setSelectedFriend(friend);
  };

  const closeChat = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="message-page">
      <h1>Chat Friends List</h1>
      <ul className="friends-list">
        {mockFriends.map((friend) => (
          <li key={friend.id} onClick={() => openChat(friend)}>
            {friend.name}
          </li>
        ))}
      </ul>

      {selectedFriend && (
        <div className="chat-modal" onClick={closeChat}>
          <div className="chat-content" onClick={(e) => e.stopPropagation()}>
            <h2>Chat with {selectedFriend.name}</h2>
            <p>This is a mock chat interface.</p>
            <button onClick={closeChat}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
