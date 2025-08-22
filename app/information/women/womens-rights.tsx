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

const WomensRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'gender equality': {
      en: 'Equal rights, opportunities, and treatment for all genders',
      de: 'Gleiche Rechte, Chancen und Behandlung für alle Geschlechter'
    },
    'discrimination': {
      en: 'Unfair treatment based on characteristics like gender, race, or religion',
      de: 'Ungerechte Behandlung aufgrund von Merkmalen wie Geschlecht, Rasse oder Religion'
    },
    'patriarchy': {
      en: 'A social system where men hold primary power and authority',
      de: 'Ein gesellschaftliches System, in dem Männer die primäre Macht und Autorität innehaben'
    },
    'legal protection': {
      en: 'Laws and systems that protect people from harm or unfair treatment',
      de: 'Gesetze und Systeme, die Menschen vor Schäden oder unfairer Behandlung schützen'
    },
    'equal opportunities': {
      en: 'Fair chances for everyone regardless of their background or characteristics',
      de: 'Faire Chancen für alle, unabhängig von ihrem Hintergrund oder ihren Merkmalen'
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
          <MaterialIcons name="balance" size={40} color="#E91E63" />
          <Text style={styles.title}>Women's Rights in Austria</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Fundamental Rights</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            Austria guarantees **gender equality** under the law. As a woman, you have the same rights as men in all areas of life. The Austrian Constitution prohibits **discrimination** based on gender, and you are protected by both national and international human rights laws.
          </HighlightedText>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Rights You Have</Text>
          
          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>• Right to Education</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to access education at all levels, from basic schooling to university. No one can deny you education because of your gender.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>• Right to Work and Equal Pay</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to work in any profession and receive **equal opportunities** for employment and promotion. Equal pay for equal work is your legal right.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>• Right to Healthcare</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to access healthcare services, including reproductive health services, without **discrimination** or judgment.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>• Right to Protection from Violence</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to live free from violence and abuse. Austrian law provides strong **legal protection** against domestic violence and harassment.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>• Right to Political Participation</Text>
            <Text style={styles.rightText}>
              You have the right to vote, run for office, and participate in political activities. Your voice matters in democracy.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>International Protection</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            Austria follows the **Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW)**, which guarantees women's rights internationally. This means your rights are protected not just by Austrian law, but by international agreements.
          </HighlightedText>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Can Do</Text>
          
          <View style={styles.actionItem}>
            <Text style={styles.actionTitle}>Know Your Rights</Text>
            <Text style={styles.actionText}>
              Learn about your legal rights and protections. Knowledge is power, and understanding your rights helps you assert them.
            </Text>
          </View>

          <View style={styles.actionItem}>
            <Text style={styles.actionTitle}>Report Discrimination</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              If you experience **discrimination**, you can file a complaint with the Austrian Ombudsman Board or Equal Treatment Commission.
            </HighlightedText>
          </View>

          <View style={styles.actionItem}>
            <Text style={styles.actionTitle}>Seek Support</Text>
            <Text style={styles.actionText}>
              Connect with women's organizations and support networks. You don't have to face challenges alone.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources and Support</Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.frauen-familien-jugend.bka.gv.at/')}>
            <MaterialIcons name="open-in-new" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Federal Ministry for Women, Families and Youth</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.gleichbehandlungsanwaltschaft.gv.at/')}>
            <MaterialIcons name="open-in-new" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Equal Treatment Ombudsperson</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.frauenberatung.at/')}>
            <MaterialIcons name="open-in-new" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Austrian Women's Counseling Network</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.aoef.at/')}>
            <MaterialIcons name="open-in-new" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Austrian Women's Shelter Network</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.orientexpress-wien.com/')}>
            <MaterialIcons name="open-in-new" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Orient Express - Counseling for Migrant Women</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Women's Helpline:</Text> 0800 222 555 (24/7, free)
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Police Emergency:</Text> 133
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  rightItem: {
    marginBottom: 16,
    paddingLeft: 8,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#E91E63',
  },
  rightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  actionItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  actionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
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
    borderLeftColor: '#E91E63',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C62828',
  },
  emergencyText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default WomensRightsPage;