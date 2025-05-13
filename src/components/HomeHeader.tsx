
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText } from '../data/languages';

const HomeHeader = () => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{getHowCanIHelpText(language.code)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    width: '100%',
    maxWidth: 800,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
});

export default HomeHeader;
