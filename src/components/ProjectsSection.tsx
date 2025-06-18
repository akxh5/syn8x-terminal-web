
import React, { useState } from 'react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: 'DeFiVault',
      description: 'Multi-chain yield farming protocol with advanced risk management',
      status: 'Live on Mainnet'
    },
    {
      name: 'IdentityChain',
      description: 'Decentralized identity verification system using zk-proofs',
      status: 'Beta Testing'
    },
    {
      name: 'NFT Marketplace',
      description: 'Gas-optimized marketplace for creators and collectors',
      status: 'Development'
    },
    {
      name: 'Cross-Chain Bridge',
      description: 'Secure asset bridging between Ethereum and Solana',
      status: 'Audit Phase'
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-jet-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-16 text-center">
          <span className="text-neon-cyan">&gt;</span> Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-steel-grey border border-steel-grey hover:border-neon-cyan p-8 transition-all duration-500 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-2xl text-white group-hover:text-neon-cyan transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-infrared-red text-sm font-mono">
                    [{project.status}]
                  </span>
                </div>
                
                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-2 text-neon-cyan font-mono text-sm">
                  <span>&gt;</span>
                  <span>view_details</span>
                  <span className={`transition-opacity duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                    _
                  </span>
                </div>
              </div>
              
              {/* Animated background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-infrared-red/10 transition-opacity duration-500 ${
                hoveredProject === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
