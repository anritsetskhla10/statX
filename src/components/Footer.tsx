import { Github, Twitter, Linkedin, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#161625] border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* ზედა ნაწილი: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* სვეტი 1: ბრენდი და აღწერა */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Stat<span className="text-neon-blue">X</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced analytics platform for modern businesses. visualize your data with electric speed and precision.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* სვეტი 2: ლინკები */}
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink text="Overview" />
              <FooterLink text="Features" />
              <FooterLink text="Integrations" />
              <FooterLink text="Pricing" />
            </ul>
          </div>

          {/* სვეტი 3: რესურსები */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <FooterLink text="Documentation" />
              <FooterLink text="API Reference" />
              <FooterLink text="Community" />
              <FooterLink text="Help Center" />
            </ul>
          </div>

          {/* სვეტი 4: Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest stats and updates directly to your inbox.</p>
            <div className="flex relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
              />
              <button className="absolute right-1 top-1 p-1.5 bg-neon-blue rounded-md text-dark-bg hover:bg-white transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ქვედა ნაწილი: ხაზი და Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} StatX Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// დამხმარე პატარა კომპონენტები ფუტერისთვის (კოდის გასასუფთავებლად)
const SocialIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-blue hover:text-dark-bg transition-all duration-300">
    <Icon size={16} />
  </a>
);

const FooterLink = ({ text }: { text: string }) => (
  <li>
    <a href="#" className="hover:text-neon-blue transition-colors block w-fit">{text}</a>
  </li>
);