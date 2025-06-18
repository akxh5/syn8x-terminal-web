
import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    'deploy smart contracts',
    'scale dev infrastructure', 
    'build fullstack decentralized apps',
    'integrate identity, wallets, and AI'
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
    <section id="about" ref={sectionRef} className="min-h-screen bg-jet-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
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
            Syn8x is a collective of engineers, builders, and architects pushing decentralized infrastructure forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
