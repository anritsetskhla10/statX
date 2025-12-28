import { Github,  Linkedin, Send, Facebook } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card-bg border-t border-border-color pt-16 pb-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Socials */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-text-main flex items-center gap-1">
              Stat<span className="text-primary">X</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Empowering businesses with advanced analytics and AI-driven insights to make smarter decisions.
            </p>
            <div className="flex gap-3 pt-2">
              <SocialIcon Icon={Github} href="https://github.com" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com" />
              <SocialIcon Icon={Facebook} href="https://facebook.com" />
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-text-main font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/features" text="Features" />
              <FooterLink to="/dashboard" text="Dashboard" />
              <FooterLink to="/pricing" text="Pricing" />
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-text-main font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact" />
              <FooterLink to="/careers" text="Careers" />
              <FooterLink to="/blog" text="Blog" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-text-main font-semibold mb-6">Stay Updated</h4>
            <p className="text-text-muted text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="flex relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-input-bg border border-border-color rounded-lg py-2.5 pl-4 pr-12 text-sm text-text-main focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 p-1.5 bg-primary rounded-md text-white hover:opacity-90 transition-colors shadow-sm"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section (Copyright) */}
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p className="font-medium">
            &copy; {currentYear} StatX Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper Components

const SocialIcon = ({ Icon, href }: { Icon: React.ElementType, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="h-9 w-9 rounded-full bg-input-bg border border-border-color flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ text, to }: { text: string, to: string }) => (
  <li>
    <Link 
      to={to} 
      className="hover:text-primary hover:translate-x-1 transition-all duration-200 block w-fit"
    >
      {text}
    </Link>
  </li>
);