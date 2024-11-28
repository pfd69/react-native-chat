// src/services/index.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Session, Message } from '../types';
import { mockBaseQuery } from '../mocks';

export const tagTypes = ['Session', 'Message'];

export let isDevelopment: boolean = false;
export const setDevelopment = (mode: boolean) => {
  isDevelopment = mode;
};

let surveyBaseURL: string | undefined;
export const setSurveyBaseURL = (url: string) => {
    surveyBaseURL = url;
};

// Default prepareHeaders function
let customPrepareHeaders = (headers: Headers, options: { getState: any }) => {
    // Default behavior: add an Authorization header if token exists
    const token = options.getState()?.auth?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  };
  // Function to set a custom prepareHeaders
  export const setPrepareHeaders = (newPrepareHeaders: typeof customPrepareHeaders) => {
    customPrepareHeaders = newPrepareHeaders;
};

export interface FetchArgs {
    page?: number;
    pageSize?: number;
    id?: string | number;
    expiredTill?: number;
}

// const baseQuery = isDevelopment 
// ? mockBaseQuery // Use mockBaseQuery in development
// : fetchBaseQuery({
//     baseUrl: surveyBaseURL,
//     prepareHeaders: (headers, options) => customPrepareHeaders(headers, options),
//   });
// Dynamic Base Query
const baseQuery = async (args: any, api: any, extraOptions: any) => {
  console.log('[Base Query] Argument received:', { args, api, extraOptions });

  // Normalize args: If it's a string (GET endpoint), convert to an object with the URL property
  const normalizedArgs = typeof args === 'string' ? { url: args, method: 'GET' } : args;

  if (isDevelopment) {
    console.log('[Development Mode] Mock Request:', normalizedArgs);
    return mockBaseQuery(normalizedArgs);
  }

  if (!surveyBaseURL) {
    console.error('[Production Mode] Missing surveyBaseURL');
    return { error: { status: 500, data: 'Base URL is not defined' } };
  }

  console.log('[Production Mode] Real Request:', normalizedArgs);
  return fetchBaseQuery({
    baseUrl: surveyBaseURL,
    prepareHeaders: (headers, options) => customPrepareHeaders(headers, options),
  })(normalizedArgs, api, extraOptions);
};

console.log('tutorApi: ', baseQuery)
// Define the base API slice
export const tutorApi = createApi({
  reducerPath: 'tutorApi',
  baseQuery: baseQuery, // Dynamic base query
  tagTypes: tagTypes, // Used for cache invalidation
  endpoints: (builder) => ({
    // Fetch a list of active sessions
    fetchSessions: builder.query<ApiResponse<Session[]>, void>({
      query: () => '/sessions',
      providesTags: ['Session'],
      async onQueryStarted(_, { queryFulfilled }) {
        console.log('[fetchSessions]: Request initiated');
        try {
          const { data } = await queryFulfilled;
          console.log('[fetchSessions]: Response:', data);
        } catch (error) {
          console.error('[fetchSessions]: Error:', error);
        }
      },
    }),
    // Fetch messages for a specific session
    fetchMessages: builder.query<ApiResponse<Message[]>, string>({
      query: (sessionId) => `/sessions/${sessionId}/messages`,
      providesTags: (result, error, sessionId) => [{ type: 'Message', id: sessionId }],
    }),
    // Start a new session
    startSession: builder.mutation<ApiResponse<Session>, Partial<Session>>({
      query: (newSession) => ({
        url: '/sessions',
        method: 'POST',
        body: newSession,
      }),
      invalidatesTags: ['Session'],
    }),
    // Send a message to the tutor
    sendMessage: builder.mutation<ApiResponse<Message>, { sessionId: string; content: string }>({
      query: ({ sessionId, content }) => ({
        url: `/sessions/${sessionId}/messages`,
        method: 'POST',
        body: { sessionId, content }, // Include sessionId in the body
      }),
      invalidatesTags: (result, error, { sessionId }) => [{ type: 'Message', id: sessionId }],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useFetchSessionsQuery,
  useFetchMessagesQuery,
  useStartSessionMutation,
  useSendMessageMutation,
} = tutorApi;