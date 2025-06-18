import React, { useState } from 'react';
import { SafeAreaView, View, Button } from 'react-native';
import QuizModal from '../../components/QuizModal'; // adjust path if needed

const questions: QuizQuestion[] = [
  {
    key: 'levels',
    question: 'What is your German level?',
    answers: ['A1', 'A2', 'B1', 'B2'],
  },
  {
    key: 'goal',
    question: 'What is your goal?',
    answers: [
      { key: 'work', en: 'Work in Austria', de: 'Arbeiten in Österreich' },
      { key: 'study', en: 'Study', de: 'Studieren' },
    ],
  },
];


const QuizTest: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer: string | { key: string; en: string; de: string }) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setVisible(false);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setVisible(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', maxHeight: undefined }}>
      <QuizModal
        visible={true}
        currentQuestion={currentQuestion}
        questions={questions}
        languageCode="en"
        onAnswer={handleAnswer}
        onSkip={handleSkip}
        onClose={() => setVisible(false)}
      />
      {!visible && (
        <View style={{ padding: 20 }}>
          <Button title="Restart Quiz" onPress={() => {
            setCurrentQuestion(0);
            setVisible(true);
          }} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default QuizTest;