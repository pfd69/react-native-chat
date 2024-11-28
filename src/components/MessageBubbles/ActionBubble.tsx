import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ActionBubbleProps {
  actions: { label: string; onPress: () => void }[];
}

const ActionBubble: React.FC<ActionBubbleProps> = ({ actions }) => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          onPress={action.onPress}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    margin: 5,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ActionBubble;