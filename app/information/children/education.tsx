import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const EducationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const definitions = {
    'primary school': {
      en: 'The first stage of compulsory education, typically for children aged 6-10 years.',
      de: 'Die erste Stufe der Pflichtschule, normalerweise für Kinder im Alter von 6-10 Jahren.',
      terms: {
        en: ['elementary school'],
        de: ['Volksschule', 'Grundschule']
      }
    },
    'integration class': {
      en: 'A special class designed to help children with different language backgrounds integrate into the Austrian school system.',
      de: 'Eine spezielle Klasse, die Kindern mit unterschiedlichem Sprachhintergrund bei der Integration in das österreichische Schulsystem hilft.',
      terms: {
        en: ['integration classroom'],
        de: ['Integrationsklasse']
      }
    },
    'special needs support': {
      en: 'Additional educational assistance provided to children who require extra help due to learning difficulties or disabilities.',
      de: 'Zusätzliche Bildungshilfe für Kinder, die aufgrund von Lernschwierigkeiten oder Behinderungen zusätzliche Hilfe benötigen.',
      terms: {
        en: ['special education support'],
        de: ['sonderpädagogische Förderung', 'Sonderpädagogik']
      }
    },
    'compulsory education': {
      en: 'Legal requirement for all children to attend school from age 6 to 15 in Austria.',
      de: 'Gesetzliche Verpflichtung für alle Kinder, in Österreich von 6 bis 15 Jahren die Schule zu besuchen.',
      terms: {
        en: ['mandatory education'],
        de: ['Schulpflicht']
      }
    },
    'Gymnasium': {
      en: 'An academic secondary school in Austria that prepares students for university entrance.',
      de: 'Eine akademische Sekundarschule in Österreich, die Schüler auf den Universitätszugang vorbereitet.',
      terms: {
        en: ['academic high school'],
        de: ['Gymnasium', 'AHS']
      }
    }
  };

  const content = {
    title: {
      en: 'Education and Schools in Austria',
      de: 'Bildung und Schulen in Österreich'
    },
    subtitle: {
      en: 'Understanding the Austrian Education System',
      de: 'Das österreichische Bildungssystem verstehen'
    },
    text: {
      en: `The Austrian education system provides free, quality education for all children. Understanding how it works will help you navigate your child's educational journey.

**Austrian Education Structure:**

**1. Kindergarten (Ages 3-6)**
• Not compulsory but highly recommended
• Last year (age 5-6) is free in most states
• Helps children develop social skills and basic German language
• Registration usually required 6-12 months in advance

**2. Primary School (Volksschule) (Ages 6-10)**
• compulsory education begins at age 6
• Four years of basic education
• Focus on reading, writing, mathematics, and German language
• Small class sizes and individual attention

**3. Secondary Education (Ages 10-14/18)**
Two main paths:
• **Mittelschule (MS)**: Comprehensive school focusing on practical skills
• **Gymnasium (AHS)**: Academic school preparing for university

**4. Upper Secondary (Ages 14-18)**
• **BHS**: Vocational schools with university entrance qualification
• **AHS Oberstufe**: Academic upper level leading to Matura (university entrance exam)
• **Vocational Training**: Apprenticeship programs combining work and study

**School Registration Process for Migrant/Refugee Children:**

**Required Documents:**
• Birth certificate (certified translation if not in German)
• Previous school certificates/transcripts
• Vaccination records
• Passport or identity documents
• Proof of residence in Austria
• Guardian/parent identification

**Step-by-Step Registration:**
1. Contact the local school authority (Bildungsdirektion)
2. Visit assigned local school with required documents
3. Child may undergo assessment for appropriate grade placement
4. Language assessment to determine need for language support
5. Complete enrollment forms
6. Receive information about school schedule and supplies

**Language Support for Non-German Speakers:**

**integration class:**
• Special classes for children learning German
• Intensive German language instruction
• Gradual integration into regular classes
• Available in most schools with migrant populations

**German as Second Language (DaZ) Support:**
• Additional German lessons during or after school
• Small group instruction
• Focus on academic German vocabulary
• Available throughout primary and secondary education

**special needs support:**
• Available for children with learning difficulties
• Individual education plans
• Specialized teachers and resources
• Includes support for children with disabilities

**School Schedule and Culture:**

**Typical School Day:**
• Classes usually start between 7:45-8:15 AM
• School day ends between 12:00-4:00 PM depending on age
• Lunch is often provided at school
• Homework is expected and parents should support learning at home

**School Year:**
• September to June/July
• Holiday breaks: Christmas, Easter, summer holidays
• Regional differences in holiday timing

**Parent Involvement:**
• Regular parent-teacher meetings
• School events and celebrations
• Parent councils (Elternverein)
• Communication mainly in German (translation help available)

**Extracurricular Activities:**

Austrian schools offer many after-school activities:
• Sports clubs and teams
• Music and arts programs
• Language clubs
• Science and technology groups
• Cultural exchange programs

**Financial Support:**

• Education is free including textbooks in public schools
• Transportation support may be available
• Lunch subsidies for families with low income
• School supplies assistance through social services
• Educational grants for exceptional students

**Getting Help:**

If you need support with school matters:
• School counselors (Schulsozialarbeit)
• Parent advisory services
• NGOs supporting migrant families
• Translation services through community organizations
• Legal advice for education rights`,
      de: `Das österreichische Bildungssystem bietet allen Kindern kostenlose, qualitativ hochwertige Bildung. Das Verständnis der Funktionsweise hilft Ihnen, die Bildungsreise Ihres Kindes zu navigieren.

**Struktur des österreichischen Bildungssystems:**

**1. Kindergarten (Alter 3-6)**
• Nicht verpflichtend, aber sehr empfehlenswert
• Letztes Jahr (Alter 5-6) ist in den meisten Bundesländern kostenlos
• Hilft Kindern, soziale Fähigkeiten und grundlegende deutsche Sprache zu entwickeln
• Anmeldung meist 6-12 Monate im Voraus erforderlich

**2. Volksschule (Alter 6-10)**
• Schulpflicht beginnt im Alter von 6 Jahren
• Vier Jahre Grundbildung
• Fokus auf Lesen, Schreiben, Mathematik und deutsche Sprache
• Kleine Klassengrößen und individuelle Betreuung

**3. Sekundarstufe I (Alter 10-14/18)**
Zwei Hauptwege:
• **Mittelschule (MS)**: Gesamtschule mit Fokus auf praktische Fähigkeiten
• **Gymnasium (AHS)**: Akademische Schule zur Universitätsvorbereitung

**4. Sekundarstufe II (Alter 14-18)**
• **BHS**: Berufsbildende Schulen mit Universitätszugangsberechtigung
• **AHS Oberstufe**: Akademische Oberstufe zur Matura (Universitätszugangsprüfung)
• **Berufsausbildung**: Lehrlingsausbildung kombiniert Arbeit und Studium

**Schulanmeldeprozess für Migranten-/Flüchtlingskinder:**

**Erforderliche Dokumente:**
• Geburtsurkunde (beglaubigte Übersetzung falls nicht auf Deutsch)
• Frühere Schulzeugnisse/Zeugnisse
• Impfnachweis
• Reisepass oder Ausweispapiere
• Wohnsitznachweis in Österreich
• Ausweis des Vormunds/Elternteils

**Schritt-für-Schritt-Anmeldung:**
1. Kontakt zur örtlichen Schulbehörde (Bildungsdirektion)
2. Besuch der zugewiesenen örtlichen Schule mit erforderlichen Dokumenten
3. Kind kann Bewertung für angemessene Klasseneinstufung durchlaufen
4. Sprachbewertung zur Bestimmung des Sprachförderungsbedarfs
5. Anmeldeformulare ausfüllen
6. Informationen über Schulplan und Materialien erhalten

**Sprachförderung für Nicht-Deutschsprachige:**

**Integrationsklasse:**
• Spezielle Klassen für Kinder, die Deutsch lernen
• Intensive deutsche Sprachförderung
• Schrittweise Integration in reguläre Klassen
• In den meisten Schulen mit Migrantenpopulation verfügbar

**Deutsch als Zweitsprache (DaZ) Förderung:**
• Zusätzliche Deutschstunden während oder nach der Schule
• Kleingruppenunterricht
• Fokus auf akademischen deutschen Wortschatz
• Verfügbar in der gesamten Grund- und Sekundarbildung

**Sonderpädagogische Förderung:**
• Verfügbar für Kinder mit Lernschwierigkeiten
• Individuelle Bildungspläne
• Spezialisierte Lehrer und Ressourcen
• Einschließlich Unterstützung für Kinder mit Behinderungen

**Schulplan und -kultur:**

**Typischer Schultag:**
• Unterricht beginnt meist zwischen 7:45-8:15 Uhr
• Schulschluss zwischen 12:00-16:00 Uhr je nach Alter
• Mittagessen wird oft in der Schule angeboten
• Hausaufgaben werden erwartet und Eltern sollten das Lernen zu Hause unterstützen

**Schuljahr:**
• September bis Juni/Juli
• Ferienzeiten: Weihnachten, Ostern, Sommerferien
• Regionale Unterschiede in den Ferienzeiten

**Elternbeteiligung:**
• Regelmäßige Eltern-Lehrer-Gespräche
• Schulveranstaltungen und Feiern
• Elternvereine
• Kommunikation hauptsächlich auf Deutsch (Übersetzungshilfe verfügbar)

**Außerschulische Aktivitäten:**

Österreichische Schulen bieten viele Nachmittagsaktivitäten:
• Sportvereine und Teams
• Musik- und Kunstprogramme
• Sprachclubs
• Wissenschafts- und Technologiegruppen
• Kulturaustauschprogramme

**Finanzielle Unterstützung:**

• Bildung ist kostenlos einschließlich Schulbücher in öffentlichen Schulen
• Transportunterstützung kann verfügbar sein
• Mittagessen-Zuschüsse für Familien mit niedrigem Einkommen
• Schulbedarfshilfe durch Sozialdienste
• Bildungsstipendien für außergewöhnliche Schüler

**Hilfe bekommen:**

Wenn Sie Unterstützung bei Schulangelegenheiten benötigen:
• Schulberater (Schulsozialarbeit)
• Elternberatungsdienste
• NGOs, die Migrantenfamilien unterstützen
• Übersetzungsdienste durch Gemeinschaftsorganisationen
• Rechtsberatung für Bildungsrechte`
    },
    links: [
      {
        title: { en: 'Austrian Ministry of Education', de: 'Österreichisches Bildungsministerium' },
        url: 'https://www.bmbwf.gv.at'
      },
      {
        title: { en: 'School Information Portal', de: 'Schulinformations-Portal' },
        url: 'https://www.schulpsychologie.at'
      },
      {
        title: { en: 'Integration in Schools', de: 'Integration in Schulen' },
        url: 'https://www.integrationsfonds.at/themen/integration-in-der-schule'
      },
      {
        title: { en: 'Help for Refugee Children', de: 'Hilfe für Flüchtlingskinder' },
        url: 'https://www.fluechtlingshilfe.at/themen/bildung'
      },
      {
        title: { en: 'Vienna School Directory', de: 'Wiener Schulverzeichnis' },
        url: 'https://www.wien.gv.at/bildung/schulen'
      }
    ],
    videoTitle: {
      en: 'Austrian School System Explained',
      de: 'Das österreichische Schulsystem erklärt'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <HighlightedText 
          definitions={definitions}
          language={language.code}
        >
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}
          </Text>
          
          {content.links.map((link, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
            >
              <MaterialIcons name="link" size={20} color="#3B82F6" />
              <Text style={styles.linkText}>
                {language.code === 'de' ? link.title.de : link.title.en}
              </Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>
          
          <TouchableOpacity style={styles.videoCard} onPress={handleVideoPress}>
            <View style={styles.videoThumbnail}>
              <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            </View>
            <Text style={styles.videoTitle}>
              {language.code === 'de' ? content.videoTitle.de : content.videoTitle.en}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
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
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 20,
  },
  linksSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
  videoSection: {
    marginBottom: 32,
  },
  videoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
  },
  videoThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default EducationPage;