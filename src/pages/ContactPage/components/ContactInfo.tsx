import { Mail, MapPin, Phone } from 'lucide-react';

export const ContactInfo = () => {
  const info = [
    { icon: Mail, title: "Email", text: "support@statx.com", link: "mailto:support@statx.com" },
    { icon: Phone, title: "Phone", text: "+1 (555) 000-1234", link: "tel:+15550001234" },
    { icon: MapPin, title: "Office", text: "Tbilisi, Georgia", link: "#" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text-main mb-6">Get in touch</h2>
      <p className="text-text-muted mb-8">
        Have questions about plans, integrations, or custom solutions? We’re here to help.
      </p>

      <div className="grid gap-4">
        {info.map((item, idx) => (
            <a key={idx} href={item.link} className="flex items-center gap-4 p-4 bg-card-bg border border-border-color rounded-2xl hover:border-primary transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-text-main">{item.title}</h4>
                    <p className="text-text-muted text-sm">{item.text}</p>
                </div>
            </a>
        ))}
      </div>
    </div>
  );
};