import { FeaturesHero } from './components/FeaturesHero';
import { BentoGrid } from './components/BentoGrid';
import { AISpotlight } from './components/AISpotlight';
import { IntegrationFlow } from './components/IntegrationFlow';
import { FinalCTA } from './components/FinalCTA';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <FeaturesHero />
      <BentoGrid />
      <AISpotlight />
      <IntegrationFlow />
      <FinalCTA />
    </div>
  );
};

export default FeaturesPage;