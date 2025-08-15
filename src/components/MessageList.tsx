import React, { useEffect, useRef } from 'react';
import { Box, Avatar, Typography, Paper, Fade, CircularProgress } from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import { Message } from '../types';
import MarkdownMessage from './MarkdownMessage';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}
    >
      {messages.map((message, index) => (
        <Fade in key={message.id} timeout={300}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: 1,
              mb: 1,
            }}
          >
            {message.sender === 'assistant' && (
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 36,
                  height: 36,
                  mt: 0.5,
                }}
              >
                <SmartToy fontSize="small" />
              </Avatar>
            )}
            
            <Paper
              elevation={1}
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                bgcolor: message.sender === 'user' 
                  ? 'primary.main' 
                  : 'background.paper',
                color: message.sender === 'user' 
                  ? 'primary.contrastText' 
                  : 'text.primary',
                position: 'relative',
                '&::before': message.sender === 'user' ? {} : {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: 12,
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid',
                  borderRightColor: 'background.paper',
                },
                '&::after': message.sender === 'user' ? {
                  content: '""',
                  position: 'absolute',
                  right: -8,
                  top: 12,
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid',
                  borderLeftColor: 'primary.main',
                } : {},
              }}
            >
              {message.content ? (
                <MarkdownMessage 
                  content={message.content} 
                  isUser={message.sender === 'user'}
                />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} thickness={2} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    正在输入...
                  </Typography>
                </Box>
              )}
              
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 1, 
                  opacity: 0.7,
                  fontSize: '0.75rem'
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Paper>
            
            {message.sender === 'user' && (
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 36,
                  height: 36,
                  mt: 0.5,
                }}
              >
                <Person fontSize="small" />
              </Avatar>
            )}
          </Box>
        </Fade>
      ))}
      
      {isTyping && (
        <Fade in timeout={300}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 1,
              mb: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 36,
                height: 36,
                mt: 0.5,
              }}
            >
              <SmartToy fontSize="small" />
            </Avatar>
            
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0s',
                    '@keyframes bounce': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.2s',
                    '@keyframes bounce': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.4s',
                    '@keyframes bounce': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </Fade>
      )}
      
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default MessageList;