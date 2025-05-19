
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../../data/languages';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import HelpModal from '../../components/HelpModal';

const CommunityMap: React.FC = () => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {language.code === 'de' ? 'Gemeinschaftskarte' : 'Community Map'}
        </Text>
        
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={64} color="#9b87f5" />
          <Text style={styles.mapText}>
            {language.code === 'de' 
              ? 'Karte wird geladen...' 
              : 'Map is loading...'}
          </Text>
        </View>
        
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>
            {language.code === 'de' ? 'Legende' : 'Legend'}
          </Text>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>
              {language.code === 'de' ? 'Hilfsangebote' : 'Help offers'}
            </Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>
              {language.code === 'de' ? 'Hilfsgesuche' : 'Help requests'}
            </Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.legendText}>
              {language.code === 'de' ? 'Gemeinschaftszentren' : 'Community centers'}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      {/* Help Modal */}
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
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mapText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  legendContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginTop: 20,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CommunityMap;
