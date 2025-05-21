import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setCurrentLanguage: () => {},
  selectedLanguage: null,
  setSelectedLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        console.log('Loading saved language:', savedLanguage);
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage);
          setSelectedLanguage(savedLanguage);
        } else {
          console.log('No saved language found, using default: en');
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };
    loadLanguage();
  }, []);

  const updateLanguage = async (language: string) => {
    console.log('Updating language to:', language);
    setCurrentLanguage(language);
    setSelectedLanguage(language);
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      console.log('Successfully saved language to AsyncStorage');
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setCurrentLanguage: updateLanguage, 
      selectedLanguage, 
      setSelectedLanguage: updateLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
