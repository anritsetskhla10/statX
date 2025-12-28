import { PrivacyHero } from './components/PrivacyHero';
import { PrivacyContent } from './components/PrivacyContent';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <PrivacyHero />
      <PrivacyContent />
    </div>
  );
};

export default PrivacyPage;