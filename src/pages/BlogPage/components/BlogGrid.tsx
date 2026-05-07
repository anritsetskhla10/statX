import { useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';

const MOCK_POSTS = [
  { id: 1, title: "How to Optimize Your Revenue Streams in 2025", excerpt: "Discover the top strategies for analyzing your financial data and finding hidden growth opportunities.", category: "Growth", date: "Dec 28, 2024", author: "Sarah M.", imageColor: "bg-blue-500/20" },
  { id: 2, title: "Understanding AI Forecasts: A Guide for Beginners", excerpt: "AI isn't magic. Learn how our algorithms predict future trends based on your historical data.", category: "Education", date: "Dec 25, 2024", author: "David G.", imageColor: "bg-purple-500/20" },
  { id: 3, title: "StatX v2.0 Release Notes", excerpt: "We've added dark mode, new chart types, and faster Excel processing. Check out what's new.", category: "Product Update", date: "Dec 20, 2024", author: "Alex K.", imageColor: "bg-green-500/20" },
  { id: 4, title: "Why Excel is Not Enough for Scaling Businesses", excerpt: "Spreadsheets are great, but they have limits. Here is when you should switch to a dashboard.", category: "Analysis", date: "Dec 15, 2024", author: "Sarah M.", imageColor: "bg-orange-500/20" },
  { id: 5, title: "Top 5 SaaS Metrics You Need to Track", excerpt: "MRR, Churn, ARPU. We break down the most important metrics for your software business.", category: "Growth", date: "Dec 10, 2024", author: "Emily R.", imageColor: "bg-teal-500/20" },
  { id: 6, title: "Building a Data-Driven Culture in Your Team", excerpt: "How to encourage your employees to make decisions based on numbers, not just intuition.", category: "Management", date: "Dec 05, 2024", author: "David G.", imageColor: "bg-pink-500/20" },
  { id: 7, title: "How to Export Client Reports in 1 Click", excerpt: "Save hours of manual work by using our automated PDF and Presentation export features.", category: "Tutorial", date: "Dec 01, 2024", author: "Alex K.", imageColor: "bg-indigo-500/20" },
  { id: 8, title: "The Future of Data Privacy in Analytics", excerpt: "What you need to know about GDPR, CCPA, and how StatX keeps your data secure.", category: "Security", date: "Nov 28, 2024", author: "Sarah M.", imageColor: "bg-red-500/20" },
  { id: 9, title: "Case Study: How TechCorp Increased ROI by 40%", excerpt: "Read the real story of how a mid-sized agency used StatX to turn their business around.", category: "Case Study", date: "Nov 20, 2024", author: "Emily R.", imageColor: "bg-yellow-500/20" },
];

export const BlogGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);


  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-text-muted" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-input-bg border border-border-color rounded-2xl py-4 pl-12 pr-4 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
              <article 
                key={post.id} 
                className="group bg-card-bg border border-border-color rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Image Placeholder */}
                <div className={`h-48 w-full ${post.imageColor} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                   <div className="absolute inset-0 flex items-center justify-center text-text-main/20 font-bold text-4xl uppercase tracking-wider">
                      Blog Img
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4 text-xs font-medium">
                     <span className="px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
                        {post.category}
                     </span>
                     <div className="flex items-center gap-1 text-text-muted">
                        <Calendar size={12} /> {post.date}
                     </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-border-color pt-4">
                     <div className="flex items-center gap-2 text-xs text-text-main font-medium">
                        <div className="w-6 h-6 rounded-full bg-input-bg flex items-center justify-center border border-border-color">
                           <User size={12} className="text-text-muted" />
                        </div>
                        {post.author}
                     </div>
                     <button className="text-sm font-bold text-text-main flex items-center gap-1 group-hover:text-primary transition-colors">
                        Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-text-muted">
              <Search className="mx-auto mb-4 opacity-20" size={48} />
              <p className="text-lg">No articles found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-card-bg border border-border-color text-text-main font-bold rounded-xl hover:bg-input-bg hover:border-primary/50 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-primary" size={18} />
                  Loading...
                </>
              ) : (
                'Load More Articles'
              )}
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
};