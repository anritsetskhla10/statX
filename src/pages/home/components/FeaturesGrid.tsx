import { Zap, Shield, LayoutDashboard, type LucideIcon } from 'lucide-react';
import { Card } from '../../../components/ui/Card'; 

const features = [
  {
    icon: Zap,
    title: "Real-Time Analytics",
    description: "Receive data instantly. Monitor trends live as they happen and take action faster than the competition.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your data is protected by state-of-the-art encryption standards. Privacy and integrity are guaranteed.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: LayoutDashboard,
    title: "Adaptive Design",
    description: "An interface that adapts seamlessly to any device or theme. Work comfortably from anywhere, anytime.",
    color: "from-green-500 to-emerald-500",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 relative container mx-auto px-4">
      <div className="text-center mb-16 space-y-4">
         <h2 className="text-3xl md:text-5xl font-bold text-text-main">Why Choose StatX?</h2>
         <p className="text-text-muted text-lg max-w-2xl mx-auto">Built with the demands of modern business in mind.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: LucideIcon, title: string, description: string, color: string, index: number }) => {
    return (
        <Card 
            // p-8 დავამატე შიდა დაშორებისთვის. hover-ზე მსუბუქი აწევა დავუტოვე ინტერაქციულობისთვის
            className="group hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full p-8"
        >
            <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container - დავტოვე ფერადი ფონი, მაგრამ უფრო სუფთა სტილით */}
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-text-main mb-4">{title}</h3>
                
                <p className="text-text-muted leading-relaxed text-sm md:text-base grow">
                    {description}
                </p>
            </div>
        </Card>
    )
}

export default FeaturesGrid;