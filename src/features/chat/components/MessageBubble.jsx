import React from 'react';

export default function MessageBubble({ message, isOwnMessage }) {
  const text = message.body ?? message.Body ?? message.textContent ?? message.TextContent ?? message.text ?? message.Text ?? message.content ?? '';
  const timestamp = message.sentAt ?? message.SentAt ?? message.createdAt ?? message.CreatedAt ?? message.timestamp ?? new Date().toISOString();
  
  // Format the time
  let timeStr = '';
  try {
    timeStr = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    timeStr = '';
  }

  // Handle file attachments if any
  const attachmentUrl = message.fileUrl ?? message.FileUrl ?? message.attachmentUrl ?? message.AttachmentUrl;
  const fileName = message.fileName ?? message.FileName;

  return (
    <div className={`message-wrapper ${isOwnMessage ? 'message-own' : 'message-other'}`} style={{ display: 'flex', flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
      <div 
        className={`message-bubble ${isOwnMessage ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-800'}`}
        style={{
          padding: '10px 14px',
          borderRadius: '16px',
          borderBottomRightRadius: isOwnMessage ? '4px' : '16px',
          borderBottomLeftRadius: !isOwnMessage ? '4px' : '16px',
          maxWidth: '75%',
          wordBreak: 'break-word',
          background: isOwnMessage ? '#d4af37' : '#f3f4f6', // Gold background for own
          color: isOwnMessage ? '#fff' : '#1f2937'
        }}
      >
        {text && <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>{text}</p>}
        
        {attachmentUrl && (
          <a 
            href={attachmentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: text ? '8px' : '0', padding: '6px 10px',
              background: isOwnMessage ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
              borderRadius: '8px', color: 'inherit', textDecoration: 'none',
              fontSize: '0.85rem'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            {fileName || 'Attachment'}
          </a>
        )}
      </div>
      <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px', padding: '0 4px' }}>
        {timeStr}
      </span>
    </div>
  );
}
