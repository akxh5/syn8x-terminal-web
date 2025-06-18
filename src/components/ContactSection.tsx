
import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="min-h-screen bg-steel-grey py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-8 text-center">
          <span className="text-neon-cyan">&gt;</span> Contact
        </h2>
        
        <p className="text-center text-gray-400 font-mono text-lg mb-16 italic">
          We don't pitch. We sync.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <label className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-jet-black border-2 ${
                  focusedField === 'name' ? 'border-neon-cyan' : 'border-steel-grey'
                } p-4 text-white font-mono focus:outline-none transition-all duration-300 ${
                  focusedField === 'name' ? 'animate-neon-pulse' : ''
                }`}
                required
              />
            </div>
            
            <div className="relative">
              <label className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-jet-black border-2 ${
                  focusedField === 'email' ? 'border-neon-cyan' : 'border-steel-grey'
                } p-4 text-white font-mono focus:outline-none transition-all duration-300 ${
                  focusedField === 'email' ? 'animate-neon-pulse' : ''
                }`}
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={6}
              className={`w-full bg-jet-black border-2 ${
                focusedField === 'message' ? 'border-neon-cyan' : 'border-steel-grey'
              } p-4 text-white font-mono focus:outline-none transition-all duration-300 resize-none ${
                focusedField === 'message' ? 'animate-neon-pulse' : ''
              }`}
              required
            />
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-transparent border-2 border-neon-cyan text-neon-cyan px-12 py-4 font-mono uppercase tracking-wider hover:bg-neon-cyan hover:text-jet-black transition-all duration-300 animate-neon-pulse"
            >
              Sync_Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
