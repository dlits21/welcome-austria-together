
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
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

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <ScrollView 
              style={styles.answersScrollView} 
              contentContainerStyle={styles.answersContainer}
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
                    style={styles.answerButton}
                    onPress={() => onAnswer(answer)}
                  >
                    <Text style={styles.answerText}>{displayText}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: Platform.OS === 'ios' ? '85%' : '80%',
    alignItems: 'center',
    position: 'relative',
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
  questionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    flex: 1,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  answersScrollView: {
    width: '100%',
    maxHeight: Platform.OS === 'ios' ? 300 : 250,
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
  },
  answerText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
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

export default BaseQuizModal;
