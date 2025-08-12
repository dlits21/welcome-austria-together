import globalTranslations from '../data/language/global.json';
import homeTranslations from '../data/language/home.json';
import indexTranslations from '../data/language/index.json';
import assistantTranslations from '../data/language/assistant.json';
import askTranslations from '../data/language/ask.json';
import askGeneralTranslations from '../data/language/ask/general.json';
import askEmergencyTranslations from '../data/language/ask/emergency.json';
import askLegalTranslations from '../data/language/ask/legal-support.json';
import askHealthTranslations from '../data/language/ask/health.json';
import askFinancialTranslations from '../data/language/ask/financial-support.json';
import askCulturalTranslations from '../data/language/ask/cultural.json';
import askCareerTranslations from '../data/language/ask/career.json';
import askDocumentTranslations from '../data/language/ask/document.json';
import informationGermanLearningTranslations from '../data/language/information/german-learning.json';

export const getGlobalText = (key: string, languageCode: string): string => {
  const translation = globalTranslations[key as keyof typeof globalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getHomeText = (key: string, languageCode: string): string => {
  const keys = key.split('.');
  let translation: any = homeTranslations;
  
  for (const k of keys) {
    translation = translation?.[k];
  }
  
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getIndexText = (key: string, languageCode: string): string => {
  const keys = key.split('.');
  let translation: any = indexTranslations;
  
  for (const k of keys) {
    translation = translation?.[k];
  }
  
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAssistantText = (key: string, languageCode: string): string => {
  const translation = assistantTranslations?.[languageCode as keyof typeof assistantTranslations] || assistantTranslations?.de
  return translation?.[key as keyof typeof translation] || key;
};

export const getAskText = (key: string, languageCode: string): string => {
  const translation = askTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskGeneralText = (key: string, languageCode: string): string => {
  const translation = askGeneralTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskEmergencyText = (key: string, languageCode: string): string => {
  const translation = askEmergencyTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskLegalText = (key: string, languageCode: string): string => {
  const translation = askLegalTranslations[key as keyof typeof askTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskHealthText = (key: string, languageCode: string): string => {
  const translation = askHealthTranslations[key as keyof typeof askHealthTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskFinancialText = (key: string, languageCode: string): string => {
  const translation = askFinancialTranslations[key as keyof typeof askFinancialTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskCulturalText = (key: string, languageCode: string): string => {
  const translation = askCulturalTranslations[key as keyof typeof askCulturalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskCareerText = (key: string, languageCode: string): string => {
  const translation = askCareerTranslations[key as keyof typeof askCareerTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getAskDocumentText = (key: string, languageCode: string): string => {
  const translation = askDocumentTranslations[key as keyof typeof askDocumentTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;
};

export const getInformationGermanLearningText = (key: string, languageCode: string): string => {
  const translation = informationGermanLearningTranslations[key as keyof typeof informationGermanLearningTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.de || key;

};
