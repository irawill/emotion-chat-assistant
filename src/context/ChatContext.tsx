import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, ChatState, EmotionType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { chatApiService, ApiMessage } from '../services/api';

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string) => void;
  clearChat: () => void;
  setUseApi: (useApi: boolean) => void;
  cancelRequest: () => void;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string } }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_EMOTION'; payload: EmotionType }
  | { type: 'SET_USE_API'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
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
  currentEmotion: 'neutral',
  useApi: false,
  error: null
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg => 
          msg.id === action.payload.id 
            ? { ...msg, content: action.payload.content }
            : msg
        )
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
    case 'SET_USE_API':
      return {
        ...state,
        useApi: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'CLEAR_CHAT':
      return {
        ...initialState,
        useApi: state.useApi // 保留 API 设置
      };
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

    // 判断是否使用 API
    if (state.useApi && chatApiService.getApiKey()) {
      // 创建助手消息占位符
      const assistantMessageId = uuidv4();
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: '',
        sender: 'assistant',
        timestamp: new Date(),
        emotion: 'neutral'
      };
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });

      try {
        // 构建消息历史
        const messages: ApiMessage[] = state.messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));
        
        // 添加当前消息
        messages.push({ role: 'user', content });

        // 添加系统提示（可选）
        const systemMessage: ApiMessage = {
          role: 'system',
          content: '你是一个富有同理心的情感对话助手。请理解用户的情绪，并提供温暖、支持性的回应。请用中文回答，可以使用 Markdown 格式来组织你的回答。'
        };
        messages.unshift(systemMessage);

        // 使用流式输出
        let fullContent = '';
        await chatApiService.sendMessageStream(messages, {
          onChunk: (chunk: string) => {
            fullContent += chunk;
            dispatch({ 
              type: 'UPDATE_MESSAGE', 
              payload: { 
                id: assistantMessageId, 
                content: fullContent 
              } 
            });
          },
          onComplete: () => {
            // 分析最终内容的情绪
            const emotion = analyzeEmotion(fullContent);
            dispatch({ type: 'SET_EMOTION', payload: emotion });
            dispatch({ type: 'SET_TYPING', payload: false });
          },
          onError: (error: Error) => {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            dispatch({ 
              type: 'UPDATE_MESSAGE', 
              payload: { 
                id: assistantMessageId, 
                content: `抱歉，发生了错误：${error.message}` 
              } 
            });
            dispatch({ type: 'SET_TYPING', payload: false });
          }
        });
      } catch (error) {
        // 错误处理
        const errorMessage = error instanceof Error ? error.message : '发生未知错误';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        dispatch({ type: 'SET_TYPING', payload: false });
      }
    } else {
      // 使用本地模拟响应
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
    }
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const setUseApi = (useApi: boolean) => {
    dispatch({ type: 'SET_USE_API', payload: useApi });
  };

  const cancelRequest = () => {
    chatApiService.cancelRequest();
    dispatch({ type: 'SET_TYPING', payload: false });
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearChat, setUseApi, cancelRequest }}>
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
  
  if (lowerText.includes('开心') || lowerText.includes('高兴') || lowerText.includes('快乐') || 
      lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('😊') || lowerText.includes('😄')) {
    return 'happy';
  }
  if (lowerText.includes('难过') || lowerText.includes('伤心') || lowerText.includes('难受') ||
      lowerText.includes('sad') || lowerText.includes('sorry') || lowerText.includes('😢') || lowerText.includes('😔')) {
    return 'sad';
  }
  if (lowerText.includes('激动') || lowerText.includes('兴奋') || lowerText.includes('太棒了') ||
      lowerText.includes('excited') || lowerText.includes('amazing') || lowerText.includes('🎉')) {
    return 'excited';
  }
  if (lowerText.includes('思考') || lowerText.includes('想想') || lowerText.includes('为什么') ||
      lowerText.includes('think') || lowerText.includes('consider') || lowerText.includes('🤔')) {
    return 'thoughtful';
  }
  if (lowerText.includes('谢谢') || lowerText.includes('感谢') || lowerText.includes('帮助') ||
      lowerText.includes('thank') || lowerText.includes('help') || lowerText.includes('❤️')) {
    return 'caring';
  }
  
  return 'neutral';
}

// 生成响应的函数（本地模式使用）
function generateResponse(input: string): string {
  const emotion = analyzeEmotion(input);
  const responses: Record<EmotionType, string[]> = {
    happy: [
      '看到你这么开心，我也为你感到高兴！😊\n\n快乐是最好的良药，希望你能一直保持这份美好的心情。',
      '你的快乐感染到我了！分享快乐是件美好的事情。\n\n> 「快乐加倍，悲伤减半」',
      '太棒了！保持这份美好的心情吧！\n\n## 小贴士\n记得把今天的快乐记录下来哦~'
    ],
    sad: [
      '我理解你的感受。有时候生活确实不容易，但请记住：\n\n- 一切都会好起来的\n- 你并不孤单\n- 明天又是新的一天',
      '抱抱你～ 没关系的，我在这里陪着你。\n\n想聊聊发生了什么吗？有时候倾诉能让心情好一些。',
      '难过的时候允许自己难过一会儿，这很正常。\n\n**记住：**\n这只是暂时的，你比想象中更坚强。'
    ],
    excited: [
      '哇！你的热情真的很有感染力！🎉\n\n发生什么好事了吗？快和我分享一下！',
      '我能感受到你的激动！这种感觉一定很棒！\n\n## 让我猜猜\n是不是有什么特别的好消息？',
      '太令人兴奋了！\n\n> 激动的心，颤抖的手\n\n和我分享更多细节吧！'
    ],
    thoughtful: [
      '这是个很好的问题。让我们一起思考一下...\n\n## 思考角度\n1. 从不同的视角看待问题\n2. 考虑各种可能性\n3. 寻找最优解',
      '你提出了一个很有深度的观点。\n\n**我的理解是：**\n每个问题都有多个层面，需要我们仔细分析。',
      '嗯，这确实值得深思。\n\n让我们试着从以下几个方面来分析：\n- 原因\n- 影响\n- 解决方案'
    ],
    caring: [
      '不客气！能帮到你是我的荣幸。❤️\n\n还有什么我可以协助的吗？',
      '很高兴能够帮助到你！\n\n> 「助人为乐，其乐无穷」\n\n你的感谢让我觉得很温暖。',
      '这是我应该做的！\n\n## 随时为你服务\n有任何问题都可以问我哦~'
    ],
    neutral: [
      '我在认真听你说。请继续告诉我更多。\n\n你的想法对我很重要。',
      '明白了。还有什么想和我分享的吗？\n\n我会一直在这里陪伴你。',
      '我理解你的意思。\n\n让我们继续聊下去吧，我很享受和你的对话。'
    ]
  };

  const responseList = responses[emotion];
  return responseList[Math.floor(Math.random() * responseList.length)];
}