require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const nominativeRoutes = require("./routes/nominativeRoutes.js");
const internationalAthleteRoutes = require("./routes/internationalAthleteRoutes.js");
const accommodationRoutes = require('./routes/accommodationRoutes.js');
const path = require('path');

// Connect to MongoDB
connectDB();

const __dirname = path.resolve();
const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.options('*', cors());

// Body Parser
app.use(express.json());

// API Routes
app.use("/api", bookingRoutes);
app.use("/api/nominative", nominativeRoutes);
app.use("/api/international-athletes", internationalAthleteRoutes);
app.use("/api/accommodations", accommodationRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something broke!' });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
