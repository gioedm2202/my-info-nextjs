"use client";
import React, { useState, useEffect } from 'react';

const myApiKey = 'o49R15U5JWegz1UrNNGHzyD5N2RsHltg';
const rateApiUrl = 'https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=VND';

function RateWidget({ showNotification }) {
  const [rateData, setRateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  // Định nghĩa hàm fetch bên trong
  const fetchExchangeRate = async () => {
    setIsDisplayVisible(true);
    setIsLoading(true);
    setError(null);
    // Không reset rateData để giữ giá trị cũ trong khi tải lại

    try {
      // Gọi API với headers chứa API Key
      const response = await fetch(rateApiUrl, {
        method: 'GET',
        headers: {
          'apikey': myApiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Kiểm tra xem API có trả về thành công và có tỷ giá VND không
      if (data.success && data.rates.VND) {
        setRateData({
          rate: data.rates.VND,
          // API này trả về timestamp (s), nhân 1000 để thành mili-giây cho Javascript
          date: new Date(data.date * 1000) 
        });
      } else {
        // Xử lý lỗi từ chính API (vd: sai key, hết lượt)
        let errorMessage = (data.error && data.error.info) ? data.error.info : 'Dữ liệu tỷ giá không hợp lệ.';
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message);
      showNotification('Không thể lấy dữ liệu tỷ giá.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Sử dụng useEffect để gọi API khi component được tải lần đầu
  useEffect(() => {
    fetchExchangeRate();
    // Mảng rỗng [] đảm bảo useEffect chỉ chạy 1 lần khi component được render
  }, []); 

  return (
    <div className="api-widget" id="exchange-rate-widget">
      <h3>API Tỷ Giá USD - VND</h3>
      <p>Hiển thị tỷ giá hối đoái từ APILayer.</p>
      <button 
        id="fetch-rate-btn" 
        className="api-btn" 
        onClick={fetchExchangeRate} 
        disabled={isLoading}
      >
        {isLoading ? 'Đang cập nhật...' : 'Làm Mới'}
      </button>

      <div 
        id="rate-display-container" 
        className={`api-display ${isDisplayVisible ? 'visible' : ''} ${isLoading ? 'loading' : ''}`}
      >
        {/* Chỉ hiển thị "Đang tải" ở lần đầu tiên */}
        {isLoading && !rateData && <h4 className="loading-text">Đang cập nhật tỷ giá...</h4>}
        {error && <h4 style={{ color: '#e63946' }}>Lỗi: {error}</h4>}
        {rateData && (
          <>
            <p className="rate-base">1 USD bằng</p>
            <h4 className="rate-text">
              {/* Định dạng số VND (làm tròn) */}
              {rateData.rate.toLocaleString('vi-VN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })} VND
            </h4>
            <p className="rate-time">
              {/* Định dạng ngày tháng */}
              Cập nhật: {rateData.date.toLocaleDateString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric'
              })}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default RateWidget;