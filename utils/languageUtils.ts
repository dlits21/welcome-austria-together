
import globalTranslations from '../data/language/global.json';
import homeTranslations from '../data/language/home.json';
import indexTranslations from '../data/language/index.json';
import assistantTranslations from '../data/language/assistant.json';
import askTranslations from '../data/language/ask.json';
import askGeneralTranslations from '../data/language/ask/general.json';
import askEmergencyTranslations from '../data/language/ask/emergency.json';
import askLegalTranslations from '../data/language/ask/legal-support.json';

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
  const translation = assistantTranslations?.[languageCode as keyof typeof assistantTranslations] || assistantTranslations?.en
  return translation?.[key as keyof typeof translation] || key;
};

export const getAskText = (key: string, languageCode: string): string => {
  const translation = askTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getAskGeneralText = (key: string, languageCode: string): string => {
  const translation = askGeneralTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getAskEmergencyText = (key: string, languageCode: string): string => {
  const translation = askEmergencyTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

export const getAskLegalText = (key: string, languageCode: string): string => {
  const translation = askLegalTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};
