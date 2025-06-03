import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const PoliticsInAustriaPage: React.FC = () => {
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
      en: 'Politics in Austria',
      de: 'Politik in Österreich'
    },
    subtitle: {
      en: 'Understanding the Austrian Political System',
      de: 'Das österreichische politische System verstehen'
    },
    text: {
      en: `Austria is a federal parliamentary republic with a complex political system that balances federal and state powers. Understanding this system is crucial for participating in Austrian civic life.

The Austrian government consists of three main levels:
• Federal level (Bund) - handles national issues
• State level (Länder) - nine federal states with their own governments
• Municipal level (Gemeinden) - local communities and cities

Key political institutions include:
• Federal President (Bundespräsident) - head of state
• Federal Chancellor (Bundeskanzler) - head of government
• National Council (Nationalrat) - lower house of parliament
• Federal Council (Bundesrat) - upper house representing states

Major political parties include ÖVP, SPÖ, FPÖ, GRÜNE, and NEOS. Elections are held regularly at federal, state, and local levels.

Citizens can participate through voting, joining political parties, engaging in civic organizations, and participating in public consultations.`,
      de: `Österreich ist eine föderale parlamentarische Republik mit einem komplexen politischen System, das Bundes- und Landeskompetenzen ausbalanciert. Das Verständnis dieses Systems ist entscheidend für die Teilhabe am österreichischen Bürgerleben.

Die österreichische Regierung besteht aus drei Hauptebenen:
• Bundesebene (Bund) - behandelt nationale Angelegenheiten
• Landesebene (Länder) - neun Bundesländer mit eigenen Regierungen
• Gemeindeebene (Gemeinden) - lokale Gemeinden und Städte

Wichtige politische Institutionen sind:
• Bundespräsident - Staatsoberhaupt
• Bundeskanzler - Regierungschef
• Nationalrat - Unterhaus des Parlaments
• Bundesrat - Oberhaus, das die Länder vertritt

Große politische Parteien sind ÖVP, SPÖ, FPÖ, GRÜNE und NEOS. Wahlen finden regelmäßig auf Bundes-, Landes- und Gemeindeebene statt.

Bürger können durch Wählen, Beitritt zu politischen Parteien, Engagement in Bürgervereinen und Teilnahme an öffentlichen Konsultationen partizipieren.`
    },
    links: [
      {
        title: { en: 'Austrian Parliament', de: 'Österreichisches Parlament' },
        url: 'https://www.parlament.gv.at'
      },
      {
        title: { en: 'Federal Chancellery', de: 'Bundeskanzleramt' },
        url: 'https://www.bundeskanzleramt.gv.at'
      },
      {
        title: { en: 'Austrian Federal States', de: 'Österreichische Bundesländer' },
        url: 'https://www.help.gv.at'
      }
    ],
    videoTitle: {
      en: 'How Austrian Politics Works',
      de: 'Wie österreichische Politik funktioniert'
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

export default PoliticsInAustriaPage;
