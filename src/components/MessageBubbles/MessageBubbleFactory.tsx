// src/components/MessageBubbles/MessageBubbleFactory.tsx
import React from 'react';
import { useTheme } from '@upv/react-native-ui-core';
import MessageBubble from './MessageBubble';
import QuestionBubble from './QuestionBubble';
import ActionBubble from './ActionBubble';
import MediaBubble from './MediaBubble';
import { Message } from '../../types';

interface MessageBubbleFactoryProps {
  message: Message;
}

const MessageBubbleFactory: React.FC<MessageBubbleFactoryProps> = ({ message }) => {
  const { theme } = useTheme();

  switch (message.type) {
    case 'question':
      return (
        <MessageBubble
          content={message.content}
          sender={message.sender}
          isUser={message.sender === 'user'}
          timestamp={message.timestamp}
          backgroundColor={theme.colors.secondary}
        >
          <QuestionBubble
            question={message.content}
            options={message.options || []}
            onOptionPress={(option) => console.log('Option selected:', option)}
          />
        </MessageBubble>
      );

    case 'action':
      return (
        <MessageBubble
          content={message.content}
          sender={message.sender}
          isUser={message.sender === 'user'}
          timestamp={message.timestamp}
          backgroundColor={theme.colors.secondary}
        >
          <ActionBubble actions={message.actions || []} />
        </MessageBubble>
      );

    case 'media':
      return (
        <MessageBubble
          content={message.caption || ''}
          sender={message.sender}
          isUser={message.sender === 'user'}
          timestamp={message.timestamp}
          backgroundColor={theme.colors.secondary}
        >
          <MediaBubble mediaUrl={message.mediaUrl || ''} caption={message.caption} />
        </MessageBubble>
      );

    default:
      return (
        <MessageBubble
          content={message.content}
          sender={message.sender}
          isUser={message.sender === 'user'}
          timestamp={message.timestamp}
          backgroundColor={theme.colors.primary}
        />
      );
  }
};

export default MessageBubbleFactory;