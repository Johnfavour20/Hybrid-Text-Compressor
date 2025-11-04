
import React, { useContext } from 'react';
import Icon from './Icon';
import { AuthContext } from '../App';

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-3 font-bold text-xl text-blue-500 cursor-pointer"
            onClick={() => auth?.navigateTo(auth.user ? 'dashboard' : 'home')}
          >
            <Icon name="compress" className="w-7 h-7" />
            <span>Hybrid Compressor</span>
          </div>
          <div className="flex items-center gap-4">
            {auth?.user ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-800 hidden sm:inline">Welcome, {auth.user.username}</span>
                <button
                  onClick={() => auth?.navigateTo('dashboard')}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-500 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <Icon name="tachometer" className="w-5 h-5" />
                  <span className="font-medium text-sm">Dashboard</span>
                </button>
                <button 
                  onClick={auth.logout} 
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <Icon name="sign-out" className="w-5 h-5" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => auth?.navigateTo('login')} 
                  className="text-slate-600 hover:text-blue-500 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={() => auth?.navigateTo('register')} 
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Hybrid Text Compression System. Implementing Huffman & LZW Algorithms.
        </p>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
