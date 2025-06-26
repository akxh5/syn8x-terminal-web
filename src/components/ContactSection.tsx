import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration (replace with your actual keys if they differ)
const firebaseConfig = {
apiKey: "AIzaSyDEbp6B4LhwHba0GrTfhSg_wX3yTQwVN-A",
  authDomain: "syn8x-2636e.firebaseapp.com",
  projectId: "syn8x-2636e",
  storageBucket: "syn8x-2636e.firebasestorage.app",
  messagingSenderId: "796151677095",
  appId: "1:796151677095:web:1cb426d674486a76b3db82",
  measurementId: "G-GXP8YFCBMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | React.TextareaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      // Add a new document with a generated ID to the "contacts" collection
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date() // Add a timestamp for when the message was sent
      });
      console.log('Form submitted:', formData);
      setSubmissionStatus('success');
      // Optionally clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
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
              <label htmlFor="name" className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
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
              <label htmlFor="email" className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
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
            <label htmlFor="message" className="block text-neon-cyan font-mono text-sm mb-2 uppercase tracking-wider">
              Message
            </label>
            <textarea
              id="message"
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
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' ? 'Syncing...' : 'Sync_Message'}
            </button>
            {submissionStatus === 'success' && (
              <p className="text-green-400 font-mono mt-4">Message synced successfully!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="text-red-400 font-mono mt-4">Failed to sync message. Please try again.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
