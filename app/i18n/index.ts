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
import enAsylumProcess from '../../assets/locales/en/asylum-process.json';
import enAsylumApply from '../../assets/locales/en/asylum-apply.json';
import enAsylumRights from '../../assets/locales/en/asylum-rights.json';
import enAsylumAppeals from '../../assets/locales/en/asylum-appeals.json';
import enAsylumAppealsDeadlines from '../../assets/locales/en/asylum-appeals-deadlines.json';
import enAsylumProcessAppeals from '../../assets/locales/en/asylum-process-appeals.json';
import enAsylumDocuments from '../../assets/locales/en/asylum-documents.json';
import enAsylumLegal from '../../assets/locales/en/asylum-legal.json';
import enAsylumDublinStatus from '../../assets/locales/en/asylum-dublin-status.json';
import enAsylumHousing from '../../assets/locales/en/asylum-housing.json';
import enAsylumLegalQuiz from '../../assets/locales/en/asylum-legal-quiz.json';
import enAsylumRefugeeStatus from '../../assets/locales/en/asylum-refugee-status.json';
import enAsylumRejectedStatus from '../../assets/locales/en/asylum-rejected-status.json';
import enAsylumSubsidiaryStatus from '../../assets/locales/en/asylum-subsidiary-status.json';
import enAsylumReunification from '../../assets/locales/en/asylum-reunification.json';
import enAsylumInterview from '../../assets/locales/en/asylum-interview.json';
import enAsylumWorkPermits from '../../assets/locales/en/asylum-work-permits.json';
import enGuide from '../../assets/locales/en/guide.json';

import deCommon from '../../assets/locales/de/common.json';
import deAsk from '../../assets/locales/de/ask.json';
import deHome from '../../assets/locales/de/home.json';
import deIndex from '../../assets/locales/de/index.json';
import deInformation from '../../assets/locales/de/information.json';
import deEveryday from '../../assets/locales/de/everyday.json';
import deEverydayChildren from '../../assets/locales/de/children.json';
import deContacts from '../../assets/locales/de/contacts.json';
import deDoctorGP from '../../assets/locales/de/doctor-gp.json';
import deEducation from '../../assets/locales/de/education.json';
import deFindDoctor from '../../assets/locales/de/find-doctor.json';
import deFood from '../../assets/locales/de/food.json';
import deGenderViolence from '../../assets/locales/de/gender-violence.json';
import deGuide from '../../assets/locales/de/guide.json';
import deHealth from '../../assets/locales/de/health.json';
import deHousing from '../../assets/locales/de/housing.json';
import deMentalHealth from '../../assets/locales/de/mental-health.json';
import deJobs from '../../assets/locales/de/jobs.json';
import dePrescription from '../../assets/locales/de/prescription.json';
import deVaccinations from '../../assets/locales/de/vaccinations.json';
import deReproductive from '../../assets/locales/de/reproductive.json';

import arCommon from '../../assets/locales/ar/common.json';
import arAsk from '../../assets/locales/ar/ask.json';
import arHome from '../../assets/locales/ar/home.json';
import arIndex from '../../assets/locales/ar/index.json';
import arInformation from '../../assets/locales/ar/information.json';
import arEveryday from '../../assets/locales/ar/everyday.json';
import arEverydayChildren from '../../assets/locales/ar/children.json';
import arContacts from '../../assets/locales/ar/contacts.json';
import arDoctorGP from '../../assets/locales/ar/doctor-gp.json';
import arEducation from '../../assets/locales/ar/education.json';
import arFindDoctor from '../../assets/locales/ar/find-doctor.json';
import arFood from '../../assets/locales/ar/food.json';
import arGenderViolence from '../../assets/locales/ar/gender-violence.json';
import arGuide from '../../assets/locales/ar/guide.json';
import arHealth from '../../assets/locales/ar/health.json';
import arHousing from '../../assets/locales/ar/housing.json';
import arMentalHealth from '../../assets/locales/ar/mental-health.json';
import arJobs from '../../assets/locales/ar/jobs.json';
import arPrescription from '../../assets/locales/ar/prescription.json';
import arVaccinations from '../../assets/locales/ar/vaccinations.json';
import arReproductive from '../../assets/locales/ar/reproductive.json';

