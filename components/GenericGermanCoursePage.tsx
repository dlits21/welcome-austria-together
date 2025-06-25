import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import PageNavigation from './PageNavigation';
import LanguageModal from './LanguageModal';
import HelpModal from './HelpModal';
import MapView from './MapView';
import { MaterialIcons } from '@expo/vector-icons';
import { getEnrollNow, getContactInformation, getLocation } from '../data/languages/common';

const GenericGermanCoursePage = ({ courseData }) => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [mapInteracting, setMapInteracting] = useState(false);

  const getCurrentContent = (obj) => obj[currentLanguage] || obj.en;

  // Check if this is legal support data (has services) or course data (has tags)
  const isLegalSupport = courseData.services && !courseData.tags;

  const sections = [
    { type: 'title' },
    { type: 'subtitle' },
    { type: 'provider' },
    { type: 'description' },
    { type: 'services', show: isLegalSupport && courseData.services },
    { type: 'specializations', show: isLegalSupport && courseData.specializations },
    { type: 'contact' },
    { type: 'map', show: courseData.hasMap && (courseData.address || courseData.coordinates) },
    { type: 'tags', show: !isLegalSupport && courseData.tags },
    { type: 'enroll', show: !isLegalSupport },
  ];

  const renderItem = ({ item }) => {
    if (item.show === false) return null;

    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>{getCurrentContent(courseData.title)}</Text>;

      case 'subtitle':
        return <Text style={styles.subtitle}>{getCurrentContent(courseData.subtitle)}</Text>;

      case 'provider':
        return (
          <View style={styles.providerSection}>
            <Text style={styles.providerLabel}>
              {currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}
            </Text>
            <Text style={styles.providerName}>{courseData.provider}</Text>
          </View>
        );

      case 'description':
        return <Text style={styles.description}>{getCurrentContent(courseData.description)}</Text>;

      case 'services':
        if (!courseData.services) return null;
        return (
          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'de' ? 'Unsere Dienstleistungen' : 'Our Services'}
            </Text>
            {courseData.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <MaterialIcons name="check-circle" size={20} color="#10B981" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        );

      case 'specializations':
        if (!courseData.specializations) return null;
        return (
          <View style={styles.specializationsSection}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'de' ? 'Spezialisierungen' : 'Specializations'}
            </Text>
            <View style={styles.specializationTags}>
              {courseData.specializations.map((spec, index) => (
                <View key={index} style={styles.specializationTag}>
                  <Text style={styles.specializationTagText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'contact':
        return (
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>{getContactInformation(currentLanguage)}</Text>

            {courseData.contact.phone && (
              <TouchableOpacity
                style={styles.contactCard}
                onPress={() => Linking.openURL(`tel:${courseData.contact.phone}`)}
              >
                <MaterialIcons name="phone" size={24} color="#3B82F6" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {currentLanguage === 'de' ? 'Telefon' : 'Phone'}
                  </Text>
                  <Text style={styles.contactValue}>{courseData.contact.phone}</Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            )}

            {courseData.contact.email && (
              <TouchableOpacity
                style={styles.contactCard}
                onPress={() => Linking.openURL(`mailto:${courseData.contact.email}`)}
              >
                <MaterialIcons name="email" size={24} color="#3B82F6" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {currentLanguage === 'de' ? 'E-Mail' : 'Email'}
                  </Text>
                  <Text style={styles.contactValue}>{courseData.contact.email}</Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            )}

            {courseData.contact.website && (
              <TouchableOpacity
                style={styles.contactCard}
                onPress={() => Linking.openURL(courseData.contact.website)}
              >
                <MaterialIcons name="language" size={24} color="#3B82F6" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    {currentLanguage === 'de' ? 'Website' : 'Website'}
                  </Text>
                  <Text style={styles.contactValue}>
                    {currentLanguage === 'de' ? 'Zur Website' : 'Visit website'}
                  </Text>
                </View>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        );

      case 'map':
        if (!item.show) return null;
        return (
          <View style={{ height: 300 }}>
            <Text style={styles.sectionTitle}>{getLocation(currentLanguage)}</Text>
            <MapView
              address={courseData.address}
              coordinates={courseData.coordinates}
              additionalMarkers={courseData.additionalMarkers}
              providerName={courseData.provider}
              onInteractionChange={setMapInteracting}
            />
          </View>
        );

      case 'tags':
        if (!courseData.tags) return null;
        return (
          <View style={styles.tagsSection}>
            {courseData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        );

      case 'enroll':
        if (!courseData.contact.website) return null;
        return (
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={() => Linking.openURL(courseData.contact.website)}
          >
            <Text style={styles.enrollButtonText}>{getEnrollNow(currentLanguage)}</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        toggleSound={() => {}}
        soundEnabled={true}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />

    <FlatList
        data={sections}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        scrollEnabled={!mapInteracting}
      />

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={currentLanguage}
      />

      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={currentLanguage}
      />
    </SafeAreaView>
  );
};

export default GenericGermanCoursePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  servicesSection: {
    marginBottom: 32,
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
  specializationsSection: {
    marginBottom: 32,
  },
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specializationTag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  specializationTagText: {
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
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
  contactSection: {
    marginBottom: 24,
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
});
