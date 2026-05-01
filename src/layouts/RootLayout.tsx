import { Outlet, useRouter } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookieSettingsModal } from '../components/CookieSettingsModal';
import { useCookieStore } from '../store/cookieStore';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const RootLayout = () => {
  const { hasConsent, openModal } = useCookieStore();
  const { initialize, session, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isInitialized) {
      router.invalidate();
    }
  }, [session, isInitialized, router]);

  useEffect(() => {
     if (!hasConsent) {
        const timer = setTimeout(() => openModal(), 1000);
        return () => clearTimeout(timer);
     }
  }, [hasConsent, openModal]);

  if (!isInitialized) {
     return (
       <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-4 transition-colors duration-300">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-text-muted font-medium animate-pulse">Verifying secure session...</p>
       </div>
     );
  }

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