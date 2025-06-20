
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages/common';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import AccordionItem from '../../components/AccordionItem';
import ContactButton from '../../components/ContactButton';
import StateCard from '../../components/StateCard';
import FAQItem from '../../components/FAQItem';
import { handleContactClick } from '../../utils/contactUtils';
import FacebookIcon from '../../assets/images/facebook.svg';
import SignalIcon from '../../assets/images/signal.svg';
import WhatsAppIcon from '../../assets/images/whatsapp.svg';
import TelegramIcon from '../../assets/images/telegram.svg';

const GeneralSupport: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };
  
  // States of Austria
  const austrianStates = [
    { name: 'Vienna', nameDe: 'Wien', address: 'Quellenstraße 51, 1100 Wien' },
    { name: 'Lower Austria', nameDe: 'Niederösterreich', address: 'Wiener Straße 31, 3100 St. Pölten' },
    { name: 'Upper Austria', nameDe: 'Oberösterreich', address: 'Landstraße 36, 4020 Linz' },
    { name: 'Styria', nameDe: 'Steiermark', address: 'Herrengasse 16, 8010 Graz' },
    { name: 'Tyrol', nameDe: 'Tirol', address: 'Maria-Theresien-Straße 42, 6020 Innsbruck' },
    { name: 'Carinthia', nameDe: 'Kärnten', address: 'Alter Platz 30, 9020 Klagenfurt' },
    { name: 'Salzburg', nameDe: 'Salzburg', address: 'Getreidegasse 33, 5020 Salzburg' },
    { name: 'Vorarlberg', nameDe: 'Vorarlberg', address: 'Marktstraße 11, 6900 Bregenz' },
    { name: 'Burgenland', nameDe: 'Burgenland', address: 'Hauptstraße 31, 7000 Eisenstadt' },
  ];

  // FAQ data
  const faqData = language.code === 'de' ? [
    {
      question: 'Wie kann ich einen Termin vereinbaren?',
      answer: 'Sie können einen Termin über unsere Website, per Telefon oder direkt in einer unserer Filialen vereinbaren.'
    },
    {
      question: 'Welche Dokumente benötige ich?',
      answer: 'Die benötigten Dokumente hängen von Ihrem Anliegen ab. Kontaktieren Sie uns für spezifische Informationen.'
    },
    {
      question: 'Gibt es Gebühren für die Beratung?',
      answer: 'Die erste Beratung ist kostenlos. Weitere Dienstleistungen können kostenpflichtig sein.'
    },
    {
      question: 'In welchen Sprachen wird Unterstützung angeboten?',
      answer: 'Wir bieten Unterstützung in Deutsch, Englisch und vielen anderen Sprachen an.'
    }
  ] : [
    {
      question: 'How can I schedule an appointment?',
      answer: 'You can schedule an appointment through our website, by phone, or directly at one of our offices.'
    },
    {
      question: 'What documents do I need?',
      answer: 'Required documents depend on your specific needs. Contact us for specific information about your situation.'
    },
    {
      question: 'Are there fees for consultation?',
      answer: 'The first consultation is free. Additional services may have fees.'
    },
    {
      question: 'What languages is support offered in?',
      answer: 'We offer support in German, English, and many other languages.'
    }
  ];
  
  // Translate based on language
  const mentorTitle = language.code === 'de' ? 'Mit einem Mentor sprechen' : 'Talk to a mentor';
  const communityTitle = language.code === 'de' ? 'Frage die Community' : 'Ask the community';
  const visitTitle = language.code === 'de' ? 'Besuche uns persönlich' : 'Visit us in person';
  const faqTitle = language.code === 'de' ? 'Häufig gestellte Fragen' : 'FAQ';
  const pageTitle = language.code === 'de' ? 'Allgemeine Unterstützung' : 'General Support';
  const pageSubtitle = language.code === 'de' ? 'Kontaktiere uns direkt' : 'Reach out to us directly';

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.subtitle}>{pageSubtitle}</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Talk to a mentor */}
        <AccordionItem
          title={mentorTitle}
          icon="question-answer"
          iconColor="#3B82F6"
          expanded={expandedSection === 'mentor'}
          onPress={() => toggleSection('mentor')}
        >
          <ContactButton 
            title="WhatsApp" 
            iconPath={WhatsAppIcon}
            onPress={() => handleContactClick('../assets/images/whatsapp.svg', true, language.code)}
          />
          <ContactButton 
            title="Signal" 
            iconPath={SignalIcon}
            onPress={() => handleContactClick('../assets/images/signal.svg', true, language.code)}
          />
          <ContactButton 
            title="Telegram" 
            iconPath={TelegramIcon}
            onPress={() => handleContactClick('../assets/images/telegram.svg', true, language.code)}
          />
          <ContactButton 
            title="Facebook" 
            iconPath={FacebookIcon}
            onPress={() => handleContactClick('../assets/images/facebook.svg', true, language.code)}
          />
          <ContactButton 
            title="Email" 
            icon="email" 
            onPress={() => handleContactClick('email', true, language.code)}
          />
          <ContactButton 
            title={language.code === 'de' ? 'Telefon' : 'Phone'} 
            icon="phone" 
            onPress={() => handleContactClick('phone', true, language.code)}
          />
        </AccordionItem>
        
        {/* Ask the community */}
        <AccordionItem
          title={communityTitle}
          icon="people"
          iconColor="#10B981"
          expanded={expandedSection === 'community'}
          onPress={() => toggleSection('community')}
        >
          <ContactButton 
            title="WhatsApp" 
            iconPath={WhatsAppIcon}
            onPress={() => handleContactClick('../assets/images/whatsapp.svg', false, language.code)}
          />
          <ContactButton 
            title="Signal" 
            iconPath={SignalIcon}
            onPress={() => handleContactClick('../assets/images/signal.svg', false, language.code)}
          />
          <ContactButton 
            title="Telegram" 
            iconPath={TelegramIcon}
            onPress={() => handleContactClick('../assets/images/telegram.svg', false, language.code)}
          />
          <ContactButton 
            title="Forum" 
            icon="forum" 
            onPress={() => handleContactClick('community-forum', false, language.code)}
          />
        </AccordionItem>
        
        {/* Visit in person */}
        <AccordionItem
          title={visitTitle}
          icon="location-on"
          iconColor="#8B5CF6"
          expanded={expandedSection === 'visit'}
          onPress={() => toggleSection('visit')}
        >
          {austrianStates.map((state) => (
            <StateCard 
              key={state.name}
              stateName={language.code === 'de' ? state.nameDe : state.name}
              address={state.address}
            />
          ))}
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem
          title={faqTitle}
          icon="help"
          iconColor="#F59E0B"
          expanded={expandedSection === 'faq'}
          onPress={() => toggleSection('faq')}
        >
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              expanded={expandedFAQ === index}
              onPress={() => toggleFAQ(index)}
            />
          ))}
        </AccordionItem>

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

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
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
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
});

export default GeneralSupport;
