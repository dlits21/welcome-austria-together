
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages/common';
import PageNavigation from './PageNavigation';
import LanguageModal from './LanguageModal';
import HelpModal from './HelpModal';
import MapView from './MapView';
import { getEnrollNow, getContactInformation, getLocation } from '../data/languages/common';

interface CourseData {
  id: string;
  title: { [key: string]: string };
  subtitle: { [key: string]: string };
  provider: string;
  description: { [key: string]: string };
  contact: {
    phone?: string;
    email?: string;
    website: string;
  };
  courseDetails: {
    level: string;
    duration?: string;
    price: string;
    location: string;
    certificate: string;
    type: string;
  };
  tags: string[];
  hasMap: boolean;
  isResource: boolean;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface GenericGermanCoursePageProps {
  courseData: CourseData;
}

const GenericGermanCoursePage: React.FC<GenericGermanCoursePageProps> = ({ courseData }) => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEnrollPress = () => {
    Linking.openURL(courseData.contact.website);
  };

  const handlePhonePress = () => {
    if (courseData.contact.phone) {
      Linking.openURL(`tel:${courseData.contact.phone}`);
    }
  };

  const handleEmailPress = () => {
    if (courseData.contact.email) {
      Linking.openURL(`mailto:${courseData.contact.email}`);
    }
  };

  const getCurrentContent = (contentObj: { [key: string]: string }) => {
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
        <Text style={styles.title}>{getCurrentContent(courseData.title)}</Text>
        <Text style={styles.subtitle}>{getCurrentContent(courseData.subtitle)}</Text>

        <View style={styles.providerSection}>
          <Text style={styles.providerLabel}>{currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}</Text>
          <Text style={styles.providerName}>{courseData.provider}</Text>
        </View>

        <Text style={styles.description}>{getCurrentContent(courseData.description)}</Text>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>
            {getContactInformation(currentLanguage)}
          </Text>

          <View style={styles.contactGrid}>
            {courseData.contact.phone && (
              <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
                <MaterialIcons name="phone" size={24} color="#3B82F6" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {currentLanguage === 'de' ? 'Telefon' : 'Phone'}
                  </Text>
                  <Text style={[styles.contactValue, styles.linkText]}>
                    {courseData.contact.phone}
                  </Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            )}

            {courseData.contact.email && (
              <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
                <MaterialIcons name="email" size={24} color="#3B82F6" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {currentLanguage === 'de' ? 'E-Mail' : 'Email'}
                  </Text>
                  <Text style={[styles.contactValue, styles.linkText]}>
                    {courseData.contact.email}
                  </Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => Linking.openURL(courseData.contact.website)}
            >
              <MaterialIcons name="language" size={24} color="#3B82F6" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>
                  {currentLanguage === 'de' ? 'Website' : 'Website'}
                </Text>
                <Text style={[styles.contactValue, styles.linkText]}>
                  {currentLanguage === 'de' ? 'Zur Website' : 'Visit website'}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Section - Only for courses with hasMap: true */}
        {courseData.hasMap && (courseData.address || courseData.coordinates) && (
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>
              {getLocation(currentLanguage)}
            </Text>
            <MapView 
              address={courseData.address}
              coordinates={courseData.coordinates}
              providerName={courseData.provider}
            />
          </View>
        )}

        {/* Tags */}
        <View style={styles.tagsSection}>
          {courseData.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
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
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  linkText: {
    color: '#3B82F6',
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
});

export default GenericGermanCoursePage;
