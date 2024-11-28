import { useState, useEffect } from 'react';
import { useFetchMessagesQuery, useSendMessageMutation } from '../services';
import { Message } from '../types';

export const useSessionMessages = (sessionId: string) => {
  const { data, isLoading, error, refetch } = useFetchMessagesQuery(sessionId);
  const [sendMessage] = useSendMessageMutation();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
    }
  }, [data]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = async (content: string) => {
    const newMessage = {
      sessionId,
      content,
    };

    try {
      const response = await sendMessage(newMessage).unwrap();
      addMessage(response.data!);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage,
    refetchMessages: refetch,
  };
};