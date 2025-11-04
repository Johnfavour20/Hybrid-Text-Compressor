
import React, { useState, useContext } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../components/Toast';
import { AuthContext } from '../App';
import Layout from '../components/Layout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    setIsLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if(email === 'test@example.com' && password === 'password123'){
        addToast('Login successful!', 'success');
        auth?.login({ username: 'TestUser', email: email });
    } else {
        addToast('Invalid email or password', 'error');
    }
    
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
          {/* Form Side */}
          <div className="p-6 sm:p-10">
            <div className="text-center mb-8">
              <Icon name="sign-in" className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
              <p className="text-slate-500 mt-2">Sign in to your account to continue compressing.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Icon name="envelope" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div className="relative">
                <Icon name="lock" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} className="w-5 h-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isLoading && <Icon name="spinner" className="w-5 h-5" />}
                <span>Sign In</span>
                {!isLoading && <Icon name="arrow-right" className="w-5 h-5" />}
              </button>
            </form>
            <div className="text-center mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => auth?.navigateTo('register')} className="font-semibold text-blue-500 hover:underline">
                  Create one here
                </button>
              </p>
            </div>
          </div>

          {/* Visual Side */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Secure & Efficient</h3>
            <p className="text-blue-200 mb-8">
              Your text files are processed with industry-standard security and cutting-edge compression algorithms.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Icon name="shield" className="w-6 h-6 text-amber-300" />
                <span className="font-medium">Secure Processing</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Icon name="compress-arrows" className="w-6 h-6 text-amber-300" />
                <span className="font-medium">Hybrid Algorithm</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Icon name="chart-line" className="w-6 h-6 text-amber-300" />
                <span className="font-medium">Optimal Ratios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
