import { Check, Minus } from 'lucide-react';

export const ComparisonTable = () => {
  const features = [
    { name: "Data Import (Excel/CSV)", starter: true, pro: true, ent: true },
    { name: "Dashboard Templates", starter: true, pro: true, ent: true },
    { name: "AI Insights", starter: false, pro: true, ent: true },
    { name: "Export to PDF/PPT", starter: false, pro: true, ent: true },
    { name: "API Access", starter: false, pro: false, ent: true },
    { name: "Custom Branding", starter: false, pro: true, ent: true },
    { name: "Dedicated Support", starter: false, pro: "Priority", ent: "24/7 Agent" },
  ];

  return (
    <section className="py-16 bg-bg-main border-y border-border-color">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold text-text-main text-center mb-12">Detailed Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-color">
                <th className="py-4 pl-4 text-text-muted font-medium w-1/3">Features</th>
                <th className="py-4 px-4 text-center text-text-main font-bold w-1/5">Starter</th>
                <th className="py-4 px-4 text-center text-primary font-bold w-1/5">Pro</th>
                <th className="py-4 px-4 text-center text-text-main font-bold w-1/5">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <tr key={i} className="border-b border-border-color/50 hover:bg-card-bg/50 transition-colors">
                  <td className="py-4 pl-4 text-text-main font-medium">{feat.name}</td>
                  
                  {/* Starter */}
                  <td className="py-4 text-center">
                    {feat.starter === true ? <Check size={20} className="mx-auto text-text-main" /> : 
                     feat.starter === false ? <Minus size={20} className="mx-auto text-text-muted/30" /> : 
                     <span className="text-sm text-text-main">{feat.starter}</span>}
                  </td>
                  
                  {/* Pro */}
                  <td className="py-4 text-center bg-primary/5">
                    {feat.pro === true ? <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mx-auto text-white"><Check size={14} /></div> : 
                     feat.pro === false ? <Minus size={20} className="mx-auto text-text-muted/30" /> : 
                     <span className="text-sm font-bold text-primary">{feat.pro}</span>}
                  </td>

                  {/* Enterprise */}
                  <td className="py-4 text-center">
                    {feat.ent === true ? <Check size={20} className="mx-auto text-text-main" /> : 
                     <span className="text-sm text-text-main font-medium">{feat.ent}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};