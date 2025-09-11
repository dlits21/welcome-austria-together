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
import enAsylumDublinStatus from '../../assets/locales/en/asylum-dublin-status.json';
import enAsylumDocuments from '../../assets/locales/en/asylum-documents.json';
import enAsylumLegal from '../../assets/locales/en/asylum-legal.json';
import enAsylumHousing from '../../assets/locales/en/asylum-housing.json';
import enAsylumLegalQuiz from '../../assets/locales/en/asylum-legal-quiz.json';
import enAsylumRefugeeStatus from '../../assets/locales/en/asylum-refugee-status.json';
import enAsylumRejectedStatus from '../../assets/locales/en/asylum-rejected-status.json';
import enAsylumSubsidiaryStatus from '../../assets/locales/en/asylum-subsidiary-status.json';
import enAsylumReunification from '../../assets/locales/en/asylum-reunification.json';
import enAsylumInterview from '../../assets/locales/en/asylum-interview.json';
import enAsylumWorkPermits from '../../assets/locales/en/asylum-work-permits.json';
import enGuide from '../../assets/locales/en/guide.json';
import enAskEmergency from '../../assets/locales/en/ask-emergency.json';
import enGeneralAsk from '../../assets/locales/en/general-ask.json';

import deCommon from '../../assets/locales/de/common.json';
import deAsk from '../../assets/locales/de/ask.json';
import deHome from '../../assets/locales/de/home.json';
import deIndex from '../../assets/locales/de/index.json';
import deInformation from '../../assets/locales/de/information.json';
import deEveryday from '../../assets/locales/de/everyday.json';
import deEverydayChildren from '../../assets/locales/de/children.json';
import deHealth from '../../assets/locales/de/health.json';
import deAsylum from '../../assets/locales/de/asylum.json';
import deHousing from '../../assets/locales/de/housing.json';
import deFood from '../../assets/locales/de/food.json';
import deEducation from '../../assets/locales/de/education.json';
import deJobs from '../../assets/locales/de/jobs.json';
import deContacts from '../../assets/locales/de/contacts.json';
import deMentalHealth from '../../assets/locales/de/mental-health.json';
import deFindDoctor from '../../assets/locales/de/find-doctor.json';
import deDoctorGP from '../../assets/locales/de/doctor-gp.json';
import dePrescription from '../../assets/locales/de/prescription.json';
import deVaccinations from '../../assets/locales/de/vaccinations.json';
import deReproductive from '../../assets/locales/de/reproductive.json';
import deChildrenHealth from '../../assets/locales/de/children-health.json';
import deGenderViolence from '../../assets/locales/de/gender-violence.json';
import deAsylumProcess from '../../assets/locales/de/asylum-process.json';
import deAsylumApply from '../../assets/locales/de/asylum-apply.json';
import deAsylumRights from '../../assets/locales/de/asylum-rights.json';
import deAsylumAppeals from '../../assets/locales/de/asylum-appeals.json';
import deAsylumAppealsDeadlines from '../../assets/locales/de/asylum-appeals-deadlines.json';
import deAsylumProcessAppeals from '../../assets/locales/de/asylum-process-appeals.json';
import deAsylumDublinStatus from '../../assets/locales/de/asylum-dublin-status.json';
import deAsylumDocuments from '../../assets/locales/de/asylum-documents.json';
import deAsylumLegal from '../../assets/locales/de/asylum-legal.json';
import deAsylumHousing from '../../assets/locales/de/asylum-housing.json';
import deAsylumLegalQuiz from '../../assets/locales/de/asylum-legal-quiz.json';
import deAsylumRefugeeStatus from '../../assets/locales/de/asylum-refugee-status.json';
import deAsylumRejectedStatus from '../../assets/locales/de/asylum-rejected-status.json';
import deAsylumSubsidiaryStatus from '../../assets/locales/de/asylum-subsidiary-status.json';
import deAsylumReunification from '../../assets/locales/de/asylum-reunification.json';
import deAsylumInterview from '../../assets/locales/de/asylum-interview.json';
import deAsylumWorkPermits from '../../assets/locales/de/asylum-work-permits.json';
import deGuide from '../../assets/locales/de/guide.json';
import deAskEmergency from '../../assets/locales/de/ask-emergency.json';

