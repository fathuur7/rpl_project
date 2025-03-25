import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Loader2 
} from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 0, 
      text: "Hello! 👋 I'm TIF Design's AI assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      const botResponse = {
        id: messages.length + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot'
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsLoading(false);
    }
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = [
      {
        keywords: ['service', 'design', 'work'],
        response: "We offer comprehensive design services including UI/UX Design, Web Development, Branding, and Consulting. Would you like more details about our portfolio?"
      },
      {
        keywords: ['portfolio', 'project'],
        response: "Our portfolio spans various industries with innovative design solutions. We'd be happy to showcase our recent work and discuss how we can help bring your vision to life!"
      },
      {
        keywords: ['contact', 'hello', 'hi'],
        response: "Feel free to reach out to us at contact@tifdesign.com or +1 (555) 123-4567. We're always excited to discuss new projects and creative opportunities!"
      }
    ];

    // Find a matching response
    const matchedResponse = responses.find(r => 
      r.keywords.some(keyword => lowerMessage.includes(keyword))
    );

    return matchedResponse 
      ? matchedResponse.response 
      : "Thanks for your message! I'm an AI assistant for TIF Design. How can I help you learn more about our creative services?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Chat Launcher */}
      <motion.button
        className="bg-indigo-500 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
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
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot size={24} className="text-white" />
                <div>
                  <h3 className="font-bold text-lg">TIF Design AI</h3>
                  <p className="text-xs text-white/80">Intelligent Design Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/70">Online</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

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
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Bot size={16} className="text-indigo-500" />
                    </div>
                  )}
                  <div 
                    className={`
                      max-w-[75%] px-4 py-2 rounded-2xl
                      ${msg.sender === 'user' 
                        ? 'bg-indigo-500 text-white self-end' 
                        : 'bg-white text-gray-800 border border-gray-200 self-start'
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <User size={16} className="text-indigo-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Bot size={16} className="text-indigo-500" />
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl border border-gray-200 flex items-center">
                    <Loader2 size={16} className="mr-2 animate-spin text-indigo-500" />
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-2">
              <input 
                ref={inputRef}
                type="text"
                placeholder="Ask about our services..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-indigo-500 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
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