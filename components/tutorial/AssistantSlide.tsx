
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
}

interface AssistantSlideProps {
  slide: any;
  languageCode: string;
  onVirtualAssistant?: () => void;
}

const languages: Language[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "ce", name: "Нохчийн" },
  { code: "prs", name: "دری" },
  { code: "ps", name: "پښتو" },
  { code: "fa", name: "فارسی" },
  { code: "ar", name: "العربية" },
  { code: "ku", name: "Kurdî" },
  { code: "so", name: "Soomaali" },
  { code: "ka", name: "ქართული" },
  { code: "sq", name: "Shqip" }
];

const AssistantSlide: React.FC<AssistantSlideProps> = ({ 
  slide, 
  languageCode, 
  onVirtualAssistant 
}) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const { t } = useTranslation('common');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentLanguage = languages[currentLanguageIndex];
  const currentTitle = slide.title?.[currentLanguage.code] || slide.title?.de || '';
  const currentText = slide.text?.[currentLanguage.code] || slide.text?.de || '';

  return (
    <View style={styles.slideContent}>
      <View style={styles.assistantContainer}>
        <Image 
          source={require('../../assets/images/fatima.png')}
          style={styles.assistantImage}
          resizeMode="cover"
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>
            {currentTitle}
          </Text>
          <View style={styles.speechArrow} />
        </View>
      </View>
      <Text style={styles.assistantDescription}>
        {currentText}
      </Text>
      <TouchableOpacity 
        style={styles.assistantButton}
        onPress={onVirtualAssistant}
      >
        <Text style={styles.assistantButtonText}>
          {t('help')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    padding: 24,
    minHeight: 400,
  },
  assistantContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  assistantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 20,
    maxWidth: 280,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  speechArrow: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f0f0f0',
  },
  assistantDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  assistantButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
  },
  assistantButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AssistantSlide;
