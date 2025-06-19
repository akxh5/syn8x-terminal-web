import React, { useState, useEffect } from 'react';

const HeroSection = () => {
 const phrases = [
  'シンセックス',   // Japanese
  'syn8x',
  '系统八号',       // Mandarin
  'syn8x',
  'système huit x', // French
  'syn8x'
];
  
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

 useEffect(() => {
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let scrambleInterval: NodeJS.Timeout;
  let nextPhraseTimeout: NodeJS.Timeout;

  const targetPhrase = phrases[phraseIndex];
  const isSyn8x = targetPhrase === 'syn8x';

  const maxScrambles = 20;           // More frames for visible unscramble
  const scrambleSpeed = 30;          // Slightly slower per frame

  setIsScrambling(true);
  let scrambleCount = 0;

  scrambleInterval = setInterval(() => {
    if (scrambleCount < maxScrambles) {
      setCurrentText(
        Array.from({ length: targetPhrase.length }, () =>
          scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('')
      );
      scrambleCount++;
    } else {
      setCurrentText(targetPhrase);
      setIsScrambling(false);
      clearInterval(scrambleInterval);

      // syn8x stays longer (e.g. 2000ms), others (e.g. 900ms)
      const displayTime = isSyn8x ? 2000 : 900;
      nextPhraseTimeout = setTimeout(() => {
        setPhraseIndex(prev =>
          prev < phrases.length - 1 ? prev + 1 : 0
        );
      }, displayTime);
    }
  }, scrambleSpeed);

  return () => {
    clearTimeout(nextPhraseTimeout);
    clearInterval(scrambleInterval);
  };
}, [phraseIndex]);

  const handleLaunchTerminal = () => {
    setShowTerminal(true);
  };

  const scrollToServices = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="min-h-screen bg-jet-black flex items-center justify-center relative overflow-hidden">
        {/* Enhanced interactive grid pattern background */}
        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <InteractiveGridSquare key={i} index={i} />
            ))}
          </div>
        </div>
        
        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-mono font-bold text-white mb-4">
             <span className={currentText === "syn8x" ? 'text-neon-cyan' : 'text-white'}>
  {currentText}
