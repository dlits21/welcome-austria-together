
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages/common';
import PageNavigation from '../components/PageNavigation';

interface SupportTile {
  id: string;
  title: {
    en: string;
    de: string;
  };
  color: string;
  icon: string;
}

const supportTiles: SupportTile[] = [
  {
    id: 'general',
    title: { en: 'General', de: 'Allgemein' },
    color: '#3B82F6',
    icon: '💬'
  },
  {
    id: 'emergency-support',
    title: { en: 'Emergency Support', de: 'Notfallunterstützung' },
    color: '#EF4444',
    icon: '🚨'
  },
  {
    id: 'legal-support',
    title: { en: 'Legal Support', de: 'Rechtliche Unterstützung' },
    color: '#8B5CF6',
    icon: '⚖️'
  },
  {
    id: 'health-mental-health',
    title: { en: 'Health & Mental Health Support', de: 'Gesundheits- und psychische Unterstützung' },
    color: '#10B981',
    icon: '🏥'
  },
  {
    id: 'financial-literacy',
    title: { en: 'Financial Literacy Support', de: 'Finanzielle Bildungsunterstützung' },
    color: '#F59E0B',
    icon: '💰'
  },
  {
    id: 'cultural-orientation',
    title: { en: 'Cultural Orientation and Integration Programs', de: 'Kulturelle Orientierung und Integrationsprogramme' },
    color: '#06B6D4',
    icon: '🌍'
  },
  {
    id: 'integration-pathways',
    title: { en: 'Integration Pathways and Career Counseling', de: 'Integrationswege und Karriereberatung' },
    color: '#84CC16',
    icon: '🎯'
  },
  {
    id: 'document-certification',
    title: { en: 'Document and Certification Management', de: 'Dokument- und Zertifizierungsmanagement' },
    color: '#F97316',
    icon: '📄'
  }
];

const Ask: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleTilePress = (tileId: string) => {
    router.push(`/ask/${tileId}`);
  };

  const pageTitle = language.code === 'de' ? 'Fragen' : 'Ask';
  const pageSubtitle = language.code === 'de' ? 'Kontaktiere uns direkt' : 'Reach out to us directly';

  const renderTile = ({ item }: { item: SupportTile }) => (
    <TouchableOpacity 
      style={[styles.tile, { borderColor: item.color + '40' }]}
      onPress={() => handleTilePress(item.id)}
    >
      <View style={[styles.tileIconContainer, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.tileIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.tileTitle}>
        {language.code === 'de' ? item.title.de : item.title.en}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.subtitle}>{pageSubtitle}</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={supportTiles}
          renderItem={renderTile}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.tilesContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  tilesContainer: {
    paddingBottom: 20,
  },
  tile: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 120,
  },
  tileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tileIcon: {
    fontSize: 24,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Ask;
