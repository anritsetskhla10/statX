import { Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookieSettingsModal } from '../components/CookieSettingsModal';
import { useCookieStore } from '../store/cookieStore';
import { useEffect } from 'react';

export const RootLayout = () => {
  const { hasConsent, openModal } = useCookieStore();
  
  useEffect(() => {
     if (!hasConsent) {
        const timer = setTimeout(() => openModal(), 1000);
        return () => clearTimeout(timer);
     }
  }, [hasConsent, openModal]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-main text-text-main font-poppins transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col w-full relative">
        <Outlet />
      </main>

      <Footer />
      <CookieSettingsModal />
    </div>
  );
};