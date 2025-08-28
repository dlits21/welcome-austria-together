
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/language/common';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import TutorialModal from '../components/TutorialModal';
import { getAskText } from '../utils/languageUtils';


const AskPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const supportCategories = [
    {
      id: 'general',
      icon: 'help',
      title: getAskText('general', currentLanguage),
      description: getAskText('generalDescription', currentLanguage),
      route: '/ask/general'
    },
    {
      id: 'emergency',
      icon: 'emergency',
      title: getAskText('emergencySupport', currentLanguage),
      description: getAskText('emergencyDescription', currentLanguage),
      route: '/ask/emergency'
    },
    {
      id: 'legal',
      icon: 'gavel',
      title: getAskText('legalSupport', currentLanguage),
      description: getAskText('legalDescription', currentLanguage),
      route: '/ask/legal-support'
    },
    {
      id: 'health',
      icon: 'local-hospital',
      title: getAskText('healthMentalHealth', currentLanguage),
      description: getAskText('healthDescription', currentLanguage),
      route: '/ask/health'
    },
    {
      id: 'financial',
      icon: 'account-balance',
      title: getAskText('financialLiteracy', currentLanguage),
      description: getAskText('financialDescription', currentLanguage),
      route: '/ask/financial'
    },
    {
      id: 'cultural',
      icon: 'groups',
      title: getAskText('culturalOrientation', currentLanguage),
      description: getAskText('culturalDescription', currentLanguage),
      route: '/ask/cultural'
    },
    {
      id: 'career',
      icon: 'work',
      title: getAskText('integrationPathways', currentLanguage),
      description: getAskText('careerDescription', currentLanguage),
      route: '/ask/career'
    },
    {
      id: 'document',
      icon: 'description',
      title: getAskText('documentCertification', currentLanguage),
      description: getAskText('documentDescription', currentLanguage),
      route: '/ask/document'
    }
  ];

  const handleCategoryPress = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {getAskText('askForHelp', currentLanguage)}
        </Text>
        <Text style={styles.description}>
          {getAskText('chooseArea', currentLanguage)}
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

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="ask"
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
