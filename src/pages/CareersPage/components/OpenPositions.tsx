import { useState, useMemo } from 'react';
import { ArrowRight, MapPin, Clock, X, UploadCloud, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const jobs = [
  { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Product Designer", dept: "Design", type: "Full-time", location: "Remote / Tbilisi" },
  { title: "Marketing Manager", dept: "Marketing", type: "Contract", location: "Remote" },
  { title: "Backend Developer (Node.js)", dept: "Engineering", type: "Full-time", location: "Remote" },
  { title: "UI/UX Researcher", dept: "Design", type: "Part-time", location: "Remote" },
];

export const OpenPositions = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applyStatus, setApplyStatus] = useState<'idle' | 'loading' | 'success'>('idle');


  const categories = useMemo(() => {
    const depts = jobs.map(job => job.dept);
    return ['All', ...Array.from(new Set(depts))];
  }, []);


  const filteredJobs = useMemo(() => {
    if (activeFilter === 'All') return jobs;
    return jobs.filter(job => job.dept === activeFilter);
  }, [activeFilter]);


  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyStatus('loading');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setApplyStatus('success');
    toast.success('Application Sent Successfully!', {
        style: { background: '#10B981', color: '#fff', borderRadius: '10px' },
        iconTheme: { primary: '#fff', secondary: '#10B981' }
    });


    setTimeout(() => {
      setSelectedJob(null);
      setApplyStatus('idle');
    }, 1000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Open Positions</h2>
        
        {/* ფილტრები */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeFilter === category 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' 
                  : 'bg-card-bg text-text-muted border-border-color hover:border-primary/50 hover:text-text-main'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div key={activeFilter} className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedJob(job.title)}
                className="group p-6 bg-card-bg border border-border-color rounded-2xl hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                    <span className="px-2 py-0.5 bg-input-bg rounded-full text-xs font-medium border border-border-color">{job.dept}</span>
                  </div>
                </div>
                
                <button className="flex items-center gap-2 text-sm font-bold text-text-main group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2.5 group-hover:translate-x-0 duration-300">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-text-muted">
              No positions open for this category right now.
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg border border-border-color w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border-color flex justify-between items-center bg-input-bg/30">
              <div>
                <h2 className="text-lg font-bold text-text-main">Apply for Position</h2>
                <p className="text-sm text-primary font-medium">{selectedJob}</p>
              </div>
              <button 
                onClick={() => !['loading', 'success'].includes(applyStatus) && setSelectedJob(null)}
                className="text-text-muted hover:text-text-main transition-colors disabled:opacity-50"
                disabled={['loading', 'success'].includes(applyStatus)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-text-muted">Full Name</label>
                <input required type="text" className="w-full bg-input-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-text-muted">Email Address</label>
                <input required type="email" className="w-full bg-input-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-1 pt-2">
                <label className="text-sm text-text-muted mb-2 block">Resume / CV</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border-color rounded-xl hover:bg-input-bg hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-text-muted group-hover:text-primary mb-2 transition-colors" />
                    <p className="text-sm text-text-muted group-hover:text-text-main transition-colors"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-text-muted mt-1">PDF, DOCX (MAX. 5MB)</p>
                  </div>
                  <input type="file" required className="hidden" accept=".pdf,.doc,.docx" />
                </label>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={applyStatus !== 'idle'}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                    ${applyStatus === 'success' 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 disabled:opacity-50'}`}
                >
                  {applyStatus === 'loading' && <Loader2 className="animate-spin" size={18} />}
                  {applyStatus === 'success' && <CheckCircle size={18} />}
                  {applyStatus === 'idle' ? 'Submit Application' : applyStatus === 'loading' ? 'Sending...' : 'Application Sent!'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};