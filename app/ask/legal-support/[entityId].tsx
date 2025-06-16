
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import MapView from '../../../components/MapView';
import legalSupportData from '../../../data/courses/legal-support-entities.json';

interface LegalSupportEntity {
  id: string;
  title: { en: string; de: string };
  subtitle: { en: string; de: string };
  location: string;
  supportTypes: string[];
  specializations: string[];
  description: { en: string; de: string };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  coordinates?: { lat: number; lng: number };
  address?: string;
  services?: string[];
}

const LegalSupportDetailPage: React.FC = () => {
  const { entityId } = useLocalSearchParams();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [entity, setEntity] = useState<LegalSupportEntity | null>(null);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  useEffect(() => {
    if (entityId && typeof entityId === 'string') {
      const entityData = legalSupportData[entityId as keyof typeof legalSupportData];
      if (entityData) {
        setEntity(entityData as LegalSupportEntity);
      }
    }
  }, [entityId]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
    }
  };

  if (!entity) {
    return (
      <SafeAreaView style={styles.container}>
        <PageNavigation 
          toggleSound={toggleSound}
          soundEnabled={soundEnabled}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            {language.code === 'de' ? 'Entität nicht gefunden' : 'Entity not found'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const pageTitle = entity.title[language.code] || entity.title.en;
  const description = entity.description[language.code] || entity.description.en;
  const services = entity.services || [];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{pageTitle}</Text>
        
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.locationText}>{entity.location}</Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        
        {entity.specializations && entity.specializations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language.code === 'de' ? 'Spezialisierungen' : 'Specializations'}
            </Text>
            <View style={styles.tagsContainer}>
              {entity.specializations.map((spec, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {services.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language.code === 'de' ? 'Unsere Dienstleistungen' : 'Our Services'}
            </Text>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <MaterialIcons name="check-circle" size={20} color="#10B981" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
          </Text>
          
          {entity.contact.phone && (
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => handleContact('phone', entity.contact.phone!)}
            >
              <MaterialIcons name="phone" size={24} color="#3B82F6" />
              <Text style={styles.contactText}>{entity.contact.phone}</Text>
            </TouchableOpacity>
          )}
          
          {entity.contact.email && (
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => handleContact('email', entity.contact.email!)}
            >
              <MaterialIcons name="email" size={24} color="#3B82F6" />
              <Text style={styles.contactText}>{entity.contact.email}</Text>
            </TouchableOpacity>
          )}
          
          {entity.contact.website && (
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => handleContact('website', entity.contact.website!)}
            >
              <MaterialIcons name="language" size={24} color="#3B82F6" />
              <Text style={styles.contactText}>
                {language.code === 'de' ? 'Website besuchen' : 'Visit website'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {entity.coordinates && entity.address && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language.code === 'de' ? 'Standort' : 'Location'}
            </Text>
            <MapView
              address={entity.address}
              coordinates={entity.coordinates}
              providerName={pageTitle}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 32,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  tagText: {
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactText: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default LegalSupportDetailPage;
