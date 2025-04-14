import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import './globals.css';

export const metadata = {
  title: 'Sistema de Simulación de Teoría de Colas',
  description: 'Plataforma educativa y simuladora para teoría de colas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}