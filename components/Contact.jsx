"use client";
import React, { useState } from 'react';

function Contact({ showNotification }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Hàm xử lý khi gửi form
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn form gửi đi (giống như logic gốc)
    
    // Kiểm tra state thay vì .value
    if (name && email && message) {
      // Gọi hàm thông báo thành công (từ props)
      showNotification('Cảm ơn! Lời nhắn của bạn đã được gửi.', 'success');
      
      // Xóa nội dung form bằng cách reset state
      setName('');
      setEmail('');
      setMessage('');
      
      console.log('Form submitted:', { name, email, message });
    } else {
      // Gọi hàm thông báo lỗi (từ props)
      showNotification('Vui lòng điền đầy đủ thông tin.', 'error');
    }
  };

  return (
    <section id="contact" className="content-section">
      <h2>Liên Hệ Với Tôi</h2>
      <p>Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi lời nhắn cho tôi!</p>
      
      {/* Sử dụng onSubmit của React thay vì addEventListener */}
      <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Tên của bạn" 
          required 
          value={name} // Liên kết giá trị với state
          onChange={(e) => setName(e.target.value)} // Cập nhật state khi gõ
        />
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email của bạn" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          placeholder="Lời nhắn của bạn" 
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Gửi Lời Nhắn</button>
      </form>
    </section>
  );
}

export default Contact;