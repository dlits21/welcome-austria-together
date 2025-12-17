import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Platform, I18nManager } from 'react-native';

// Add Json Files START
import deCommon from '../../assets/locales/de/common.json';
import deEmergency from '../../assets/locales/de/emergency.json';
import deIndex from '../../assets/locales/de/index.json';
import deHome from '../../assets/locales/de/home.json';
import deSupport from '../../assets/locales/de/support.json';

import enCommon from '../../assets/locales/en/common.json';
import enEmergency from '../../assets/locales/en/emergency.json';
import enIndex from '../../assets/locales/en/index.json';
import enHome from '../../assets/locales/en/home.json';

import ruCommon from '../../assets/locales/ru/common.json';
import ruEmergency from '../../assets/locales/ru/emergency.json';
import ruIndex from '../../assets/locales/ru/index.json';
import ruHome from '../../assets/locales/ru/home.json';

import arCommon from '../../assets/locales/ar/common.json';
import arEmergency from '../../assets/locales/ar/emergency.json';
import arIndex from '../../assets/locales/ar/index.json';
import arHome from '../../assets/locales/ar/home.json';

import faCommon from '../../assets/locales/fa/common.json';
import faEmergency from '../../assets/locales/fa/emergency.json';
import faIndex from '../../assets/locales/fa/index.json';
import faHome from '../../assets/locales/fa/home.json';

import sqCommon from '../../assets/locales/sq/common.json';
import sqEmergency from '../../assets/locales/sq/emergency.json';
import sqIndex from '../../assets/locales/sq/index.json';
import sqHome from '../../assets/locales/sq/home.json';

import psCommon from '../../assets/locales/ps/common.json';
import psEmergency from '../../assets/locales/ps/emergency.json';
import psIndex from '../../assets/locales/ps/index.json';
import psHome from '../../assets/locales/ps/home.json';

import kaCommon from '../../assets/locales/ka/common.json';
import kaEmergency from '../../assets/locales/ka/emergency.json';
import kaIndex from '../../assets/locales/ka/index.json';
import kaHome from '../../assets/locales/ka/home.json';

import soCommon from '../../assets/locales/so/common.json';
import soEmergency from '../../assets/locales/so/emergency.json';
import soIndex from '../../assets/locales/so/index.json';
import soHome from '../../assets/locales/so/home.json';

import kuCommon from '../../assets/locales/ku/common.json';
import kuEmergency from '../../assets/locales/ku/emergency.json';
import kuIndex from '../../assets/locales/ku/index.json';
import kuHome from '../../assets/locales/ku/home.json';


// Add Json Files END

export const resources = {
  // Add Resources START
  de: {
      common: deCommon,
      emergency: deEmergency,
      index: deIndex,
      home: deHome,
      support: deSupport,
      },
  en: {
      common: enCommon,
      emergency: enEmergency,
      index: enIndex,
      home: enHome,
      },
  ru: {
      common: ruCommon,
      emergency: ruEmergency,
      index: ruIndex,
      home: ruHome,
      },
  ar: {
      common: arCommon,
      emergency: arEmergency,
      index: arIndex,
      home: arHome,
      },
  fa: {
      common: faCommon,
      emergency: faEmergency,
      index: faIndex,
      home: faHome,
      },
  sq: {
      common: sqCommon,
      emergency: sqEmergency,
      index: sqIndex,
      home: sqHome,
      },
  ps: {
      common: psCommon,
      emergency: psEmergency,
      index: psIndex,
      home: psHome,
      },
  ka: {
      common: kaCommon,
      emergency: kaEmergency,
      index: kaIndex,
      home: kaHome,
      },
  so: {
      common: soCommon,
      emergency: soEmergency,
      index: soIndex,
      home: soHome,
      },
  ku: {
      common: kuCommon,
      emergency: kuEmergency,
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
