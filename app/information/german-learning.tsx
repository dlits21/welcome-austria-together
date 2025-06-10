import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import { getTab } from '../../data/languages/learn';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import BaseQuizModal from '../../components/BaseQuizModal';
import FilterSection from '../../components/FilterSection';
import QuizControls from '../../components/QuizControls';
import CourseList from '../../components/CourseList';

interface GermanCourse {
  id: string;
  title: {
    en: string;
    de: string;
    fa: string;
    ar: string;
    uk: string;
    ru: string;
    tr: string;
    so: string;
    fr: string;
    es: string;
    pl: string;
    sr: string;
  };
  type: 'course' | 'resource' | 'exam';
  level: string[];
  location?: string;
  price: string | number;
  online: boolean;
  duration?: string;
  description: {
    en: string;
    de: string;
    fa: string;
    ar: string;
    uk: string;
    ru: string;
    tr: string;
    so: string;
    fr: string;
    es: string;
    pl: string;
    sr: string;
  };
  provider: string;
  forWomen?: boolean;
  forYoungMigrants?: boolean;
  childcare?: boolean;
  integrationRequirement?: boolean;
}

const germanCourses: GermanCourse[] = [
  {
    id: 'oif_live_course',
    title: { 
      en: 'ÖIF - Live Online German Courses',
      de: 'ÖIF - Live Online Deutsch Kurse',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'course',
    level: ['A1', 'A2', 'B1', 'B2'],
    location: 'Online',
    price: 'Free',
    online: true,
    duration: '8 weeks',
    description: {
      en: 'Free German courses for beginners and advanced learners (A1-B2)',
      de: 'Kostenlose Deutschkurse für Anfänger und Fortgeschrittene (A1-B2)',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'Österreichischer Integrations Fond (ÖIF)',
    forWomen: false,
    forYoungMigrants: false,
    childcare: false,
    integrationRequirement: false
  },
  {
      id: 'oif_offline_course',
      title: {
        en: 'ÖIF - German & Integration Starter Package',
        de: 'ÖIF - Startpaket Deutsch & Integration',
        fa: 'Lorem Ipsum',
        ar: 'Lorem Ipsum',
        uk: 'Lorem Ipsum',
        ru: 'Lorem Ipsum',
        tr: 'Lorem Ipsum',
        so: 'Lorem Ipsum',
        fr: 'Lorem Ipsum',
        es: 'Lorem Ipsum',
        pl: 'Lorem Ipsum',
        sr: 'Lorem Ipsum'
      },
      type: 'course',
      level: ['A1', 'A2', 'B1', 'B2', 'C1'],
      location: 'Nationwide',
      price: 'Free',
      online: false,
      duration: 'ca. 3-4 month',
      description: {
        en: 'Free German courses for beginners and advanced learners (A1-C1)',
        de: 'Kostenlose Deutschkurse für Anfänger und Fortgeschrittene (A1-C1)',
        fa: 'Lorem Ipsum',
        ar: 'Lorem Ipsum',
        uk: 'Lorem Ipsum',
        ru: 'Lorem Ipsum',
        tr: 'Lorem Ipsum',
        so: 'Lorem Ipsum',
        fr: 'Lorem Ipsum',
        es: 'Lorem Ipsum',
        pl: 'Lorem Ipsum',
        sr: 'Lorem Ipsum'
      },
      provider: 'Österreichischer Integrations Fond (ÖIF)',
      forWomen: false,
      forYoungMigrants: false,
      childcare: false,
      integrationRequirement: true
    },
    {
    id: 'oif_exam',
    title: {
      en: 'ÖIF - Official German Exams',
      de: 'ÖIF - Offizieller Deutsch Test',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'exam',
    level: ['A1', 'A2', 'B1', 'B2', 'C1'],
    location: 'Nationwide',
    price: 'Paid',
    online: false,
    duration: '90-240min',
    description: {
      en: 'Official language certificate in German',
      de: 'Offizieller Sprachnachweis in Deutsch',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'Österreichischer Integrations Fond (ÖIF)',
    forWomen: false,
    forYoungMigrants: false,
    childcare: false,
    integrationRequirement: true
    },
    {
    id: 'caritas_vienna',
    title: {
      en: 'Caritas Vienna - German courses for asylum seekers ',
      de: 'Caritas Wien - Deutschkurse für Asylwerber*innen ',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'course',
    level: ['A1', 'A2', 'B1', 'B2'],
    location: 'Wien',
    price: 'Free',
    online: false,
    duration: 'weekly',
    description: {
      en: 'Applied German course for asylum seekrs',
      de: 'Praktische Deutschkurse für Asylwerber*innen',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'Caritas Wien',
    forWomen: false,
    forYoungMigrants: false,
    childcare: false,
    integrationRequirement: false
},
{
    id: 'vhs_vienna',
    title: {
      en: 'VHS Vienna - German Courses ',
      de: 'VHS Wien - Deutschkurse',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'course',
    level: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    location: 'Wien',
    price: 'Paid',
    online: false,
    duration: 'Varying',
    description: {
      en: 'Wide range of German courses for all levels in Vienna',
      de: 'Vielfältige Deutschkurse für alle Niveaustufen in Wien',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'VHS Wien',
    forWomen: false,
    forYoungMigrants: false,
    childcare: true,
    integrationRequirement: false
},
{
    id: 'vhs_vienna_start',
    title: {
      en: 'VHS Vienna - StartWien - Integration from Day 1 ',
      de: 'VHS Wien - StartWien - Integration ab Tag 1',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'course',
    level: ['A0','A1', 'A2', 'B1', 'B2', 'C1'],
    location: 'Wien',
    price: 'Free',
    online: false,
    duration: 'Varying',
    description: {
      en: 'Free German courses for asylum seekers in basic care with childcare',
      de: 'Kostenlose Deutschkurse für Asylwerber*innen in der Grundversorgung mit Kinderbetreuung',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'VHS Wien',
    forWomen: false,
    forYoungMigrants: false,
    childcare: true,
    integrationRequirement: false
},
{
    id: 'vhs_vienna_park',
    title: {
      en: 'VHS Vienna - German in a Park',
      de: 'VHS Wien - Deutsch im Park',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    type: 'course',
    level: ['A1', 'A2', 'B1', 'B2'],
    location: 'Wien',
    price: 'Free',
    online: false,
    duration: '4 weeks',
    description: {
      en: 'Free German lessons for adults',
      de: 'Gratis Deutsch Lernen für Erwachsene',
      fa: 'Lorem Ipsum',
      ar: 'Lorem Ipsum',
      uk: 'Lorem Ipsum',
      ru: 'Lorem Ipsum',
      tr: 'Lorem Ipsum',
      so: 'Lorem Ipsum',
      fr: 'Lorem Ipsum',
      es: 'Lorem Ipsum',
      pl: 'Lorem Ipsum',
      sr: 'Lorem Ipsum'
    },
    provider: 'VHS Wien',
    forWomen: false,
    forYoungMigrants: false,
    childcare: false,
    integrationRequirement: false
},
 {
     id: 'wifi_ooe',
     title: {
       en: 'WIFI Upper Austria - German integration courses',
       de: 'WIFI Oberösterreich - Deutsch Integrationskurse',
       fa: 'Lorem Ipsum',
       ar: 'Lorem Ipsum',
       uk: 'Lorem Ipsum',
       ru: 'Lorem Ipsum',
       tr: 'Lorem Ipsum',
       so: 'Lorem Ipsum',
       fr: 'Lorem Ipsum',
       es: 'Lorem Ipsum',
       pl: 'Lorem Ipsum',
       sr: 'Lorem Ipsum'
     },
     type: 'course',
     level: ['A1', 'A2', 'B1', 'B2'],
     location: 'Oberösterreich',
     price: 490,
     online: false,
     duration: '52 units',
     description: {
       en: 'Learning German for integration, residence permits and citizenship',
       de: 'Deutsch lernen für Integration, Aufenthaltstitel und Staatsbürgerschaft',
       fa: 'Lorem Ipsum',
       ar: 'Lorem Ipsum',
       uk: 'Lorem Ipsum',
       ru: 'Lorem Ipsum',
       tr: 'Lorem Ipsum',
       so: 'Lorem Ipsum',
       fr: 'Lorem Ipsum',
       es: 'Lorem Ipsum',
       pl: 'Lorem Ipsum',
       sr: 'Lorem Ipsum'
     },
     provider: 'WIFI Oberösterreich',
     forWomen: false,
     forYoungMigrants: false,
     childcare: false,
     integrationRequirement: true
 },
{
   id: 'bfi_ooe',
   title: {
     en: 'BFI Upper Austria - German Courses',
     de: 'BFI Oberösterreich - Deutschkurse',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2', 'B1', 'B2', 'C1'],
   location: 'Oberösterreich',
   price: 560,
   online: false,
   duration: '8 weeks',
   description: {
     en: 'Learn German for integration, work and everyday life',
     de: 'Deutsch lernen für Integration, Beruf und Alltag',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'BFI Oberösterreich',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: true
},
{
id: 'ams_integration',
title: {
  en: 'AMS - Year of Integration',
  de: 'AMS - Integrationsjahr',
  fa: 'Lorem Ipsum',
  ar: 'Lorem Ipsum',
  uk: 'Lorem Ipsum',
  ru: 'Lorem Ipsum',
  tr: 'Lorem Ipsum',
  so: 'Lorem Ipsum',
  fr: 'Lorem Ipsum',
  es: 'Lorem Ipsum',
  pl: 'Lorem Ipsum',
  sr: 'Lorem Ipsum'
},
type: 'course',
level: ['A1', 'A2', 'B1', 'B2', 'C1'],
location: 'Nationwide',
price: 'Free',
online: false,
duration: 'up to a year',
description: {
  en: 'Labor market integration for persons entitled to asylum and subsidiary protection',
  de: 'Arbeitsmarktintegration für Asylberechtigte und subsidiär Schutzberechtigte',
  fa: 'Lorem Ipsum',
  ar: 'Lorem Ipsum',
  uk: 'Lorem Ipsum',
  ru: 'Lorem Ipsum',
  tr: 'Lorem Ipsum',
  so: 'Lorem Ipsum',
  fr: 'Lorem Ipsum',
  es: 'Lorem Ipsum',
  pl: 'Lorem Ipsum',
  sr: 'Lorem Ipsum'
 },
 provider: 'Arbeitsmarktservice (AMS)',
 forWomen: false,
 forYoungMigrants: false,
 childcare: false,
 integrationRequirement: true
},
{
   id: 'sprachportal',
   title: {
     en: 'ÖIF - Sprachportal',
     de: 'ÖIF - Sprachportal',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2', 'C1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Free Online Courses, Exercises, and Resources for German Learners',
     de: 'Kostenlose Online-Kurse, Übungen und Ressourcen für Deutschlernende',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'ÖIF',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'vhs_lernportal',
   title: {
     en: 'VHS Lernportal',
     de: 'VHS Lernportal',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Free Interactive Courses in German, Mathematics, and Digital Literacy',
     de: 'Kostenlose interaktive Kurse in Deutsch, Mathematik und Digitalkompetenz',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'VHS',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'nicos_weg',
   title: {
     en: 'Nicos Weg',
     de: 'Nicos Weg',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Interactive German Language Course for Beginners to Intermediate Learners',
     de: 'Interaktiver Deutschkurs für Anfänger und Fortgeschrittene',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Deutsche Welle',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'duolingo',
   title: {
     en: 'Duolingo',
     de: 'Duolingo',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Interactive language learning with game like lessons',
     de: 'Interaktives Sprachenlernen mit spielerischen Lektionen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Duolingo',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'babbel',
   title: {
     en: 'Babbel',
     de: 'Babbel',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1'],
   location: 'Online',
   price: 'Paid',
   online: true,
   description: {
     en: 'Learn German Anytime, Anywhere',
     de: 'Deutsch lernen jederzeit und überall',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Babbel',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'easy_deutsch',
   title: {
     en: 'Easy Deutsch',
     de: 'Easy Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2','C1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Practical German Grammar Help',
     de: 'Praktische Hilfe zur deutschen Grammatik',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Easy Deutsch',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'fraubock_deutschkurse',
   title: {
     en: 'Frau Bock German Course',
     de: 'Frau Bock Deutschkurse',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A0', 'A1', 'A2', 'B1', 'B2'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free German courses from literacy to B2 – low-threshold and individual',
     de: 'Kostenlose Deutschkurse von Alphabetisierung bis B2 – Niedrigschwellig und individuell',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Verein Ute Bock',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'schubert_verlag',
   title: {
     en: 'Schubert Verlag – Online German Exercises',
     de: 'Schubert Verlag – Online-Übungen Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2', 'C1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Practice German from A1 to C1 with interactive tasks',
     de: 'Deutsch üben von A1 bis C1 mit interaktiven Übungen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Schubert Verlag',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
id: 'osd_exam',
title: {
  en: 'ÖSD - Internationally Recognized German Language Exams',
  de: 'ÖSD - International anerkannter Deutsch-Sprachtest',
  fa: 'Lorem Ipsum',
  ar: 'Lorem Ipsum',
  uk: 'Lorem Ipsum',
  ru: 'Lorem Ipsum',
  tr: 'Lorem Ipsum',
  so: 'Lorem Ipsum',
  fr: 'Lorem Ipsum',
  es: 'Lorem Ipsum',
  pl: 'Lorem Ipsum',
  sr: 'Lorem Ipsum'
},
type: 'exam',
level: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
location: 'Nationwide',
price: 'Paid',
online: false,
description: {
  en: 'Certified German Language Proficiency from A1 to C2 Levels',
  de: 'Nachweis von Deutschkenntnissen auf den Niveaustufen A1 bis C2',
  fa: 'Lorem Ipsum',
  ar: 'Lorem Ipsum',
  uk: 'Lorem Ipsum',
  ru: 'Lorem Ipsum',
  tr: 'Lorem Ipsum',
  so: 'Lorem Ipsum',
  fr: 'Lorem Ipsum',
  es: 'Lorem Ipsum',
  pl: 'Lorem Ipsum',
  sr: 'Lorem Ipsum'
},
provider: 'ÖSD',
forWomen: false,
forYoungMigrants: false,
childcare: false,
integrationRequirement: true
},
{
   id: 'mama_lernt_deutsch',
   title: {
     en: 'Mama lernt Deutsch',
     de: 'Mama lernt Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2', 'B1'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'German Language Courses for Women',
     de: 'Deutschkurse für Frauen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Mama lernt Deutsch',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'einstieg_app',
   title: {
     en: 'Einstieg Deutsch',
     de: 'Einstieg Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'A Language Learning App for Refugees',
     de: 'Eine Sprachenlern-App für Immigrant:innen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'VHS',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'diakonie_kurs',
   title: {
     en: 'Diakonie German Courses',
     de: 'Diakonie Deutschkurse',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2', 'B1', 'B2'],
   location: 'Nationwide',
   price: 'Free',
   online: false,
   description: {
     en: 'Free German courses, basic education and career advice for refugees',
     de: 'Kostenlose Deutschkurse, Basisbildung und Berufsberatung für geflüchtete Menschen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Diakonie',
   forWomen: false,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'deutschlernerblog_course',
   title: {
     en: 'Deutschlernerblog',
     de: 'Deutschlernerblog',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Grammar, vocabulary, listening, reading & more from A1 to C2',
     de: 'Grammatik, Wortschatz, Hörverstehen, Leseverstehen & mehr von A1 bis C2',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Deutschlernerblog',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'levrai_online',
   title: {
     en: 'Le Vrai – Interactive Online Learning for German',
     de: 'Le Vrai – Interaktives Online-Lernen für Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'resource',
   level: ['A1', 'A2', 'B1', 'B2'],
   location: 'Online',
   price: 'Free',
   online: true,
   description: {
     en: 'Online learning platform with a focus on integration and language support',
     de: 'Online-Lernplattform mit Fokus auf Integration und Sprachförderung',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Le Vrai',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'the_connection',
   title: {
     en: 'The Connection – Language and integration courses for migrants and refugees',
     de: 'The Connection – Sprach- und Integrationskurse für Migrant:innen und Geflüchtete',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A0', 'A1', 'A2', 'B1', 'B2'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free German, English and conversation courses with a focus on women',
     de: 'Kostenlose Deutsch-, Englisch- und Konversationskurse mit Fokus auf Frauen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'The Connection',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'miteinander',
   title: {
     en: 'Miteinander Lernen - Birlikte Öğrenelim',
     de: 'Miteinander Lernen – Birlikte Öğrenelim',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free German courses from A1 to A2 with childcare and exam preparation',
     de: 'Kostenlose Deutschkurse von A1 bis A2 mit Kinderbetreuung und Prüfungsvorbereitung',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Miteinander Lernen',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'offene_deutschkurse',
   title: {
     en: 'Selforganized German Courses in Amerlinghaus',
     de: 'Selbstorganisierte Deutschkurse im Amerlinghaus',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A0', 'A1', 'A2', 'B1'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free, self-organized German courses without registration',
     de: 'Kostenlose, selbstorganisierte Deutschkurse ohne Anmeldung',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Amerlinghaus',
   forWomen: false,
   forYoungMigrants: false,
   childcare: false,
   integrationRequirement: false
},
{
   id: 'baju',
   title: {
     en: 'BAJU – Basic education for adolescents and young adults with a migration background',
     de: 'BAJU – Basisbildung für Jugendliche und junge Erwachsene mit Migrationshintergrund',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2', 'B1'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free educational opportunities to promote German language skills and basic competencies',
     de: 'Kostenlose Bildungsangebote zur Förderung von Deutschkenntnissen und Grundkompetenzen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'BAJU',
   forWomen: false,
   forYoungMigrants: true,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'peregrina',
   title: {
     en: 'Peregrina – Basic German Courses',
     de: 'Peregrina – Basisbildungskurse Deutsch',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A1', 'A2', 'B1'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Language support for women with a migration background',
     de: 'Sprachförderung für Frauen mit Migrationshintergrund',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Peregrina',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'lefoe',
   title: {
     en: 'Lefoe – Learning Centre for Migrant Women',
     de: 'Lefoe – Lernzentrum für Migrantinnen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A0', 'A1', 'A2', 'B1'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free Basic Education Courses for Migrant Women',
     de: 'Gratis Grundausbildung für Migrantinnen',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Lefoe',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
{
   id: 'orient_express',
   title: {
     en: 'Orient Express Vienna - Learning Center',
     de: 'Orient Express Wien - Lernzentrum',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   type: 'course',
   level: ['A0', 'A1', 'A2'],
   location: 'Vienna',
   price: 'Free',
   online: false,
   description: {
     en: 'Free basic education courses for women with a migrant background',
     de: 'Kostenlose Basisbildungskurse für Frauen mit Migrationshintergrund',
     fa: 'Lorem Ipsum',
     ar: 'Lorem Ipsum',
     uk: 'Lorem Ipsum',
     ru: 'Lorem Ipsum',
     tr: 'Lorem Ipsum',
     so: 'Lorem Ipsum',
     fr: 'Lorem Ipsum',
     es: 'Lorem Ipsum',
     pl: 'Lorem Ipsum',
     sr: 'Lorem Ipsum'
   },
   provider: 'Orient Express',
   forWomen: true,
   forYoungMigrants: false,
   childcare: true,
   integrationRequirement: false
},
];

const GermanLearningPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<GermanCourse[]>(germanCourses);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    level: '',
    format: '',
    type: ''
  });
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract unique locations
  const locations = Array.from(new Set(germanCourses
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Available types and formats
  const courseTypes = ['course', 'resource', 'exam'];
  const formatTypes = ['online-only', 'hybrid', 'in-person'];

  // Quiz questions
  const quizQuestions = [
    {
      question: language.code === 'de' ? 'Wie ist Ihr Niveau?' : 'What\'s your level?',
      answers: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      key: 'level' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Brauchen Sie es online oder persönlich?' 
        : 'Do you need it online or in-person?',
      answers: [
        { key: 'online-only', en: 'Online only', de: 'Nur online' },
        { key: 'hybrid', en: 'Hybrid', de: 'Hybrid' },
        { key: 'in-person', en: 'In-person', de: 'Persönlich' }
      ],
      key: 'format' as keyof typeof quizAnswers
    },
    {
      question: language.code === 'de' 
        ? 'Suchen Sie nach einem Kurs, einer Prüfung oder Ressourcen?' 
        : 'Are you looking for a course, an exam or resources?',
      answers: [
        { key: 'course', en: 'Course', de: 'Kurs' },
        { key: 'exam', en: 'Exam', de: 'Prüfung' },
        { key: 'resource', en: 'Resources', de: 'Ressourcen' }
      ],
      key: 'type' as keyof typeof quizAnswers
    }
  ];

  const getLevelDescription = (level: string) => {
    const descriptions: { [key: string]: { en: string; de: string } } = {
      'A0': { en: 'Complete beginner', de: 'Kompletter Anfänger' },
      'A1': { en: 'Beginner', de: 'Anfänger' },
      'A2': { en: 'Elementary', de: 'Grundkenntnisse' },
      'B1': { en: 'Intermediate', de: 'Mittelstufe' },
      'B2': { en: 'Upper intermediate', de: 'Obere Mittelstufe' },
      'C1': { en: 'Advanced', de: 'Fortgeschritten' },
      'C2': { en: 'Proficient', de: 'Sehr fortgeschritten' }
    };
    return descriptions[level] ? descriptions[level][language.code as 'en' | 'de'] : level;
  };

  // Apply filters including quiz answers
  useEffect(() => {
    let results = germanCourses;
    
    // Apply quiz filters
    if (quizAnswers.level) {
      const levelCode = quizAnswers.level.split(' ')[0];
      results = results.filter(course => course.level.includes(levelCode));
    }
    
    if (quizAnswers.format) {
      if (quizAnswers.format === 'online-only') {
        results = results.filter(course => course.online);
      } else if (quizAnswers.format === 'in-person') {
        results = results.filter(course => !course.online);
      }
    }
    
    if (quizAnswers.type && quizAnswers.type !== 'all') {
      results = results.filter(course => course.type === quizAnswers.type);
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      results = results.filter(course => {
        if (activeTab === 'courses') return course.type === 'course';
        if (activeTab === 'resources') return course.type === 'resource';
        if (activeTab === 'exams') return course.type === 'exam';
        return true;
      });
    }
    
    // Apply manual filter states
    if (selectedLevels.length > 0) {
      results = results.filter(course => 
        course.level.some(level => selectedLevels.includes(level))
      );
    }
    
    // Updated location filter logic: include 'Nationwide' and 'Online' when specific states are selected
    if (selectedLocations.length > 0) {
      results = results.filter(course => {
        if (!course.location) return false;
        
        // If 'Nationwide' or 'Online' locations are selected, show them for any location filter
        const hasNationwideOrOnline = course.location === 'Nationwide' || course.location === 'Online';
        const hasSelectedLocation = selectedLocations.includes(course.location);
        
        return hasSelectedLocation || hasNationwideOrOnline;
      });
    }

    if (selectedTypes.length > 0) {
      results = results.filter(course => selectedTypes.includes(course.type));
    }

    if (selectedFormats.length > 0) {
      if (selectedFormats.includes('online-only')) {
        results = results.filter(course => course.online);
      } else if (selectedFormats.includes('in-person')) {
        results = results.filter(course => !course.online);
      }
    }
    
    if (freeOnly) {
      results = results.filter(course => 
        course.price === 'Free' || course.price === 'Kostenlos'
      );
    }
    
    setFilteredCourses(results);
  }, [quizAnswers, activeTab, selectedLevels, selectedLocations, selectedTypes, selectedFormats, freeOnly]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleQuizAnswer = (answer: string | { key: string, en: string, de: string }) => {
    const answerValue = typeof answer === 'string' ? answer : answer.key;
    const questionKey = quizQuestions[currentQuestion].key;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionKey]: answerValue
    }));

    // Sync quiz answers with filter states
    if (questionKey === 'level') {
      const levelCode = typeof answer === 'string' ? answer.split(' ')[0] : answer.key;
      setSelectedLevels([levelCode]);
    } else if (questionKey === 'format') {
      setSelectedFormats([answerValue]);
    } else if (questionKey === 'type') {
      setSelectedTypes([answerValue]);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleSkipQuiz = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const resetQuiz = () => {
    setQuizAnswers({ level: '', format: '', type: '' });
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedFormats([]);
    setCurrentQuestion(0);
    setShowQuiz(true);
  };

  // Filter toggle functions
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => {
      const newLevels = prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level];
      
      if (newLevels.length === 1) {
        setQuizAnswers(prev => ({ ...prev, level: newLevels[0] }));
      } else if (newLevels.length === 0) {
        setQuizAnswers(prev => ({ ...prev, level: '' }));
      }
      
      return newLevels;
    });
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSelectedFormats([]);
    setFreeOnly(false);
    setQuizAnswers({ level: '', format: '', type: '' });
  };

  const pageTitle = language.code === 'de' ? 'Deutsch Lernen' : 'Learn German';
  const pageDescription = language.code === 'de' 
    ? 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.'
    : 'Find German language courses, practice materials, and learning resources.';

  // Filter groups for FilterSection
  const filterGroups = [
    {
      title: language.code === 'de' ? 'Niveau' : 'Level',
      items: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      selectedItems: selectedLevels,
      onToggle: toggleLevel
    },
    {
      title: language.code === 'de' ? 'Typ' : 'Type',
      items: courseTypes,
      selectedItems: selectedTypes,
      onToggle: toggleType,
      displayLabels: {
        'course': getTab('courses', language.code),
        'resource': getTab('resources', language.code),
        'exam': getTab('exams', language.code)
      }
    },
    {
      title: language.code === 'de' ? 'Format' : 'Format',
      items: formatTypes,
      selectedItems: selectedFormats,
      onToggle: toggleFormat,
      displayLabels: {
        'online-only': language.code === 'de' ? 'Nur online' : 'Online only',
        'in-person': language.code === 'de' ? 'Persönlich' : 'In-person',
        'hybrid': 'Hybrid'
      }
    },
    {
      title: language.code === 'de' ? 'Standort' : 'Location',
      items: locations,
      selectedItems: selectedLocations,
      onToggle: toggleLocation
    }
  ];

  const additionalFilters = (
    <View>
      <Text style={styles.filterGroupTitle}>
        {language.code === 'de' ? 'Weitere Filter' : 'Additional Filters'}
      </Text>
      <TouchableOpacity
        style={[
          styles.filterChip,
          freeOnly && styles.activeFilterChip
        ]}
        onPress={() => setFreeOnly(!freeOnly)}
      >
        <Text style={[
          styles.filterChipText,
          freeOnly && styles.activeFilterChipText
        ]}>
          {language.code === 'de' ? 'Nur kostenlos' : 'Free only'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', label: getTab('all', language.code) },
      { id: 'courses', label: getTab('courses', language.code) },
      { id: 'resources', label: getTab('resources', language.code) },
      { id: 'exams', label: getTab('exams', language.code) }
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.description}>{pageDescription}</Text>
        
        <BaseQuizModal
          visible={showQuiz}
          currentQuestion={currentQuestion}
          questions={quizQuestions}
          languageCode={language.code}
          title={language.code === 'de' ? 'Finden Sie das Richtige für sich' : 'Find What\'s Right for You'}
          subtitle={language.code === 'de' 
            ? 'Beantworten Sie ein paar kurze Fragen, um personalisierte Empfehlungen zu erhalten.'
            : 'Answer a few quick questions to get personalized recommendations.'}
          onAnswer={handleQuizAnswer}
          onSkip={handleSkipQuiz}
          onClose={handleCloseQuiz}
          getLevelDescription={getLevelDescription}
        />
        
        {!showQuiz && (
          <QuizControls
            languageCode={language.code}
            onResetQuiz={resetQuiz}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        )}

        <FilterSection
          visible={!showQuiz && showFilters}
          title={language.code === 'de' ? 'Filter' : 'Filters'}
          languageCode={language.code}
          filterGroups={filterGroups}
          additionalFilters={additionalFilters}
          onClearFilters={clearFilters}
          scrollable={true}
        />
        
        {!showQuiz && renderTabButtons()}
        
        {!showQuiz && (
          <CourseList 
            courses={filteredCourses}
            languageCode={language.code}
          />
        )}
      </View>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resetQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetQuizText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterSection: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 12,
    color: '#64748b',
  },
  activeFilterChipText: {
    color: '#fff',
  },
  clearFiltersButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  clearFiltersText: {
    color: '#64748b',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});

export default GermanLearningPage;
