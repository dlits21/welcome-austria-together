import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Platform, I18nManager } from 'react-native';

import enCommon from '../../assets/locales/en/common.json';
import enIndex from '../../assets/locales/en/index.json';
import enEmergency from '../../assets/locales/en/emergency.json';

import deCommon from '../../assets/locales/de/common.json';
import deIndex from '../../assets/locales/de/index.json';
import deEmergency from '../../assets/locales/de/emergency.json';
import deHome from '../../assets/locales/de/home.json';

import arCommon from '../../assets/locales/ar/common.json';
import arIndex from '../../assets/locales/ar/index.json';
import arEmergency from '../../assets/locales/ar/emergency.json';

import faCommon from '../../assets/locales/fa/common.json';
import faIndex from '../../assets/locales/fa/index.json';
import faEmergency from '../../assets/locales/fa/emergency.json';

export const resources = {
  en: { common: enCommon,
        index: enIndex,
        emergency: enEmergency,
       },
  de: { common: deCommon,
        index: deIndex,
        emergency: deEmergency,
        home: deHome,
      },
  ar: { common: arCommon,
        index: arIndex,
        emergency: arEmergency,
      },
  fa: { common: faCommon,
        index: faIndex,
        emergency: faEmergency,
        },
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
