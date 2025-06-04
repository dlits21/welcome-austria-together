
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LegalQuizQuestion {
  question: string;
  answers: (string | { key: string; en: string; de: string })[];
  key: string;
}

interface LegalSupportQuizModalProps {
  visible: boolean;
  currentQuestion: number;
  questions: LegalQuizQuestion[];
  languageCode: string;
  onAnswer: (answer: string | { key: string; en: string; de: string }) => void;
  onSkip: () => void;
  onClose: () => void;
}

const LegalSupportQuizModal: React.FC<LegalSupportQuizModalProps> = ({
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
            {languageCode === 'de' ? 'Rechtshilfe-Assistent' : 'Legal Support Assistant'}
          </Text>
          
          <Text style={styles.modalSubtitle}>
            {languageCode === 'de' 
              ? 'Beantworten Sie ein paar Fragen, um passende Rechtsberatung zu finden.'
              : 'Answer a few questions to find suitable legal counseling.'}
          </Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <ScrollView style={styles.answersScrollView} contentContainerStyle={styles.answersContainer}>
              {currentQ.answers.map((answer, index) => {
                const isStringAnswer = typeof answer === 'string';
                const displayText = isStringAnswer ? answer : (languageCode === 'de' ? answer.de : answer.en);
                
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
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
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
    maxHeight: 300,
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
    width: '100%',
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

export default LegalSupportQuizModal;
