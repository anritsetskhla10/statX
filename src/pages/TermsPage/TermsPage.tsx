import { TermsHero } from './components/TermsHero';
import { TermsContent } from './components/TermsContent';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <TermsHero />
      <TermsContent />
    </div>
  );
};

export default TermsPage;