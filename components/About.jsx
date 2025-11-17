
import React from 'react';

function About() {
  return (
    <section 
      id="about" 
      className="content-section" 
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', paddingTop: '60px' }}
    >
      {/* */}

      <img src="img/avt.JPG" alt="Ảnh cá nhân của tôi" className="profile-pic" />

      <h2>Về Tôi</h2>
      <p>
          Xin chào! Tôi là Vũ Mạnh Lộc, và tôi yêu thích về điện tử và bán dẫn. 
          Giống như một Nhà Lữ Hành trong Genshin Impact, tôi luôn tìm kiếm những kiến thức mà tôi chưa biết trong thế giới điện tử và bán dẫn.
          Mục tiêu của tôi là học hỏi thêm được nhiều kiến thức cơ bản và biết thêm nhiều điều mới mẻ về lĩnh vực này.
      </p>
      <p>
          Kỹ năng của tôi bao gồm: Lập trình cơ bản, đọc hiểu tài liệu, suy luận và làm việc nhóm.
      </p>
    </section>
  );
}

export default About;