import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  setUserName: (name: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  showVolunteers: boolean;
  setShowVolunteers: (show: boolean) => void;
  showBackup: boolean;
  setShowBackup: (show: boolean) => void;
  showNotes: boolean;
  setShowNotes: (show: boolean) => void;
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

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'fi';
  });

  const [showVolunteers, setShowVolunteersState] = useState(() => {
    const saved = localStorage.getItem('showVolunteers');
    return saved ? JSON.parse(saved) : true;
  });

  const [showBackup, setShowBackupState] = useState(() => {
    const saved = localStorage.getItem('showBackup');
    return saved ? JSON.parse(saved) : true;
  });

  const [showNotes, setShowNotesState] = useState(() => {
    const saved = localStorage.getItem('showNotes');
    return saved ? JSON.parse(saved) : true;
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

  useEffect(() => {
    localStorage.setItem('showVolunteers', JSON.stringify(showVolunteers));
  }, [showVolunteers]);

  useEffect(() => {
    localStorage.setItem('showBackup', JSON.stringify(showBackup));
  }, [showBackup]);

  useEffect(() => {
    localStorage.setItem('showNotes', JSON.stringify(showNotes));
  }, [showNotes]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const setShowVolunteers = (show: boolean) => {
    setShowVolunteersState(show);
  };

  const setShowBackup = (show: boolean) => {
    setShowBackupState(show);
  };

  const setShowNotes = (show: boolean) => {
    setShowNotesState(show);
  };

  return (
    <SettingsContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      userName, 
      setUserName, 
      language, 
      setLanguage,
      showVolunteers,
      setShowVolunteers,
      showBackup,
      setShowBackup,
      showNotes,
      setShowNotes
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
