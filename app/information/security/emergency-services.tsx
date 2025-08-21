import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const EmergencyServicesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEmergencyCall = (number: string, serviceName: string) => {
    Alert.alert(
      language.code === 'de' ? 'Notruf' : 'Emergency Call',
      language.code === 'de' 
        ? `Möchten Sie ${serviceName} anrufen? (${number})`
        : `Do you want to call ${serviceName}? (${number})`,
      [
        {
          text: language.code === 'de' ? 'Abbrechen' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language.code === 'de' ? 'Anrufen' : 'Call',
          onPress: () => Linking.openURL(`tel:${number}`),
        },
      ]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Emergency Services in Austria',
      de: 'Notdienste in Österreich'
    },
    subtitle: {
      en: 'Know who to call in emergency situations',
      de: 'Wissen, wen Sie in Notfällen anrufen müssen'
    },
    text: {
      en: `Emergency services in Austria are well-organized and respond quickly to calls. Knowing the right number to call can save lives and get you the help you need faster.

**When to Call Emergency Services:**
Only call emergency numbers for actual emergencies - situations where immediate help is needed to save lives, prevent serious injury, or stop crimes in progress.

**Important Notes:**
• All emergency services speak German, but many operators understand basic English
• Give your location first - this is the most important information
• Stay calm and speak clearly
• Don't hang up until the operator tells you to
• Follow any instructions given by the emergency operator

**Silent Distress Call App:**
Austria has a **"SilentCall" app** for situations where you cannot speak safely:
• Download from official app stores
• Pre-register with your information
• Use when you need help but cannot talk (domestic violence, stalking, etc.)
• GPS location is automatically sent to emergency services
• Available 24/7 in multiple languages`,
      de: `Notdienste in Österreich sind gut organisiert und reagieren schnell auf Anrufe. Die richtige Nummer zu kennen kann Leben retten und Ihnen helfen, schneller Hilfe zu bekommen.

**Wann Notdienste anrufen:**
Rufen Sie Notrufnummern nur bei echten Notfällen an - Situationen, in denen sofortige Hilfe benötigt wird, um Leben zu retten, schwere Verletzungen zu verhindern oder laufende Verbrechen zu stoppen.

**Wichtige Hinweise:**
• Alle Notdienste sprechen Deutsch, aber viele Operatoren verstehen grundlegendes Englisch
• Nennen Sie zuerst Ihren Standort - das ist die wichtigste Information
• Bleiben Sie ruhig und sprechen Sie deutlich
• Legen Sie nicht auf, bis der Operator es Ihnen sagt
• Befolgen Sie alle Anweisungen des Notfall-Operators

**Stummer Notruf App:**
Österreich hat eine **"SilentCall" App** für Situationen, in denen Sie nicht sicher sprechen können:
• Download aus offiziellen App-Stores
• Vorab-Registrierung mit Ihren Informationen
• Verwenden, wenn Sie Hilfe brauchen, aber nicht sprechen können (häusliche Gewalt, Stalking etc.)
• GPS-Standort wird automatisch an Notdienste gesendet
• 24/7 verfügbar in mehreren Sprachen`
    },
    emergencyServices: [
      {
        name: { en: 'Police', de: 'Polizei' },
        number: '133',
        description: { 
          en: 'Crime in progress, accidents, immediate danger',
          de: 'Verbrechen im Gange, Unfälle, unmittelbare Gefahr'
        },
        color: '#10B981'
      },
      {
        name: { en: 'Fire Department', de: 'Feuerwehr' },
        number: '122',
        description: { 
          en: 'Fires, gas leaks, people trapped, technical emergencies',
          de: 'Brände, Gaslecks, eingeschlossene Personen, technische Notfälle'
        },
        color: '#EF4444'
      },
      {
        name: { en: 'Medical Emergency', de: 'Rettungsdienst' },
        number: '144',
        description: { 
          en: 'Medical emergencies, ambulance, life-threatening situations',
          de: 'Medizinische Notfälle, Krankenwagen, lebensbedrohliche Situationen'
        },
        color: '#F97316'
      },
      {
        name: { en: 'European Emergency', de: 'Europäischer Notruf' },
        number: '112',
        description: { 
          en: 'Universal emergency number (works from mobile phones)',
          de: 'Universelle Notrufnummer (funktioniert von Mobiltelefonen)'
        },
        color: '#3B82F6'
      },
      {
        name: { en: 'Domestic Violence Hotline', de: 'Frauenhelpline' },
        number: '0800 222 555',
        description: { 
          en: '24/7 support for domestic violence victims',
          de: '24/7 Unterstützung für Opfer häuslicher Gewalt'
        },
        color: '#8B5CF6'
      },
      {
        name: { en: 'Crisis Intervention', de: 'Krisenintervention' },
        number: '142',
        description: { 
          en: 'Mental health crisis, suicide prevention',
          de: 'Psychische Krise, Suizidprävention'
        },
        color: '#06B6D4'
      }
    ],
    links: [
      {
        title: { en: 'SilentCall App Info', de: 'SilentCall App Info' },
        url: 'https://www.bundeskanzleramt.gv.at'
      },
      {
        title: { en: 'Austrian Emergency Services Guide', de: 'Österreichischer Notdienst-Leitfaden' },
        url: 'https://www.help.gv.at'
      }
    ]
  };

  const parseMarkdownText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
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
        
        <Text style={styles.text}>
          {parseMarkdownText(language.code === 'de' ? content.text.de : content.text.en)}
        </Text>
        
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Notdienste' : 'Emergency Services'}
          </Text>
          
          {content.emergencyServices.map((service, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.serviceCard, { borderLeftColor: service.color }]}
              onPress={() => handleEmergencyCall(
                service.number, 
                language.code === 'de' ? service.name.de : service.name.en
              )}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>
                  {language.code === 'de' ? service.name.de : service.name.en}
                </Text>
                <Text style={styles.serviceNumber}>{service.number}</Text>
                <Text style={styles.serviceDescription}>
                  {language.code === 'de' ? service.description.de : service.description.en}
                </Text>
              </View>
              <MaterialIcons name="phone" size={24} color={service.color} />
            </TouchableOpacity>
          ))}
        </View>
        
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
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  boldText: {
    fontWeight: 'bold',
  },
  servicesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 4,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  linksSection: {
    marginBottom: 32,
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
});

export default EmergencyServicesPage;