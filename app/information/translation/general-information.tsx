import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';
import FAQItem from '../../../components/FAQItem';

const GeneralInformationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'certified translation': {
      en: 'Official translation by a sworn translator, legally recognized by Austrian authorities.',
      de: 'Offizielle Übersetzung durch einen beeidigten Übersetzer, rechtlich von österreichischen Behörden anerkannt.',
      terms: {
        en: ['sworn translation', 'official translation'],
        de: ['beglaubigte Übersetzung', 'beeidigte Übersetzung', 'offizielle Übersetzung']
      }
    },
    'apostille': {
      en: 'International certification for documents to be used in countries that signed the Hague Convention.',
      de: 'Internationale Beglaubigung für Dokumente zur Verwendung in Ländern, die das Haager Übereinkommen unterzeichnet haben.',
      terms: {
        en: ['apostille certification'],
        de: ['Apostille', 'Apostille-Beglaubigung']
      }
    }
  };

  const content = {
    title: {
      en: 'Translation Services - General Information',
      de: 'Übersetzungsdienste - Allgemeine Informationen'
    },
    subtitle: {
      en: 'Understanding Austrian Translation Requirements',
      de: 'Verständnis der österreichischen Übersetzungsanforderungen'
    },
    text: {
      en: `Understanding translation services is crucial for newcomers to Austria. Whether you need official documents translated for work, education, or legal purposes, knowing the difference between certified and non-certified translations can save you time and money.

Types of Translation Services:
• Certified Translation: Required for official documents like birth certificates, diplomas, marriage certificates
• Sworn Translation: Court-certified translations for legal proceedings  
• Simple Translation: For general understanding, not legally binding
• Apostille Translation: For international document recognition

Documents That Need Certification:
• Birth, marriage, and death certificates
• University diplomas and school certificates
• Employment records and references
• Medical records and prescriptions
• Driving licenses
• Criminal record certificates
• Business licenses and contracts

What to Expect:
• Processing Time: 3-10 business days for certified translations
• Cost: €25-50 per page for certified translations
• Requirements: Original documents or certified copies
• Validity: Certified translations are valid indefinitely unless document expires`,
      de: `Übersetzungsdienste zu verstehen ist für Neuankömmlinge in Österreich von entscheidender Bedeutung. Ob Sie offizielle Dokumente für Arbeit, Bildung oder rechtliche Zwecke übersetzen lassen müssen - der Unterschied zwischen beglaubigten und nicht-beglaubigten Übersetzungen kann Ihnen Zeit und Geld sparen.

Arten von Übersetzungsdiensten:
• Beglaubigte Übersetzung: Erforderlich für offizielle Dokumente wie Geburtsurkunden, Diplome, Heiratsurkunden
• Beeidigte Übersetzung: Gerichtlich zertifizierte Übersetzungen für Gerichtsverfahren
• Einfache Übersetzung: Zum allgemeinen Verständnis, nicht rechtlich bindend
• Apostille-Übersetzung: Für internationale Dokumentenanerkennung

Dokumente, die eine Beglaubigung benötigen:
• Geburts-, Heirats- und Sterbeurkunden
• Universitätsdiplome und Schulzeugnisse
• Arbeitsnachweise und Referenzen
• Krankenakten und Rezepte
• Führerscheine
• Strafregisterauszüge
• Gewerbescheine und Verträge

Was Sie erwarten können:
• Bearbeitungszeit: 3-10 Werktage für beglaubigte Übersetzungen
• Kosten: €25-50 pro Seite für beglaubigte Übersetzungen
• Anforderungen: Originaldokumente oder beglaubigte Kopien
• Gültigkeit: Beglaubigte Übersetzungen sind unbegrenzt gültig, außer das Dokument läuft ab`
    },
    links: [
      {
        title: { en: 'Official Sworn Translators List', de: 'Offizielle Liste beeidigter Übersetzer' },
        url: 'https://www.justiz.gv.at'
      },
      {
        title: { en: 'Document Recognition Center', de: 'Zentrum für Dokumentenanerkennung' },
        url: 'https://www.berufsanerkennung.at'
      },
      {
        title: { en: 'Austrian Translators Association', de: 'Österreichischer Übersetzerverband' },
        url: 'https://www.universitas.org'
      }
    ],
    faqs: [
      {
        question: {
          en: "Do I always need certified translations?",
          de: "Brauche ich immer beglaubigte Übersetzungen?"
        },
        answer: {
          en: "No. Certified translations are only required for official purposes like visa applications, job applications requiring credentials, or court proceedings. For personal understanding, simple translations are sufficient.",
          de: "Nein. Beglaubigte Übersetzungen sind nur für offizielle Zwecke wie Visaanträge, Bewerbungen mit Qualifikationsnachweis oder Gerichtsverfahren erforderlich. Für persönliches Verständnis reichen einfache Übersetzungen."
        }
      },
      {
        question: {
          en: "Can I translate documents myself?",
          de: "Kann ich Dokumente selbst übersetzen?"
        },
        answer: {
          en: "Yes, for personal use. However, authorities won't accept self-translations for official purposes. You need a certified translator for legal validity.",
          de: "Ja, für den persönlichen Gebrauch. Behörden akzeptieren jedoch keine Selbstübersetzungen für offizielle Zwecke. Sie benötigen einen zertifizierten Übersetzer für rechtliche Gültigkeit."
        }
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

        <Text style={styles.faqTitle}>
          {language.code === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
        </Text>
        
        {content.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={language.code === 'de' ? faq.question.de : faq.question.en}
            answer={language.code === 'de' ? faq.answer.de : faq.answer.en}
          />
        ))}
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
        tutorialData="translation"
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
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
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
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#1f2937',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
});

export default GeneralInformationPage;