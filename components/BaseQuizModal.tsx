
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface BaseQuizQuestion {
  question: string;
  answers: (string | { key: string; en: string; de: string })[];
  key: string;
}

interface BaseQuizModalProps {
  visible: boolean;
  currentQuestion: number;
  questions: BaseQuizQuestion[];
  languageCode: string;
  title: string;
  subtitle: string;
  onAnswer: (answer: string | { key: string; en: string; de: string }) => void;
  onSkip: () => void;
  onClose: () => void;
  getLevelDescription?: (level: string) => string;
}

const BaseQuizModal: React.FC<BaseQuizModalProps> = ({
  visible,
  currentQuestion,
  questions,
  languageCode,
  title,
  subtitle,
  onAnswer,
  onSkip,
  onClose,
  getLevelDescription
}) => {
  if (!visible || currentQuestion >= questions.length) return null;

  const currentQ = questions[currentQuestion];
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenWidth < 400 || screenHeight < 700;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          isSmallScreen && styles.modalContentSmall,
          { maxHeight: screenHeight * 0.9 }
        ]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={[styles.modalTitle, isSmallScreen && styles.modalTitleSmall]}>{title}</Text>
          <Text style={[styles.modalSubtitle, isSmallScreen && styles.modalSubtitleSmall]}>{subtitle}</Text>

            <Text style={[styles.questionText, isSmallScreen && styles.questionTextSmall]}>{currentQ.question}</Text>

            <ScrollView
              contentContainerStyle={styles.answersScrollView}
              style={styles.answersContainer}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              {currentQ.answers.map((answer, index) => {
                const isStringAnswer = typeof answer === 'string';
                let displayText = isStringAnswer ? answer : (languageCode === 'de' ? answer.de : answer.en);

                // Add description for level answers if function provided
                if (currentQ.key === 'level' && isStringAnswer && getLevelDescription) {
                  const levelCode = answer.split(' ')[0];
                  const description = getLevelDescription(levelCode);
                  displayText = `${levelCode} - ${description}`;
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.answerButton, isSmallScreen && styles.answerButtonSmall]}
                    onPress={() => onAnswer(answer)}
                  >
                    <Text style={[styles.answerText, isSmallScreen && styles.answerTextSmall]}>{displayText}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={[styles.skipButtonText, isSmallScreen && styles.skipButtonTextSmall]}>
                {languageCode === 'de' ? 'Überspringen' : 'Skip'}
              </Text>
            </TouchableOpacity>
            
            <Text style={[styles.progressText, isSmallScreen && styles.progressTextSmall]}>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
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
  modalContentSmall: {
    padding: 16,
    maxWidth: '100%',
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
  modalTitleSmall: {
    fontSize: 18,
    marginTop: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalSubtitleSmall: {
    fontSize: 12,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionTextSmall: {
    fontSize: 16,
    marginBottom: 16,
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
  answerButtonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  answerText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  answerTextSmall: {
    fontSize: 14,
    lineHeight: 18,
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
  skipButtonTextSmall: {
    fontSize: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressTextSmall: {
    fontSize: 12,
  },
});

export default BaseQuizModal;
