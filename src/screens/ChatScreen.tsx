import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import { MessageBubbleFactory } from '../components/MessageBubbles';
import InputBar from '../components/InputBar';
import TypingIndicator from '../components/TypingIndicator';
import SearchBar from '../components/SearchBar';

type ChatScreenProps = StackScreenProps<TutorStackParamList, 'Chat'>;

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { sessionId } = route.params;
  const { theme } = useTheme();

  // Fetch messages and handle sending
  const { data: messages, isLoading, refetch } = useFetchMessagesQuery(sessionId);
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // State for the input bar, search, and typing
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Timer for controlling typing indicator visibility
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // FlatList reference for scrolling
  const flatListRef = useRef<FlatList>(null);

  // Handle message sending
  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage({ sessionId, content: message });
      setMessage('');
      setIsTyping(false); // Clear typing indicator after sending
      refetch();

      // Scroll to bottom when a new message is sent
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  // Refresh messages
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Handle user typing
  const handleTyping = (text: string) => {
    setMessage(text);

    // Show typing indicator if there is input
    if (text.trim()) {
      setIsTyping(true);

      // Reset typing timeout if the user continues typing
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      // Hide typing indicator after a delay
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000); // Typing indicator disappears after 2 seconds of inactivity
    } else {
      setIsTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current); // Clear the timeout
    }
  };

  // Filter messages based on the search input
  const filteredMessages = messages?.data
    ?.slice()
    .reverse() // Ensure newest messages are at the bottom for inverted FlatList
    .filter((msg) => msg.content.toLowerCase().includes(searchText.toLowerCase()));

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
        ref={flatListRef}
        data={filteredMessages || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubbleFactory message={item} />}
        contentContainerStyle={styles.messageList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        refreshing={refreshing}
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

export default ChatScreen;