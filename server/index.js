const express = require('express');
const cors = require('cors');
require("./db")
const messageRoutes = require('./routes/message');

const app = express();
app.use(express.json());
app.use(cors());
app.use(messageRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});