import faCommon from '../../assets/locales/fa/common.json';
import faAsk from '../../assets/locales/fa/ask.json';
import faHome from '../../assets/locales/fa/home.json';
import faIndex from '../../assets/locales/fa/index.json';
import faInformation from '../../assets/locales/fa/information.json';
import faEveryday from '../../assets/locales/fa/everyday.json';
import faEverydayChildren from '../../assets/locales/fa/children.json';
import faContacts from '../../assets/locales/fa/contacts.json';
import faDoctorGP from '../../assets/locales/fa/doctor-gp.json';
import faEducation from '../../assets/locales/fa/education.json';
import faFindDoctor from '../../assets/locales/fa/find-doctor.json';
import faFood from '../../assets/locales/fa/food.json';
import faGenderViolence from '../../assets/locales/fa/gender-violence.json';
import faGuide from '../../assets/locales/fa/guide.json';
import faHealth from '../../assets/locales/fa/health.json';
import faHousing from '../../assets/locales/fa/housing.json';
import faMentalHealth from '../../assets/locales/fa/mental-health.json';
import faJobs from '../../assets/locales/fa/jobs.json';
import faPrescription from '../../assets/locales/fa/prescription.json';
import faVaccinations from '../../assets/locales/fa/vaccinations.json';
import faReproductive from '../../assets/locales/fa/reproductive.json';

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
      asylumProcess: enAsylumProcess,
      asylumApply: enAsylumApply,
      asylumRights: enAsylumRights,
      asylumAppeals: enAsylumAppeals,
      asylumAppealsDeadlines: enAsylumAppealsDeadlines,
      asylumHousing: enAsylumHousing,
      asylumProcessAppeals: enAsylumProcessAppeals,
      asylumDocuments: enAsylumDocuments,
      asylumLegal: enAsylumLegal,
      asylumLegalQuiz: enAsylumLegalQuiz,
      asylumDublinStatus: enAsylumDublinStatus,
      asylumSubsidiaryStatus: enAsylumSubsidiaryStatus,
      asylumRefugeeStatus: enAsylumRefugeeStatus,
      asylumReunification: enAsylumReunification,
      asylumRejectedStatus: enAsylumRejectedStatus,
      asylumInterview: enAsylumInterview,
      asylumWorkPermits: enAsylumWorkPermits,
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
       },
  de: { common: deCommon,
      ask: deAsk,
      home: deHome,
      index: deIndex,
      information: deInformation,
      everyday: deEveryday,
      children: deEverydayChildren,
      contacts: deContacts,
      doctorGP: deDoctorGP,
      education: deEducation,
      findDoctor: deFindDoctor,
      food: deFood,
      genderViolence: deGenderViolence,
      guide: deGuide,
      health: deHealth,
      housing: deHousing,
      jobs: deJobs,
      mentalHealth: deMentalHealth,
      prescription: dePrescription,
      vaccinations: deVaccinations,
      reproductive: deReproductive,
      },
  ar: { common: arCommon,
      ask: arAsk,
      home: arHome,
      index: arIndex,
      information: arInformation,
      everyday: arEveryday,
      children: arEverydayChildren,
      contacts: arContacts,
      doctorGP: arDoctorGP,
      education: arEducation,
      findDoctor: arFindDoctor,
      food: arFood,
      genderViolence: arGenderViolence,
      guide: arGuide,
      health: arHealth,
      housing: arHousing,
      jobs: arJobs,
      mentalHealth: arMentalHealth,
      prescription: arPrescription,
      vaccinations: arVaccinations,
      reproductive: arReproductive,
      },
  fa: { common: faCommon,
      ask: faAsk,
      home: faHome,
      index: faIndex,
      information: faInformation,
      everyday: faEveryday,
      children: faEverydayChildren,
      contacts: faContacts,
      doctorGP: faDoctorGP,
      education: faEducation,
      findDoctor: faFindDoctor,
      food: faFood,
      genderViolence: faGenderViolence,
      guide: faGuide,
      health: faHealth,
      housing: faHousing,
      jobs: faJobs,
      mentalHealth: faMentalHealth,
      prescription: faPrescription,
      vaccinations: faVaccinations,
      reproductive: faReproductive,},
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
      ns: ['common','ask', 'home', 'housing', 'food', 'education', 'jobs', 'contacts', 'mentalHealth', 'findDoctor', 'prescription', 'vaccinations', 'reproductive', 'childrenHealth', 'genderViolence', 'guide'],
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
