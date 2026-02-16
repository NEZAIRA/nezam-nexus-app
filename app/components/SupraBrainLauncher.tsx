'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the chat to avoid SSR issues
const SupraBrainChat = dynamic(() => import('./SupraBrainChat'), {
  ssr: false,
});

export default function SupraBrainLauncher() {
  const [showChat, setShowChat] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message after 8 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);

      // Hide welcome message after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 8000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  return (
    <>
      {/* Launcher Button */}
      <div
        onClick={() => {
          setShowChat(!showChat);
          setShowWelcome(false); // Hide welcome when opening chat
        }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '3px solid #eef2f7',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: '99999'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#00d2ff',
            userSelect: 'none',
            lineHeight: '1',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            {showChat ? '×' : 'S'}
          </div>
          {!showChat && (
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#28a745',
              border: '2px solid white'
            }}></div>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      {showWelcome && !showChat && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          right: '30px',
          zIndex: '99998',
          background: 'rgba(8, 12, 20, 0.98)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '16px 24px',
          maxWidth: '280px',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          animation: 'fadeInScale 0.5s ease-out'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#00d2ff', marginBottom: '4px' }}>SupraBrain</div>
            <div>I'm glad to help you!</div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {showChat && <SupraBrainChat onClose={() => setShowChat(false)} />}

      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
