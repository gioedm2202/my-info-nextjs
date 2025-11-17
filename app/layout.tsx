import '@/app/globals.css'; 
import Header from '@/components/Header'; 
import Footer from '@/components/Footer'; 

export const metadata = {
  title: 'Vũ Mạnh Lộc - Trang Cá Nhân',
  description: 'Một người đam mê Vật lý, điện tử và bán dẫn.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Thay thế link Roboto bằng link Pacifico */}
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="overlay"></div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}