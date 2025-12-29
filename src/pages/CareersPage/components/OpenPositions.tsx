import { ArrowRight, MapPin, Clock } from 'lucide-react';

export const OpenPositions = () => {
  const jobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time", location: "Remote" },
    { title: "Product Designer", dept: "Design", type: "Full-time", location: "Remote / Tbilisi" },
    { title: "Marketing Manager", dept: "Marketing", type: "Contract", location: "Remote" },
    { title: "Backend Developer (Node.js)", dept: "Engineering", type: "Full-time", location: "Remote" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-text-main mb-10 text-center">Open Positions</h2>
        
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={i} className="group p-6 bg-card-bg border border-border-color rounded-2xl hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          ))}
        </div>
      </div>
    </section>
  );
};