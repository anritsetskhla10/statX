import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import GlassDashboardPreview from './components/GlassDashboardPreview';
import FeaturesGrid from './components/FeaturesGrid';
import AIIntelligence from './components/AIIntelligence';
import ImpactMetrics from './components/ImpactMetrics';
import FinalCTA from './components/FinalCTA';

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <TrustBar />
      <GlassDashboardPreview />
      <FeaturesGrid />
      <AIIntelligence />
      <ImpactMetrics />
      <FinalCTA />
    </div>
  );
};

export default LandingPage;