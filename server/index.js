const express = require('express');
const http = require('http');
const WebSocket = require('ws');


const app = express();

app.use(express.json());

// Optional: Add a simple route to test HTTP
app.get('/', (req, res) => {
  res.send('Express + WebSocket server is running!');
});

// Create HTTP server and attach WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

// WebSocket chat logic
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
