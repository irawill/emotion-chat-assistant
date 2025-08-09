import React from 'react';
import { Box, Typography, Avatar, Fade, CircularProgress } from '@mui/material';
import {
  SmartToy as AssistantIcon,
  Person as UserIcon
} from '@mui/icons-material';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

function MessageList({ messages, isTyping }: MessageListProps) {
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#555'
          }
        }
      }}
    >
      {messages.map((message, index) => (
        <Fade in key={message.id} timeout={500}>
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'flex-start',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <Avatar
              sx={{
                bgcolor: message.sender === 'user' ? '#667eea' : '#764ba2',
                width: 36,
                height: 36
              }}
            >
              {message.sender === 'user' ? <UserIcon /> : <AssistantIcon />}
            </Avatar>
            <Box
              sx={{
                maxWidth: '70%',
                backgroundColor: message.sender === 'user' ? '#667eea' : '#f5f5f5',
                color: message.sender === 'user' ? 'white' : 'text.primary',
                borderRadius: 2,
                p: 1.5,
                boxShadow: 1,
                position: 'relative',
                '&::before': message.sender === 'user' ? {
                  content: '""',
                  position: 'absolute',
                  right: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '8px 0 8px 8px',
                  borderColor: 'transparent transparent transparent #667eea'
                } : {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '8px 8px 8px 0',
                  borderColor: 'transparent #f5f5f5 transparent transparent'
                }
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.5,
                  opacity: 0.7,
                  fontSize: '0.75rem'
                }}
              >
                {message.timestamp.toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Box>
          </Box>
        </Fade>
      ))}
      
      {isTyping && (
        <Fade in timeout={300}>
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'center'
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#764ba2',
                width: 36,
                height: 36
              }}
            >
              <AssistantIcon />
            </Avatar>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CircularProgress size={16} thickness={2} />
              <Typography variant="body2" color="text.secondary">
                正在输入...
              </Typography>
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default MessageList;