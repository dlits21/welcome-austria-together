import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Platform, I18nManager } from 'react-native';

// Add Json Files START
import deInformation-education from '../../assets/locales/de/information-education.json';
import deInformation-work from '../../assets/locales/de/information-work.json';
import deCommon from '../../assets/locales/de/common.json';
import deEmergency from '../../assets/locales/de/emergency.json';
import deInformation from '../../assets/locales/de/information.json';
import deInformation-housing from '../../assets/locales/de/information-housing.json';
import deInformation-asylum from '../../assets/locales/de/information-asylum.json';
import deSupport from '../../assets/locales/de/support.json';
import deAbout from '../../assets/locales/de/about.json';
import deIndex from '../../assets/locales/de/index.json';
import deHome from '../../assets/locales/de/home.json';

import enInformation-education from '../../assets/locales/en/information-education.json';
import enInformation-work from '../../assets/locales/en/information-work.json';
import enCommon from '../../assets/locales/en/common.json';
import enEmergency from '../../assets/locales/en/emergency.json';
import enInformation from '../../assets/locales/en/information.json';
import enInformation-housing from '../../assets/locales/en/information-housing.json';
import enInformation-asylum from '../../assets/locales/en/information-asylum.json';
import enSupport from '../../assets/locales/en/support.json';
import enAbout from '../../assets/locales/en/about.json';
import enIndex from '../../assets/locales/en/index.json';
import enHome from '../../assets/locales/en/home.json';

import ruInformation-education from '../../assets/locales/ru/information-education.json';
import ruInformation-work from '../../assets/locales/ru/information-work.json';
import ruCommon from '../../assets/locales/ru/common.json';
import ruEmergency from '../../assets/locales/ru/emergency.json';
import ruInformation from '../../assets/locales/ru/information.json';
import ruInformation-housing from '../../assets/locales/ru/information-housing.json';
import ruInformation-asylum from '../../assets/locales/ru/information-asylum.json';
import ruSupport from '../../assets/locales/ru/support.json';
import ruAbout from '../../assets/locales/ru/about.json';
import ruIndex from '../../assets/locales/ru/index.json';
import ruHome from '../../assets/locales/ru/home.json';

import arInformation-education from '../../assets/locales/ar/information-education.json';
import arInformation-work from '../../assets/locales/ar/information-work.json';
import arCommon from '../../assets/locales/ar/common.json';
import arEmergency from '../../assets/locales/ar/emergency.json';
import arInformation from '../../assets/locales/ar/information.json';
import arInformation-housing from '../../assets/locales/ar/information-housing.json';
import arInformation-asylum from '../../assets/locales/ar/information-asylum.json';
import arSupport from '../../assets/locales/ar/support.json';
import arAbout from '../../assets/locales/ar/about.json';
import arIndex from '../../assets/locales/ar/index.json';
import arHome from '../../assets/locales/ar/home.json';

import faInformation-education from '../../assets/locales/fa/information-education.json';
import faInformation-work from '../../assets/locales/fa/information-work.json';
import faCommon from '../../assets/locales/fa/common.json';
import faEmergency from '../../assets/locales/fa/emergency.json';
import faInformation from '../../assets/locales/fa/information.json';
import faInformation-housing from '../../assets/locales/fa/information-housing.json';
import faInformation-asylum from '../../assets/locales/fa/information-asylum.json';
import faSupport from '../../assets/locales/fa/support.json';
import faAbout from '../../assets/locales/fa/about.json';
import faIndex from '../../assets/locales/fa/index.json';
import faHome from '../../assets/locales/fa/home.json';

import sqInformation-education from '../../assets/locales/sq/information-education.json';
import sqInformation-work from '../../assets/locales/sq/information-work.json';
import sqCommon from '../../assets/locales/sq/common.json';
import sqEmergency from '../../assets/locales/sq/emergency.json';
import sqInformation from '../../assets/locales/sq/information.json';
import sqInformation-housing from '../../assets/locales/sq/information-housing.json';
import sqInformation-asylum from '../../assets/locales/sq/information-asylum.json';
import sqSupport from '../../assets/locales/sq/support.json';
import sqAbout from '../../assets/locales/sq/about.json';
import sqIndex from '../../assets/locales/sq/index.json';
import sqHome from '../../assets/locales/sq/home.json';

import psInformation-education from '../../assets/locales/ps/information-education.json';
import psInformation-work from '../../assets/locales/ps/information-work.json';
import psCommon from '../../assets/locales/ps/common.json';
import psEmergency from '../../assets/locales/ps/emergency.json';
import psInformation from '../../assets/locales/ps/information.json';
import psInformation-housing from '../../assets/locales/ps/information-housing.json';
import psInformation-asylum from '../../assets/locales/ps/information-asylum.json';
import psSupport from '../../assets/locales/ps/support.json';
import psAbout from '../../assets/locales/ps/about.json';
import psIndex from '../../assets/locales/ps/index.json';
import psHome from '../../assets/locales/ps/home.json';

import kaInformation-education from '../../assets/locales/ka/information-education.json';
import kaInformation-work from '../../assets/locales/ka/information-work.json';
import kaCommon from '../../assets/locales/ka/common.json';
import kaEmergency from '../../assets/locales/ka/emergency.json';
import kaInformation from '../../assets/locales/ka/information.json';
import kaInformation-housing from '../../assets/locales/ka/information-housing.json';
import kaInformation-asylum from '../../assets/locales/ka/information-asylum.json';
import kaSupport from '../../assets/locales/ka/support.json';
import kaAbout from '../../assets/locales/ka/about.json';
import kaIndex from '../../assets/locales/ka/index.json';
import kaHome from '../../assets/locales/ka/home.json';

