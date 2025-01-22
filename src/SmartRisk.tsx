import React, { useState } from 'react';
import { ArrowLeft, Rocket, Shield, LineChart, Brain, Calculator, Target, BarChart3, Check, X } from 'lucide-react';
import { supabase } from './lib/supabase';

function SmartRisk() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const { error: waitlistError } = await supabase
        .from('smartrisk_waitlist')
        .insert([{ email }]);

      if (waitlistError) throw waitlistError;

      setStatus('success');
      setMessage('Thanks for joining the waitlist! We\'ll keep you updated on SmartRisk\'s launch.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(
        error.code === '23505' 
          ? 'You\'re already on the waitlist!' 
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100">
      {/* Navigation */}
      <div className="absolute top-8 left-8">
        <a 
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light">Back home</span>
        </a>
      </div>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-8">
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-light">Launching Q2 2024</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-cal font-semibold tracking-tightest bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-relaxed pb-4">
            Professional Risk Management Made Simple
          </h1>
          
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Advanced position sizing, real-time risk monitoring, and AI-powered insights for professional traders and prop firms.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl font-medium mb-4">Join the Future of Risk Management</h2>
          <p className="text-zinc-400 font-light mb-6">Get early access and exclusive benefits by joining our waitlist today.</p>
          
          {status === 'success' ? (
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-8 space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-400/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-green-400">You're on the list!</h3>
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
                  disabled={status === 'loading'}
                  className="flex-1 bg-zinc-800/30 border border-zinc-700/50 rounded-xl px-4 py-3 text-sm font-light placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
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

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <Calculator className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Position Calculator</h3>
            <p className="text-zinc-400 font-light">Calculate exact position sizes with real-time pip values across forex, indices, and metals.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Support for all major pairs</li>
              <li>• Real-time pip calculations</li>
              <li>• Dynamic position sizing</li>
              <li>• Stop loss in pips or price</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Risk Management</h3>
            <p className="text-zinc-400 font-light">Monitor and manage your risk with real-time alerts and customizable thresholds.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Real-time drawdown monitoring</li>
              <li>• Custom risk thresholds</li>
              <li>• Daily loss limits</li>
              <li>• Risk level warnings</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <Brain className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">NextMove Pro AI</h3>
            <p className="text-zinc-400 font-light">AI-powered insights based on your performance and market conditions.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Position size recommendations</li>
              <li>• Risk analysis</li>
              <li>• Performance optimization</li>
              <li>• Drawdown management</li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <Target className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Active Zone Trading</h3>
            <p className="text-zinc-400 font-light">Optimize your trading with customizable risk zones and strategy-based limits.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Risk per trade limits</li>
              <li>• Max trades per day</li>
              <li>• Strategy alignment</li>
              <li>• Zone-based alerts</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <LineChart className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Performance Tracking</h3>
            <p className="text-zinc-400 font-light">Monitor your trading performance with detailed metrics and insights.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Win rate analysis</li>
              <li>• Risk of ruin calculator</li>
              <li>• Performance metrics</li>
              <li>• Strategy optimization</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
            <BarChart3 className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">Advanced Analytics</h3>
            <p className="text-zinc-400 font-light">Make data-driven decisions with sophisticated risk analysis tools.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Value at Risk (VaR)</li>
              <li>• Monte Carlo simulations</li>
              <li>• Risk metrics</li>
              <li>• Performance analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartRisk;