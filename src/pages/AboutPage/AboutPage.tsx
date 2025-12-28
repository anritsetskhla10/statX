import { AboutHero } from './components/AboutHero';
import { OurStory } from './components/OurStory';
import { TeamSection } from './components/TeamSection';
import { FinalCTA } from '../FeaturesPage/components/FinalCTA'; 

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <AboutHero />
      <OurStory />
      <TeamSection />
      <FinalCTA />
    </div>
  );
};

export default AboutPage;