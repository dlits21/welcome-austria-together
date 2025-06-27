import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import YoutubePlayer from "react-native-youtube-iframe";

const WomensRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: "Women's Rights in Austria",
      de: 'Frauenrechte in Österreich'
    },
    subtitle: {
      en: 'Gender Equality and Protection',
      de: 'Gleichberechtigung und Schutz'
    },
    text: {
      en: `Women's rights in Austria are protected by law and constitution. Austria has made significant progress in gender equality, though challenges remain.

Key women's rights include:
• Equal treatment in employment and pay
• Protection from discrimination and harassment
• Right to education and career development
• Reproductive rights and healthcare access
• Protection from domestic violence
• Political participation and representation
• Equal inheritance and property rights

Important laws and protections:
• Equal Treatment Act (Gleichbehandlungsgesetz)
• Protection against Violence Act
• Parental leave and childcare support
• Anti-discrimination measures in workplace

Support services available:
• Women's shelters and counseling centers
• Legal aid for discrimination cases
• Career guidance and training programs
• Healthcare services specifically for women

Austria continues to work toward full gender equality in all areas of society.`,
      de: `Frauenrechte in Österreich sind gesetzlich und verfassungsrechtlich geschützt. Österreich hat bedeutende Fortschritte bei der Gleichberechtigung erzielt, obwohl Herausforderungen bestehen.

Wichtige Frauenrechte sind:
• Gleichbehandlung in Beschäftigung und Entlohnung
• Schutz vor Diskriminierung und Belästigung
• Recht auf Bildung und Karriereentwicklung
• Reproduktive Rechte und Zugang zur Gesundheitsversorgung
• Schutz vor häuslicher Gewalt
• Politische Teilhabe und Vertretung
• Gleiches Erb- und Eigentumsrecht

Wichtige Gesetze und Schutzmaßnahmen:
• Gleichbehandlungsgesetz
• Gewaltschutzgesetz
• Karenz und Kinderbetreuungsunterstützung
• Anti-Diskriminierungsmaßnahmen am Arbeitsplatz

Verfügbare Unterstützungsdienste:
• Frauenhäuser und Beratungszentren
• Rechtshilfe bei Diskriminierungsfällen
• Karriereberatung und Ausbildungsprogramme
• Spezielle Gesundheitsdienste für Frauen

Österreich arbeitet weiter an vollständiger Gleichberechtigung in allen Gesellschaftsbereichen.`
    },
    links: [
      {
        title: { en: 'Federal Ministry for Women', de: 'Bundesministerium für Frauen' },
        url: 'https://www.frauen-familien-jugend.bka.gv.at'
      },
      {
        title: { en: 'Women\'s Helpline', de: 'Frauenhelpline' },
        url: 'https://www.frauenhelpline.at'
      },
      {
        title: { en: 'Equal Treatment Commission', de: 'Gleichbehandlungskommission' },
        url: 'https://www.gleichbehandlungsanwaltschaft.gv.at'
      }
    ],
    videoTitle: {
      en: 'Women\'s Rights and Gender Equality',
      de: 'Frauenrechte und Gleichberechtigung'
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
          
          <YoutubePlayer
            width={Math.min(Dimensions.get('window').width * .9, 840)}
            height={Dimensions.get('window').width * 9/16}
            play={playing}
            videoId={"-cxlxZd7iKQ"}
            onChangeState={onStateChange}
          />

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

export default WomensRightsPage;
