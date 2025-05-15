
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Try to get language from localStorage, default to 'en'
    try {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      return savedLanguage || 'en';
    } catch (e) {
      // In case localStorage is not available
      return 'en';
    }
  });

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    
    try {
      localStorage.setItem('selectedLanguage', language);
    } catch (e) {
      console.error('Could not save language preference to localStorage', e);
    }
    
    // Set the html lang attribute
    document.documentElement.lang = language;
    
    // Set direction for RTL languages
    const rtlLanguages = ['ar', 'fa', 'ur', 'ps', 'ku'];
    document.documentElement.dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    // Set initial language attributes when component mounts
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      document.documentElement.lang = savedLanguage;
      
      const rtlLanguages = ['ar', 'fa', 'ur', 'ps', 'ku'];
      document.documentElement.dir = rtlLanguages.includes(savedLanguage) ? 'rtl' : 'ltr';
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
