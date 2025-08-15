import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Fade,
  Chip,
  Switch,
  FormControlLabel,
  Button
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Mood as MoodIcon,
  SentimentSatisfiedAlt as HappyIcon,
  SentimentDissatisfied as SadIcon,
  SentimentNeutral as NeutralIcon,
  Api as ApiIcon,
  Stop as StopIcon
} from '@mui/icons-material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ApiKeySettings from './ApiKeySettings';
import { useChat } from '../context/ChatContext';
import { EmotionType } from '../types';
import { chatApiService } from '../services/api';

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
  const { state, sendMessage, clearChat, setUseApi, cancelRequest } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检查是否有 API Key
    const key = chatApiService.getApiKey();
    setHasApiKey(!!key);
    if (key) {
      setUseApi(true);
    }
  }, [setUseApi]);

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

  const handleApiKeyChange = (hasKey: boolean) => {
    setHasApiKey(hasKey);
    setUseApi(hasKey);
  };

  const handleApiToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseApi(event.target.checked);
  };

  const handleStopGeneration = () => {
    cancelRequest();
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {hasApiKey && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.useApi || false}
                      onChange={handleApiToggle}
                      size="small"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#4caf50'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#4caf50'
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ApiIcon fontSize="small" />
                      <Typography variant="caption">API</Typography>
                    </Box>
                  }
                  sx={{ m: 0, color: 'white' }}
                />
              )}
              <ApiKeySettings onApiKeyChange={handleApiKeyChange} />
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
          </Box>

          {/* Messages Area */}
          <Box sx={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
            <MessageList messages={state.messages} isTyping={state.isTyping} />
            <div ref={messagesEndRef} />
          </Box>

          {/* Stop Generation Button */}
          {state.isTyping && state.useApi && (
            <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<StopIcon />}
                onClick={handleStopGeneration}
                sx={{
                  borderColor: '#ff5252',
                  color: '#ff5252',
                  '&:hover': {
                    borderColor: '#ff1744',
                    backgroundColor: 'rgba(255, 23, 68, 0.08)'
                  }
                }}
              >
                停止生成
              </Button>
            </Box>
          )}

          {/* Error Display */}
          {state.error && (
            <Box sx={{ px: 2, py: 1, backgroundColor: '#ffebee' }}>
              <Typography variant="caption" color="error">
                {state.error}
              </Typography>
            </Box>
          )}

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
            <MessageInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={state.isTyping}
              placeholder={
                hasApiKey && state.useApi 
                  ? "输入消息... (使用 API 模式，支持 Markdown 格式)" 
                  : "输入消息... (本地模式)"
              }
            />
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default ChatInterface;
