import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import { languages } from '../../../data/language/common';

const DomesticViolencePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'domestic violence': {
      en: 'Physical, emotional, or sexual abuse by a partner, family member, or someone you live with',
      de: 'Körperliche, emotionale oder sexuelle Gewalt durch einen Partner, Familienmitglied oder jemanden, mit dem Sie zusammenleben'
    },
    'abuse': {
      en: 'Harmful behavior intended to control, hurt, or intimidate another person',
      de: 'Schädliches Verhalten mit der Absicht, eine andere Person zu kontrollieren, zu verletzen oder einzuschüchtern'
    },
    'safety plan': {
      en: 'A personalized plan to help you stay safe and prepare for dangerous situations',
      de: 'Ein persönlicher Plan, der Ihnen hilft, sicher zu bleiben und sich auf gefährliche Situationen vorzubereiten'
    },
    'restraining order': {
      en: 'A legal document that prohibits someone from contacting or approaching you',
      de: 'Ein rechtliches Dokument, das jemandem verbietet, Sie zu kontaktieren oder sich Ihnen zu nähern'
    },
    'emotional abuse': {
      en: 'Using words, actions, or behaviors to control, isolate, or harm someone emotionally',
      de: 'Die Verwendung von Worten, Handlungen oder Verhaltensweisen, um jemanden emotional zu kontrollieren, zu isolieren oder zu verletzen'
    },
    'financial abuse': {
      en: 'Controlling someone by limiting their access to money, work, or financial independence',
      de: 'Jemanden zu kontrollieren, indem man seinen Zugang zu Geld, Arbeit oder finanzieller Unabhängigkeit einschränkt'
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showBackButton={true}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="security" size={40} color="#E91E63" />
          <Text style={styles.title}>Domestic Violence Support</Text>
          <Text style={styles.subtitle}>You are not alone. Help is available.</Text>
        </View>

        <View style={styles.importantNote}>
          <MaterialIcons name="favorite" size={24} color="#E91E63" />
          <Text style={styles.importantText}>
            <Text style={styles.bold}>Remember:</Text> Violence is never your fault. You deserve to be safe and respected. Seeking help is brave and important.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is Domestic Violence?</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            **Domestic violence** is any form of **abuse** that happens between people who live together or have a close relationship. It can happen to anyone, regardless of age, background, or education level.
          </HighlightedText>
          
          <View style={styles.typeItem}>
            <Text style={styles.typeTitle}>Physical Violence</Text>
            <Text style={styles.typeText}>
              Hitting, pushing, slapping, choking, or any unwanted physical contact that causes pain or injury.
            </Text>
          </View>

          <View style={styles.typeItem}>
            <Text style={styles.typeTitle}>Emotional Abuse</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              **Emotional abuse** includes name-calling, threats, isolation from friends and family, constant criticism, or controlling behavior.
            </HighlightedText>
          </View>

          <View style={styles.typeItem}>
            <Text style={styles.typeTitle}>Financial Abuse</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              **Financial abuse** means controlling your access to money, preventing you from working, or hiding financial information from you.
            </HighlightedText>
          </View>

          <View style={styles.typeItem}>
            <Text style={styles.typeTitle}>Sexual Violence</Text>
            <Text style={styles.typeText}>
              Any unwanted sexual contact or forcing someone to do sexual things against their will.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warning Signs</Text>
          <Text style={styles.warningText}>Your partner or family member may:</Text>
          
          <View style={styles.warningList}>
            <Text style={styles.warningItem}>• Control where you go or who you see</Text>
            <Text style={styles.warningItem}>• Check your phone, email, or social media</Text>
            <Text style={styles.warningItem}>• Prevent you from working or studying</Text>
            <Text style={styles.warningItem}>• Threaten to hurt you, your children, or pets</Text>
            <Text style={styles.warningItem}>• Make you feel afraid or walk on eggshells</Text>
            <Text style={styles.warningItem}>• Control all the money or hide financial information</Text>
            <Text style={styles.warningItem}>• Isolate you from friends and family</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Stay Safe</Text>
          
          <View style={styles.safetyItem}>
            <Text style={styles.safetyTitle}>Create a Safety Plan</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              A **safety plan** helps you prepare for dangerous situations. Think about safe places to go, people who can help, and important items to take if you need to leave quickly.
            </HighlightedText>
          </View>

          <View style={styles.safetyItem}>
            <Text style={styles.safetyTitle}>Keep Important Documents Safe</Text>
            <Text style={styles.safetyText}>
              Keep copies of your ID, passport, bank cards, and important papers in a safe place outside your home, with a trusted friend or family member.
            </Text>
          </View>

          <View style={styles.safetyItem}>
            <Text style={styles.safetyTitle}>Have Emergency Money</Text>
            <Text style={styles.safetyText}>
              If possible, keep some money hidden in a safe place or with someone you trust in case you need to leave suddenly.
            </Text>
          </View>

          <View style={styles.safetyItem}>
            <Text style={styles.safetyTitle}>Trust Your Feelings</Text>
            <Text style={styles.safetyText}>
              If you feel unsafe, trust your instincts. You know your situation best.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Protection</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            In Austria, you can get a **restraining order** (Betretungsverbot) to legally protect yourself. The police can remove the violent person from your home immediately, and they cannot return for a certain period.
          </HighlightedText>
          
          <View style={styles.legalItem}>
            <Text style={styles.legalTitle}>Immediate Protection</Text>
            <Text style={styles.legalText}>
              Police can issue an immediate restraining order lasting 2 weeks. The violent person must leave the home and stay away.
            </Text>
          </View>

          <View style={styles.legalItem}>
            <Text style={styles.legalTitle}>Extended Protection</Text>
            <Text style={styles.legalText}>
              You can apply to court for longer protection (up to 1 year). Legal aid is available to help with costs.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Services</Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.aoef.at/')}>
            <MaterialIcons name="home" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Austrian Women's Shelter Network - Emergency shelter and support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.frauenhelpline.at/')}>
            <MaterialIcons name="phone" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Women's Helpline - 24/7 counseling and support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.interventionsstelle-wien.at/')}>
            <MaterialIcons name="support" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Intervention Center - Legal and psychological support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.weisser-ring.at/')}>
            <MaterialIcons name="volunteer-activism" size={20} color="#E91E63" />
            <Text style={styles.linkText}>White Ring - Crime victim support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.orientexpress-wien.com/')}>
            <MaterialIcons name="translate" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Orient Express - Support for migrant women</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emergencySection}>
          <MaterialIcons name="warning" size={24} color="#D32F2F" />
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Women's Helpline:</Text> 0800 222 555 (24/7, free, multilingual)
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Police Emergency:</Text> 133
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Emergency Services:</Text> 112
          </Text>
          <Text style={styles.emergencyNote}>
            These numbers are free and available 24/7. You can call even if you're not sure if it's an emergency.
          </Text>
        </View>

        <View style={styles.supportMessage}>
          <MaterialIcons name="favorite" size={24} color="#E91E63" />
          <Text style={styles.supportText}>
            You are strong and brave. Taking the first step to seek help shows incredible courage. There are people who care about you and want to help you be safe.
          </Text>
        </View>
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  importantNote: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  importantText: {
    fontSize: 16,
    color: '#C62828',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  typeItem: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  typeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  warningText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
  warningList: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#E65100',
    lineHeight: 24,
  },
  safetyItem: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2E7D32',
  },
  safetyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#388E3C',
  },
  legalItem: {
    backgroundColor: '#F3E5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#7B1FA2',
  },
  legalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#8E24AA',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  linkText: {
    fontSize: 16,
    color: '#E91E63',
    marginLeft: 12,
    flex: 1,
  },
  emergencySection: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F',
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C62828',
    textAlign: 'center',
  },
  emergencyText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  emergencyNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  supportMessage: {
    flexDirection: 'row',
    backgroundColor: '#F3E5F5',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  supportText: {
    fontSize: 16,
    color: '#7B1FA2',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DomesticViolencePage;