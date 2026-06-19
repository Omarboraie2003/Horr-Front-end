import React, { useState, useRef } from 'react';
import { Paperclip, Send, Loader2 } from 'lucide-react';
import { sendTextMessage, sendFileMessage } from '../../../services/chatService';
import { toast } from 'sonner';

export default function MessageInput({ chatId, onMessageSent }) {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);

  const handleSendText = async () => {
    if (!text.trim() || isSending) return;
    setIsSending(true);
    try {
      const msg = await sendTextMessage(chatId, text.trim());
      onMessageSent(msg);
      setText('');
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSending(true);
    try {
      const msg = await sendFileMessage(chatId, file);
      onMessageSent(msg);
    } catch (err) {
      toast.error('Failed to send file');
      console.error(err);
    } finally {
      setIsSending(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="chat-input-container p-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-300 p-1 pr-2 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400 transition-all">
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        
        <button 
          className="p-2 text-gray-500 hover:text-amber-600 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none outline-none px-2 text-gray-800 text-sm placeholder-gray-400 focus:ring-0"
          disabled={isSending}
        />

        <button 
          onClick={handleSendText}
          disabled={!text.trim() || isSending}
          className={`p-2 rounded-full flex items-center justify-center transition-colors ${
            text.trim() && !isSending 
              ? 'bg-amber-500 text-white hover:bg-amber-600' 
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} style={{ marginLeft: '2px' }} />}
        </button>
      </div>
    </div>
  );
}
