import { faker } from '@faker-js/faker';
import { Session, Message } from '../types';
import { mockStore } from './store';

// Generate mock sessions
export const generateMockSessions = (): Session[] => {
  return Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    isActive: faker.helpers.arrayElement([true,false]),       // Whether the session is currently active
  }));
};

// Generate mock messages
export const generateMockMessages = (): Message[] => {
    return Array.from({ length: 10 }, () => {
      const senderType = faker.helpers.arrayElement(['user', 'tutor', 'professor', 'external']);
      const senderId = faker.string.uuid();
  
      return {
        id: faker.string.uuid(),
        sessionId: faker.string.uuid(),
        content: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
        sender: senderType as 'user' | 'tutor' | 'professor' | 'external',
        senderId: senderType === 'external' ? senderId : undefined, // Add senderId only for external users
        status: faker.helpers.arrayElement(['pending', 'sent', 'delivered', 'read', 'failed']),
        type: faker.helpers.arrayElement([ 'message', 'question' , 'action' , 'media' ]),
      };
    });
  };

// Mock API delay
export const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


// Mock base query function
export const mockBaseQuery = async (args: { url: string; method: string; body?: any }) => {
    console.log('----------------[MockBaseQuery]: Received args:', args);
  
    const { url, method, body } = args;
  
    // Handle fetchSessions
    if (url === '/sessions' && method === 'GET') {
      return { data: { success: true, data: mockStore.sessions } }; // Wrap in ApiResponse format
    }
  
    // Handle fetchMessages
    if (url.startsWith('/sessions/') && url.endsWith('/messages') && method === 'GET') {
      const sessionId = url.split('/')[2];
      return {
        data: {
          success: true,
          data: mockStore.messages[sessionId] || [],
        },
      };
    }
  
    // Handle sendMessage
    if (url.startsWith('/sessions/') && url.endsWith('/messages') && method === 'POST') {
      const { sessionId, content } = body;
      const newMessage: Message = {
        id: faker.string.uuid(),
        sessionId,
        content,
        timestamp: new Date().toISOString(),
        type: 'message',
        sender: 'user',
      };
  
      if (!mockStore.messages[sessionId]) {
        mockStore.messages[sessionId] = [];
      }
  
      mockStore.messages[sessionId].push(newMessage);

      const responseMessage: Message = {
        id: faker.string.uuid(),
        sessionId,
        content,
        type: 'message',
        timestamp: new Date().toISOString(),
        sender: 'tutor',
      };
  
      if (!mockStore.messages[sessionId]) {
        mockStore.messages[sessionId] = [];
      }
      mockStore.messages[sessionId].push(responseMessage);

    //   console.log('----------------[MockBaseQuery]: mockStore :', mockStore);

      return {
        data: {
          success: true,
          data: newMessage,
        },
      };
    }
  
    // Default error response
    return { error: { status: 400, data: 'Invalid Request' } };
  };