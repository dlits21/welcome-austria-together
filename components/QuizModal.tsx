
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface QuizQuestion {
  question: string;
  answers: (string | { key: string; en: string; de: string })[];
  key: string;
}

interface QuizModalProps {
  visible: boolean;
  currentQuestion: number;
  questions: QuizQuestion[];
  languageCode: string;
  onAnswer: (answer: string | { key: string; en: string; de: string }) => void;
  onSkip: () => void;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  visible,
  currentQuestion,
  questions,
  languageCode,
  onAnswer,
  onSkip,
  onClose
}) => {
  if (!visible || currentQuestion >= questions.length) return null;

  const currentQ = questions[currentQuestion];

  const getLevelDescription = (level: string) => {
    const descriptions: { [key: string]: { en: string; de: string } } = {
      'A0': { en: 'Complete beginner', de: 'Kompletter Anfänger' },
      'A1': { en: 'Beginner', de: 'Anfänger' },
      'A2': { en: 'Elementary', de: 'Grundkenntnisse' },
      'B1': { en: 'Intermediate', de: 'Mittelstufe' },
      'B2': { en: 'Upper intermediate', de: 'Obere Mittelstufe' },
      'C1': { en: 'Advanced', de: 'Fortgeschritten' },
      'C2': { en: 'Proficient', de: 'Sehr fortgeschritten' }
    };
    return descriptions[level] ? descriptions[level][languageCode as 'en' | 'de'] : level;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>
            {languageCode === 'de' ? 'Finden Sie das Richtige für sich' : 'Find What\'s Right for You'}
          </Text>
          
          <Text style={styles.modalSubtitle}>
            {languageCode === 'de' 
              ? 'Beantworten Sie ein paar kurze Fragen, um personalisierte Empfehlungen zu erhalten.'
              : 'Answer a few quick questions to get personalized recommendations.'}
          </Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <View style={styles.answersContainer}>
              {currentQ.answers.map((answer, index) => {
                const isStringAnswer = typeof answer === 'string';
                let displayText = isStringAnswer ? answer : (languageCode === 'de' ? answer.de : answer.en);
                
                // Add description for level answers without duplication
                if (currentQ.key === 'level' && isStringAnswer) {
                  const levelCode = answer.split(' ')[0]; // Extract A0, A1, etc.
                  const description = getLevelDescription(levelCode);
                  displayText = `${levelCode} - ${description}`;
                }
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.answerButton}
                    onPress={() => onAnswer(answer)}
                  >
                    <Text style={styles.answerText}>{displayText}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipButtonText}>
                {languageCode === 'de' ? 'Überspringen' : 'Skip'}
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.progressText}>
              {currentQuestion + 1} / {questions.length}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  answersContainer: {
    width: '100%',
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default QuizModal;
