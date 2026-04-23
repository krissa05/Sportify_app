require("dotenv").config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const initializeSocket = require('./sockets/scoreSocket');

const authRoutes = require('./routes/authRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const server = http.createServer(app);

// ✅ ONE shared CORS config used everywhere
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ];
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.startsWith('http://192.168.') ||
      /\.vercel\.app$/.test(origin)  // ✅ allows ALL vercel preview URLs
    ) {
      callback(null, origin || true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// ✅ Socket.io using shared CORS config
const io = new Server(server, {
  cors: { ...corsOptions, methods: ['GET', 'POST'] },
});

app.set('io', io);
initializeSocket(io);

// ✅ Express using shared CORS config
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/matches', scoreRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    connectRedis();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection Error: ${err.message}`);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception Error: ${err.message}`);
});

startServer();

module.exports = { app, server };