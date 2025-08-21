import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const SecurityGeneralInformationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const content = {
    title: {
      en: 'General Security Information',
      de: 'Allgemeine Sicherheitsinformationen'
    },
    subtitle: {
      en: 'Basic safety knowledge for daily life in Austria',
      de: 'Grundlegendes Sicherheitswissen für den Alltag in Österreich'
    },
    text: {
      en: `Understanding basic security concepts helps you navigate daily life safely in Austria. This information covers essential safety practices and what to expect in various situations.

**Lost and Found Services:**
If you lose important items, Austria has well-established lost and found services. Contact local police stations for lost documents or valuables. Major cities have central lost property offices (Fundamt). Always report lost official documents immediately.

**What Constitutes Harassment:**
Harassment includes unwanted verbal, physical, or digital behavior that makes someone feel threatened or uncomfortable. This includes:
• Unwanted sexual advances or comments
• Persistent following or stalking
• Threats or intimidation
• Discriminatory behavior based on race, religion, gender, or origin
• Cyberbullying or online harassment

**Night-time Safety:**
Austria is generally safe at night, but basic precautions apply:
• Stay in well-lit, populated areas
• Use official transportation services
• Keep emergency contacts readily available
• Trust your instincts and avoid situations that feel unsafe
• Let someone know your plans when going out late

**Mutual Respect and Social Norms:**
Austrian society values mutual respect and courtesy. Understanding social expectations helps integrate smoothly:
• Greet people appropriately (handshakes are common)
• Respect personal space and privacy
• Be punctual for appointments and meetings
• Follow local customs and traditions
• Show consideration for neighbors and community

**Emergency Preparedness:**
Keep important documents and emergency contacts easily accessible. Know the location of your nearest hospital, police station, and embassy or consulate.`,
      de: `Das Verständnis grundlegender Sicherheitskonzepte hilft Ihnen, sich sicher im österreichischen Alltag zu bewegen. Diese Informationen decken wesentliche Sicherheitspraktiken ab und zeigen, was Sie in verschiedenen Situationen erwarten können.

**Fundsachen-Service:**
Wenn Sie wichtige Gegenstände verlieren, hat Österreich gut etablierte Fundsachen-Services. Kontaktieren Sie örtliche Polizeistationen für verlorene Dokumente oder Wertgegenstände. Größere Städte haben zentrale Fundämter. Melden Sie verlorene offizielle Dokumente immer sofort.

**Was ist Belästigung:**
Belästigung umfasst unerwünschtes verbales, körperliches oder digitales Verhalten, das jemanden bedroht oder unwohl fühlen lässt. Dazu gehören:
• Unerwünschte sexuelle Annäherungen oder Kommentare
• Hartnäckiges Verfolgen oder Stalking
• Drohungen oder Einschüchterung
• Diskriminierendes Verhalten aufgrund von Rasse, Religion, Geschlecht oder Herkunft
• Cybermobbing oder Online-Belästigung

**Nächtliche Sicherheit:**
Österreich ist nachts generell sicher, aber grundlegende Vorsichtsmaßnahmen gelten:
• Bleiben Sie in gut beleuchteten, belebten Bereichen
• Nutzen Sie offizielle Transportdienste
• Haben Sie Notfallkontakte griffbereit
• Vertrauen Sie Ihren Instinkten und vermeiden Sie unsichere Situationen
• Teilen Sie jemandem Ihre Pläne mit, wenn Sie spät ausgehen

**Gegenseitiger Respekt und soziale Normen:**
Die österreichische Gesellschaft schätzt gegenseitigen Respekt und Höflichkeit. Das Verständnis sozialer Erwartungen hilft bei der reibungslosen Integration:
• Begrüßen Sie Menschen angemessen (Händeschütteln ist üblich)
• Respektieren Sie persönlichen Raum und Privatsphäre
• Seien Sie pünktlich zu Terminen und Meetings
• Befolgen Sie lokale Bräuche und Traditionen
• Zeigen Sie Rücksicht auf Nachbarn und Gemeinschaft

**Notfallvorsorge:**
Bewahren Sie wichtige Dokumente und Notfallkontakte leicht zugänglich auf. Kennen Sie den Standort des nächsten Krankenhauses, der Polizeistation und Ihrer Botschaft oder Ihres Konsulats.`
    },
    links: [
      {
        title: { en: 'Vienna Lost Property Office', de: 'Wiener Fundamt' },
        url: 'https://www.wien.gv.at/amtshelfer/gesellschaft-soziales/fundservice/'
      },
      {
        title: { en: 'Emergency Numbers Austria', de: 'Notrufnummern Österreich' },
        url: 'https://www.oesterreich.gv.at/themen/notfaelle_und_recht/notruf.html'
      },
      {
        title: { en: 'Safety in Austria Guide', de: 'Sicherheit in Österreich Leitfaden' },
        url: 'https://www.help.gv.at'
      }
    ],
    videoTitle: {
      en: 'Safety Basics in Austria',
      de: 'Sicherheitsgrundlagen in Österreich'
    }
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
        
        {/* Parse text to make **text** bold */}
        <Text style={styles.text}>
          {(language.code === 'de' ? content.text.de : content.text.en)
            .split(/(\*\*[^*]+\*\*)/)
            .map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <Text key={index} style={styles.boldText}>
                    {part.slice(2, -2)}
                  </Text>
                );
              }
              return part;
            })}
        </Text>
        
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
        
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>
          
          <TouchableOpacity style={styles.videoCard} onPress={handleVideoPress}>
            <View style={styles.videoThumbnail}>
              <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            </View>
            <Text style={styles.videoTitle}>
              {language.code === 'de' ? content.videoTitle.de : content.videoTitle.en}
            </Text>
          </TouchableOpacity>
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
  linksSection: {
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
  videoSection: {
    marginBottom: 32,
  },
  videoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
  },
  videoThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SecurityGeneralInformationPage;