import arCommon from '../../assets/locales/ar/common.json';
import arAsk from '../../assets/locales/ar/ask.json';
import arHome from '../../assets/locales/ar/home.json';
import arIndex from '../../assets/locales/ar/index.json';
import arInformation from '../../assets/locales/ar/information.json';
import arEveryday from '../../assets/locales/ar/everyday.json';
import arEverydayChildren from '../../assets/locales/ar/children.json';
import arHealth from '../../assets/locales/ar/health.json';
import arAsylum from '../../assets/locales/ar/asylum.json';
import arHousing from '../../assets/locales/ar/housing.json';
import arFood from '../../assets/locales/ar/food.json';
import arEducation from '../../assets/locales/ar/education.json';
import arJobs from '../../assets/locales/ar/jobs.json';
import arContacts from '../../assets/locales/ar/contacts.json';
import arMentalHealth from '../../assets/locales/ar/mental-health.json';
import arFindDoctor from '../../assets/locales/ar/find-doctor.json';
import arDoctorGP from '../../assets/locales/ar/doctor-gp.json';
import arPrescription from '../../assets/locales/ar/prescription.json';
import arVaccinations from '../../assets/locales/ar/vaccinations.json';
import arReproductive from '../../assets/locales/ar/reproductive.json';
import arChildrenHealth from '../../assets/locales/ar/children-health.json';
import arGenderViolence from '../../assets/locales/ar/gender-violence.json';
import arAsylumProcess from '../../assets/locales/ar/asylum-process.json';
import arAsylumApply from '../../assets/locales/ar/asylum-apply.json';
import arAsylumRights from '../../assets/locales/ar/asylum-rights.json';
import arAsylumAppeals from '../../assets/locales/ar/asylum-appeals.json';
import arAsylumAppealsDeadlines from '../../assets/locales/ar/asylum-appeals-deadlines.json';
import arAsylumProcessAppeals from '../../assets/locales/ar/asylum-process-appeals.json';
import arAsylumDublinStatus from '../../assets/locales/ar/asylum-dublin-status.json';
import arAsylumDocuments from '../../assets/locales/ar/asylum-documents.json';
import arAsylumLegal from '../../assets/locales/ar/asylum-legal.json';
import arAsylumHousing from '../../assets/locales/ar/asylum-housing.json';
import arAsylumLegalQuiz from '../../assets/locales/ar/asylum-legal-quiz.json';
import arAsylumRefugeeStatus from '../../assets/locales/ar/asylum-refugee-status.json';
import arAsylumRejectedStatus from '../../assets/locales/ar/asylum-rejected-status.json';
import arAsylumSubsidiaryStatus from '../../assets/locales/ar/asylum-subsidiary-status.json';
import arAsylumReunification from '../../assets/locales/ar/asylum-reunification.json';
import arAsylumInterview from '../../assets/locales/ar/asylum-interview.json';
import arAsylumWorkPermits from '../../assets/locales/ar/asylum-work-permits.json';
import arGuide from '../../assets/locales/ar/guide.json';
import arAskEmergency from '../../assets/locales/ar/ask-emergency.json';

