
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const phrases = [
    'シンセックス',
    'Système Huit X',
    '系统八号',
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

    const startScramble = () => {
      setIsScrambling(true);
      const targetPhrase = phrases[phraseIndex];
      let scrambleCount = 0;
      const maxScrambles = 20;

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
          
          if (phraseIndex < phrases.length - 1) {
            nextPhraseTimeout = setTimeout(() => {
              setPhraseIndex(prev => prev + 1);
            }, 1000);
          }
        }
      }, 50);
    };

    const timeout = setTimeout(startScramble, phraseIndex * 2000);

    return () => {
      clearTimeout(timeout);
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
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-neon-cyan/20"></div>
            ))}
          </div>
        </div>
        
        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-mono font-bold text-white mb-4">
              <span className={`${phraseIndex === phrases.length - 1 ? 'text-neon-cyan' : 'text-white'}`}>
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
      bio: 'System architect. Vision core. Runs on caffeine and code.',
      color: 'border-purple-500 bg-purple-500/10'
    },
    {
      role: 'CTO',
      handle: '@_aryan1p',
      bio: 'Zero to protocol in hours. Fullstack generalist, crypto-native.',
      color: 'border-neon-cyan bg-neon-cyan/10'
    },
    {
      role: 'CFO',
      handle: '@unknown_bird27',
      bio: 'The capital firewall. Math brain meets stealth ops.',
      color: 'border-green-500 bg-green-500/10'
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
