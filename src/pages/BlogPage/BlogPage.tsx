import { BlogHero } from './components/BlogHero';
import { BlogGrid } from './components/BlogGrid';
import { FinalCTA } from '../FeaturesPage/components/FinalCTA';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500">
      <BlogHero />
      <BlogGrid />
      <FinalCTA />
    </div>
  );
};

export default BlogPage;