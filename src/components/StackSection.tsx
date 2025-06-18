
import React, { useEffect, useRef, useState } from 'react';

const StackSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const techStack = [
    { name: 'Ethereum', category: 'Blockchain' },
    { name: 'Solana', category: 'Blockchain' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'React', category: 'Frontend' },
    { name: 'Three.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Rust', category: 'Language' },
    { name: 'Firebase', category: 'Cloud' },
    { name: 'OpenAI', category: 'AI/ML' },
    { name: 'zk-SNARKs', category: 'Privacy' },
    { name: 'Web3.js', category: 'Web3' },
    { name: 'TypeScript', category: 'Language' },
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML': return 'group-hover:border-purple-500 group-hover:text-purple-400';
      case 'Blockchain': return 'group-hover:border-neon-cyan group-hover:text-neon-cyan';
      case 'Frontend': return 'group-hover:border-green-400 group-hover:text-green-400';
      case 'Backend': return 'group-hover:border-blue-400 group-hover:text-blue-400';
      case 'Language': return 'group-hover:border-yellow-400 group-hover:text-yellow-400';
      case 'Privacy': return 'group-hover:border-infrared-red group-hover:text-infrared-red';
      default: return 'group-hover:border-neon-cyan group-hover:text-neon-cyan';
    }
  };

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
              className={`group bg-jet-black border border-steel-grey transition-all duration-500 cursor-pointer p-6 ${getCategoryColor(tech.category)} ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center">
                <h3 className="font-mono text-white text-lg mb-2 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {tech.category}
                </p>
              </div>
              <div className="mt-4 h-1 bg-steel-grey transition-colors duration-300 group-hover:bg-current"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
