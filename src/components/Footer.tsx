
import React from 'react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: '#', symbol: 'GH' },
    { name: 'Farcaster', url: '#', symbol: 'FC' },
    { name: 'X (Twitter)', url: '#', symbol: 'X' }
  ];

  return (
    <footer className="bg-jet-black border-t border-steel-grey py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-gray-400 font-mono text-sm">
            © Syn8x // Built with intent
          </div>
          
          <div className="flex space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-mono text-sm border border-steel-grey hover:border-neon-cyan px-3 py-2 hover:animate-neon-pulse"
              >
                {link.symbol}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 font-mono text-xs">
            <span>&gt;</span>
            <span>system.status</span>
            <span className="text-neon-cyan animate-blink">●</span>
            <span>online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
