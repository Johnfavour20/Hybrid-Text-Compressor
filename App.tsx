
import React, { useState, useCallback, useMemo } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { ToastProvider } from './components/Toast';
import { User } from './types';

type Page = 'home' | 'login' | 'register' | 'dashboard';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  registerAndLogin: (user: User) => void;
  logout: () => void;
  navigateTo: (page: Page) => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  }, []);
  
  const registerAndLogin = useCallback((newUser: User) => {
    setUser(newUser);
    setCurrentPage('dashboard');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage('home');
  }, []);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const authContextValue = useMemo(() => ({ user, login, registerAndLogin, logout, navigateTo }), [user, login, registerAndLogin, logout, navigateTo]);

  const renderPage = () => {
    if (user) {
      // If user is logged in, always show the dashboard
      return <DashboardPage />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <ToastProvider>
      <AuthContext.Provider value={authContextValue}>
        <div className="bg-slate-50 text-slate-800 min-h-screen">
          {renderPage()}
        </div>
      </AuthContext.Provider>
    </ToastProvider>
  );
};

export default App;
