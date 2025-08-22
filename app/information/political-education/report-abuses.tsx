
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const ReportAbusesPage: React.FC = () => {
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
      en: 'How to Report Abuses',
      de: 'Wie man Missbrauch meldet'
    },
    subtitle: {
      en: 'Your Guide to Reporting Different Types of Abuse',
      de: 'Ihr Leitfaden zur Meldung verschiedener Arten von Missbrauch'
    },
    description: {
      en: `If you experience or witness abuse, it's important to know how and where to report it. You have the right to protection and support.

Types of abuse you can report:
• Physical violence or threats
• Sexual harassment or assault
• Domestic violence
• Child abuse or neglect
• Elder abuse
• Workplace harassment
• Discrimination
• Financial exploitation

Steps to report abuse:

1. Immediate danger: Call emergency services
   • Police: 133
   • Emergency: 112
   
2. Document the incident:
   • Write down what happened, when, and where
   • Take photos of injuries or damage (if safe to do so)
   • Keep any relevant messages or communications
   • Get witness contact information if possible

3. Report to appropriate authorities:
   • Police for criminal matters
   • Employer or HR for workplace issues
   • Social services for child or elder abuse
   • Anti-discrimination offices for discrimination

4. Seek support:
   • Medical attention for injuries
   • Counseling and psychological support
   • Legal advice and representation
   • Support groups and helplines

Your rights when reporting:
• Right to be treated with respect and dignity
• Right to confidentiality and privacy
• Right to an interpreter if needed
• Right to have a support person present
• Right to protection from retaliation
• Right to information about the process`,
      de: `Wenn Sie Missbrauch erleben oder beobachten, ist es wichtig zu wissen, wie und wo Sie ihn melden können. Sie haben das Recht auf Schutz und Unterstützung.

Arten von Missbrauch, die Sie melden können:
• Körperliche Gewalt oder Drohungen
• Sexuelle Belästigung oder Übergriffe
• Häusliche Gewalt
• Kindesmissbrauch oder Vernachlässigung
• Missbrauch älterer Menschen
• Belästigung am Arbeitsplatz
• Diskriminierung
• Finanzielle Ausbeutung

Schritte zur Meldung von Missbrauch:

1. Unmittelbare Gefahr: Notdienste anrufen
   • Polizei: 133
   • Notruf: 112
   
2. Den Vorfall dokumentieren:
   • Aufschreiben, was passiert ist, wann und wo
   • Fotos von Verletzungen oder Schäden machen (wenn sicher)
   • Relevante Nachrichten oder Kommunikation aufbewahren
   • Kontaktdaten von Zeugen sammeln, wenn möglich

3. An zuständige Behörden melden:
   • Polizei für strafrechtliche Angelegenheiten
   • Arbeitgeber oder Personalabteilung für Arbeitsplatzprobleme
   • Sozialamt für Kinder- oder Altenmissbrauch
   • Antidiskriminierungsstellen für Diskriminierung

4. Unterstützung suchen:
   • Medizinische Behandlung bei Verletzungen
   • Beratung und psychologische Unterstützung
   • Rechtsberatung und Vertretung
   • Selbsthilfegruppen und Helplines

Ihre Rechte bei der Meldung:
• Recht auf respektvolle und würdige Behandlung
• Recht auf Vertraulichkeit und Privatsphäre
• Recht auf einen Dolmetscher bei Bedarf
• Recht auf eine Begleitperson
• Recht auf Schutz vor Vergeltung
• Recht auf Information über den Prozess`
    },
    emergencyContacts: [
      {
        name: 'Police',
        nameDE: 'Polizei',
        number: '133',
        description: 'For immediate danger and criminal matters',
        descriptionDE: 'Bei unmittelbarer Gefahr und strafrechtlichen Angelegenheiten'
      },
      {
        name: 'Emergency Services',
        nameDE: 'Notdienste',
        number: '112',
        description: 'For all emergencies',
        descriptionDE: 'Für alle Notfälle'
      },
      {
        name: 'Women\'s Helpline',
        nameDE: 'Frauenhelpline',
        number: '0800 222 555',
        description: 'For women experiencing violence',
        descriptionDE: 'Für Frauen, die Gewalt erleben'
      }
    ],
    supportServices: [
      {
        name: 'Victim Support Austria',
        phone: '+43 1 712 16 12',
        email: 'info@opferhilfe-oeie.at',
        website: 'https://www.opferhilfe-oe.at'
      },
      {
        name: 'Child and Youth Advocacy',
        phone: '+43 1 70 77 000',
        email: 'post@kija.at',
        website: 'https://www.kija.at'
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
        
        {/* Emergency Contacts */}
        <View style={styles.emergencySection}>
          <Text style={[styles.sectionTitle, styles.emergencyTitle]}>
            {language.code === 'de' ? 'Notfallkontakte' : 'Emergency Contacts'}
          </Text>
          
          {content.emergencyContacts.map((contact, index) => (
            <View key={index} style={[styles.contactCard, styles.emergencyCard]}>
              <View style={styles.emergencyHeader}>
                <Text style={styles.emergencyName}>
                  {language.code === 'de' ? contact.nameDE : contact.name}
                </Text>
                <Text style={styles.emergencyNumber}>{contact.number}</Text>
              </View>
              <Text style={styles.emergencyDescription}>
                {language.code === 'de' ? contact.descriptionDE : contact.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Support Services */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unterstützungsdienste' : 'Support Services'}
          </Text>
          
          {content.supportServices.map((service, index) => (
            <View key={index} style={styles.contactCard}>
              <Text style={styles.contactName}>{service.name}</Text>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="phone" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>{service.phone}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="email" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>{service.email}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="language" size={20} color="#3B82F6" />
                <Text style={[styles.contactText, styles.linkText]}>{service.website}</Text>
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
  emergencySection: {
    marginBottom: 32,
  },
  emergencyTitle: {
    color: '#DC2626',
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 2,
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  emergencyNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#991B1B',
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

export default ReportAbusesPage;
