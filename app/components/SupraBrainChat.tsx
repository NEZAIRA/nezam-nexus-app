'use client';

import React, { useEffect, useRef, useState } from 'react';
import './SupraBrainChat.css';

const API_BASE = '/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  meta?: any;
}

function createNewConversation() {
  return fetch(`${API_BASE}/chat/new`, {
    method: 'POST',
  }).then((res) => res.json());
}

function sendMessageToConversation(conversationId: string, content: string) {
  return fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, conversation_id: conversationId }),
  }).then((res) => res.json());
}

export default function SupraBrainChat({ onClose }: { onClose: () => void }) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  useEffect(() => {
    createNewConversation().then((data) => {
      setConversationId(data.id);
    });
  }, []);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleSend() {
    if (!input.trim() || !conversationId || isSending) return;

    const text = input.trim();
    setInput('');
    setIsSending(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setShowTyping(true);

      const response = await sendMessageToConversation(conversationId, text);

      setShowTyping(false);

      if (response.error) {
        throw new Error(response.error);
      }

      const { answer, meta } = response;

      const finalMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: answer,
        meta: meta || {},
      };
      setMessages((prev) => [...prev, finalMsg]);
    } catch (e) {
      console.error('Error sending message:', e);
      setShowTyping(false);

      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: 'ai',
        text: "I'm having trouble connecting right now. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="supra-chat-widget">
      <div className="supra-chat-header">
        <div className="supra-chat-title-row">
          <SupraBrainOrb isThinking={showTyping} />
          <div className="supra-chat-title">SupraBrain</div>
          <button className="supra-close-btn" onClick={onClose} aria-label="Close chat">
            ×
          </button>
        </div>
        <div className="supra-chat-subtitle">Medical research assistant</div>
      </div>

      <div className="supra-chat-messages">
        {messages.length === 0 && (
          <div className="supra-welcome-message">
            <p>👋 Hi! I'm SupraBrain, your medical research assistant.</p>
            <p>Ask me about medical concepts, research, or health topics!</p>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {showTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <div className="supra-chat-input-row">
        <textarea
          className="supra-chat-input"
          placeholder="Ask about medical research..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!conversationId || isSending}
          rows={1}
        />
        <button
          className="supra-chat-send"
          onClick={handleSend}
          disabled={!input.trim() || isSending || !conversationId}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const { sender, text } = message;
  const isUser = sender === 'user';

  return (
    <div className={`supra-msg-bubble ${isUser ? 'supra-msg-user' : 'supra-msg-ai'}`}>
      <div className="supra-msg-text">{text}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="supra-typing-row">
      <div className="supra-typing-indicator">
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
      </div>
    </div>
  );
}

function SupraBrainOrb({ isThinking }: { isThinking: boolean }) {
  return (
    <div className={`supra-orb ${isThinking ? 'supra-orb-thinking' : ''}`}>
      <div className="supra-orb-core" />
    </div>
  );
}
