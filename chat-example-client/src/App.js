import React, { useEffect, useState, useRef } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socketRef = useRef(null);
  const apiUrl = "http://localhost:8080";
  const chatRoomId = "685b2b3215ef9e04b6152e95";

  useEffect(() => {
    fetch(`${apiUrl}/api/message/${chatRoomId}`)
      .then(res => res.json())
      .then(data => setChat(data))
      .catch(err => console.error(err));
  }, [apiUrl]);

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = new WebSocket("ws://localhost:8080/ws");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server ss");
    };

    socketRef.current.onmessage = (event) => {
      console.log("check current on message ");
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const msg = JSON.parse(reader.result);
            setChat((prev) => [...prev, msg]);
          } catch (err) {
            console.error("Invalid JSON:", reader.result);
          }
        };
        reader.readAsText(event.data);
      } else {
        try {
          const msg = JSON.parse(event.data);
          console.log("on message", msg);
          setChat((prev) => [...prev, msg]);
        } catch (err) {
          console.error("Invalid JSON string:", event.data);
        }
      }
    };
    

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
        socketRef.current.close();
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      return;
    }
    try {
      const messageObj = {
        senderId: "685b2b3215ef9e04b6152e97",
        chatRoomId,
        content: message,
        timestamp: new Date().toISOString() 
      };
      const res = await fetch(`${apiUrl}/api/message`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify (messageObj)
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


