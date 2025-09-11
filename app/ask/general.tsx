import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/language/common';
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
import { useTranslation } from 'react-i18next';

const GeneralSupport: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation('generalAsk');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

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
      specialization: t('legalSupport'),
      languages: ['German', 'English', 'French']
    },
    {
      name: 'Ahmed Hassan',
      specialization: t('migrationExperience'),
      languages: ['Arabic', 'German', 'English']
    },
    {
      name: 'Maria Gonzalez',
      specialization: t('educationCounseling'),
      languages: ['Spanish', 'German', 'English']
    },
    {
      name: 'Dr. Fatima Al-Rashid',
      specialization: t('healthcare'),
      languages: ['Persian', 'German', 'English']
    },
    {
      name: 'Viktor Petrov',
      specialization: t('jobMarket'),
      languages: ['Russian', 'German', 'English']
    }
  ];

  // Multi-lingual FAQ data using translations
  const faqData = [
    {
      question: t('faqQuestion1'),
      answer: t('faqAnswer1')
    },
    {
      question: t('faqQuestion2'),
      answer: t('faqAnswer2')
    },
    {
      question: t('faqQuestion3'),
      answer: t('faqAnswer3')
    },
    {
      question: t('faqQuestion4'),
      answer: t('faqAnswer4')
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
        <Text style={styles.title}>{t('generalSupport')}</Text>
        <Text style={styles.subtitle}>{t('reachOutDirectly')}</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Talk to a mentor */}
        <AccordionItem
          title={t('talkToMentor')}
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
          title={t('askCommunity')}
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
          title={t('visitUsOnline')}
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
                languages={expert.languages}
              />
            ))}
          </View>
        </AccordionItem>
        
        {/* Visit in person */}
        <AccordionItem
          title={t('visitInPerson')}
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
          title={t('talkToVirtualChatbots')}
          icon="android"
          iconColor="#9C27B0"
          expanded={expandedSection === 'chatbots'}
          onPress={() => toggleSection('chatbots')}
        >
          <ContactButton 
            title={t('talkToVirtualChatbots')}
            icon="android" 
            onPress={() => setShowVirtualAssistant(true)}
          />
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem
          title={t('faq')}
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
