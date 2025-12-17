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
import { useTranslation } from 'react-i18next';
import { handleContactClick } from '../../utils/contactUtils';

const CommunitySupport: React.FC = () => {
  const { t } = useTranslation('support');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const isWeb  = Platform.OS == 'web'
  const cardHeight = isWeb ? 250 : 350;
  const cardWidth = isWeb ? 200 : 100;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('community')}</Text>
        <Text style={styles.subtitle}>{t('community_subtitle')}</Text>
      </View>

      <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.categoryGrid]}>
          <CategoryCard
            title={t('whatsapp')}
            subtitle={t('whatsapp_subtitle')}
            icon="awesome6.whatsapp" // changed to speaking person
            color="rgba(210, 141, 14, 0.5)"
            onPress={() => handleContactClick({method:'whatsapp', isIndividual:false})}
            height={cardHeight}
            iconSize={64}
          />

          <CategoryCard
            title={t('signal')}
            subtitle={t('signal_subtitle')}
            icon="awesome6.signal-messenger"
            color="rgba(210, 141, 14, 0.5)"
            onPress={() => handleContactClick({method:'signal', isIndividual:false})}
            height={cardHeight}
            iconSize={64}
          />

          <CategoryCard
            title={t('telegram')}
            subtitle={t('telegram_subtitle')}
            icon="awesome6.telegram"
            color="rgba(210, 141, 14, 0.5)"
            onPress={() =>handleContactClick({method:'telegram', isIndividual:false})}
            height={cardHeight}
            iconSize={64}
          />

          <CategoryCard
            title={t('facebook')}
            subtitle={t('facebook_subtitle')}
            icon="awesome6.facebook"
            color="rgba(210, 141, 14, 0.5)"
            onPress={() =>handleContactClick({method:'facebook', isIndividual:false})}
            height={cardHeight}
            iconSize={64}
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

export default CommunitySupport;