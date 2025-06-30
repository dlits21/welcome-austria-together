
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getGlobalText } from '../utils/languageUtils';

interface QuizControlsProps {
  languageCode: string;
  onResetQuiz: () => void;
  onToggleFilters: () => void;
}

const QuizControls: React.FC<QuizControlsProps> = ({
  languageCode,
  onResetQuiz,
  onToggleFilters
}) => {
  const getResetQuizText = () => {
    const translations = {
      'en': 'Reset Quiz',
      'de': 'Quiz zurücksetzen',
      'ru': 'Сбросить опрос',
      'ce': 'Хаттарг дlадайасса',
      'prs': 'بازنشانی آزمون',
      'ps': 'ازموینه بیا تنظیمول',
      'fa': 'بازنشانی آزمون',
      'ar': 'إعادة تعيين الاختبار',
      'ku': 'ڕێکخستنەوەی پرسیار',
      'so': 'Dib-u-deji imtixaanka',
      'ka': 'კითხვარის გადატვირთვა',
      'sq': 'Rivendos testin'
    };
    return translations[languageCode as keyof typeof translations] || translations.en;
  };

  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.resetQuizButton} onPress={onResetQuiz}>
        <MaterialIcons name="refresh" size={20} color="#3B82F6" />
        <Text style={styles.resetQuizText}>
          {getResetQuizText()}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onToggleFilters}
      >
        <MaterialIcons name="filter-list" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resetQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetQuizText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default QuizControls;
