import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Box,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Visibility,
  VisibilityOff,
  Key as KeyIcon
} from '@mui/icons-material';
import { chatApiService } from '../services/api';

interface ApiKeySettingsProps {
  onApiKeyChange?: (hasKey: boolean) => void;
}

function ApiKeySettings({ onApiKeyChange }: ApiKeySettingsProps) {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    const storedKey = chatApiService.getApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      setHasStoredKey(true);
      onApiKeyChange?.(true);
    }
  }, [onApiKeyChange]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowApiKey(false);
  };

  const handleSave = () => {
    if (apiKey.trim()) {
      chatApiService.setApiKey(apiKey.trim());
      setHasStoredKey(true);
      onApiKeyChange?.(true);
      handleClose();
    }
  };

  const handleClear = () => {
    setApiKey('');
    chatApiService.setApiKey('');
    setHasStoredKey(false);
    onApiKeyChange?.(false);
  };

  return (
    <>
      <Tooltip title={hasStoredKey ? 'API Key 已设置' : '设置 API Key'}>
        <IconButton
          onClick={handleOpen}
          sx={{
            color: hasStoredKey ? '#4caf50' : 'white',
            backgroundColor: hasStoredKey ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
          }}
          size="small"
        >
          {hasStoredKey ? <KeyIcon /> : <SettingsIcon />}
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SettingsIcon />
            <Typography variant="h6">API 设置</Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              请输入您的 OpenAI API Key 以启用智能对话功能。
              API Key 将安全地保存在您的浏览器本地存储中。
            </Alert>
            
            <TextField
              fullWidth
              label="OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={showApiKey ? 'text' : 'password'}
              placeholder="sk-..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowApiKey(!showApiKey)}
                      edge="end"
                    >
                      {showApiKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              helperText="API Key 格式通常以 'sk-' 开头"
            />
          </Box>

          {hasStoredKey && (
            <Alert severity="success" sx={{ mt: 2 }}>
              API Key 已保存。您可以更新或清除它。
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          {hasStoredKey && (
            <Button onClick={handleClear} color="error">
              清除 API Key
            </Button>
          )}
          <Button onClick={handleClose}>取消</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            disabled={!apiKey.trim()}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ApiKeySettings;