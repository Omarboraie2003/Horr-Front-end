import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Loader2 } from 'lucide-react';
import { getMessages } from '../../../services/chatService';
import useChatConnection from '../../../hooks/useChatConnection';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow({ chatId, chatList, initialActiveChat }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user?.id || user?.userId || user?.Id;

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const scrollRef = useRef(null);

  // Find metadata for header
  const chatMetadata = initialActiveChat ?? chatList?.find(c => {
    const cid = c.chatId ?? c.id ?? c.ChatId ?? c.Id;
    return String(cid) === String(chatId);
  });
  
  const contractId = chatMetadata?.contractId ?? chatMetadata?.ContractId;
  const contractTitle = chatMetadata?.contractTitle ?? chatMetadata?.ContractTitle ?? chatMetadata?.title ?? chatMetadata?.Title ?? (contractId ? `Contract #${contractId}` : 'Chat');
  const freelancerName = chatMetadata?.otherPartyName ?? chatMetadata?.OtherPartyName ?? chatMetadata?.freelancerName ?? chatMetadata?.FreelancerName ?? 'Freelancer';

  // Initial Load
  useEffect(() => {
    let active = true;
    const fetchInitial = async () => {
      if (!chatId) return;
      setIsInitialLoading(true);
      try {
        const result = await getMessages(chatId, 1, 30);
        if (!active) return;
        const items = Array.isArray(result) ? result : (result?.items ?? result?.data ?? []);
        setMessages([...items].reverse());
        setHasMore(items.length === 30);
        setPage(1);
      } catch (err) {
        console.error('Failed to load messages', err);
      } finally {
        if (active) setIsInitialLoading(false);
      }
    };
    fetchInitial();
    return () => { active = false; };
  }, [chatId]);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!isInitialLoading && page === 1 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isInitialLoading, page, chatId]);

  // Fetch more when scrolling to top
  const handleScroll = async () => {
    if (!scrollRef.current || !hasMore || isFetchingMore || isInitialLoading) return;
    
    // Within 50px of top
    if (scrollRef.current.scrollTop <= 50) {
      setIsFetchingMore(true);
      const prevScrollHeight = scrollRef.current.scrollHeight;
      
      try {
        const nextPage = page + 1;
        const result = await getMessages(chatId, nextPage, 30);
        const newItems = Array.isArray(result) ? result : (result?.items ?? result?.data ?? []);
        
        if (newItems.length > 0) {
          setMessages(prev => [...[...newItems].reverse(), ...prev]);
          setPage(nextPage);
          setHasMore(newItems.length === 30);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Failed to fetch more messages', err);
      } finally {
        setIsFetchingMore(false);
        // Restore scroll position
        if (scrollRef.current) {
          const newScrollHeight = scrollRef.current.scrollHeight;
          scrollRef.current.scrollTop = newScrollHeight - prevScrollHeight;
        }
      }
    }
  };

  // SignalR Connection
  const onMessageReceived = useCallback((newMessage) => {
    setMessages(prev => {
      const msgId = newMessage.id ?? newMessage.Id;
      // Append only if the message ID doesn't already exist
      if (prev.some(m => (m.id ?? m.Id) === msgId)) return prev;
      return [...prev, newMessage];
    });
    // Auto-scroll to bottom for new message
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  }, []);

  useChatConnection(chatId, onMessageReceived);

  // Handle local send
  const handleLocalSend = (newMessage) => {
    setMessages(prev => {
      const msgId = newMessage.id ?? newMessage.Id;
      if (prev.some(m => (m.id ?? m.Id) === msgId)) return prev;
      return [...prev, newMessage];
    });
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
        <MessageSquare size={48} className="mb-4 opacity-20" />
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-window flex-1 flex flex-col bg-gray-50 h-full overflow-hidden relative">
      {/* Header */}
      <div className="chat-header bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{freelancerName}</h2>
          <p className="text-xs text-amber-600 font-medium">{contractTitle}</p>
        </div>
        {contractId && (
          <button 
            onClick={() => navigate(`/client/contracts/${contractId}/deliveries`)}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Package size={14} /> Delivery Portal
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6"
      >
        {isFetchingMore && (
          <div className="flex justify-center py-2">
            <Loader2 className="animate-spin text-amber-500" size={20} />
          </div>
        )}

        {isInitialLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-amber-500" size={32} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            No messages yet. Send a message to start the conversation!
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg, idx) => {
              const msgId = msg.id ?? msg.Id ?? idx;
              const senderId = String(msg.senderId ?? msg.SenderId);
              const isOwnMessage = senderId === String(currentUserId);
              return (
                <MessageBubble 
                  key={msgId} 
                  message={msg} 
                  isOwnMessage={isOwnMessage} 
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Input Area */}
      <MessageInput chatId={chatId} onMessageSent={handleLocalSend} />
    </div>
  );
}

// Ensure MessageSquare is imported for the empty state
import { MessageSquare } from 'lucide-react';
