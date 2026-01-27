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

const Asylum: React.FC = () => {
  const { t } = useTranslation('informationAsylum');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
   const router = useRouter();

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 350 : 370;
  const iconSize = isWeb ? 128 : 54;

  // switch to home page
  const onContinue = (path: string) => {
    router.push(`/information/asylum/${path}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('asylum')}</Text>
        <Text style={styles.subtitle}>{t('asylum_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.categoryGrid]}>
          <CategoryCard
            title={t('request_asylum')}
            subtitle={t('request_asylum_subtitle')}
            // TODO: Fix icon
            icon="material.sim-card-download"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('requestAsylum')}
            height={cardHeight}
            iconSize={iconSize}
          />

          <CategoryCard
            title={t('asylum_process')}
            subtitle={t('asylum_process_subtitle')}
            // TODO: Fix icon
            icon="awesome6.house"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('asylumProcess')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('asylum_rights')}
            subtitle={t('asylum_rights_subtitle')}
            // TODO: Fix icon
            icon="material.groups"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('asylumRights')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('asylum_decision')}
            subtitle={t('asylum_decision_subtitle')}
            // TODO: Fix icon
            icon="material.email"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('asylumDecision')}
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
        tutorialData="asylum"
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

export default Asylum;