import soInformation-education from '../../assets/locales/so/information-education.json';
import soInformation-work from '../../assets/locales/so/information-work.json';
import soCommon from '../../assets/locales/so/common.json';
import soEmergency from '../../assets/locales/so/emergency.json';
import soInformation from '../../assets/locales/so/information.json';
import soInformation-housing from '../../assets/locales/so/information-housing.json';
import soInformation-asylum from '../../assets/locales/so/information-asylum.json';
import soSupport from '../../assets/locales/so/support.json';
import soAbout from '../../assets/locales/so/about.json';
import soIndex from '../../assets/locales/so/index.json';
import soHome from '../../assets/locales/so/home.json';

import kuInformation-education from '../../assets/locales/ku/information-education.json';
import kuInformation-work from '../../assets/locales/ku/information-work.json';
import kuCommon from '../../assets/locales/ku/common.json';
import kuEmergency from '../../assets/locales/ku/emergency.json';
import kuInformation from '../../assets/locales/ku/information.json';
import kuInformation-housing from '../../assets/locales/ku/information-housing.json';
import kuInformation-asylum from '../../assets/locales/ku/information-asylum.json';
import kuSupport from '../../assets/locales/ku/support.json';
import kuAbout from '../../assets/locales/ku/about.json';
import kuIndex from '../../assets/locales/ku/index.json';
import kuHome from '../../assets/locales/ku/home.json';


// Add Json Files END

export const resources = {
  // Add Resources START
  de: {
      information-education: deInformation-education,
      information-work: deInformation-work,
      common: deCommon,
      emergency: deEmergency,
      information: deInformation,
      information-housing: deInformation-housing,
      information-asylum: deInformation-asylum,
      support: deSupport,
      about: deAbout,
      index: deIndex,
      home: deHome,
      },
  en: {
      information-education: enInformation-education,
      information-work: enInformation-work,
      common: enCommon,
      emergency: enEmergency,
      information: enInformation,
      information-housing: enInformation-housing,
      information-asylum: enInformation-asylum,
      support: enSupport,
      about: enAbout,
      index: enIndex,
      home: enHome,
      },
  ru: {
      information-education: ruInformation-education,
      information-work: ruInformation-work,
      common: ruCommon,
      emergency: ruEmergency,
      information: ruInformation,
      information-housing: ruInformation-housing,
      information-asylum: ruInformation-asylum,
      support: ruSupport,
      about: ruAbout,
      index: ruIndex,
      home: ruHome,
      },
  ar: {
      information-education: arInformation-education,
      information-work: arInformation-work,
      common: arCommon,
      emergency: arEmergency,
      information: arInformation,
      information-housing: arInformation-housing,
      information-asylum: arInformation-asylum,
      support: arSupport,
      about: arAbout,
      index: arIndex,
      home: arHome,
      },
  fa: {
      information-education: faInformation-education,
      information-work: faInformation-work,
      common: faCommon,
      emergency: faEmergency,
      information: faInformation,
      information-housing: faInformation-housing,
      information-asylum: faInformation-asylum,
      support: faSupport,
      about: faAbout,
      index: faIndex,
      home: faHome,
      },
  sq: {
      information-education: sqInformation-education,
      information-work: sqInformation-work,
      common: sqCommon,
      emergency: sqEmergency,
      information: sqInformation,
      information-housing: sqInformation-housing,
      information-asylum: sqInformation-asylum,
      support: sqSupport,
      about: sqAbout,
      index: sqIndex,
      home: sqHome,
      },
  ps: {
      information-education: psInformation-education,
      information-work: psInformation-work,
      common: psCommon,
      emergency: psEmergency,
      information: psInformation,
      information-housing: psInformation-housing,
      information-asylum: psInformation-asylum,
      support: psSupport,
      about: psAbout,
      index: psIndex,
      home: psHome,
      },
  ka: {
      information-education: kaInformation-education,
      information-work: kaInformation-work,
      common: kaCommon,
      emergency: kaEmergency,
      information: kaInformation,
      information-housing: kaInformation-housing,
      information-asylum: kaInformation-asylum,
      support: kaSupport,
      about: kaAbout,
      index: kaIndex,
      home: kaHome,
      },
  so: {
      information-education: soInformation-education,
      information-work: soInformation-work,
      common: soCommon,
      emergency: soEmergency,
      information: soInformation,
      information-housing: soInformation-housing,
      information-asylum: soInformation-asylum,
      support: soSupport,
      about: soAbout,
      index: soIndex,
      home: soHome,
      },
  ku: {
      information-education: kuInformation-education,
      information-work: kuInformation-work,
      common: kuCommon,
      emergency: kuEmergency,
      information: kuInformation,
      information-housing: kuInformation-housing,
      information-asylum: kuInformation-asylum,
      support: kuSupport,
      about: kuAbout,
      index: kuIndex,
      home: kuHome,
      },

  // Add Resources END
};

const SUPPORTED = ['en','de','ar','fa', 'ru', 'sq', 'ku', 'so', 'ka', 'ps'] as const;
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
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: lang,
      fallbackLng: 'de',
      supportedLngs: SUPPORTED as unknown as string[],
      ns: ['common', 'index'],
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