</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl font-mono text-gray-400">
              <span>&gt;</span>
              <span className="uppercase tracking-widest">Web3 • AI • Next-Gen Infrastructure</span>
              <span className="animate-blink text-neon-cyan">_</span>
            </div>
          </div>
          
          <div className="mt-12 space-y-4">
            <button
              onClick={handleLaunchTerminal}
              className="bg-transparent border-2 border-neon-cyan text-neon-cyan px-8 py-4 font-mono uppercase tracking-wider hover:bg-neon-cyan hover:text-jet-black transition-all duration-300 hover:shadow-[0_0_20px_#00F9FF] shadow-[0_0_5px_#00F9FF] mr-4"
            >
              Launch Terminal
            </button>
            <button
              onClick={scrollToServices}
              className="bg-transparent border-2 border-steel-grey text-white px-8 py-4 font-mono uppercase tracking-wider hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
      
      {showTerminal && (
        <div className="fixed inset-0 bg-jet-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            <TerminalInterface onClose={() => setShowTerminal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

const InteractiveGridSquare = ({ index }: { index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        border transition-all duration-500 ease-out cursor-pointer
        will-change-transform transform-gpu
        ${isHovered 
          ? 'border-neon-cyan bg-neon-cyan/20 shadow-[0_0_30px_rgba(0,249,255,0.8),0_0_60px_rgba(0,249,255,0.4),0_0_90px_rgba(0,249,255,0.2)] -translate-y-4 scale-125 rounded-lg animate-pulse' 
          : 'border-neon-cyan/40 hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(0,249,255,0.3)] hover:-translate-y-1'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        animationDelay: `${(index % 12) * 0.05}s`
      }}
    />
  );
};

const TerminalInterface = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'syn8x terminal v2.1.0',
    'type "help" for available commands',
    ''
  ]);
  const [showCoreTeam, setShowCoreTeam] = useState(false);
  const [accessAttempt, setAccessAttempt] = useState(false);

  const commands = {
    help: [
      'Available commands:',
      '  help     - show this help message',
      '  about    - learn about syn8x',
      '  stack    - view our technology stack',
      '  projects - see our current projects',
      '  contact  - get in touch',
      '  core     - access core team (requires key)',
      '  clear    - clear terminal',
      '  exit     - close terminal'
    ],
    about: [
      'syn8x collective:',
      'cutting-edge tech collective building across',
      'Web3, blockchain, AI, and next-gen digital infrastructure',
      'decentralized by design'
    ],
    stack: [
      'Current tech stack:',
      '• Blockchain: Ethereum, Solana, Polygon',
      '• Frontend: React, TypeScript, Three.js',
      '• Backend: Node.js, Rust, GraphQL',
      '• AI/ML: TensorFlow, PyTorch, OpenAI',
      '• Infrastructure: Firebase, IPFS, zk-SNARKs'
    ],
    projects: [
      'Active projects:',
      '• DeFiVault - Multi-chain yield farming protocol',
      '• IdentityChain - Decentralized identity verification',
      '• NFT Marketplace - Gas-optimized creator platform',
      '• Cross-Chain Bridge - Secure asset bridging'
    ],
    contact: [
      'Contact syn8x:',
      'We don\'t pitch. We sync.',
      'Reach out through our contact form or social channels.'
    ]
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    setOutput(prev => [...prev, `> ${cmd}`]);

    if (command === 'core') {
      if (!accessAttempt) {
        setOutput(prev => [...prev, 'Enter access key:']);
        setAccessAttempt(true);
        return;
      }
    }

    if (accessAttempt && command === 'syn8x') {
      setOutput(prev => [...prev, 'Access granted. Revealing core team...', '']);
      setShowCoreTeam(true);
      setAccessAttempt(false);
      return;
    }

    if (accessAttempt && command !== 'syn8x') {
      setOutput(prev => [...prev, 'Access denied. Invalid key.', '']);
      setAccessAttempt(false);
      return;
    }

    if (command === 'clear') {
      setOutput(['syn8x terminal v2.1.0', 'type "help" for available commands', '']);
      return;
    }

    if (command === 'exit') {
      onClose();
      return;
    }

    if (commands[command as keyof typeof commands]) {
      setOutput(prev => [...prev, ...commands[command as keyof typeof commands], '']);
    } else {
      setOutput(prev => [...prev, `Command not found: ${command}`, 'Type "help" for available commands', '']);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="bg-jet-black border-2 border-neon-cyan font-mono text-sm p-6 h-96 overflow-y-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <span className="text-neon-cyan">syn8x@terminal:~$</span>
        <button 
          onClick={onClose}
          className="text-infrared-red hover:text-white transition-colors"
        >
          [ESC] close
        </button>
      </div>
      
      <div className="space-y-1 mb-4">
        {output.map((line, index) => (
          <div key={index} className="text-white">
            {line}
          </div>
        ))}
      </div>

      {showCoreTeam && <CoreTeamSection />}
      
      <div className="flex items-center space-x-2">
        <span className="text-neon-cyan">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent text-white outline-none flex-1"
          placeholder={accessAttempt ? "enter access key..." : "type command..."}
          autoFocus
        />
        <span className="animate-blink text-neon-cyan">_</span>
      </div>
    </div>
  );
};

const CoreTeamSection = () => {
  const team = [
    {
      role: 'CEO',
      handle: '@akxh_5',
      twitter: 'akxh_5',
      bio: 'Codeblooded. Vision core. Leads from the terminal.',
      color: 'border-fuchsia-500 bg-fuchsia-500/10'
    },
    {
      role: 'CTO',
      handle: '@_aryan1p',
      twitter: '_aryan1p',
      bio: 'Turns chaos into deploys. Zero to protocol in hours.',
      color: 'border-cyan-400 bg-cyan-400/10'
    },
    {
      role: 'CFO',
      handle: '@unknown_bird27',
      twitter: 'unknown_bird27',
      bio: 'The capital firewall. Math brain meets stealth ops.',
      color: 'border-emerald-400 bg-emerald-400/10'
    }
  ];

  return (
    <div className="my-6 animate-fade-in-up">
      <div className="text-neon-cyan mb-4">// the ones behind the console</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {team.map((member, index) => (
          <div 
            key={index}
            className={`${member.color} border-2 p-4 animate-fade-in-up relative overflow-hidden group`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
           <a
  href={`https://x.com/${member.twitter}`}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-2 right-3 text-neon-cyan hover:text-white z-20"
  title={`Visit ${member.handle} on X (Twitter)`}
  onClick={e => e.stopPropagation()}
>
  {/* X (Twitter) logo SVG */}
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <title>X</title>
    <path d="M17.53 2.477h3.924L14.36 10.06 22.828 21.5h-7.633l-5.34-7.26-6.096 7.26H1.831L9.97 13.16.818 2.477h7.792l4.98 6.776 5.94-6.776zm-1.356 17.563h2.176L6.61 4.15H4.27z"/>
  </svg>
</a>
            <div className="relative z-10">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{member.role}</div>
              <div className="text-white font-bold mb-2">{member.handle}</div>
              <div className="text-gray-300 text-xs leading-relaxed">{member.bio}</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
