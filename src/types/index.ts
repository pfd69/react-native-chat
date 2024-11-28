// Types for AI tutor interactions

// Session-related types
export interface Session {
    id: string;                  // Unique session ID
    title: string;               // Topic or title of the session
    createdAt: string;           // ISO date string
    updatedAt: string;           // Last updated timestamp
    isActive: boolean;           // Whether the session is currently active
  }
  
  // Message-related types
  export interface Message {
    id: string;                  // Unique message ID
    sessionId: string;           // Associated session ID
    type: string;
    sender: 'user' | 'tutor' | 'professor' | 'external'; // Message sender type
    senderId?: string;
    content: string;             // Message content
    timestamp: string;           // When the message was sent
    status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed'; // Message status
    options?: string[]; // For question bubbles
    actions?: { label: string; onPress: () => void }[]; // For action bubbles
    mediaUrl?: string; // For media bubbles
    caption?: string; // For media bubbles
  }
  
  // User-related types
  export interface User {
    id: string;                  // Unique user ID
    name: string;                // User's name
    avatar?: string;             // Optional user avatar
  }
  
  // Tutor-related types
  export interface Tutor {
    id: string;                  // Unique tutor ID
    name: string;                // Tutor's name
    expertise: string[];         // Topics or subjects the tutor specializes in
    avatar?: string;             // Optional tutor avatar
  }
  
  // API response types
  export interface ApiResponse<T> {
    success: boolean;            // Indicates API call success
    data?: T;                    // Payload
    error?: string;              // Error message
  }
  
  // WebSocket/TCP-related events
  export interface TutorSocketEvent {
    event: 'message' | 'session-update' | 'disconnect';
    payload: any;                // Event-specific payload
  }