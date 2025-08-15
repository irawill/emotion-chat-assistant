// API 服务
export interface ApiMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface StreamCallback {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export class ChatApiService {
  private apiUrl = 'https://my-first-workers.jichengme.workers.dev/chat';
  private apiKey: string | null = null;
  private abortController: AbortController | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    // 保存到 localStorage
    if (key) {
      localStorage.setItem('openai_api_key', key);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  // 取消当前请求
  cancelRequest() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // 非流式请求
  async sendMessage(messages: ApiMessage[]): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('请先设置 OpenAI API Key');
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // 处理响应数据
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else if (data.content) {
        // 兼容不同的响应格式
        return data.content;
      } else if (typeof data === 'string') {
        return data;
      } else {
        throw new Error('无效的API响应格式');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('网络请求失败，请检查网络连接');
    }
  }

  // 流式输出请求
  async sendMessageStream(messages: ApiMessage[], callbacks: StreamCallback): Promise<void> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      callbacks.onError(new Error('请先设置 OpenAI API Key'));
      return;
    }

    // 创建新的 AbortController
    this.abortController = new AbortController();

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages,
          stream: true
        }),
        signal: this.abortController.signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应流');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          callbacks.onComplete();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            
            if (data === '[DONE]') {
              callbacks.onComplete();
              return;
            }
            
            try {
              const json = JSON.parse(data);
              
              // 处理不同的流式响应格式
              let content = '';
              
              if (json.choices?.[0]?.delta?.content) {
                content = json.choices[0].delta.content;
              } else if (json.delta?.content) {
                content = json.delta.content;
              } else if (json.content) {
                content = json.content;
              } else if (typeof json === 'string') {
                content = json;
              }
              
              if (content) {
                callbacks.onChunk(content);
              }
            } catch (e) {
              // 如果不是 JSON，尝试直接作为文本处理
              if (data && data !== '[DONE]') {
                callbacks.onChunk(data);
              }
            }
          } else if (line.trim() !== '') {
            // 处理非 SSE 格式的流式响应
            try {
              const json = JSON.parse(line);
              if (json.content) {
                callbacks.onChunk(json.content);
              }
            } catch {
              // 如果解析失败，可能是纯文本
              callbacks.onChunk(line);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('请求已取消');
          return;
        }
        callbacks.onError(error);
      } else {
        callbacks.onError(new Error('网络请求失败，请检查网络连接'));
      }
    } finally {
      this.abortController = null;
    }
  }
}

export const chatApiService = new ChatApiService();