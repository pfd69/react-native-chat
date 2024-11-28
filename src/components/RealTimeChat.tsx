import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, useTheme, moderateScale } from '@upv/react-native-ui-core';
import { useTutorSocket } from '../hooks';

const RealTimeChat: React.FC<{ sessionId: string }> = ({ sessionId }) => {

  const { theme } = useTheme();
  const { subscribeToEvent, unsubscribeFromEvent, messages, connected, sendMessageToSocket } = useTutorSocket(
    `ws://your-tcp-server-url/session/${sessionId}`
  );
  useEffect(() => {
    if (connected) {
      // Subscribe to session messages
      subscribeToEvent(`session:${sessionId}:messages`, (newMessage) => {
        console.log('New message:', newMessage);
      });

      // Subscribe to session updates
      subscribeToEvent(`session:${sessionId}:status`, (status) => {
        console.log('Session status update:', status);
      });
    }

    return () => {
      // Unsubscribe from events when the component unmounts
      unsubscribeFromEvent(`session:${sessionId}:messages`);
      unsubscribeFromEvent(`session:${sessionId}:status`);
    };
  }, [connected, sessionId, subscribeToEvent, unsubscribeFromEvent]);

  const handleSendMessage = () => {
    sendMessageToSocket(`session:${sessionId}:send-message`, {
      content: 'Hello, this is a test message!',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.status, { color: theme.colors.textPrimary }]}>
        Socket Status: {connected ? 'Connected' : 'Disconnected'}
      </Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
            TEST
            {/* {item.content} */}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
            No messages yet.
          </Text>
        }
      />
      <Button title="Send Message" onPress={handleSendMessage} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  status: {
    marginBottom: moderateScale(16),
    textAlign: 'center',
    fontSize: moderateScale(14),
  },
  message: {
    marginVertical: moderateScale(8),
    fontSize: moderateScale(16),
  },
  button: {
    marginTop: moderateScale(16),
  },
});

export default RealTimeChat;