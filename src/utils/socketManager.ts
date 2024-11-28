import { io, Socket } from 'socket.io-client';
import { TutorSocketEvent } from '../types';

let socket: Socket | null = null;

export const connectSocket = (url: string) => {
  if (!socket) {
    socket = io(url, { transports: ['websocket'] });
  }
  return socket;
};

export const disconnectSocket = (socket: Socket | null) => {
  if (socket) {
    socket && socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket is not connected. Call connectSocket first.');
  }
  return socket;
};

export const onSocketEvent = (socket: any, event: string, callback: (data: any) => void) => {
  if (socket) {
    socket.on(event, callback);
  }
};

export const offSocketEvent = (socket: any, event: string) => {
  if (socket) {
    socket.off(event);
  }
};

export const sendMessage = (socket: any, event: string, payload: any) => {
  if (socket) {
    socket.emit(event, payload);
  }
};