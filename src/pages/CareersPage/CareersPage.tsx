import { CareersHero } from './components/CareersHero';
import { PerksSection } from './components/PerksSection';
import { OpenPositions } from './components/OpenPositions';
import { FinalCTA } from '../FeaturesPage/components/FinalCTA';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <CareersHero />
      <PerksSection />
      <OpenPositions />
      <FinalCTA />
    </div>
  );
};

export default CareersPage;