
import React, { useState, useContext } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../components/Toast';
import { AuthContext } from '../App';
import Layout from '../components/Layout';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters long', 'error');
      return;
    }
    setIsLoading(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addToast('Registration successful! Welcome!', 'success');

    auth?.registerAndLogin({ username, email });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
          {/* Form Side */}
          <div className="p-6 sm:p-10">
            <div className="text-center mb-8">
              <Icon name="user-plus" className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
              <p className="text-slate-500 mt-2">Join us to start compressing your files efficiently.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Icon name="user" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
              </div>
              <div className="relative">
                <Icon name="envelope" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
              </div>
              <div className="relative">
                <Icon name="lock" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"><Icon name={showPassword ? 'eye-slash' : 'eye'} className="w-5 h-5" /></button>
              </div>
              <div className="relative">
                <Icon name="lock" className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"><Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} className="w-5 h-5" /></button>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md">
                {isLoading && <Icon name="spinner" className="w-5 h-5" />}
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                {!isLoading && <Icon name="arrow-right" className="w-5 h-5" />}
              </button>
            </form>
            <div className="text-center mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-500">Already have an account? <button onClick={() => auth?.navigateTo('login')} className="font-semibold text-blue-500 hover:underline">Sign in here</button></p>
            </div>
          </div>

          {/* Visual Side */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
            <p className="text-blue-200 mb-8">Get access to advanced text compression features and track your compression history.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"><Icon name="history" className="w-6 h-6 text-amber-300" /><span>Track History</span></div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"><Icon name="cloud-upload" className="w-6 h-6 text-amber-300" /><span>Easy Upload</span></div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"><Icon name="download" className="w-6 h-6 text-amber-300" /><span>Quick Download</span></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
