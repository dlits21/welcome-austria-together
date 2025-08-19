import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import FAQItem from '../../../components/FAQItem';

const GeneralInformationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const content = {
    en: {
      title: "Translation Services - General Information",
      intro: "Understanding translation services is crucial for newcomers to Austria. Whether you need official documents translated for work, education, or legal purposes, knowing the difference between certified and non-certified translations can save you time and money.",
      
      sections: [
        {
          title: "Types of Translation Services",
          content: [
            "• **Certified Translation**: Required for official documents like birth certificates, diplomas, marriage certificates",
            "• **Sworn Translation**: Court-certified translations for legal proceedings",
            "• **Simple Translation**: For general understanding, not legally binding",
            "• **Apostille Translation**: For international document recognition"
          ]
        },
        {
          title: "Documents That Need Certification",
          content: [
            "• Birth, marriage, and death certificates",
            "• University diplomas and school certificates",
            "• Employment records and references",
            "• Medical records and prescriptions",
            "• Driving licenses",
            "• Criminal record certificates",
            "• Business licenses and contracts"
          ]
        },
        {
          title: "What to Expect",
          content: [
            "• **Processing Time**: 3-10 business days for certified translations",
            "• **Cost**: €25-50 per page for certified translations",
            "• **Requirements**: Original documents or certified copies",
            "• **Validity**: Certified translations are valid indefinitely unless document expires"
          ]
        }
      ],
      
      faqs: [
        {
          question: "Do I always need certified translations?",
          answer: "No. Certified translations are only required for official purposes like visa applications, job applications requiring credentials, or court proceedings. For personal understanding, simple translations are sufficient."
        },
        {
          question: "Can I translate documents myself?",
          answer: "Yes, for personal use. However, authorities won't accept self-translations for official purposes. You need a certified translator for legal validity."
        },
        {
          question: "How do I verify a translator's certification?",
          answer: "Check the Ministry of Justice website (justiz.gv.at) for the official list of sworn translators, or contact the Austrian Association of Translators and Interpreters."
        },
        {
          question: "What if my original documents are damaged?",
          answer: "You'll need to obtain certified copies from the issuing authority first. Translators cannot certify translations of damaged or unclear documents."
        },
        {
          question: "Can I get emergency translation services?",
          answer: "Yes, many certified translators offer express services for urgent cases, usually completed within 24-48 hours for an additional fee."
        }
      ]
    },
    de: {
      title: "Übersetzungsdienste - Allgemeine Informationen",
      intro: "Übersetzungsdienste zu verstehen ist für Neuankömmlinge in Österreich von entscheidender Bedeutung. Ob Sie offizielle Dokumente für Arbeit, Bildung oder rechtliche Zwecke übersetzen lassen müssen - der Unterschied zwischen beglaubigten und nicht-beglaubigten Übersetzungen kann Ihnen Zeit und Geld sparen.",
      
      sections: [
        {
          title: "Arten von Übersetzungsdiensten",
          content: [
            "• **Beglaubigte Übersetzung**: Erforderlich für offizielle Dokumente wie Geburtsurkunden, Diplome, Heiratsurkunden",
            "• **Beeidigte Übersetzung**: Gerichtlich zertifizierte Übersetzungen für Gerichtsverfahren",
            "• **Einfache Übersetzung**: Zum allgemeinen Verständnis, nicht rechtlich bindend",
            "• **Apostille-Übersetzung**: Für internationale Dokumentenanerkennung"
          ]
        },
        {
          title: "Dokumente, die eine Beglaubigung benötigen",
          content: [
            "• Geburts-, Heirats- und Sterbeurkunden",
            "• Universitätsdiplome und Schulzeugnisse",
            "• Arbeitsnachweise und Referenzen",
            "• Krankenakten und Rezepte",
            "• Führerscheine",
            "• Strafregisterauszüge",
            "• Gewerbescheine und Verträge"
          ]
        },
        {
          title: "Was Sie erwarten können",
          content: [
            "• **Bearbeitungszeit**: 3-10 Werktage für beglaubigte Übersetzungen",
            "• **Kosten**: €25-50 pro Seite für beglaubigte Übersetzungen",
            "• **Anforderungen**: Originaldokumente oder beglaubigte Kopien",
            "• **Gültigkeit**: Beglaubigte Übersetzungen sind unbegrenzt gültig, außer das Dokument läuft ab"
          ]
        }
      ],
      
      faqs: [
        {
          question: "Brauche ich immer beglaubigte Übersetzungen?",
          answer: "Nein. Beglaubigte Übersetzungen sind nur für offizielle Zwecke wie Visaanträge, Bewerbungen mit Qualifikationsnachweis oder Gerichtsverfahren erforderlich. Für persönliches Verständnis reichen einfache Übersetzungen."
        },
        {
          question: "Kann ich Dokumente selbst übersetzen?",
          answer: "Ja, für den persönlichen Gebrauch. Behörden akzeptieren jedoch keine Selbstübersetzungen für offizielle Zwecke. Sie benötigen einen zertifizierten Übersetzer für rechtliche Gültigkeit."
        },
        {
          question: "Wie überprüfe ich die Zertifizierung eines Übersetzers?",
          answer: "Prüfen Sie die Website des Justizministeriums (justiz.gv.at) für die offizielle Liste beeidigter Übersetzer oder kontaktieren Sie den Österreichischen Verband der Übersetzer und Dolmetscher."
        },
        {
          question: "Was, wenn meine Originaldokumente beschädigt sind?",
          answer: "Sie müssen zuerst beglaubigte Kopien von der ausstellenden Behörde besorgen. Übersetzer können keine Übersetzungen beschädigter oder unleserlicher Dokumente beglaubigen."
        },
        {
          question: "Kann ich Eilübersetzungsdienste bekommen?",
          answer: "Ja, viele zertifizierte Übersetzer bieten Express-Services für dringende Fälle an, die normalerweise innerhalb von 24-48 Stunden gegen Aufpreis abgeschlossen werden."
        }
      ]
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← {language.code === 'de' ? 'Zurück' : 'Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{currentContent.title}</Text>
        
        <Text style={styles.content}>{currentContent.intro}</Text>

        {currentContent.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.content.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.content}>{item}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.faqTitle}>
          {language.code === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
        </Text>
        
        {currentContent.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </ScrollView>
      
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
    marginBottom: 16,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2d2d2d',
  },
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#1a1a1a',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 8,
  },
});

export default GeneralInformationPage;