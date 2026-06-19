import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function ChatSidebar({ chats }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats?.filter(chat => {
    const contractId = chat.contractId ?? chat.ContractId;
    const title = chat.contractTitle ?? chat.ContractTitle ?? chat.title ?? chat.Title ?? (contractId ? `Contract #${contractId}` : 'Unknown Chat');
    const name = chat.otherPartyName ?? chat.OtherPartyName ?? chat.freelancerName ?? chat.FreelancerName ?? 'Unknown';
    const searchStr = searchTerm.toLowerCase();
    return title.toLowerCase().includes(searchStr) || name.toLowerCase().includes(searchStr);
  }) || [];

  return (
    <div className="chat-sidebar bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden w-full max-w-sm sm:max-w-xs md:max-w-sm lg:w-[350px]">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            No conversations found.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredChats.map(chat => {
              const chatId = chat.chatId ?? chat.id ?? chat.ChatId ?? chat.Id;
              const contractId = chat.contractId ?? chat.ContractId;
              const title = chat.contractTitle ?? chat.ContractTitle ?? chat.title ?? chat.Title ?? (contractId ? `Contract #${contractId}` : 'Unknown Chat');
              const name = chat.otherPartyName ?? chat.OtherPartyName ?? chat.freelancerName ?? chat.FreelancerName ?? 'Unknown';
              const unreadCount = chat.unreadCount ?? chat.UnreadCount ?? 0;
              const lastMsg = chat.lastMessagePreview ?? chat.LastMessagePreview ?? chat.lastMessage ?? chat.LastMessage ?? '';
              
              return (
                <li key={chatId}>
                  <NavLink
                    to={`/client/messages/${chatId}`}
                    className={({ isActive }) => 
                      `block p-4 hover:bg-gray-50 transition-colors ${isActive ? 'bg-amber-50/50 relative' : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm truncate pr-2">{name}</h3>
                          {unreadCount > 0 && (
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center flex-shrink-0">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-amber-700 truncate mb-1">
                          {title}
                        </p>
                        {lastMsg && (
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {lastMsg}
                          </p>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
