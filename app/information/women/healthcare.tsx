import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const WomensHealthcarePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'gynecologist': {
      en: 'A doctor who specializes in womens reproductive health and medical care',
      de: 'Ein Arzt, der sich auf die reproduktive Gesundheit und medizinische Versorgung von Frauen spezialisiert hat'
    },
    'reproductive health': {
      en: 'Healthcare related to pregnancy, childbirth, contraception, and reproductive organs',
      de: 'Gesundheitsversorgung in Bezug auf Schwangerschaft, Geburt, Verhütung und Fortpflanzungsorgane'
    },
    'mental health support': {
      en: 'Professional help for emotional and psychological wellbeing',
      de: 'Professionelle Hilfe für emotionales und psychologisches Wohlbefinden'
    },
    'health insurance': {
      en: 'Insurance that covers medical costs and healthcare services',
      de: 'Versicherung, die medizinische Kosten und Gesundheitsdienste abdeckt'
    },
    'contraception': {
      en: 'Methods used to prevent pregnancy',
      de: 'Methoden zur Schwangerschaftsverhütung'
    },
    'prenatal care': {
      en: 'Medical care during pregnancy to monitor mother and baby health',
      de: 'Medizinische Betreuung während der Schwangerschaft zur Überwachung der Gesundheit von Mutter und Baby'
    },
    'screening': {
      en: 'Medical tests to check for diseases or health problems early',
      de: 'Medizinische Tests zur frühzeitigen Erkennung von Krankheiten oder Gesundheitsproblemen'
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Women\'s Healthcare in Austria',
      de: 'Frauengesundheit in Österreich'
    },
    subtitle: {
      en: 'Your right to quality healthcare and wellbeing',
      de: 'Ihr Recht auf qualitative Gesundheitsversorgung und Wohlbefinden'
    },
    text: {
      en: `As a woman in Austria, you have the right to access quality healthcare services. Whether you have **health insurance** or not, emergency medical care is always available. Many services are specifically designed to support women's unique health needs.

Essential Healthcare Services:

General Practice: Start with a general practitioner (Hausarzt/Hausärztin) for regular health needs. They can refer you to specialists when needed.

**Gynecologist** Care: Regular visits to a **gynecologist** are important for women's health. This includes routine check-ups, **reproductive health** services, and **screening** for diseases.

Pregnancy and Maternity Care: **Prenatal care** is free in Austria with health insurance. This includes regular check-ups, ultrasounds, and support during pregnancy and childbirth.

**Mental health support** includes counseling, therapy, and psychiatric care. Many services offer support in multiple languages for migrant women.

Reproductive Health Services:

Family Planning: Access to **contraception** and family planning advice is available at family planning centers and gynecologists. Counseling is confidential and non-judgmental.

Pregnancy Support: Free pregnancy counseling, support services, and information about your options are available regardless of your decision.

Sexual Health: Confidential testing and treatment for sexually transmitted infections, HIV testing, and sexual health counseling.

How to Access Healthcare:

1. Get **Health Insurance**: If you work, you automatically have health insurance. Asylum seekers and those with subsidiary protection receive healthcare through specific programs.

2. Register with a Doctor: Choose a general practitioner in your area. You can change doctors if needed. Many doctors speak English or other languages.

3. Make Appointments: Call or visit the doctor's office to make an appointment. For emergencies, go to the hospital emergency room or call emergency services.

Important Health **Screenings**:

Cervical Cancer **Screening** (PAP Test): Regular screening every 1-3 years for women over 18. This test can detect changes early and is covered by health insurance.

Breast Cancer Screening: Mammography screening is recommended for women over 40-50. Earlier screening may be recommended for those with family history.

General Health Check-ups: Regular check-ups including blood tests, blood pressure monitoring, and preventive care are important for overall health.

Healthcare Costs:
• With Health Insurance: Most services are free or have small co-payments
• Emergency Care: Always available regardless of insurance status
• Prescription Costs: Usually €6.10 per medication with insurance
• Financial Help: Reduced fees available for low-income families

Emergency Contacts:
• Emergency Services: 144 (ambulance), 112 (general emergency)
• Poison Control: +43 1 406 43 43
• Telephone Counseling: 142 (24/7, free)`,
      de: `Als Frau in Österreich haben Sie das Recht auf qualitative Gesundheitsdienste. Ob Sie eine **Krankenversicherung** haben oder nicht, Notfall-medizinische Versorgung ist immer verfügbar. Viele Dienste sind speziell darauf ausgelegt, die einzigartigen Gesundheitsbedürfnisse von Frauen zu unterstützen.

Wesentliche Gesundheitsdienste:

Allgemeinmedizin: Beginnen Sie mit einem Allgemeinarzt (Hausarzt/Hausärztin) für regelmäßige Gesundheitsbedürfnisse. Sie können Sie bei Bedarf an Spezialisten überweisen.

**Gynäkologische** Betreuung: Regelmäßige Besuche bei einem **Gynäkologen** sind wichtig für die Frauengesundheit. Dies umfasst Routineuntersuchungen, **Reproduktionsgesundheit** und **Screening** für Krankheiten.

Schwangerschafts- und Mutterschaftsbetreuung: **Schwangerschaftsvorsorge** ist in Österreich mit Krankenversicherung kostenlos. Dies umfasst regelmäßige Untersuchungen, Ultraschall und Unterstützung während der Schwangerschaft und Geburt.

**Psychische Gesundheitsunterstützung** umfasst Beratung, Therapie und psychiatrische Betreuung. Viele Dienste bieten Unterstützung in mehreren Sprachen für Migrantinnen.

Reproduktionsgesundheitsdienste:

Familienplanung: Zugang zu **Verhütung** und Familienplanungsberatung ist in Familienplanungszentren und bei Gynäkologen verfügbar. Die Beratung ist vertraulich und nicht wertend.

Schwangerschaftsunterstützung: Kostenlose Schwangerschaftsberatung, Unterstützungsdienste und Informationen über Ihre Optionen sind unabhängig von Ihrer Entscheidung verfügbar.

Sexuelle Gesundheit: Vertrauliche Tests und Behandlung für sexuell übertragbare Infektionen, HIV-Tests und sexuelle Gesundheitsberatung.

Wie Sie Gesundheitsversorgung erhalten:

1. **Krankenversicherung** erhalten: Wenn Sie arbeiten, haben Sie automatisch eine Krankenversicherung. Asylsuchende und Personen mit subsidiärem Schutz erhalten Gesundheitsversorgung durch spezielle Programme.

2. Bei einem Arzt anmelden: Wählen Sie einen Allgemeinarzt in Ihrer Nähe. Sie können bei Bedarf den Arzt wechseln. Viele Ärzte sprechen Englisch oder andere Sprachen.

3. Termine vereinbaren: Rufen Sie die Arztpraxis an oder besuchen Sie sie, um einen Termin zu vereinbaren. Bei Notfällen gehen Sie in die Notaufnahme des Krankenhauses oder rufen den Notdienst an.

Wichtige Gesundheits-**Screenings**:

Gebärmutterhalskrebs-**Screening** (PAP-Test): Regelmäßiges Screening alle 1-3 Jahre für Frauen über 18. Dieser Test kann Veränderungen früh erkennen und ist von der Krankenversicherung abgedeckt.

Brustkrebsvorsorge: Mammographie-Screening wird für Frauen über 40-50 empfohlen. Früheres Screening kann bei Familiengeschichte empfohlen werden.

Allgemeine Gesundheitsuntersuchungen: Regelmäßige Untersuchungen einschließlich Bluttests, Blutdruckmessung und Vorsorge sind wichtig für die allgemeine Gesundheit.

Gesundheitskosten:
• Mit Krankenversicherung: Die meisten Dienste sind kostenlos oder haben kleine Selbstbehalte
• Notfallversorgung: Immer verfügbar unabhängig vom Versicherungsstatus
• Verschreibungskosten: Normalerweise €6,10 pro Medikament mit Versicherung
• Finanzielle Hilfe: Reduzierte Gebühren für Familien mit niedrigem Einkommen verfügbar

Notfallkontakte:
• Rettungsdienste: 144 (Krankenwagen), 112 (allgemeiner Notfall)
• Giftnotruf: +43 1 406 43 43
• Telefonseelsorge: 142 (24/7, kostenlos)`
    },
    links: [
      {
        title: { en: 'Austrian Health Promotion Fund', de: 'Österreichischer Gesundheitsförderungsfonds' },
        url: 'https://www.fgoe.org/'
      },
      {
        title: { en: 'Orient Express Healthcare', de: 'Orient Express Gesundheitsversorgung' },
        url: 'https://www.orientexpress-wien.com/'
      },
      {
        title: { en: 'Migrant Healthcare Services', de: 'Migrant Gesundheitsdienste' },
        url: 'https://www.migrant.at/'
      },
      {
        title: { en: 'Family Planning Association', de: 'Familienplanungsverband' },
        url: 'https://www.familienplanung.de/'
      },
      {
        title: { en: 'PsyOnline - Psychologists', de: 'PsyOnline - Psychologen' },
        url: 'https://www.psyonline.at/'
      },
      {
        title: { en: 'Women\'s Counseling Centers', de: 'Frauenberatungsstellen' },
        url: 'https://www.frauenberatung.at/'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="local-hospital" size={40} color="#E91E63" />
          <Text style={styles.title}>
            {language.code === 'de' ? content.title.de : content.title.en}
          </Text>
          <Text style={styles.subtitle}>
            {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
          </Text>
        </View>
        
        <HighlightedText 
          definitions={definitions}
          language={language.code}
        >
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Gesundheitsdienste' : 'Healthcare Services'}
          </Text>
          
          {content.links.map((link, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
            >
              <MaterialIcons name="link" size={20} color="#E91E63" />
              <Text style={styles.linkText}>
                {language.code === 'de' ? link.title.de : link.title.en}
              </Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
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
        tutorialData="women"
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: '#E91E63',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 8,
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
    color: '#E91E63',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default WomensHealthcarePage;