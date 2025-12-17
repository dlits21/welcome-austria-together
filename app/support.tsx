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

const GeneralSupport: React.FC = () => {
  const { t } = useTranslation('support');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
   const router = useRouter();

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 350 : 350;

  // switch to home page
  const onContinue = (path: string) => {
    router.push(`/support/${path}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('generalSupport')}</Text>
        <Text style={styles.subtitle}>{t('reachOutDirectly')}</Text>
      </View>


      <View style={[styles.categoryGrid]}>
        <CategoryCard
          title={t('talkToUs')}
          subtitle={t('talkToUs_subtitle')}
          icon="material.person" // changed to speaking person
          color="rgba(210, 141, 14, 0.5)"
          onPress={() => onContinue('talkToUs')}
          height={cardHeight}
        />

        <CategoryCard
          title={t('community')}
          subtitle={t('community_subtitle')}
          icon="material.groups"
          color="rgba(210, 141, 14, 0.5)"
          onPress={() => onContinue('community')}
          height={cardHeight}
        />
      </View>

      <LanguageModal
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="support"
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
  },
  scrollView: {
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

export default GeneralSupport;
