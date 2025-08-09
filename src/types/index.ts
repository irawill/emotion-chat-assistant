export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  emotion?: EmotionType;
}

export type EmotionType = 'happy' | 'sad' | 'neutral' | 'excited' | 'thoughtful' | 'caring';

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentEmotion: EmotionType;
}

export interface EmotionAnalysis {
  emotion: EmotionType;
  confidence: number;
}