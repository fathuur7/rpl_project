import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Loader2,
  Settings,
  ShoppingBag
} from 'lucide-react';

export default function SalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 0, 
      text: "Hi there! 👋 I'm your TIF Design sales representative. Our premium design solutions can transform your business. What specific design needs can I help you with today?", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ollamaConfig, setOllamaConfig] = useState({
    serverUrl: 'http://localhost:11434',
    model: 'deepseek-r1:8b',
    temperature: 0.7
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length,
      text: inputMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare sales-oriented conversation history
      const conversationHistory = messages.map(msg => {
        return {
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        };
      });
      
      // Add system instruction to make the bot act as a salesperson
      const systemInstruction = {
        role: 'system',
        content: 'You are a professional sales representative for TIF Design. Your goal is to persuasively promote our design solutions and convert inquiries into sales. Highlight benefits, offer special deals, and guide users toward making a purchase. Be enthusiastic, solution-focused, and always close with a call to action. Address objections confidently.'
      };
      
      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: inputMessage
      });
      
      // Add system instruction at the beginning
      conversationHistory.unshift(systemInstruction);
      
      // Call Ollama API
      const response = await fetch(`${ollamaConfig.serverUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: ollamaConfig.model,
          messages: conversationHistory,
          options: {
            temperature: ollamaConfig.temperature
          },
          stream: false
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Add bot response to messages
      const botResponse = {
        id: messages.length + 1,
        text: data.message?.content || "I'd love to tell you more about our design solutions. Could you please try again?",
        sender: 'bot'
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      // Add error message
      const errorResponse = {
        id: messages.length + 1,
        text: `I'm eager to help you with our design solutions, but I'm having trouble connecting to our system. Please try again in a moment or contact us directly at sales@tifdesign.com.`,
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateConfig = (e) => {
    const { name, value } = e.target;
    setOllamaConfig(prev => ({
      ...prev,
      [name]: name === 'temperature' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Chat Launcher */}
      <motion.button
        className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close Chat" : "Talk to Sales"}
      >
        {isOpen ? <X size={24} /> : <ShoppingBag size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-8 w-[95%] max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={24} className="text-white" />
                <div>
                  <h3 className="font-bold text-lg">TIF Design Sales</h3>
                  <p className="text-xs text-white/80">Talk to our product expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/70">Online</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <button 
                  onClick={toggleSettings}
                  className="text-white hover:text-blue-200 transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-blue-50 border-b border-blue-100 overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <h4 className="font-medium text-blue-700">Ollama Configuration</h4>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">Server URL</label>
                      <input
                        type="text"
                        name="serverUrl"
                        value={ollamaConfig.serverUrl}
                        onChange={updateConfig}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="http://localhost:11434"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">Model Name</label>
                      <input
                        type="text"
                        name="model"
                        value={ollamaConfig.model}
                        onChange={updateConfig}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="deepseek"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Persuasiveness: {ollamaConfig.temperature}
                      </label>
                      <input
                        type="range"
                        name="temperature"
                        min="0"
                        max="1"
                        step="0.1"
                        value={ollamaConfig.temperature}
                        onChange={updateConfig}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>More Factual</span>
                        <span>More Persuasive</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Container */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-end space-x-2 ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="bg-blue-600 p-2 rounded-full shadow-sm">
                      <ShoppingBag size={16} className="text-white" />
                    </div>
                  )}
                  <div 
                    className={`
                      max-w-[75%] px-4 py-2 rounded-2xl
                      ${msg.sender === 'user' 
                        ? 'bg-gray-200 text-gray-800 self-end' 
                        : 'bg-blue-600 text-white border border-blue-700 self-start'
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="bg-gray-100 p-2 rounded-full">
                      <User size={16} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="bg-blue-600 p-2 rounded-full shadow-sm">
                    <ShoppingBag size={16} className="text-white" />
                  </div>
                  <div className="bg-blue-600 px-4 py-2 rounded-2xl border border-blue-700 flex items-center text-white">
                    <Loader2 size={16} className="mr-2 animate-spin text-white" />
                    Preparing your offer...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white text-gray-900 border-t border-gray-200 flex items-center space-x-2">
              <input 
                ref={inputRef}
                type="text"
                placeholder="Ask about our design solutions..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}