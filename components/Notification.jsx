"use client";
import React from 'react';

function Notification({ message, type, isVisible }) {
  return (
    <div 
      id="message-box" 
      className={isVisible ? 'show' : ''}
      style={{ 
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336' 
      }}
    >
      {message}
    </div>
  );
}

export default Notification;