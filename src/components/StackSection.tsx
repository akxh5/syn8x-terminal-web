
import React, { useEffect, useRef, useState } from 'react';

const StackSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const techStack = [
    { name: 'Ethereum', category: 'Blockchain' },
    { name: 'Solana', category: 'Blockchain' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Firebase', category: 'Cloud' },
    { name: 'zk-SNARKs', category: 'Privacy' },
    { name: 'Web3.js', category: 'Web3' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Rust', category: 'Language' },
    { name: 'GraphQL', category: 'API' },
    { name: 'IPFS', category: 'Storage' },
    { name: 'Polygon', category: 'Scaling' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            techStack.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 100);
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
    <section id="stack" ref={sectionRef} className="min-h-screen bg-steel-grey py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-16 text-center">
          <span className="text-neon-cyan">&gt;</span> Our Stack
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className={`group bg-jet-black border border-steel-grey hover:border-neon-cyan p-6 transition-all duration-500 cursor-pointer ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center">
                <h3 className="font-mono text-white text-lg mb-2 group-hover:text-neon-cyan transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {tech.category}
                </p>
              </div>
              <div className="mt-4 h-1 bg-steel-grey group-hover:bg-neon-cyan transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
