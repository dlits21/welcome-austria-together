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

const Housing: React.FC = () => {
  const { t } = useTranslation('informationHousing');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
   const router = useRouter();

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 350 : 370;
  const iconSize = isWeb ? 128 : 54;

  // switch to home page
  const onContinue = (path: string) => {
    router.push(`/information/housing/${path}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('housing')}</Text>
        <Text style={styles.subtitle}>{t('housing_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.categoryGrid]}>
          <CategoryCard
            title={t('find_housing')}
            subtitle={t('find_housing_subtitle')}
            icon="awesome6.house"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('findHousing')}
            height={cardHeight}
            iconSize={iconSize}
          />

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
            title={t('cost')}
            subtitle={t('cost_subtitle')}
            icon="awesome6.money-bill"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('cost')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('contract')}
            subtitle={t('contract_subtitle')}
            icon="awesome6.signature"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('contract')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('everyday')}
            subtitle={t('everyday_subtitle')}
            icon="awesome6.trash"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('everyday')}
            height={cardHeight}
            iconSize={iconSize}
          />
          <CategoryCard
            title={t('checklist')}
            subtitle={t('checklist_subtitle')}
            icon="awesome6.check"
            color="rgba(221, 7, 121, 0.5)"
            onPress={() => onContinue('checklist')}
            height={cardHeight}
            iconSize={iconSize}
          />
        </View>
      </ScrollView>

      <LanguageModal
        visible={showLanguage}
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="housing"
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

export default Housing;
