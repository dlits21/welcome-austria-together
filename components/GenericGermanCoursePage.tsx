
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import PageNavigation from './PageNavigation';
import LanguageModal from './LanguageModal';
import HelpModal from './HelpModal';
import VirtualAssistantModal from './VirtualAssistantModal';

interface CourseData {
  title: { en: string; de: string };
  description: { en: string; de: string };
  duration: string;
  level: string;
  provider: string;
  cost: string;
  location: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  features: string[];
  requirements: string[];
}

interface GenericGermanCoursePageProps {
  courseData: CourseData;
}

const GenericGermanCoursePage: React.FC<GenericGermanCoursePageProps> = ({ courseData }) => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {currentLanguage === 'de' ? courseData.title.de : courseData.title.en}
        </Text>
        
        <Text style={styles.description}>
          {currentLanguage === 'de' ? courseData.description.de : courseData.description.en}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {currentLanguage === 'de' ? 'Dauer:' : 'Duration:'}
            </Text>
            <Text style={styles.detailValue}>{courseData.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {currentLanguage === 'de' ? 'Niveau:' : 'Level:'}
            </Text>
            <Text style={styles.detailValue}>{courseData.level}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {currentLanguage === 'de' ? 'Anbieter:' : 'Provider:'}
            </Text>
            <Text style={styles.detailValue}>{courseData.provider}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {currentLanguage === 'de' ? 'Kosten:' : 'Cost:'}
            </Text>
            <Text style={styles.detailValue}>{courseData.cost}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {currentLanguage === 'de' ? 'Ort:' : 'Location:'}
            </Text>
            <Text style={styles.detailValue}>{courseData.location}</Text>
          </View>
        </View>
        
        {courseData.features && courseData.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'de' ? 'Besonderheiten:' : 'Features:'}
            </Text>
            {courseData.features.map((feature, index) => (
              <Text key={index} style={styles.listItem}>• {feature}</Text>
            ))}
          </View>
        )}
        
        {courseData.requirements && courseData.requirements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'de' ? 'Voraussetzungen:' : 'Requirements:'}
            </Text>
            {courseData.requirements.map((requirement, index) => (
              <Text key={index} style={styles.listItem}>• {requirement}</Text>
            ))}
          </View>
        )}
        
        {courseData.contact && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'de' ? 'Kontakt:' : 'Contact:'}
            </Text>
            {courseData.contact.phone && (
              <Text style={styles.contactItem}>
                {currentLanguage === 'de' ? 'Telefon: ' : 'Phone: '}{courseData.contact.phone}
              </Text>
            )}
            {courseData.contact.email && (
              <Text style={styles.contactItem}>
                {currentLanguage === 'de' ? 'E-Mail: ' : 'Email: '}{courseData.contact.email}
              </Text>
            )}
            {courseData.contact.website && (
              <Text style={styles.contactItem}>
                {currentLanguage === 'de' ? 'Website: ' : 'Website: '}{courseData.contact.website}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={currentLanguage}
      />
      
      {/* Help Modal */}
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={currentLanguage}
      />

      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={handleVirtualAssistantClose}
        languageCode={currentLanguage}
        initialMessage=""
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6b7280',
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#6b7280',
    flex: 2,
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6b7280',
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6b7280',
    marginBottom: 4,
  },
});

export default GenericGermanCoursePage;
