
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation } from '@/utils/translations';

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  setUserName: (name: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
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
    return saved ? JSON.parse(saved) : false;
  });

  const [userName, setUserNameState] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'fi';
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
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = language;
    // Set RTL for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => getTranslation(language, key);

  return (
    <SettingsContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      userName, 
      setUserName, 
      language, 
      setLanguage,
      t
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
