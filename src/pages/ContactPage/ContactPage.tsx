import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-bg-main animate-in fade-in duration-500 pt-20 pb-20">
      <div className="container mx-auto px-4">
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
           {/* Left Column */}
           <div className="animate-in slide-in-from-left-6 duration-700">
             <ContactInfo />
           </div>

           {/* Right Column */}
           <div className="animate-in slide-in-from-right-6 duration-700">
             <ContactForm />
           </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;