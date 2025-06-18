
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages/common';
import Header from '../components/Header';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import HelpModal from '../components/HelpModal';

const AskPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const supportCategories = [
    {
      id: 'general',
      icon: 'help',
      title: language.code === 'de' ? 'Allgemein' : 'General',
      description: language.code === 'de' 
        ? 'Allgemeine Unterstützung und Beratung' 
        : 'General support and counseling',
      route: '/ask/general'
    },
    {
      id: 'emergency',
      icon: 'emergency',
      title: language.code === 'de' ? 'Notfallunterstützung' : 'Emergency Support',
      description: language.code === 'de' 
        ? 'Sofortige Hilfe in Notfällen' 
        : 'Immediate help in emergencies',
      route: '/ask/emergency'
    },
    {
      id: 'legal',
      icon: 'gavel',
      title: language.code === 'de' ? 'Rechtsunterstützung' : 'Legal Support',
      description: language.code === 'de' 
        ? 'Rechtsberatung und juristische Hilfe' 
        : 'Legal counseling and juridical help',
      route: '/ask/legal-support'
    },
    {
      id: 'health',
      icon: 'local-hospital',
      title: language.code === 'de' ? 'Gesundheit & Psychische Gesundheit' : 'Health & Mental Health Support',
      description: language.code === 'de' 
        ? 'Medizinische und psychologische Unterstützung' 
        : 'Medical and psychological support',
      route: '/ask/health'
    },
    {
      id: 'financial',
      icon: 'account-balance',
      title: language.code === 'de' ? 'Finanzielle Bildung' : 'Financial Literacy Support',
      description: language.code === 'de' 
        ? 'Hilfe bei Finanzen und Budgetierung' 
        : 'Help with finances and budgeting',
      route: '/ask/financial'
    },
    {
      id: 'cultural',
      icon: 'groups',
      title: language.code === 'de' ? 'Kulturelle Orientierung und Integration' : 'Cultural Orientation and Integration Programs',
      description: language.code === 'de' 
        ? 'Programme zur kulturellen Integration' 
        : 'Programs for cultural integration',
      route: '/ask/cultural'
    },
    {
      id: 'career',
      icon: 'work',
      title: language.code === 'de' ? 'Integrationswege und Karriereberatung' : 'Integration Pathways and Career Counseling',
      description: language.code === 'de' 
        ? 'Berufsberatung und Integrationshilfe' 
        : 'Career counseling and integration assistance',
      route: '/ask/career'
    },
    {
      id: 'document',
      icon: 'description',
      title: language.code === 'de' ? 'Dokument- und Zertifizierungsmanagement' : 'Document and Certification Management',
      description: language.code === 'de' 
        ? 'Hilfe bei Dokumenten und Zertifikaten' 
        : 'Help with documents and certificates',
      route: '/ask/document'
    }
  ];

  const handleCategoryPress = (route: string) => {
    router.push(route);
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
          {language.code === 'de' ? 'Fragen Sie nach Hilfe' : 'Ask for Help'}
        </Text>
        <Text style={styles.description}>
          {language.code === 'de' 
            ? 'Wählen Sie den Bereich aus, in dem Sie Unterstützung benötigen.'
            : 'Choose the area where you need support.'}
        </Text>

        <View style={styles.categoriesGrid}>
          {supportCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.route)}
            >
              <View style={styles.categoryIcon}>
                <MaterialIcons name={category.icon as any} size={32} color="#3B82F6" />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
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
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#eff6ff',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AskPage;
