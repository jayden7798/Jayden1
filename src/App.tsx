import React, { useState } from 'react';
import { ArrowRight, LineChart, Building2, Check, X } from 'lucide-react';
import { SocialLinks } from './components/ui/social-links';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const socials = [
    {
      name: "Instagram",
      image: "https://cdn.simpleicons.org/instagram/E4405F",
      href: "https://www.instagram.com/jaydenshepherd___/"
    },
    {
      name: "YouTube",
      image: "https://cdn.simpleicons.org/youtube/FF0000",
      href: "https://www.youtube.com/@jayden.shepherd"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // TODO: Integrate with newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thanks for subscribing! You\'ll receive updates on my latest projects and thoughts.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12 relative">
        {/* Decorative element */}
        <div className="absolute -inset-x-20 -top-20 -z-10">
          <div className="w-full h-40 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-30" />
        </div>

        {/* Profile Section */}
        <div className="text-center px-8 -mt-12">
          <h1 className="text-6xl md:text-7xl font-cal font-semibold tracking-tightest bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-relaxed pb-4">
            I like building cool things
          </h1>
        </div>

        {/* Social Links */}
        <div className="flex justify-center">
          <SocialLinks socials={socials} />
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-cal font-medium tracking-tight">Join My Newsletter</h2>
            <p className="text-zinc-400 text-sm font-light">Get updates on my latest projects and thoughts.</p>
          </div>
          
          {status === 'success' ? (
            <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-8 space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-400/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-green-400">You're subscribed!</h3>
              <p className="text-zinc-400 font-light">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 bg-zinc-800/30 border border-zinc-800/50 rounded-xl px-4 py-3 text-sm font-light placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-zinc-100 text-zinc-900 px-4 py-3 rounded-xl font-medium text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {status === 'error' && message && (
                <div className="flex items-center justify-center gap-2 text-sm text-red-400">
                  <X className="w-4 h-4" />
                  {message}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Links Section */}
        <div className="grid gap-3">
          <a
            href="/smartrisk"
            className="group relative flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 backdrop-blur-sm border border-zinc-800/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="flex items-center gap-2 font-light tracking-tight relative z-10">
              <Building2 className="w-5 h-5" />
              SmartRisk
            </span>
            <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors relative z-10">
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <a
              href="https://www.darwinexzero.com/darwin/HSNY/performance"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 backdrop-blur-sm border border-zinc-800/50 transition-all duration-300 w-full md:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="flex items-center gap-2 font-light tracking-tight relative z-10">
                <LineChart className="w-5 h-5" />
                DarwinexZero
              </span>
              <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors relative z-10">
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <div className="px-4 md:px-0 flex items-center gap-2">
              <div className="h-4 w-[1px] bg-zinc-700/50 hidden md:block" />
              <p className="text-sm bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent font-light">
                My verified trading track record since 2023, risking just 0.3% per trade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="absolute bottom-4 text-sm text-zinc-500 font-light">
        © 2025 jaydenshepherd
      </div>
    </div>
  );
}

export default App;