
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Default to false instead of checking system preference
    return saved ? JSON.parse(saved) : false;
  });

  const [userName, setUserNameState] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  return (
    <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode, userName, setUserName }}>
      {children}
    </SettingsContext.Provider>
  );
};
