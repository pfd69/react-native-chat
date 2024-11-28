import { faker } from "@faker-js/faker/.";
import { simulateDelay, generateMockSessions, generateMockMessages } from "../mocks";

export const mockBaseQuery = async (args: any) => {
  await simulateDelay(300); // Simulate network latency

  if (args.url === '/sessions') {
    return { data: { data: generateMockSessions() } };
  }

  if (args.url.includes('/messages')) {
    return { data: { data: generateMockMessages() } };
  }

  if (args.url === '/sessions' && args.method === 'POST') {
    const newSession = { ...args.body, id: faker.string.uuid() };
    return { data: { data: newSession } };
  }

  if (args.url.includes('/messages') && args.method === 'POST') {
    const newMessage = { ...args.body, id: faker.string.uuid() };
    return { data: { data: newMessage } };
  }

  return { error: { status: 404, data: 'Not Found' } };
};