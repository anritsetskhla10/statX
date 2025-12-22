import { Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-white font-poppins">
      
      <Navbar />
      
      <main className="flex-1 flex flex-col w-full relative">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};