import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const HumanRightsPage: React.FC = () => {
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
      en: 'Human Rights in Austria',
      de: 'Menschenrechte in Österreich'
    },
    subtitle: {
      en: 'Your Fundamental Rights and Freedoms',
      de: 'Ihre Grundrechte und Freiheiten'
    },
    text: {
      en: `Human rights are fundamental rights and freedoms that belong to every person. In Austria, these rights are protected by the Constitution and international treaties.

Key human rights in Austria include:
• Right to life and security
• Freedom from torture and degrading treatment
• Right to liberty and fair trial
• Freedom of expression and religion
• Right to privacy and family life
• Right to education and healthcare
• Protection from discrimination

The Austrian Constitution guarantees these rights to all people living in Austria, regardless of citizenship status. The European Convention on Human Rights also applies.

If your rights are violated, you can:
• Contact the Austrian Ombudsman Board
• Seek legal assistance through NGOs
• File complaints with courts
• Contact the European Court of Human Rights

Understanding your rights empowers you to live with dignity and seek protection when needed.`,
      de: `Menschenrechte sind grundlegende Rechte und Freiheiten, die jedem Menschen zustehen. In Österreich werden diese Rechte durch die Verfassung und internationale Verträge geschützt.

Wichtige Menschenrechte in Österreich sind:
• Recht auf Leben und Sicherheit
• Freiheit von Folter und erniedrigender Behandlung
• Recht auf Freiheit und faires Verfahren
• Meinungs- und Religionsfreiheit
• Recht auf Privatsphäre und Familienleben
• Recht auf Bildung und Gesundheitsversorgung
• Schutz vor Diskriminierung

Die österreichische Verfassung garantiert diese Rechte allen in Österreich lebenden Menschen, unabhängig vom Staatsbürgerschaftsstatus. Die Europäische Menschenrechtskonvention gilt ebenfalls.

Wenn Ihre Rechte verletzt werden, können Sie:
• Die österreichische Volksanwaltschaft kontaktieren
• Rechtshilfe über NGOs suchen
• Beschwerden bei Gerichten einreichen
• Den Europäischen Gerichtshof für Menschenrechte kontaktieren

Das Verständnis Ihrer Rechte befähigt Sie, in Würde zu leben und Schutz zu suchen, wenn nötig.`
    },
    links: [
      {
        title: { en: 'Austrian Ombudsman Board', de: 'Österreichische Volksanwaltschaft' },
        url: 'https://www.volksanwaltschaft.gv.at'
      },
      {
        title: { en: 'European Court of Human Rights', de: 'Europäischer Gerichtshof für Menschenrechte' },
        url: 'https://www.echr.coe.int'
      },
      {
        title: { en: 'Human Rights Organizations', de: 'Menschenrechtsorganisationen' },
        url: 'https://www.amnesty.at'
      }
    ],
    videoTitle: {
      en: 'Understanding Your Human Rights',
      de: 'Ihre Menschenrechte verstehen'
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
        
        <Text style={styles.text}>
          {language.code === 'de' ? content.text.de : content.text.en}
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

export default HumanRightsPage;
