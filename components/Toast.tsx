
import React, { createContext, useState, useCallback, useContext } from 'react';
import Icon from './Icon';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 6000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toastStyles = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
  };

  const iconMap: { [key in ToastType]: 'check-circle' | 'exclamation-circle' } = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-circle',
    info: 'exclamation-circle'
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-8 right-8 z-[1100] flex flex-col gap-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between gap-4 w-full max-w-sm p-4 rounded-lg shadow-lg text-white ${toastStyles[toast.type]} animate-fade-in-right`}
          >
            <div className="flex items-center gap-3">
              <Icon name={iconMap[toast.type]} className="w-6 h-6"/>
              <span className="font-medium">{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="p-1 rounded-full hover:bg-white/20">
              <Icon name="times" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
