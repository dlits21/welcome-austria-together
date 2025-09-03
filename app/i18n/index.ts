import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, I18nManager } from 'react-native';
import enCommon from '../../assets/locales/en/common.json';
import enAsk from '../../assets/locales/en/ask.json';
import enHome from '../../assets/locales/en/home.json';
import enIndex from '../../assets/locales/en/index.json';
import enInformation from '../../assets/locales/en/information.json';
import enEveryday from '../../assets/locales/en/everyday.json';
import enEverydayChildren from '../../assets/locales/en/children.json';
import enHealth from '../../assets/locales/en/health.json';
import enAsylum from '../../assets/locales/en/asylum.json';
import enHousing from '../../assets/locales/en/housing.json';
import enFood from '../../assets/locales/en/food.json';
import enEducation from '../../assets/locales/en/education.json';
import enJobs from '../../assets/locales/en/jobs.json';
import enContacts from '../../assets/locales/en/contacts.json';
import enMentalHealth from '../../assets/locales/en/mental-health.json';
import enFindDoctor from '../../assets/locales/en/find-doctor.json';
import enDoctorGP from '../../assets/locales/en/doctor-gp.json';
import enPrescription from '../../assets/locales/en/prescription.json';
import enVaccinations from '../../assets/locales/en/vaccinations.json';
import enReproductive from '../../assets/locales/en/reproductive.json';
import enChildrenHealth from '../../assets/locales/en/children-health.json';
import enGenderViolence from '../../assets/locales/en/gender-violence.json';
import enGuide from '../../assets/locales/en/guide.json';
import enInterviewPrep from '../../assets/locales/en/interview-prep.json';

import deCommon from '../../assets/locales/de/common.json';
import deAsk from '../../assets/locales/de/ask.json';
import deHome from '../../assets/locales/de/home.json';
import deIndex from '../../assets/locales/de/index.json';
import deInformation from '../../assets/locales/de/information.json';
import deEveryday from '../../assets/locales/de/everyday.json';
import deEverydayChildren from '../../assets/locales/de/children.json';

import arCommon from '../../assets/locales/ar/common.json';
import arAsk from '../../assets/locales/ar/ask.json';
import arHome from '../../assets/locales/ar/home.json';
import arIndex from '../../assets/locales/ar/index.json';
import arInformation from '../../assets/locales/ar/information.json';
import arEveryday from '../../assets/locales/ar/everyday.json';
import arEverydayChildren from '../../assets/locales/ar/children.json';


import faCommon from '../../assets/locales/fa/common.json';
import faAsk from '../../assets/locales/fa/ask.json';
import faHome from '../../assets/locales/fa/home.json';
import faIndex from '../../assets/locales/fa/index.json';
import faInformation from '../../assets/locales/fa/information.json';
import faEveryday from '../../assets/locales/fa/everyday.json';
import faEverydayChildren from '../../assets/locales/fa/children.json';


export const resources = {
  en: { common: enCommon,
      ask: enAsk,
      home: enHome,
      index: enIndex,
      information: enInformation,
      everyday: enEveryday,
      children: enEverydayChildren,
      health: enHealth,
      asylum: enAsylum,
      housing: enHousing,
      food: enFood,
      education: enEducation,
      jobs: enJobs,
      contacts: enContacts,
      mentalHealth: enMentalHealth,
      findDoctor: enFindDoctor,
      doctorGP: enDoctorGP,
      prescription: enPrescription,
      vaccinations: enVaccinations,
      reproductive: enReproductive,
      childrenHealth: enChildrenHealth,
      genderViolence: enGenderViolence,
      guide: enGuide,
      interviewPrep: enInterviewPrep,
       },
  de: { common: deCommon,
      ask: deAsk,
      home: deHome,
      index: deIndex,
      information: deInformation,
      everyday: deEveryday,
      children: deEverydayChildren,
      },
  ar: { common: arCommon,
      ask: arAsk,
      home: arHome,
      index: arIndex,
      information: arInformation,
      everyday: arEveryday,
      children: arEverydayChildren,
      },
  fa: { common: faCommon,
      ask: faAsk,
      home: faHome,
      index: faIndex,
      information: faInformation,
      everyday: faEveryday,
      children: faEverydayChildren,},
};

const SUPPORTED = ['en','de','ar','fa'] as const;
const RTL_LANGS = new Set(['ar','fa','he','ur','ps','ku']);

function pickDeviceLang(): string {
  const locales = Localization.getLocales?.() ?? [];
  const tag = locales[0]?.languageCode || 'de';
  return SUPPORTED.includes(tag as any) ? tag : 'de';
}

export async function loadLanguagePreference() {
  const stored = await AsyncStorage.getItem('lang');
  return (stored && SUPPORTED.includes(stored as any)) ? stored! : pickDeviceLang();
}

export async function initI18n() {
  const lang = await loadLanguagePreference();

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: lang,
      fallbackLng: 'de',
      supportedLngs: SUPPORTED as unknown as string[],
      ns: ['common','ask', 'home', 'housing', 'food', 'education', 'jobs', 'contacts', 'mentalHealth', 'findDoctor', 'prescription', 'vaccinations', 'reproductive', 'childrenHealth', 'genderViolence', 'guide', 'interviewPrep'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      returnNull: false,
    });

  // Apply RTL layout if needed
  const shouldRTL = RTL_LANGS.has(lang);
  if (I18nManager.isRTL !== shouldRTL) {
    I18nManager.allowRTL(shouldRTL);
    I18nManager.forceRTL(shouldRTL);
    // NOTE: full app reload is typically required to reflow layout.
    // In dev, prompt user to reload; in prod you can call Updates.reloadAsync()
    // if expo-updates is enabled.
  }

  // Web: reflect dir on <html>
  if (Platform.OS === 'web') {
    const dir = shouldRTL ? 'rtl' : 'ltr';
    document?.documentElement?.setAttribute('dir', dir);
    document?.documentElement?.setAttribute('lang', lang);
  }
}

export async function setAppLanguage(nextLang: string) {
  if (!SUPPORTED.includes(nextLang as any)) return;
  await i18n.changeLanguage(nextLang);
  await AsyncStorage.setItem('lang', nextLang);

  const shouldRTL = RTL_LANGS.has(nextLang);
  if (I18nManager.isRTL !== shouldRTL) {
    I18nManager.allowRTL(shouldRTL);
    I18nManager.forceRTL(shouldRTL);
    // See notes in step 7 about reload behavior.
  }

  if (Platform.OS === 'web') {
    const dir = shouldRTL ? 'rtl' : 'ltr';
    document?.documentElement?.setAttribute('dir', dir);
    document?.documentElement?.setAttribute('lang', nextLang);
  }
}

export default i18n;
