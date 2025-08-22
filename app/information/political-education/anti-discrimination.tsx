
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const AntiDiscriminationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const content = {
    title: {
      en: 'Anti-Discrimination',
      de: 'Antidiskriminierung'
    },
    subtitle: {
      en: 'Your Rights and Protection Against Discrimination',
      de: 'Ihre Rechte und Schutz vor Diskriminierung'
    },
    description: {
      en: `Discrimination is prohibited in Austria and you have the right to equal treatment regardless of your origin, religion, gender, age, sexual orientation, or disability.

What is discrimination?
Discrimination occurs when someone is treated unfairly or differently because of their personal characteristics. This can happen in various areas:

• Employment and workplace
• Housing and accommodation
• Education and training
• Access to goods and services
• Healthcare services
• Public transportation

Types of discrimination:
• Direct discrimination: Open and obvious unequal treatment
• Indirect discrimination: Rules that seem neutral but disadvantage certain groups
• Harassment: Unwanted behavior that violates dignity
• Victimization: Punishment for making a discrimination complaint

Your rights:
• Right to equal treatment in all areas of life
• Right to file a complaint without fear of retaliation
• Right to legal support and representation
• Right to compensation in cases of proven discrimination

Where to get help:
• Austrian Ombudsman Board (Volksanwaltschaft)
• Equal Treatment Commission (Gleichbehandlungskommission)
• Anti-discrimination offices in your state
• Legal aid organizations
• Trade unions and employee representatives`,
      de: `Diskriminierung ist in Österreich verboten und Sie haben das Recht auf Gleichbehandlung unabhängig von Ihrer Herkunft, Religion, Ihrem Geschlecht, Alter, Ihrer sexuellen Orientierung oder Behinderung.

Was ist Diskriminierung?
Diskriminierung liegt vor, wenn jemand aufgrund seiner persönlichen Eigenschaften unfair oder anders behandelt wird. Dies kann in verschiedenen Bereichen geschehen:

• Beschäftigung und Arbeitsplatz
• Wohnen und Unterbringung
• Bildung und Ausbildung
• Zugang zu Waren und Dienstleistungen
• Gesundheitsdienste
• Öffentliche Verkehrsmittel

Arten der Diskriminierung:
• Direkte Diskriminierung: Offene und offensichtliche Ungleichbehandlung
• Indirekte Diskriminierung: Regeln, die neutral erscheinen, aber bestimmte Gruppen benachteiligen
• Belästigung: Unerwünschtes Verhalten, das die Würde verletzt
• Viktimisierung: Bestrafung für eine Diskriminierungsbeschwerde

Ihre Rechte:
• Recht auf Gleichbehandlung in allen Lebensbereichen
• Recht, eine Beschwerde ohne Angst vor Vergeltung einzureichen
• Recht auf rechtliche Unterstützung und Vertretung
• Recht auf Entschädigung bei nachgewiesener Diskriminierung

Wo Sie Hilfe bekommen:
• Österreichische Volksanwaltschaft
• Gleichbehandlungskommission
• Antidiskriminierungsstellen in Ihrem Bundesland
• Rechtsberatungsorganisationen
• Gewerkschaften und Arbeitnehmervertretungen`
    },
    contacts: [
      {
        name: 'Volksanwaltschaft',
        phone: '+43 1 51505-0',
        email: 'post@volksanwaltschaft.gv.at',
        website: 'https://volksanwaltschaft.gv.at'
      },
      {
        name: 'Gleichbehandlungsanwaltschaft',
        phone: '+43 1 53120-9999',
        email: 'gaw@bka.gv.at',
        website: 'https://www.gleichbehandlungsanwaltschaft.gv.at'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <Text style={styles.description}>
          {language.code === 'de' ? content.description.de : content.description.en}
        </Text>
        
        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Wichtige Kontakte' : 'Important Contacts'}
          </Text>
          
          {content.contacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <Text style={styles.contactName}>{contact.name}</Text>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="phone" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>{contact.phone}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="email" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>{contact.email}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="language" size={20} color="#3B82F6" />
                <Text style={[styles.contactText, styles.linkText]}>{contact.website}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Video Section */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Informationsvideo' : 'Information Video'}
          </Text>
          <View style={styles.videoPlaceholder}>
            <MaterialIcons name="play-circle-filled" size={64} color="#3B82F6" />
            <Text style={styles.videoPlaceholderText}>
              {language.code === 'de' ? 'Video wird geladen...' : 'Video loading...'}
            </Text>
          </View>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  contactSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  videoSection: {
    marginBottom: 32,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  videoPlaceholderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
});

export default AntiDiscriminationPage;
