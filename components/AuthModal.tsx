
import React, { useState } from 'react';
import { User, AuthMode } from '../types';
import CloseIcon from './icons/CloseIcon';

interface AuthModalProps {
  mode: NonNullable<AuthMode>;
  onClose: () => void;
  onSignIn: (user: User) => void;
  onSignUp: (user: User) => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSignIn, onSignUp, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isSigningUp = mode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const user: User = { email };
    if (isSigningUp) {
      onSignUp(user);
    } else {
      onSignIn(user);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <CloseIcon />
        </button>
        
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
          {isSigningUp ? 'Create Your Account' : 'Sign In to AgroSafi'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => onSwitchMode(isSigningUp ? 'signin' : 'signup')}
            className="text-sm text-green-400 hover:underline"
          >
            {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
