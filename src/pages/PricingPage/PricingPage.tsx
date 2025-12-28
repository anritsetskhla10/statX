import { PricingHero } from './components/PricingHero';
import { PricingPlans } from './components/PricingPlans';
import { ComparisonTable } from './components/ComparisonTable';
import { PricingFAQ } from './components/PricingFAQ';
import { FinalCTA } from '../FeaturesPage/components/FinalCTA'; 

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <PricingHero />
      <PricingPlans />
      <ComparisonTable />
      <PricingFAQ />
      <FinalCTA />
    </div>
  );
};

export default PricingPage;