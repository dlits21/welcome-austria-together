
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import culturalEntities from '../../../data/courses/cultural-integration-entities.json';

const CulturalEntityDetail: React.FC = () => {
  const { entityId } = useLocalSearchParams();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  const entity = culturalEntities.entities.find(e => e.id === entityId);

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

  const handleCall = () => {
    Linking.openURL(`tel:${entity.contact.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${entity.contact.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(entity.contact.website);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? entity.name.de : entity.name.en}
        </Text>
        
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
            {language.code === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
          </Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
            <MaterialIcons name="phone" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.phone}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <MaterialIcons name="email" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.email}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
            <MaterialIcons name="language" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>{entity.contact.website}</Text>
          </TouchableOpacity>
          
          <View style={styles.contactItem}>
            <MaterialIcons name="location-on" size={24} color="#6B7280" />
            <Text style={styles.contactText}>{entity.contact.address}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {language.code === 'de' ? 'Sprachen' : 'Languages'}
            </Text>
            <Text style={styles.infoValue}>{entity.languages.join(', ')}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {language.code === 'de' ? 'Berechtigung' : 'Eligibility'}
            </Text>
            <Text style={styles.infoValue}>{entity.eligibility}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {language.code === 'de' ? 'Kosten' : 'Cost'}
            </Text>
            <Text style={styles.infoValue}>{entity.cost}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {language.code === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
            </Text>
            <Text style={styles.infoValue}>{entity.openingHours}</Text>
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
    marginBottom: 16,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
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
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
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

export default CulturalEntityDetail;
