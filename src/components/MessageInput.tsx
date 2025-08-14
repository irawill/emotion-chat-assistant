import React, { KeyboardEvent } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Send as SendIcon,
  Mood as MoodIcon,
  AttachFile as AttachIcon,
  Mic as MicIcon
} from '@mui/icons-material';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

function MessageInput({ 
  value, 
  onChange, 
  onSend, 
  disabled,
  placeholder = "输入你想说的话..."
}: MessageInputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: '#fafafa',
            '&:hover fieldset': {
              borderColor: '#667eea'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#764ba2'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="添加表情">
                <IconButton size="small" disabled={disabled}>
                  <MoodIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="附件">
                <IconButton size="small" disabled={disabled}>
                  <AttachIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="语音输入">
                <IconButton size="small" disabled={disabled}>
                  <MicIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
      <Tooltip title="发送消息">
        <IconButton
          onClick={onSend}
          disabled={disabled || !value.trim()}
          sx={{
            backgroundColor: '#667eea',
            color: 'white',
            '&:hover': {
              backgroundColor: '#764ba2'
            },
            '&.Mui-disabled': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default MessageInput;