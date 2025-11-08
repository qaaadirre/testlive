import React, { useState, useRef, useEffect } from 'react';
import { Video, Users, MessageSquare, Send, LogOut, Eye, Share2, Heart, Radio, Settings, Lock, Shield } from 'lucide-react';

const LiveStreamApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [likes, setLikes] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [streamTitle, setStreamTitle] = useState('Live Stream');
  const [streamDescription, setStreamDescription] = useState('Welcome to the live stream!');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Simulated database for admin credentials
  const adminCredentials = { username: 'admin', password: 'admin123' };

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === adminCredentials.username && 
        loginForm.password === adminCredentials.password) {
      setIsAdmin(true);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials! Use username: admin, password: admin123');
    }
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setIsStreaming(true);
      setViewers(Math.floor(Math.random() * 50) + 10);
    } catch (err) {
      alert('Could not access camera/microphone. Please grant permissions.');
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setViewers(0);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const msg = {
        id: Date.now(),
        user: isAdmin ? 'Admin' : `Viewer${Math.floor(Math.random() * 1000)}`,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isAdmin: isAdmin
      };
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    }
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Stream link copied to clipboard!');
  };

  const handleLogout = () => {
    stopStream();
    setIsAdmin(false);
    setMessages([]);
    setLikes(0);
  };

  // Admin Login Page
  if (!isAdmin && window.location.hash === '#admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-300">Secure access to streaming dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Lock className="inline w-5 h-5 mr-2" />
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Demo credentials: admin / admin123</p>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
              Back to Public View
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        {/* Admin Header */}
        <div className="bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Streaming Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isStreaming && (
                <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/50">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-red-500 font-semibold">LIVE</span>
                </div>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full aspect-video bg-black"
                  style={{ transform: 'scaleX(-1)' }}
                />
                <div className="p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex justify-between items-center">
                    {!isStreaming ? (
                      <button
                        onClick={startStream}
                        className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <Video className="inline w-6 h-6 mr-2" />
                        Start Streaming
                      </button>
                    ) : (
                      <button
                        onClick={stopStream}
                        className="flex-1 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <Radio className="inline w-6 h-6 mr-2" />
                        Stop Streaming
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Eye className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Viewers</p>
                      <p className="text-white text-2xl font-bold">{viewers}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Likes</p>
                      <p className="text-white text-2xl font-bold">{likes}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Messages</p>
                      <p className="text-white text-2xl font-bold">{messages.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat & Settings */}
            <div className="space-y-4">
              {showSettings && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-4">Stream Settings</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                      placeholder="Stream title"
                    />
                    <textarea
                      value={streamDescription}
                      onChange={(e) => setStreamDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                      rows="3"
                      placeholder="Stream description"
                    />
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col" style={{ height: '500px' }}>
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Live Chat
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-black/30 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-semibold ${msg.isAdmin ? 'text-yellow-400' : 'text-blue-400'}`}>
                          {msg.user}
                        </span>
                        <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-200 text-sm">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
                      placeholder="Type a message..."
                    />
                    <button
                      type="submit"
                      className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public View
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Public Header */}
      <div className="bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold">Live Stream</h1>
          </div>
          <a
            href="#admin"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Admin Login
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
              <div className="relative">
                {isStreaming ? (
                  <video
                    autoPlay
                    className="w-full aspect-video bg-black"
                  />
                ) : (
                  <div className="w-full aspect-video bg-black flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-xl font-semibold">Stream Offline</p>
                      <p className="text-gray-500 text-sm mt-2">Check back later for live content</p>
                    </div>
                  </div>
                )}
                {isStreaming && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                    <Radio className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-white font-semibold text-sm">LIVE</span>
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">{streamTitle}</h2>
                  <p className="text-gray-300">{streamDescription}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{likes}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">{viewers} watching</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col" style={{ height: '600px' }}>
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Chat
                <span className="ml-auto text-sm text-gray-400">{messages.length} messages</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-sm">Be the first to say hello!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-black/30 rounded-lg p-3 animate-fade-in">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-semibold ${msg.isAdmin ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {msg.user}
                        {msg.isAdmin && <span className="ml-2 text-xs bg-yellow-500/20 px-2 py-0.5 rounded">ADMIN</span>}
                      </span>
                      <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-200 text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Say something..."
                />
                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamApp;
