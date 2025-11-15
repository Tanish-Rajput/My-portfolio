'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader, Home, Briefcase } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const SUGGESTIONS = [
  "What are Tanish's skills?",
  "Tell me about his projects",
  "What's his experience?",
  "What technologies does he use?"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // App loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000); // Wait for 2 seconds to ensure particle system is loaded

    return () => clearTimeout(timer);
  }, []);

  const typeMessage = (fullText: string, messageId: string) => {
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? { ...msg, content: fullText.slice(0, currentIndex), isTyping: currentIndex < fullText.length }
              : msg
          )
        );
        currentIndex++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }
    }, typingSpeed);
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || input;
    if (!messageToSend.trim() || loading) return;

    // Hide suggestions when user starts chatting
    if (showSuggestions) {
      setShowSuggestions(false);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend
    };

    setMessages(prev => [...prev, userMessage]);
    if (!message) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        type: 'assistant',
        content: '',
        isTyping: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);

      // Start typing effect
      typeMessage(data.response, assistantMessageId);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Loading Screen
  if (appLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Tanish Raghav
            </h2>
            <p className="text-sm text-foreground/60 font-mono">
              Initializing AI Assistant...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-svh justify-between relative z-10">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pt-24 pb-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 && showSuggestions && (
            <div className="flex flex-col items-center justify-center h-full gap-12 py-16">
              <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                  Tanish Raghav
                </h1>
                <p className="text-base md:text-lg text-foreground/70 font-medium tracking-wide">
                  AI ML Engineer • AI Application Developer
                </p>
              </div>

              <p className="text-sm md:text-base text-foreground/50 font-normal max-w-2xl mx-auto leading-relaxed text-center px-4">
                Chat with my AI assistant to learn about my skills, projects, experience, and background in machine learning and artificial intelligence.
              </p>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-4 text-left rounded-xl border border-border/50 text-foreground/70 hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 font-mono text-sm backdrop-blur-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg font-mono text-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-border/30 text-foreground rounded-bl-none'
                }`}
              >
                {message.content}
                {message.isTyping && (
                  <span className="inline-block w-1 h-4 ml-1 bg-foreground animate-pulse"></span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-6 flex justify-start">
              <div className="bg-border/30 text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="pb-8 px-4 md:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 items-end">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Tanish Raghav..."
              disabled={loading}
              className="flex-1 bg-border/30 border border-border text-foreground placeholder:text-foreground/40 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-foreground/40 text-xs font-mono mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}