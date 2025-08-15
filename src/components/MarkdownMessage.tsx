import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

function MarkdownMessage({ content, isUser = false }: MarkdownMessageProps) {
  return (
    <Box
      sx={{
        '& p': {
          margin: '0.5em 0',
          lineHeight: 1.6,
          '&:first-of-type': {
            marginTop: 0
          },
          '&:last-child': {
            marginBottom: 0
          }
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          marginTop: '1em',
          marginBottom: '0.5em',
          fontWeight: 600,
          lineHeight: 1.3
        },
        '& h1': { fontSize: '1.5em' },
        '& h2': { fontSize: '1.3em' },
        '& h3': { fontSize: '1.1em' },
        '& ul, & ol': {
          marginLeft: '1.5em',
          marginTop: '0.5em',
          marginBottom: '0.5em'
        },
        '& li': {
          marginTop: '0.25em',
          lineHeight: 1.6
        },
        '& code': {
          backgroundColor: isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
          padding: '0.2em 0.4em',
          borderRadius: '4px',
          fontSize: '0.9em',
          fontFamily: '"Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", monospace'
        },
        '& pre': {
          margin: '0.5em 0',
          borderRadius: '8px',
          overflow: 'auto',
          backgroundColor: isUser ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
          padding: '1em',
          '& code': {
            backgroundColor: 'transparent',
            padding: 0,
            fontSize: '0.9em'
          }
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderLeftColor: isUser ? 'rgba(255, 255, 255, 0.4)' : '#667eea',
          paddingLeft: '1em',
          marginLeft: 0,
          marginTop: '0.5em',
          marginBottom: '0.5em',
          fontStyle: 'italic',
          opacity: 0.9
        },
        '& table': {
          borderCollapse: 'collapse',
          width: '100%',
          marginTop: '0.5em',
          marginBottom: '0.5em'
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: isUser ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
          padding: '0.5em',
          textAlign: 'left'
        },
        '& th': {
          backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          fontWeight: 600
        },
        '& a': {
          color: isUser ? '#90caf9' : '#667eea',
          textDecoration: 'none',
          borderBottom: '1px solid transparent',
          transition: 'border-color 0.2s',
          '&:hover': {
            borderBottomColor: isUser ? '#90caf9' : '#667eea'
          }
        },
        '& hr': {
          border: 'none',
          borderTop: '1px solid',
          borderTopColor: isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          marginTop: '1em',
          marginBottom: '1em'
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          marginTop: '0.5em',
          marginBottom: '0.5em',
          display: 'block'
        },
        '& strong': {
          fontWeight: 600
        },
        '& em': {
          fontStyle: 'italic'
        },
        '& del': {
          textDecoration: 'line-through',
          opacity: 0.7
        },
        '& input[type="checkbox"]': {
          marginRight: '0.5em'
        }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义代码块渲染
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // 内联代码
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            // 代码块
            return (
              <pre className={className} {...props}>
                <code>
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            );
          },
          // 自定义链接渲染，添加安全属性
          a({ node, children, ...props }: any) {
            return (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}

export default MarkdownMessage;