import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import YoutubePlayer from "react-native-youtube-iframe";

const DemocracyPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const onError = useCallback(() => {
    setVideoError(true);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Democracy in Austria',
      de: 'Demokratie in Österreich'
    },
    subtitle: {
      en: 'Understanding the Democratic System',
      de: 'Das demokratische System verstehen'
    },
    text: {
      en: `Democracy is the foundation of Austria's political system. In a democracy, power comes from the people, and citizens have the right to participate in political decisions through voting and representation.

Austria is a federal democratic republic with a multi-party system. The federal government consists of the Federal President, the Federal Chancellor, and the Federal Assembly (Parliament).

Key principles of Austrian democracy include:
• Rule of law and constitutional rights
• Separation of powers (executive, legislative, judicial)
• Free and fair elections
• Protection of minorities
• Freedom of speech and assembly

Citizens aged 16 and over have the right to vote in federal elections, while those aged 18 and over can vote in European Parliament elections.`,
      de: `Demokratie ist die Grundlage des österreichischen politischen Systems. In einer Demokratie geht die Macht vom Volk aus, und die Bürger haben das Recht, durch Wahlen und Vertretung an politischen Entscheidungen teilzunehmen.

Österreich ist eine föderale demokratische Republik mit einem Mehrparteiensystem. Die Bundesregierung besteht aus dem Bundespräsidenten, dem Bundeskanzler und der Bundesversammlung (Parlament).

Grundprinzipien der österreichischen Demokratie sind:
• Rechtsstaatlichkeit und Verfassungsrechte
• Gewaltenteilung (Exekutive, Legislative, Judikative)
• Freie und faire Wahlen
• Schutz von Minderheiten
• Meinungs- und Versammlungsfreiheit

Bürger ab 16 Jahren haben das Recht, bei Bundeswahlen zu wählen, während ab 18 Jahren auch bei Europawahlen gewählt werden kann.`
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
        title: { en: 'Austrian Constitution', de: 'Österreichische Verfassung' },
        url: 'https://www.ris.bka.gv.at'
      }
    ],
    videoTitle: {
      en: 'How Democracy Works in Austria',
      de: 'Wie Demokratie in Österreich funktioniert'
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
        
        {/* Links Section */}
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
        
        {/* Video Section */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>

          {videoError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {language.code === 'de' ? 'Video derzeit nicht verfügbar' : 'Video unavailable right now'}
              </Text>
            </View>
          ) : (
            <YoutubePlayer
              width={Math.min(Dimensions.get('window').width * .9, 840)}
              height={Dimensions.get('window').width * 9/16}
              play={playing}
              videoId={"Q607TYRBxFU"}
              onChangeState={onStateChange}
              onError={onError}
            />
          )}
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
  errorContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default DemocracyPage;
