
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FAQItemProps {
  question: string;
  answer: string;
  expanded: boolean;
  onPress: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, expanded, onPress }) => {
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity style={styles.faqHeader} onPress={onPress}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <MaterialIcons 
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqContent}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  faqContent: {
    padding: 12,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default FAQItem;
