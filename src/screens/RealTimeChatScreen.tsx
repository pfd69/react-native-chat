import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import { Text, useTheme } from '@upv/react-native-ui-core';
import { StackScreenProps } from '@react-navigation/stack';
import { TutorStackParamList } from '../navigation/TutorNavigator';
import { useFetchMessagesQuery, useSendMessageMutation } from '../services';
import { useTutorSocket } from '../hooks';
import { MessageBubbleFactory } from '../components/MessageBubbles';
import InputBar from '../components/InputBar';
import TypingIndicator from '../components/TypingIndicator';
import SearchBar from '../components/SearchBar';

type RealTimeChatScreenProps = StackScreenProps<TutorStackParamList, 'Chat'>;

const RealTimeChatScreen: React.FC<RealTimeChatScreenProps> = ({ route }) => {
  const { sessionId } = route.params;
  const { theme } = useTheme();

  // Fetch messages and handle sending
  const { data: messages, isLoading, refetch } = useFetchMessagesQuery(sessionId);
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // State for the input bar and search
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Typing indicator state
  const [isTyping, setIsTyping] = useState(false);

  // Using socket hook to listen for typing events
  const { subscribeToEvent, unsubscribeFromEvent, connected, sendMessageToSocket } = useTutorSocket(
    `ws://your-tcp-server-url/session/${sessionId}`
  );

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage({ sessionId, content: message });
      setMessage('');
      sendMessageToSocket(`session:${sessionId}:stopTyping`, {}); // Use sendMessageToSocket
      refetch();
    }
  };
  
  // Emit typing event when user types
  const handleTyping = (text: string) => {
    setMessage(text);
    if (text.trim()) {
      sendMessageToSocket(`session:${sessionId}:typing`, {}); // Use sendMessageToSocket
    } else {
      sendMessageToSocket(`session:${sessionId}:stopTyping`, {}); // Use sendMessageToSocket
    }
  };

  // Refresh messages
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Listen for typing events via socket
  useEffect(() => {
    if (connected) {
      // Subscribe to typing events for this session
      subscribeToEvent(`session:${sessionId}:typing`, () => setIsTyping(true));
      subscribeToEvent(`session:${sessionId}:stopTyping`, () => setIsTyping(false));
    }

    return () => {
      // Unsubscribe from typing events when leaving the screen
      unsubscribeFromEvent(`session:${sessionId}:typing`);
      unsubscribeFromEvent(`session:${sessionId}:stopTyping`);
    };
  }, [connected, sessionId, subscribeToEvent, unsubscribeFromEvent]);

  

  // Filter messages based on the search input
  const filteredMessages = messages?.data?.filter((msg) =>
    msg.content.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Search bar for filtering messages */}
      <SearchBar value={searchText} onChangeText={setSearchText} />

      {/* List of messages */}
      <FlatList
        data={filteredMessages || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubbleFactory message={item} />}
        contentContainerStyle={styles.messageList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        inverted // Show newest messages at the bottom
      />

      {/* Typing indicator */}
      {isTyping && <TypingIndicator />}

      {/* Input bar for sending messages */}
      <InputBar
        value={message}
        onChangeText={handleTyping}
        onSend={handleSend}
        isSending={isSending}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    paddingBottom: 80,
  },
});

export default RealTimeChatScreen;