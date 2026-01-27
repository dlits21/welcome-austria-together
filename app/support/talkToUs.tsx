import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import TutorialModal from '../../components/TutorialModal';
import CategoryCard from '../../components/CategoryCard';
import ExpertCard from '../../components/ExpertCard';
import Menu from '../../components/Menu';
import { useTranslation } from 'react-i18next';
import { handleContactClick } from '../../utils/contactUtils';

// Import emergency data
import lotsinnenData from '../../data/lotsinnen/data.json';

interface LotsInnen {
  name: string;
  imagePath: string;
  languages: any;
  subtitle: {};
  phone: string;
  whatsapp?: string;
  signal?: string;
  email?: string;
  telegram?: string;
}

const IndividualSupport: React.FC = () => {
  const { t } = useTranslation('support');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 250 : 350;
  const cardWidth = isWeb ? 200 : 100;
  const lotsinnenArray: LotsInnen[] = lotsinnenData.lotsinnen;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('talkToUs')}</Text>
        <Text style={styles.subtitle}>{t('talkToUs_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.lotsinnenGrid}>
          {lotsinnenArray.map((category) => (
            <ExpertCard
              key={category.name}
              name={category.name}
              imagePath={category.imagePath}
              languages={category.languages}
              subtitles={[category.subtitle]}
              whatsapp={category.phone}
              email={category.email!}
             />
          ))}
        </View>
      </ScrollView>

      <LanguageModal
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="support-community"
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
  gridContainer: {
    flex: 1,
    marginHorizontal: 32,
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
  lotsinnenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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

export default IndividualSupport;