import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface QuestionBubbleProps {
  question: string;
  options: string[];
  onOptionPress: (option: string) => void;
}

const QuestionBubble: React.FC<QuestionBubbleProps> = ({ question, options, onOptionPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onOptionPress(option)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    textAlign: 'center',
  },
});

export default QuestionBubble;