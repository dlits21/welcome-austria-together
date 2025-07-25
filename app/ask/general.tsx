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
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import AccordionItem from '../../components/AccordionItem';
import ContactButton from '../../components/ContactButton';
import StateCard from '../../components/StateCard';
import FAQItem from '../../components/FAQItem';
import ExpertCard from '../../components/ExpertCard';
import { handleContactClick } from '../../utils/contactUtils';
import FacebookIcon from '../../assets/images/facebook.svg';
import SignalIcon from '../../assets/images/signal.svg';
import WhatsAppIcon from '../../assets/images/whatsapp.svg';
import TelegramIcon from '../../assets/images/telegram.svg';
import { getGlobalText } from '../../utils/languageUtils';

// Import general support translations
import generalTranslations from '../../data/language/ask/general.json';

const getGeneralText = (key: string, languageCode: string): string => {
  const translation = generalTranslations[key as keyof typeof generalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

const GeneralSupport: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

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

  // Online experts data with multilingual support
  const onlineExperts = [
    {
      name: 'Dr. Sarah Mueller',
      specialization: getGeneralText('legalSupport', currentLanguage)
    },
    {
      name: 'Ahmed Hassan',
      specialization: getGeneralText('migrationExperience', currentLanguage)
    },
    {
      name: 'Maria Gonzalez',
      specialization: getGeneralText('educationCounseling', currentLanguage)
    },
    {
      name: 'Dr. Fatima Al-Rashid',
      specialization: getGeneralText('healthcare', currentLanguage)
    },
    {
      name: 'Viktor Petrov',
      specialization: getGeneralText('jobMarket', currentLanguage)
    }
  ];

  // Multi-lingual FAQ data using translations
  const faqData = [
    {
      question: getGeneralText('faqQuestion1', currentLanguage),
      answer: getGeneralText('faqAnswer1', currentLanguage)
    },
    {
      question: getGeneralText('faqQuestion2', currentLanguage),
      answer: getGeneralText('faqAnswer2', currentLanguage)
    },
    {
      question: getGeneralText('faqQuestion3', currentLanguage),
      answer: getGeneralText('faqAnswer3', currentLanguage)
    },
    {
      question: getGeneralText('faqQuestion4', currentLanguage),
      answer: getGeneralText('faqAnswer4', currentLanguage)
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{getGeneralText('generalSupport', currentLanguage)}</Text>
        <Text style={styles.subtitle}>{getGeneralText('reachOutDirectly', currentLanguage)}</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Talk to a mentor */}
        <AccordionItem
          title={getGeneralText('talkToMentor', currentLanguage)}
          icon="question-answer"
          iconColor="#3B82F6"
          expanded={expandedSection === 'mentor'}
          onPress={() => toggleSection('mentor')}
        >
          <ContactButton 
            title="WhatsApp" 
            iconPath={WhatsAppIcon}
            onPress={() => handleContactClick('whatsapp', true, language.code)}
          />
          <ContactButton 
            title="Signal" 
            iconPath={SignalIcon}
            onPress={() => handleContactClick('signal', true, language.code)}
          />
          <ContactButton 
            title="Telegram" 
            iconPath={TelegramIcon}
            onPress={() => handleContactClick('telegram', true, language.code)}
          />
          <ContactButton 
            title="Facebook" 
            iconPath={FacebookIcon}
            onPress={() => handleContactClick('facebook', true, language.code)}
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
          title={getGeneralText('askCommunity', currentLanguage)}
          icon="people"
          iconColor="#10B981"
          expanded={expandedSection === 'community'}
          onPress={() => toggleSection('community')}
        >
          <ContactButton 
            title="WhatsApp" 
            iconPath={WhatsAppIcon}
            onPress={() => handleContactClick('whatsapp', false, language.code)}
          />
          <ContactButton 
            title="Signal" 
            iconPath={SignalIcon}
            onPress={() => handleContactClick('signal', false, language.code)}
          />
          <ContactButton 
            title="Telegram" 
            iconPath={TelegramIcon}
            onPress={() => handleContactClick('telegram', false, language.code)}
          />
          <ContactButton 
            title="Forum" 
            icon="forum" 
            onPress={() => handleContactClick('community-forum', false, language.code)}
          />
        </AccordionItem>

        {/* Visit us online */}
        <AccordionItem
          title={getGeneralText('visitUsOnline', currentLanguage)}
          icon="computer"
          iconColor="#666"
          expanded={expandedSection === 'online'}
          onPress={() => toggleSection('online')}
        >
          <View style={styles.expertGrid}>
            {onlineExperts.map((expert, index) => (
              <ExpertCard
                key={index}
                name={expert.name}
                specialization={expert.specialization}
                availableDays={expert.availableDays}
                languageCode={currentLanguage}
              />
            ))}
          </View>
        </AccordionItem>
        
        {/* Visit in person */}
        <AccordionItem
          title={getGeneralText('visitInPerson', currentLanguage)}
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

        {/* Virtual Chatbots */}
        <AccordionItem
          title={getGeneralText('talkToVirtualChatbots', currentLanguage)}
          icon="android"
          iconColor="#9C27B0"
          expanded={expandedSection === 'chatbots'}
          onPress={() => toggleSection('chatbots')}
        >
          <ContactButton 
            title={getGeneralText('talkToVirtualChatbots', currentLanguage)}
            icon="android" 
            onPress={() => setShowVirtualAssistant(true)}
          />
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem
          title={getGeneralText('faq', currentLanguage)}
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

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="ask-general"
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
  expertGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default GeneralSupport;
