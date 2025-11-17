"use client";

import React, { useState } from 'react';
import Home from '@/components/Home';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import ApiTesting from '@/components/ApiTesting';
import Contact from '@/components/Contact';
import Notification from '@/components/Notification';
import PhotoGallery from '@/components/PhotoGallery';

export default function HomePage() {

  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setIsNotifyVisible(true);
    
    setTimeout(() => {
      setIsNotifyVisible(false);
    }, 3000);
  };


  return (
    <div>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        isVisible={isNotifyVisible} 
      />
      <Home />
      <About />
      <Portfolio />
      <ApiTesting showNotification={showNotification} /> 
      <section id="gallery" className="content-section">
        <h2>Bộ Sưu Tập</h2>
        <p>Ngoài ra, tôi còn khá đam mê với việc chụp ảnh. 
        Tôi thường chụp ảnh bầu trời, ảnh hoàng hôn và chia
        sẻ chúng với mọi người xung quanh.
        Đây là một vài hình ảnh tôi yêu thích và sưu tầm.</p>
        <button 
          onClick={() => setIsGalleryOpen(true)}
          className="api-btn" 
          style={{display: 'block', margin: '0 auto'}} 
        >
          Xem Bộ Sưu Tập
        </button>
      </section>
      <Contact showNotification={showNotification} />
      {isGalleryOpen && <PhotoGallery onClose={() => setIsGalleryOpen(false)} />}
    </div>
  );
}