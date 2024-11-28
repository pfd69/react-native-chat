import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, moderateScale } from '@upv/react-native-ui-core';

interface MessageBubbleProps {
  content: string;
  sender: string;
  isUser: boolean;
  timestamp: string;
  children?: React.ReactNode; // To support interactive content
  backgroundColor: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  sender,
  isUser,
  timestamp,
  children,
  backgroundColor,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          backgroundColor,
        },
      ]}
    >
      {!isUser && <Text style={[styles.sender, { color: theme.colors.text }]}>{sender}</Text>}
      <Text style={styles.content}>{content}</Text>
      {children && <View style={styles.interactiveContainer}>{children}</View>}
      <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: moderateScale(4),
    padding: moderateScale(10),
    borderRadius: moderateScale(12),
  },
  sender: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(4),
    fontWeight: 'bold',
  },
  content: {
    fontSize: moderateScale(14),
  },
  interactiveContainer: {
    marginTop: moderateScale(8),
  },
  timestamp: {
    fontSize: moderateScale(10),
    textAlign: 'right',
    marginTop: moderateScale(4),
  },
});

export default MessageBubble;