import { Github, Twitter, Linkedin, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-card-bg border-t border-border-color pt-16 pb-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-main">Stat<span className="text-primary">X</span></h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Advanced analytics platform for modern businesses.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          <div>
            <h4 className="text-text-main font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink text="Overview" />
              <FooterLink text="Features" />
              <FooterLink text="Integrations" />
              <FooterLink text="Pricing" />
            </ul>
          </div>

          <div>
            <h4 className="text-text-main font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink text="Documentation" />
              <FooterLink text="API Reference" />
              <FooterLink text="Community" />
              <FooterLink text="Help Center" />
            </ul>
          </div>

          <div>
            <h4 className="text-text-main font-semibold mb-6">Stay Updated</h4>
            <div className="flex relative">
              <input 
                type="email" placeholder="Enter your email" 
                className="w-full bg-input-bg border border-border-color rounded-lg py-2.5 pl-4 pr-12 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-1 top-1 p-1.5 bg-primary rounded-md text-white hover:opacity-90 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>

        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-text-muted transition-colors duration-300">
    
            <p className="whitespace-nowrap font-medium">
              &copy; {new Date().getFullYear()} StatX Inc. All rights reserved.
            </p>
            
            <div className="flex items-center gap-8 whitespace-nowrap">
              <span className="hover:text-primary cursor-pointer transition-colors duration-200">
                Privacy Policy
              </span>
              <span className="hover:text-primary cursor-pointer transition-colors duration-200">
                Terms of Service
              </span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-dark-bg transition-all duration-300">
    <Icon size={16} />
  </a>
);

const FooterLink = ({ text }: { text: string }) => (
  <li>
    <a href="#" className="hover:text-primary transition-colors block w-fit">{text}</a>
  </li>
);