import faCommon from '../../assets/locales/fa/common.json';
import faAsk from '../../assets/locales/fa/ask.json';
import faHome from '../../assets/locales/fa/home.json';
import faIndex from '../../assets/locales/fa/index.json';
import faInformation from '../../assets/locales/fa/information.json';
import faEveryday from '../../assets/locales/fa/everyday.json';
import faEverydayChildren from '../../assets/locales/fa/children.json';
import faHealth from '../../assets/locales/fa/health.json';
import faAsylum from '../../assets/locales/fa/asylum.json';
import faHousing from '../../assets/locales/fa/housing.json';
import faFood from '../../assets/locales/fa/food.json';
import faEducation from '../../assets/locales/fa/education.json';
import faJobs from '../../assets/locales/fa/jobs.json';
import faContacts from '../../assets/locales/fa/contacts.json';
import faMentalHealth from '../../assets/locales/fa/mental-health.json';
import faFindDoctor from '../../assets/locales/fa/find-doctor.json';
import faDoctorGP from '../../assets/locales/fa/doctor-gp.json';
import faPrescription from '../../assets/locales/fa/prescription.json';
import faVaccinations from '../../assets/locales/fa/vaccinations.json';
import faReproductive from '../../assets/locales/fa/reproductive.json';
import faChildrenHealth from '../../assets/locales/fa/children-health.json';
import faGenderViolence from '../../assets/locales/fa/gender-violence.json';
import faAsylumProcess from '../../assets/locales/fa/asylum-process.json';
import faAsylumApply from '../../assets/locales/fa/asylum-apply.json';
import faAsylumRights from '../../assets/locales/fa/asylum-rights.json';
import faAsylumAppeals from '../../assets/locales/fa/asylum-appeals.json';
import faAsylumAppealsDeadlines from '../../assets/locales/fa/asylum-appeals-deadlines.json';
import faAsylumProcessAppeals from '../../assets/locales/fa/asylum-process-appeals.json';
import faAsylumDublinStatus from '../../assets/locales/fa/asylum-dublin-status.json';
import faAsylumDocuments from '../../assets/locales/fa/asylum-documents.json';
import faAsylumLegal from '../../assets/locales/fa/asylum-legal.json';
import faAsylumHousing from '../../assets/locales/fa/asylum-housing.json';
import faAsylumLegalQuiz from '../../assets/locales/fa/asylum-legal-quiz.json';
import faAsylumRefugeeStatus from '../../assets/locales/fa/asylum-refugee-status.json';
import faAsylumRejectedStatus from '../../assets/locales/fa/asylum-rejected-status.json';
import faAsylumSubsidiaryStatus from '../../assets/locales/fa/asylum-subsidiary-status.json';
import faAsylumReunification from '../../assets/locales/fa/asylum-reunification.json';
import faAsylumInterview from '../../assets/locales/fa/asylum-interview.json';
import faAsylumWorkPermits from '../../assets/locales/fa/asylum-work-permits.json';
import faGuide from '../../assets/locales/fa/guide.json';
import faAskEmergency from '../../assets/locales/fa/ask-emergency.json';


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
      askEmergency: enAskEmergency,
      generalAsk: enGeneralAsk,
       },
  de: { common: deCommon,
        ask: deAsk,
        home: deHome,
        index: deIndex,
        information: deInformation,
        everyday: deEveryday,
        children: deEverydayChildren,
        health: deHealth,
        asylum: deAsylum,
        asylumProcess: deAsylumProcess,
        asylumApply: deAsylumApply,
        asylumRights: deAsylumRights,
        asylumAppeals: deAsylumAppeals,
        asylumAppealsDeadlines: deAsylumAppealsDeadlines,
        asylumHousing: deAsylumHousing,
        asylumProcessAppeals: deAsylumProcessAppeals,
        asylumDocuments: deAsylumDocuments,
        asylumLegal: deAsylumLegal,
        asylumLegalQuiz: deAsylumLegalQuiz,
        asylumDublinStatus: deAsylumDublinStatus,
        asylumSubsidiaryStatus: deAsylumSubsidiaryStatus,
        asylumRefugeeStatus: deAsylumRefugeeStatus,
        asylumReunification: deAsylumReunification,
        asylumRejectedStatus: deAsylumRejectedStatus,
        asylumInterview: deAsylumInterview,
        asylumWorkPermits: deAsylumWorkPermits,
        housing: deHousing,
        food: deFood,
        education: deEducation,
        jobs: deJobs,
        contacts: deContacts,
        mentalHealth: deMentalHealth,
        findDoctor: deFindDoctor,
        doctorGP: deDoctorGP,
        prescription: dePrescription,
        vaccinations: deVaccinations,
        reproductive: deReproductive,
        childrenHealth: deChildrenHealth,
        genderViolence: deGenderViolence,
        guide: deGuide,
        askEmergency: deAskEmergency,
      },
  ar: { common: arCommon,
        ask: arAsk,
        home: arHome,
        index: arIndex,
        information: arInformation,
        everyday: arEveryday,
        children: arEverydayChildren,
        health: arHealth,
        asylum: arAsylum,
        asylumProcess: arAsylumProcess,
        asylumApply: arAsylumApply,
        asylumRights: arAsylumRights,
        asylumAppeals: arAsylumAppeals,
        asylumAppealsDeadlines: arAsylumAppealsDeadlines,
        asylumHousing: arAsylumHousing,
        asylumProcessAppeals: arAsylumProcessAppeals,
        asylumDocuments: arAsylumDocuments,
        asylumLegal: arAsylumLegal,
        asylumLegalQuiz: arAsylumLegalQuiz,
        asylumDublinStatus: arAsylumDublinStatus,
        asylumSubsidiaryStatus: arAsylumSubsidiaryStatus,
        asylumRefugeeStatus: arAsylumRefugeeStatus,
        asylumReunification: arAsylumReunification,
        asylumRejectedStatus: arAsylumRejectedStatus,
        asylumInterview: arAsylumInterview,
        asylumWorkPermits: arAsylumWorkPermits,
        housing: arHousing,
        food: arFood,
        education: arEducation,
        jobs: arJobs,
        contacts: arContacts,
        mentalHealth: arMentalHealth,
        findDoctor: arFindDoctor,
        doctorGP: arDoctorGP,
        prescription: arPrescription,
        vaccinations: arVaccinations,
        reproductive: arReproductive,
        childrenHealth: arChildrenHealth,
        genderViolence: arGenderViolence,
        guide: arGuide,
        askEmergency: arAskEmergency,
      },
  fa: { common: faCommon,
        ask: faAsk,
        home: faHome,
        index: faIndex,
        information: faInformation,
        everyday: faEveryday,
        children: faEverydayChildren,
        health: faHealth,
        asylum: faAsylum,
        asylumProcess: faAsylumProcess,
        asylumApply: faAsylumApply,
        asylumRights: faAsylumRights,
        asylumAppeals: faAsylumAppeals,
        asylumAppealsDeadlines: faAsylumAppealsDeadlines,
        asylumHousing: faAsylumHousing,
        asylumProcessAppeals: faAsylumProcessAppeals,
        asylumDocuments: faAsylumDocuments,
        asylumLegal: faAsylumLegal,
        asylumLegalQuiz: faAsylumLegalQuiz,
        asylumDublinStatus: faAsylumDublinStatus,
        asylumSubsidiaryStatus: faAsylumSubsidiaryStatus,
        asylumRefugeeStatus: faAsylumRefugeeStatus,
        asylumReunification: faAsylumReunification,
        asylumRejectedStatus: faAsylumRejectedStatus,
        asylumInterview: faAsylumInterview,
        asylumWorkPermits: faAsylumWorkPermits,
        housing: faHousing,
        food: faFood,
        education: faEducation,
        jobs: faJobs,
        contacts: faContacts,
        mentalHealth: faMentalHealth,
        findDoctor: faFindDoctor,
        doctorGP: faDoctorGP,
        prescription: faPrescription,
        vaccinations: faVaccinations,
        reproductive: faReproductive,
        childrenHealth: faChildrenHealth,
        genderViolence: faGenderViolence,
        guide: faGuide,
        askEmergency: faAskEmergency,
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
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: lang,
      fallbackLng: 'de',
      supportedLngs: SUPPORTED as unknown as string[],
      ns: ['common','ask', 'home', 'housing', 'food', 'education', 'jobs', 'contacts', 'mentalHealth', 'findDoctor', 'prescription', 'vaccinations', 'reproductive', 'childrenHealth', 'genderViolence', 'guide', 'askEmergency'],
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
