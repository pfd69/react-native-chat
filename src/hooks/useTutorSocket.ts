import { useEffect, useState, useRef } from 'react';
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  onSocketEvent,
  offSocketEvent,
} from '../utils/socketManager';
import { Message } from '../types';

export const useTutorSocket = (socketUrl: string) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!socketUrl) return;

    // Establish a new socket connection
    const socket = connectSocket(socketUrl);
    socketRef.current = socket;

    // Handle connection events
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    // Clean up on unmount or when socketUrl changes
    return () => {
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    };
  }, [socketUrl]);

  const subscribeToEvent = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      onSocketEvent(socketRef.current, event, callback);
    }
  };

  const unsubscribeFromEvent = (event: string) => {
    if (socketRef.current) {
      offSocketEvent(socketRef.current, event);
    }
  };

  const sendMessageToSocket = (event: string, payload: any) => {
    if (socketRef.current) {
      sendMessage(socketRef.current, event, payload);
    }
  };

  return {
    connected,
    messages,
    subscribeToEvent,
    unsubscribeFromEvent,
    sendMessageToSocket, // This replaces emitEvent
  };
};