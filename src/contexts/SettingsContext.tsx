
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  setUserName: (name: string) => void;
  language: string;
  setLanguage: (language: string) => void;
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

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'fi';
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

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  return (
    <SettingsContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      userName, 
      setUserName, 
      language, 
      setLanguage 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
