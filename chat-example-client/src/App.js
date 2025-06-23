import React, { useEffect, useRef, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = new WebSocket("ws://localhost:8080/ws");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socketRef.current.onmessage = (event) => {
      // If the message is a Blob, convert it to text
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setChat((prev) => [...prev, reader.result]);
        };
        reader.readAsText(event.data);
      } else {
        setChat((prev) => [...prev, event.data]);
      }
    };
    

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
     // socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.send(message);
      setMessage("");
    }
  };

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
            <strong>User:</strong> {msg}
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


