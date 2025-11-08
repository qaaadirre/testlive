const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8 // 100 MB for video chunks
});

// Serve static files
app.use(express.static('public'));

// Store broadcast state
let broadcastState = {
  isLive: false,
  title: 'Live Stream',
  description: 'Welcome to the live stream!',
  viewers: 0,
  messages: [],
  likes: 0,
  adminSocketId: null
};

// Track connected viewers
let viewers = new Set();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current state to new connection
  socket.emit('initial-state', broadcastState);

  // Handle admin authentication
  socket.on('admin-login', (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      broadcastState.adminSocketId = socket.id;
      socket.emit('admin-authenticated', true);
      socket.isAdmin = true;
      console.log('Admin authenticated:', socket.id);
    } else {
      socket.emit('admin-authenticated', false);
    }
  });

  // Handle stream start
  socket.on('start-stream', (data) => {
    if (socket.isAdmin) {
      broadcastState.isLive = true;
      broadcastState.title = data.title || 'Live Stream';
      broadcastState.description = data.description || 'Welcome to the live stream!';
      broadcastState.viewers = viewers.size;
      
      // Notify all clients
      io.emit('stream-started', {
        title: broadcastState.title,
        description: broadcastState.description
      });
      console.log('Stream started by admin');
    }
  });

  // Handle stream stop
  socket.on('stop-stream', () => {
    if (socket.isAdmin) {
      broadcastState.isLive = false;
      broadcastState.viewers = 0;
      io.emit('stream-stopped');
      console.log('Stream stopped by admin');
    }
  });

  // Handle video frames from admin
  socket.on('video-frame', (frameData) => {
    if (socket.isAdmin && broadcastState.isLive) {
      // Broadcast frame to all viewers except admin
      socket.broadcast.emit('video-frame', frameData);
    }
  });

  // Handle audio chunks from admin
  socket.on('audio-chunk', (audioData) => {
    if (socket.isAdmin && broadcastState.isLive) {
      socket.broadcast.emit('audio-chunk', audioData);
    }
  });

  // Handle chat messages
  socket.on('send-message', (message) => {
    const msg = {
      id: Date.now(),
      user: message.user,
      text: message.text,
      timestamp: new Date().toLocaleTimeString(),
      isAdmin: socket.isAdmin || false
    };
    broadcastState.messages.push(msg);
    
    // Keep only last 100 messages
    if (broadcastState.messages.length > 100) {
      broadcastState.messages = broadcastState.messages.slice(-100);
    }
    
    io.emit('new-message', msg);
  });

  // Handle likes
  socket.on('add-like', () => {
    broadcastState.likes++;
    io.emit('likes-updated', broadcastState.likes);
  });

  // Handle stream settings update
  socket.on('update-settings', (settings) => {
    if (socket.isAdmin) {
      broadcastState.title = settings.title;
      broadcastState.description = settings.description;
      io.emit('settings-updated', settings);
    }
  });

  // Track viewers
  socket.on('viewer-joined', () => {
    viewers.add(socket.id);
    broadcastState.viewers = viewers.size;
    io.emit('viewer-count', broadcastState.viewers);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    if (socket.isAdmin) {
      broadcastState.isLive = false;
      broadcastState.adminSocketId = null;
      io.emit('stream-stopped');
      console.log('Admin disconnected, stream stopped');
    }
    
    viewers.delete(socket.id);
    broadcastState.viewers = viewers.size;
    io.emit('viewer-count', broadcastState.viewers);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   Live Streaming Server Running! 🎥      ║
╠══════════════════════════════════════════╣
║                                          ║
║   Server: http://localhost:${PORT}        ║
║   Public: http://localhost:${PORT}        ║
║   Admin:  http://localhost:${PORT}/#admin ║
║                                          ║
║   Credentials: admin / admin123          ║
║                                          ║
╚══════════════════════════════════════════╝
  `);
});
