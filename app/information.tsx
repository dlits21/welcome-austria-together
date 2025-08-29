import React, { useState } from 'react';
import { StyleSheet, View, ScrollView,TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
import { useTranslation, Trans } from 'react-i18next';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';

import CategoryCard from '../components/CategoryCard';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import TutorialModal from '../components/TutorialModal';

const Information: React.FC = () => {
  const { t } = useTranslation('information');
  const { width } = useWindowDimensions();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const router = useRouter();

  // Columns depending on screen size
  let containerStyle = styles.oneColumnGrid;
  if (width > 1100) containerStyle = styles.fourColumnGrid;
  else if (width > 800) containerStyle = styles.threeColumnGrid;
  else if (width > 500) containerStyle = styles.twoColumnGrid;

  const speak = (text: string) => {
    if (text) {
      Speech.speak(text, { language: t('tts_lang', { defaultValue: 'de-DE' }) });
    }
  };

  const categories = [
    {
      key: 'asylum',
      icon: 'gavel',
      color: '#EF4444', // red
      route: '/information/asylum', // new page
    },
    {
      key: 'housing',
      icon: 'home',
      color: '#3B82F6',
      route: '/information/housing',
    },
    {
      key: 'healthcare',
      icon: 'local-hospital',
      color: '#10B981',
      route: '/information/health',
    },
    {
      key: 'food',
      icon: 'restaurant',
      color: '#F59E0B',
      route: '/information/food',
    },
    {
      key: 'education',
      icon: 'school',
      color: '#8B5CF6',
      route: '/information/education',
    },
    {
      key: 'jobs',
      icon: 'work',
      color: '#EC4899',
      route: '/information/jobs',
    },
    {
      key: 'everyday',
      icon: 'directions-bus',
      color: '#06B6D4',
      route: '/information/everyday',
    },
    {
      key: 'contacts',
      icon: 'call',
      color: '#84CC16',
      route: '/information/contacts',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
        title={t("information_title")}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.grid, containerStyle]}>
          {categories.map(cat => (
            <CategoryCard
              key={cat.key}
              title={t(`${cat.key}_title`)}
              subtitle={<Trans i18nKey={`${cat.key}_subtitle`} ns="information" />}
              icon={cat.icon}
              color={cat.color}
              onPress={() => router.push(cat.route)}
              onLongPress={() => speak(`${t(`${cat.key}_title`)} ${t(`${cat.key}_subtitle`)}`)}
            />
          ))}
        </View>
      </ScrollView>

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  fourColumnGrid: {
    justifyContent: 'space-between',
  },
  threeColumnGrid: {
    justifyContent: 'space-between',
  },
  twoColumnGrid: {
    justifyContent: 'space-between',
  },
  oneColumnGrid: {
    flexDirection: 'column',
  },
});

export default Information;
