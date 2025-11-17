"use client";

import React, { useState, useEffect } from 'react';

const defaultImages = [
  '/img/genshin_liyue.png',
  '/img/sky_is_blue.jpg',
  '/img/sunset_dark_theme.jpg',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/40.jpg',
  '/img/11.jpg',
  '/img/12.jpg',
  '/img/32.jpg',
  '/img/14.jpg',
  '/img/15.jpg',
  '/img/16.jpg',
  '/img/17.jpg',
  '/img/18.jpg',
  '/img/19.jpg',
  '/img/20.jpg',
];


export default function PhotoGallery({ onClose }) { 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [images, setImages] = useState([]); 
  const [newImageUrl, setNewImageUrl] = useState("");

  
  useEffect(() => {
   
    const storedImages = localStorage.getItem('photoGalleryImages');
    
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    } else {
      setImages(defaultImages);
      localStorage.setItem('photoGalleryImages', JSON.stringify(defaultImages));
    }
  }, []); 

  const handleAddImage = (e) => { 
    e.preventDefault(); 
    if (newImageUrl.trim() === '') return; 
    const newList = [...images, newImageUrl.trim()];
    setImages(newList);
    localStorage.setItem('photoGalleryImages', JSON.stringify(newList));
    setNewImageUrl("");
  };

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Bộ Sưu Tập Ảnh</h2>
        <form onSubmit={handleAddImage} className="gallery-add-form">
          <input
            type="text"
            placeholder="Dán URL ảnh mới vào đây (vd: /img/ten-anh.jpg)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <button type="submit">Thêm Ảnh</button>
        </form>
        

        <div className="gallery-grid">
          {images.map((imgSrc, index) => ( 
            <div 
              key={`${imgSrc}-${index}`} 
              className="gallery-thumbnail"
              onClick={() => setSelectedImage(imgSrc)} 
            >
              <img 
                src={imgSrc} 
                alt="Ảnh trong bộ sưu tập" 
               
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150/222/fff?text=Ảnh+lỗi')}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Ảnh được chọn" />
          <span>Bấm vào bất cứ đâu để đóng</span>
        </div>
      )}

      <style jsx>{`
        .gallery-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .gallery-modal {
          background-color: #222; 
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #444;
          width: 90%;
          max-width: 900px;
          height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex; 
          flex-direction: column; 
        }
        .gallery-modal h2 {
          text-align: center;
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #eee;
          flex-shrink: 0; 
        }
        .gallery-close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2.5rem;
          color: #888;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }
        .gallery-close-btn:hover {
          color: #fff;
        }
        .gallery-add-form {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }
        .gallery-add-form input {
          flex-grow: 1;
          padding: 0.75rem;
          border: 1px solid #444;
          background-color: #111;
          color: #fff;
          border-radius: 6px;
          font-size: 14px;
        }
        .gallery-add-form button {
          padding: 0.75rem 1rem;
          border: none;
          background-color: #5a88c7;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          white-space: nowrap;
        }
        .gallery-add-form button:hover {
          background-color: #4a78b7;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          overflow-y: auto;
          padding-right: 5px;
        }
        .gallery-thumbnail {
          width: 100%;
          padding-top: 100%;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
        }
        .gallery-thumbnail:hover {
          border-color: #5a88c7;
        }
        .gallery-thumbnail img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .gallery-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          cursor: pointer;
        }
        .gallery-lightbox img {
          max-width: 90vw;
          max-height: 80vh;
          border-radius: 8px;
          object-fit: contain;
        }
        .gallery-lightbox span {
          color: #aaa;
          margin-top: 1rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}