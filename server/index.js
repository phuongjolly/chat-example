const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require("./db")
const messageRoutes = require('./routes/message');
const userRouters = require("./routes/user");
const InMemoryPubSub = require('./InMemoryPubSub');

const pubsub = new InMemoryPubSub()

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(messageRoutes(pubsub));
app.use(userRouters)

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//web socket connection
wss.on('connection', ws => {
    console.log('Client connected');
  
    const unsubsribe = pubsub.subscribe('685b2b3215ef9e04b6152e95', function (message) {
        ws.send(JSON.stringify(message))
    });
    
    // ws.on('message', message => {
    //   // Broadcast message to all clients
    //   wss.clients.forEach(client => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(message);
    //     }
    //   });
    // });
  
    ws.on('close', () => {
      console.log('Client disconnected');
      unsubsribe();
    });
  });
  
// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});