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
  const [taglineText, setTaglineText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const taglineWords = ['Web3.', 'AI.', 'Next-gen infrastructure.'];

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

          nextPhraseTimeout = setTimeout(() => {
            setPhraseIndex(prev => (prev + 1) % phrases.length);
          }, 1500);
        }
      }, 50);
    };

    const timeout = setTimeout(startScramble, phraseIndex === 0 ? 0 : 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(nextPhraseTimeout);
      clearInterval(scrambleInterval);
    };
  }, [phraseIndex]);

  useEffect(() => {
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let typingTimeout: NodeJS.Timeout;

    const typeText = () => {
      if (currentWordIndex < taglineWords.length) {
        const currentWord = taglineWords[currentWordIndex];

        if (currentCharIndex < currentWord.length) {
          setTaglineText(prev => prev + currentWord[currentCharIndex]);
          currentCharIndex++;
          typingTimeout = setTimeout(typeText, 100);
        } else {
          setTaglineText(prev => prev + ' ');
          currentWordIndex++;
          currentCharIndex = 0;
          typingTimeout = setTimeout(typeText, 800);
        }
      }
    };

    setTaglineText('');
    typingTimeout = setTimeout(typeText, 500);

    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

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
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-neon-cyan/20"></div>
            ))}
          </div>
        </div>

        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-mono font-bold mb-6">
              <span className={`transition-all duration-1000 ${
                phraseIndex === 3
                  ? 'text-neon-cyan'
                  : 'text-white'
              } ${phraseIndex === 3 ? 'drop-shadow-[0_0_8px_rgba(0,249,255,0.3)]' : ''}`}>
                {currentText || 'SYN8X'}
              </span>
            </h1>

            <div className="h-16 flex items-center justify-center">
              <div className="text-xl md:text-2xl font-mono text-gray-300 tracking-wider">
                <span>&gt;</span>
                <span className="ml-2 uppercase">{taglineText}</span>
                <span className={`ml-1 text-neon-cyan ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <button
              onClick={handleLaunchTerminal}
              aria-label="Launch Terminal"
              className="bg-transparent border-2 border-neon-cyan text-neon-cyan px-8 py-4 font-mono uppercase tracking-wider hover:bg-neon-cyan hover:text-jet-black transition-all duration-300 hover:shadow-[0_0_20px_#00F9FF] shadow-[0_0_5px_#00F9FF] mr-4"
            >
              Launch Terminal
            </button>
            <button
              onClick={scrollToServices}
              className="bg-transparent border-2 border-steel-grey text-white px-8 py-4 font-mono uppercase tracking-wider hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_15px_#00F9FF] transition-all duration-300"
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

export default HeroSection;
