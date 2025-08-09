import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, ChatState, EmotionType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string) => void;
  clearChat: () => void;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_EMOTION'; payload: EmotionType }
  | { type: 'CLEAR_CHAT' };

const initialState: ChatState = {
  messages: [
    {
      id: uuidv4(),
      content: '你好！我是你的情感对话助手。我可以理解你的情绪，并提供温暖的陪伴和支持。有什么想和我聊的吗？😊',
      sender: 'assistant',
      timestamp: new Date(),
      emotion: 'caring'
    }
  ],
  isTyping: false,
  currentEmotion: 'neutral'
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      };
    case 'SET_EMOTION':
      return {
        ...state,
        currentEmotion: action.payload
      };
    case 'CLEAR_CHAT':
      return initialState;
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // 设置正在输入状态
    dispatch({ type: 'SET_TYPING', payload: true });

    // 模拟AI响应延迟
    setTimeout(() => {
      const assistantMessage: Message = {
        id: uuidv4(),
        content: generateResponse(content),
        sender: 'assistant',
        timestamp: new Date(),
        emotion: analyzeEmotion(content)
      };
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      dispatch({ type: 'SET_EMOTION', payload: assistantMessage.emotion || 'neutral' });
      dispatch({ type: 'SET_TYPING', payload: false });
    }, 1000 + Math.random() * 1000);
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

// 简单的情绪分析函数
function analyzeEmotion(text: string): EmotionType {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('开心') || lowerText.includes('高兴') || lowerText.includes('快乐')) {
    return 'happy';
  }
  if (lowerText.includes('难过') || lowerText.includes('伤心') || lowerText.includes('难受')) {
    return 'sad';
  }
  if (lowerText.includes('激动') || lowerText.includes('兴奋') || lowerText.includes('太棒了')) {
    return 'excited';
  }
  if (lowerText.includes('思考') || lowerText.includes('想想') || lowerText.includes('为什么')) {
    return 'thoughtful';
  }
  if (lowerText.includes('谢谢') || lowerText.includes('感谢') || lowerText.includes('帮助')) {
    return 'caring';
  }
  
  return 'neutral';
}

// 生成响应的函数
function generateResponse(input: string): string {
  const emotion = analyzeEmotion(input);
  const responses: Record<EmotionType, string[]> = {
    happy: [
      '看到你这么开心，我也为你感到高兴！😊',
      '你的快乐感染到我了！分享快乐是件美好的事情。',
      '太棒了！保持这份美好的心情吧！'
    ],
    sad: [
      '我理解你的感受。有时候生活确实不容易，但请记住，一切都会好起来的。',
      '抱抱你～没关系的，我在这里陪着你。想聊聊发生了什么吗？',
      '难过的时候允许自己难过一会儿，这很正常。我会一直在这里支持你。'
    ],
    excited: [
      '哇！你的热情真的很有感染力！发生什么好事了吗？',
      '我能感受到你的激动！这种感觉一定很棒！',
      '太令人兴奋了！和我分享更多细节吧！'
    ],
    thoughtful: [
      '这是个很好的问题。让我们一起思考一下...',
      '你提出了一个很有深度的观点。我认为...',
      '嗯，这确实值得深思。从不同角度来看...'
    ],
    caring: [
      '不客气！能帮到你是我的荣幸。还有什么我可以协助的吗？',
      '很高兴能够帮助到你！你的感谢让我觉得很温暖。',
      '这是我应该做的！看到你得到帮助，我也很开心。'
    ],
    neutral: [
      '我在认真听你说。请继续告诉我更多。',
      '明白了。还有什么想和我分享的吗？',
      '我理解你的意思。让我们继续聊下去吧。'
    ]
  };

  const responseList = responses[emotion];
  return responseList[Math.floor(Math.random() * responseList.length)];
}