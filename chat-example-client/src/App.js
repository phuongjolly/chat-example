import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const apiUrl = "http://localhost:8080";
  const chatRoomId = "685b2b3215ef9e04b6152e95";

  useEffect(() => {
    fetch(`${apiUrl}/api/message/${chatRoomId}`)
      .then(res => res.json())
      .then(data => setChat(data))
      .catch(err => console.error(err));
  }, [apiUrl]);

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/message`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify ({
          senderId: "685b2b3215ef9e04b6152e97",
          chatRoomId,
          content: message
        })
      });
      if (!res.ok) throw new Error("Failed to send message");
    } catch(error) {
      console.error("Error sending message:", error);
    }
  }
  
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Chat App (Express + WebSocket)</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.senderId}</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Enter message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%", padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem 1rem" }}>
        Send
      </button>
    </div>
  );
}

export default App;


