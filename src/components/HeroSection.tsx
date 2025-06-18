
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

  const scrollToServices = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
            <span className={`${phraseIndex === phrases.length - 1 ? 'text-neon-cyan animate-glow' : 'text-white'}`}>
              {currentText}
            </span>
          </h1>
          <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl font-mono text-gray-400">
            <span>&gt;</span>
            <span className="uppercase tracking-widest">decentralized by design</span>
            <span className="animate-blink text-neon-cyan">_</span>
          </div>
        </div>
        
        <div className="mt-12">
          <button
            onClick={scrollToServices}
            className="bg-transparent border-2 border-neon-cyan text-neon-cyan px-8 py-4 font-mono uppercase tracking-wider hover:bg-neon-cyan hover:text-jet-black transition-all duration-300 animate-neon-pulse"
          >
            Launch Terminal
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
