import { Calendar, User, ArrowRight } from 'lucide-react';

export const BlogGrid = () => {
  const posts = [
    {
      id: 1,
      title: "How to Optimize Your Revenue Streams in 2025",
      excerpt: "Discover the top strategies for analyzing your financial data and finding hidden growth opportunities.",
      category: "Growth",
      date: "Dec 28, 2024",
      author: "Sarah M.",
      imageColor: "bg-blue-500/20" 
    },
    {
      id: 2,
      title: "Understanding AI Forecasts: A Guide for Beginners",
      excerpt: "AI isn't magic. Learn how our algorithms predict future trends based on your historical data.",
      category: "Education",
      date: "Dec 25, 2024",
      author: "David G.",
      imageColor: "bg-purple-500/20"
    },
    {
      id: 3,
      title: "StatX v2.0 Release Notes",
      excerpt: "We've added dark mode, new chart types, and faster Excel processing. Check out what's new.",
      category: "Product Update",
      date: "Dec 20, 2024",
      author: "Alex K.",
      imageColor: "bg-green-500/20"
    },
    {
      id: 4,
      title: "Why Excel is Not Enough for Scaling Businesses",
      excerpt: "Spreadsheets are great, but they have limits. Here is when you should switch to a dashboard.",
      category: "Analysis",
      date: "Dec 15, 2024",
      author: "Sarah M.",
      imageColor: "bg-orange-500/20"
    },
  ];

  return (
    <section className="pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group bg-card-bg border border-border-color rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col">
              {/* Image Placeholder */}
              <div className={`h-48 w-full ${post.imageColor} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                 <div className="absolute inset-0 flex items-center justify-center text-text-muted/20 font-bold text-4xl uppercase">
                    Blog Img
                 </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4 text-xs font-medium">
                   <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                      {post.category}
                   </span>
                   <div className="flex items-center gap-1 text-text-muted">
                      <Calendar size={12} /> {post.date}
                   </div>
                </div>

                <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border-color pt-4">
                   <div className="flex items-center gap-2 text-xs text-text-main font-medium">
                      <div className="w-6 h-6 rounded-full bg-input-bg flex items-center justify-center">
                         <User size={12} />
                      </div>
                      {post.author}
                   </div>
                   <button className="text-sm font-bold text-text-main flex items-center gap-1 group-hover:text-primary transition-colors">
                      Read <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};