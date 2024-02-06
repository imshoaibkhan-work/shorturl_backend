const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);


// Middleware
app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Routes
app.use('/', apiRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));