import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import { getLocation, getEnrollNow, getContactInformation } from '../../../data/languages/common';
import amsIntegrationData from '../../../data/courses/ams_integration.json';

const AMSIntegration: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${amsIntegrationData.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${amsIntegrationData.contact.email}`);
  };

  const handleWebsitePress = () => {
    Linking.openURL(amsIntegrationData.contact.website);
  };

  const handleEnrollPress = () => {
    Linking.openURL(amsIntegrationData.contact.website);
  };

  const getCurrentContent = (contentObj: any) => {
    return contentObj[currentLanguage] || contentObj.en;
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
          {getCurrentContent(amsIntegrationData.title)}
        </Text>
        
        <Text style={styles.subtitle}>
          {getCurrentContent(amsIntegrationData.subtitle)}
        </Text>
        
        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>
            {currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}
          </Text>
          <Text style={styles.providerName}>{amsIntegrationData.provider}</Text>
        </View>
        
        <Text style={styles.description}>
          {getCurrentContent(amsIntegrationData.description)}
        </Text>
        
        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {getContactInformation(currentLanguage)}
          </Text>
          
          <View style={styles.contactGrid}>
            <TouchableOpacity 
              style={styles.contactCard}
              onPress={handlePhonePress}
            >
              <View style={styles.contactIconContainer}>
                <MaterialIcons name="phone" size={20} color="#3B82F6" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'Telefon' : 'Phone'}
                </Text>
                <Text style={styles.contactValue}>{amsIntegrationData.contact.phone}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactCard}
              onPress={handleEmailPress}
            >
              <View style={styles.contactIconContainer}>
                <MaterialIcons name="email" size={20} color="#3B82F6" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'E-Mail' : 'Email'}
                </Text>
                <Text style={styles.contactValue}>{amsIntegrationData.contact.email}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactCard}
              onPress={handleWebsitePress}
            >
              <View style={styles.contactIconContainer}>
                <MaterialIcons name="language" size={20} color="#3B82F6" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'Website' : 'Website'}
                </Text>
                <Text style={styles.contactValue}>
                  {currentLanguage === 'de' ? 'Zur Website' : 'Visit website'}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Map */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>
            {getLocation(currentLanguage)}
          </Text>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="location-on" size={48} color="#3B82F6" />
              <Text style={styles.mapPlaceholderText}>
                {currentLanguage === 'de' ? 'Karte wird geladen...' : 'Map loading...'}
              </Text>
              <Text style={styles.mapLocationText}>
                {currentLanguage === 'de' ? 'AMS Geschäftsstellen in ganz Österreich' : 'AMS Offices throughout Austria'}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Tags */}
        <View style={styles.tagsSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{amsIntegrationData.courseDetails.level}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Kostenlos' : amsIntegrationData.courseDetails.price}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Österreichweit' : amsIntegrationData.courseDetails.location}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Bis zu 12 Monate' : amsIntegrationData.courseDetails.duration}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Mit Zertifikat' : 'With certificate'}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {currentLanguage === 'de' ? 'Integrationsprogramm' : amsIntegrationData.courseDetails.type}
            </Text>
          </View>
        </View>
        
        {/* Enroll Button */}
        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
          <Text style={styles.enrollButtonText}>
            {getEnrollNow(currentLanguage)}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  providerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginRight: 8,
  },
  providerName: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  contactSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactGrid: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
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
  enrollButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  mapSection: {
    marginBottom: 32,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    fontWeight: '500',
  },
  mapLocationText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default AMSIntegration;
