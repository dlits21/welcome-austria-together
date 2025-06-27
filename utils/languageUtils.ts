
import globalTranslations from '../data/language/global.json';
import homeTranslations from '../data/language/home.json';
import indexTranslations from '../data/language/index.json';
import assistantTranslations from '../data/language/assistant.json';

export const getGlobalText = (key: string, languageCode: string): string => {
  const translation = globalTranslations[key as keyof typeof globalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getHomeText = (key: string, languageCode: string): string => {
  const keys = key.split('.');
  let translation: any = homeTranslations;
  
  for (const k of keys) {
    translation = translation?.[k];
  }
  
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getIndexText = (key: string, languageCode: string): string => {
  const keys = key.split('.');
  let translation: any = indexTranslations;
  
  for (const k of keys) {
    translation = translation?.[k];
  }
  
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getAssistantText = (key: string, languageCode: string): string => {
  const translation = assistantTranslations[key as keyof typeof assistantTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};
