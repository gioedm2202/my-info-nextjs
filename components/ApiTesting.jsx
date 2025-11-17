

import React from 'react';
import PokemonWidget from './PokemonWidget';
import RateWidget from './RateWidget';

function ApiTesting({ showNotification }) {
  return (
    <section id="api-testing" className="content-section">
      <h2>Khu Vực Thử Nghiệm API</h2>
      <p>Đây là nơi tôi thử nghiệm gọi các API công cộng để lấy dữ liệu động.</p>
      
      <div className="api-grid">
        {/* Truyền hàm thông báo xuống cho từng widget */}
        <PokemonWidget showNotification={showNotification} />
        <RateWidget showNotification={showNotification} />
      </div>
    </section>
  );
}

export default ApiTesting;