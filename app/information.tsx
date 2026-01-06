import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import TutorialModal from '../components/TutorialModal';
import CategoryCard from '../components/CategoryCard';
import { useTranslation } from 'react-i18next';
import Menu from '../components/Menu';

const Information: React.FC = () => {
  const { t } = useTranslation('information');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
   const router = useRouter();

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 350 : 500;
  const iconSize = isWeb ? 128 : 54;

  // switch to home page
  const onContinue = (path: string) => {
    router.push(`/information/${path}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('information')}</Text>
        <Text style={styles.subtitle}>{t('information_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={[styles.categoryGrid]}>
          <CategoryCard
            title={t('asylum')}
            subtitle={t('asylum_subtitle')}
            icon="material.gavel" // changed to speaking person
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('asylum')}
            height={cardHeight}
            iconSize={iconSize}
          />

          <CategoryCard
            title={t('housing')}
            subtitle={t('housing_subtitle')}
            icon="awesome6.house"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('housing')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('education')}
            subtitle={t('education_subtitle')}
            icon="material.groups"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('education')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('work')}
            subtitle={t('work_subtitle')}
            icon="material.school"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('work')}
            height={cardHeight}
            iconSize={iconSize}
          />
        </View>
      </ScrollView>

      <LanguageModal
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="information"
      />

      {!isWeb && (<Menu />)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  expertGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Information;
