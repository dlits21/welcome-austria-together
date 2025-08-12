import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getInformationGermanLearningText, getGlobalText } from '../utils/languageUtils';

interface QuizQuestion {
  question: string;
  answers: (string | { key: string; value: string })[];
  key: string;
}

interface QuizModalProps {
  visible: boolean;
  currentQuestion: number;
  questions: QuizQuestion[];
  languageCode: string;
  onAnswer: (answer: string | { key: string; value: string }) => void;
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
      'A0': getInformationGermanLearningText('a0', languageCode),
      'A1': getInformationGermanLearningText('a1', languageCode),
      'A2': getInformationGermanLearningText('a2', languageCode),
      'B1': getInformationGermanLearningText('b1', languageCode),
      'B2': getInformationGermanLearningText('b2', languageCode),
      'C1': getInformationGermanLearningText('c1', languageCode),
      'C2': getInformationGermanLearningText('c2', languageCode),
    };
    return descriptions[level] ? descriptions[level] : level;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'ios'}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            {getInformationGermanLearningText('languageSupport', languageCode)}
          </Text>

          <Text style={styles.modalSubtitle}>
            {getInformationGermanLearningText('languageSupportQuestion', languageCode)}
          </Text>

          {/* Scrollable content container */}
          <ScrollView
            contentContainerStyle={styles.answersScrollView}
            style={styles.answersContainer}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <Text style={styles.questionText}>{currentQ.question}</Text>

            {currentQ.answers.map((answer, index) => {
              const isStringAnswer = typeof answer === 'string';
              let displayText = isStringAnswer ? answer : (answer?.value);

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
          </ScrollView>

          {/* Modal Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipButtonText}>
                {getGlobalText('skip', languageCode)}
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
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    minHeight: "25%", // Set a minimum height.
    flexGrow: 0,      // Allow it to grow and fill remaining space.
    flexShrink: 1,    // Allow it to shrink based on content.
    maxHeight: '80%', // Adjust maximum height of the modal
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    zIndex: 1,
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
    answersScrollView: {
      width: '100%',
      maxHeight: "80%",
      flexShrink: 1, // Ensure the scrollview shrinks
    },
    answersContainer: {
      width: '100%',
      gap: 12,
      paddingBottom: 20,
    },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
    marginBottom: 12,
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
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
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
