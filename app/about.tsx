import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import TutorialModal from '../components/TutorialModal';
import CategoryCard from '../components/CategoryCard';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Menu from '../components/Menu';

const AboutPage: React.FC = () => {
  const { t } = useTranslation('about');
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const router = useRouter();

  const isWeb  = Platform.OS == 'web'

  const imageSourceTeam = require("../assets/images/team.jpeg")
  const imageSource1 = require("../assets/images/peva_logo.png")
  const imageSource2 = require("../assets/images/supporter_eu.png")

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("title")}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{t("subtitle")}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("second_title")}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{t("second_subtitle")}</Text>
          </View>
          <View style={styles.supportImageContainer}>
            <Image source={imageSourceTeam} style={[styles.supportImage, {height: 450, width: 900}]}
              contentFit="cover" />
          </View>

        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("third_paragraph")}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{t("third_paragraph_content_start")}</Text>
            <View style={styles.listContainer}>
              <View style={styles.listItemContainer}>
                <FontAwesome6 name="house" size={16} color="#000" />
                <Text style={styles.text}>{t("third_paragraph_content_1")}</Text>
              </View>
              <View style={styles.listItemContainer}>
                <FontAwesome6 name="briefcase" size={16} color="#000" />
                <Text style={styles.text}>{t("third_paragraph_content_2")}</Text>
              </View>
              <View style={styles.listItemContainer}>
                <FontAwesome6 name="book" size={16} color="#000" />
                <Text style={styles.text}>{t("third_paragraph_content_3")}</Text>
              </View>
              <View style={styles.listItemContainer}>
                <FontAwesome6 name="scale-balanced" size={16} color="#000" />
                <Text style={styles.text}>{t("third_paragraph_content_4")}</Text>
              </View>
              <Text style={styles.text}>{t("third_paragraph_content_end")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("disclaimer")}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>{t("disclaimer_content")}</Text>
          </View>
        </View>

         <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("support")}</Text>
          </View>

          <View style={styles.supportImageContainer}>
            <Image source={imageSource1} style={[styles.supportImage, {height: 117, width: 600}]}
            contentFit="cover" />
          </View>

          <View style={styles.supportImageContainer}>
            <Image source={imageSource2} style={[styles.supportImage,{height: 100, width: 600}]}
            contentFit="cover" />
          </View>
        </View>


      </ScrollView>

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
  scrollViewContainer: {
      flex: 1,
    marginVertical: 10,
    paddingHorizontal: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionContainer: {
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  textContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    marginHorizontal: 20,
  },
  listContainer: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 16,
    gap: 16
  },
  listItemContainer: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 10,
    alignItems: "flex-start",
  },
  supportImageContainer: {
     alignItems: 'center',
     marginBottom: 50,
  },
  supportImage: {
    marginTop: 16,
  }
});

export default AboutPage;
