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
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import TutorialModal from '../../components/TutorialModal';
import CategoryCard from '../../components/CategoryCard';
import { useTranslation } from 'react-i18next';
import Menu from '../../components/Menu';

const Work: React.FC = () => {
  const { t } = useTranslation('informationWork');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
   const router = useRouter();

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 350 : 370;
  const iconSize = isWeb ? 128 : 54;

  // switch to home page
  const onContinue = (path: string) => {
    router.push(`/information/work/${path}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('work')}</Text>
        <Text style={styles.subtitle}>{t('work_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.categoryGrid]}>
          <CategoryCard
            title={t('registration')}
            subtitle={t('registration_subtitle')}
            icon="material.assignment"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('registration')}
            height={cardHeight}
            iconSize={iconSize}
          />

          <CategoryCard
            title={t('search')}
            subtitle={t('search_subtitle')}
            icon="material.search"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('search')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('application')}
            subtitle={t('application_subtitle')}
            icon="awesome6.file-text"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('application')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('rights')}
            subtitle={t('rights_subtitle')}
            icon="material.gavel"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('laborRights')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('education')}
            subtitle={t('education_subtitle')}
            icon="material.school"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('education')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('certification')}
            subtitle={t('certification_subtitle')}
            icon="community.certificate"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('certification')}
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
        tutorialData="work"
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

export default Work;
