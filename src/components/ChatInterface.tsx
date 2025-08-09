import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Fade,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Mood as MoodIcon,
  SentimentSatisfiedAlt as HappyIcon,
  SentimentDissatisfied as SadIcon,
  SentimentNeutral as NeutralIcon
} from '@mui/icons-material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../context/ChatContext';
import { EmotionType } from '../types';

const emotionIcons: Record<EmotionType, React.ReactElement> = {
  happy: <HappyIcon />,
  sad: <SadIcon />,
  neutral: <NeutralIcon />,
  excited: <MoodIcon />,
  thoughtful: <NeutralIcon />,
  caring: <MoodIcon />
};

const emotionColors: Record<EmotionType, string> = {
  happy: '#4caf50',
  sad: '#2196f3',
  neutral: '#9e9e9e',
  excited: '#ff9800',
  thoughtful: '#673ab7',
  caring: '#e91e63'
};

function ChatInterface() {
  const { state, sendMessage, clearChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const getEmotionLabel = (emotion: EmotionType): string => {
    const labels: Record<EmotionType, string> = {
      happy: '开心',
      sad: '难过',
      neutral: '平静',
      excited: '兴奋',
      thoughtful: '思考',
      caring: '关怀'
    };
    return labels[emotion];
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
      <Fade in timeout={800}>
        <Paper
          elevation={3}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #ffffff, #fafafa)'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                情感对话助手
              </Typography>
              <Chip
                icon={emotionIcons[state.currentEmotion]}
                label={getEmotionLabel(state.currentEmotion)}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': {
                    color: emotionColors[state.currentEmotion]
                  }
                }}
              />
            </Box>
            <Tooltip title="清空对话">
              <IconButton
                onClick={clearChat}
                sx={{ color: 'white' }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <MessageList messages={state.messages} isTyping={state.isTyping} />
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
            <MessageInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={state.isTyping}
            />
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default ChatInterface;