import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChats } from '../../services/chatService';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';

import '../../styles/chat-styles.css';

export default function MessagesPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchChats = async () => {
      setLoading(true);
      try {
        const result = await getChats();
        if (!active) return;
        const chats = Array.isArray(result) ? result : (result?.items ?? result?.data ?? []);
        setChatList(chats);
        
        // Auto-redirect to first chat if no chatId is provided
        if (!chatId && chats.length > 0) {
          const firstChatId = chats[0].chatId ?? chats[0].id ?? chats[0].ChatId ?? chats[0].Id;
          if (firstChatId) {
            navigate(`/client/messages/${firstChatId}`, { replace: true });
          }
        }
      } catch (err) {
        console.error('Failed to load chat list', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchChats();
    return () => { active = false; };
  }, [chatId, navigate]);

  return (
    <div className="main-container max-w-[1200px] !px-4 !py-4" style={{ height: 'calc(100vh - 70px)' }}>
      <div className="chat-container h-full w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
        {loading ? (
          <div className="flex w-full h-full items-center justify-center bg-gray-50 text-gray-500">
            Loading conversations...
          </div>
        ) : (
          <>
            <ChatSidebar chats={chatList} />
            <ChatWindow chatId={chatId} chatList={chatList} />
          </>
        )}
      </div>
    </div>
  );
}
