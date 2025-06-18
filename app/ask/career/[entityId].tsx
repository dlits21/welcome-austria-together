
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import careerEntities from '../../../data/courses/career-counseling-entities.json';

const CareerEntityDetail: React.FC = () => {
  const { entityId } = useLocalSearchParams();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  
  const entity = careerEntities.entities.find(e => e.id === entityId);

  if (!entity) {
    return (
      <SafeAreaView style={styles.container}>
        <PageNavigation 
          toggleSound={() => setSoundEnabled(!soundEnabled)}
          soundEnabled={soundEnabled}
          showLanguageModal={() => setShowLanguageModal(true)}
          showHelpModal={() => setShowHelpModal(true)}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {language.code === 'de' ? 'Entität nicht gefunden' : 'Entity not found'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleContact = (type: string, value: string) => {
    let url = '';
    
    switch (type) {
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'website':
        url = value.startsWith('http') ? value : `https://${value}`;
        break;
      default:
        return;
    }

    if (Platform.OS === 'web') {
      window.open(url, type === 'website' ? '_blank' : '_self');
    } else {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert(
              language.code === 'de' ? 'Fehler' : 'Error',
              language.code === 'de' 
                ? 'Dieser Link kann nicht geöffnet werden'
                : 'This link cannot be opened'
            );
          }
        })
        .catch(() => {
          Alert.alert(
            language.code === 'de' ? 'Fehler' : 'Error',
            language.code === 'de' 
              ? 'Fehler beim Öffnen des Links'
              : 'Error opening link'
          );
        });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'employment': return 'work';
      case 'integration': return 'groups';
      case 'education': return 'school';
      case 'networking': return 'people';
      default: return 'help';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'employment': return '#3B82F6';
      case 'integration': return '#10B981';
      case 'education': return '#8B5CF6';
      case 'networking': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(entity.category) + '20' }]}>
            <MaterialIcons name={getCategoryIcon(entity.category) as any} size={32} color={getCategoryColor(entity.category)} />
          </View>
          <Text style={styles.title}>
            {language.code === 'de' ? entity.name.de : entity.name.en}
          </Text>
        </View>

        <Text style={styles.description}>
          {language.code === 'de' ? entity.description.de : entity.description.en}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Dienstleistungen' : 'Services'}
          </Text>
          {entity.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <MaterialIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Kontakt' : 'Contact'}
          </Text>
          
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContact('phone', entity.contact.phone)}
          >
            <MaterialIcons name="phone" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContact('email', entity.contact.email)}
          >
            <MaterialIcons name="email" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContact('website', entity.contact.website)}
          >
            <MaterialIcons name="language" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.website}</Text>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <MaterialIcons name="location-on" size={24} color="#6B7280" />
            <Text style={styles.contactText}>{entity.contact.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Details' : 'Details'}
          </Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {language.code === 'de' ? 'Sprachen:' : 'Languages:'}
            </Text>
            <Text style={styles.detailValue}>{entity.languages.join(', ')}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {language.code === 'de' ? 'Berechtigung:' : 'Eligibility:'}
            </Text>
            <Text style={styles.detailValue}>{entity.eligibility}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {language.code === 'de' ? 'Kosten:' : 'Cost:'}
            </Text>
            <Text style={styles.detailValue}>{entity.cost}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {language.code === 'de' ? 'Öffnungszeiten:' : 'Opening Hours:'}
            </Text>
            <Text style={styles.detailValue}>{entity.openingHours}</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#374151',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
});

export default CareerEntityDetail;
