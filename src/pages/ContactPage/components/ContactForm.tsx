import { Send } from 'lucide-react';

export const ContactForm = () => {
  return (
    <div className="bg-card-bg border border-border-color rounded-3xl p-6 md:p-8 shadow-sm">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 bg-input-bg border border-transparent rounded-xl focus:border-primary focus:outline-none transition-colors text-text-main placeholder:text-text-muted/50" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-input-bg border border-transparent rounded-xl focus:border-primary focus:outline-none transition-colors text-text-main placeholder:text-text-muted/50" />
            </div>
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-text-main">Email</label>
            <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-input-bg border border-transparent rounded-xl focus:border-primary focus:outline-none transition-colors text-text-main placeholder:text-text-muted/50" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-text-main">Message</label>
            <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 bg-input-bg border border-transparent rounded-xl focus:border-primary focus:outline-none transition-colors text-text-main placeholder:text-text-muted/50 resize-none"></textarea>
        </div>

        <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-2">
            <Send size={18} /> Send Message
        </button>
      </form>
    </div>
  );
};