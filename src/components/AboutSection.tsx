
import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    'deploy smart contracts',
    'scale dev infrastructure', 
    'build fullstack decentralized apps',
    'integrate AI with blockchain systems',
    'design next-gen digital experiences',
    'architect cross-chain protocols'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen bg-jet-black py-20 px-6 relative overflow-hidden">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-infrared-red rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00F9FF" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-16 text-center">
          <span className="text-neon-cyan">&gt;</span> What We Do
        </h2>
        
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`font-mono text-xl md:text-2xl transition-all duration-700 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-infrared-red">$</span>
                <span className="text-white">{service}</span>
                <span className="text-neon-cyan animate-blink">_</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto leading-relaxed">
            Syn8x is a collective of engineers, builders, and architects pushing the boundaries of 
            <span className="text-neon-cyan"> Web3</span>, 
            <span className="text-purple-400"> AI</span>, and 
            <span className="text-infrared-red"> next-gen digital infrastructure</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
