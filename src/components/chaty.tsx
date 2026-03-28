/**
 * Компонент Чатов (Chaty).
 * Обеспечивает интерфейс для обмена сообщениями между пользователем и дизайнерами или поддержкой.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, MessageCircle, ChevronLeft, MoreHorizontal, Send } from 'lucide-react';
import { UserProfile, Designer } from '../types';
import { GlassCard } from './elementy_interfeysa';

interface ChatyProps {
  t: any;
  user: UserProfile;
  designers: Designer[];
  onBack?: () => void;
}

export const Chaty = ({ t, user, designers, onBack }: ChatyProps) => {
  const [activeChat, setActiveChat] = React.useState<number | null>(null);

  // Список чатов (заглушка)
  const chats = [
    { id: 1, name: 'Елена Вэнс', lastMessage: 'Ваш заказ отправлен!', time: '12:45', avatar: 'https://picsum.photos/seed/elena/200/200', unread: 1 },
    { id: 2, name: 'Поддержка Xava', lastMessage: 'Как мы можем вам помочь?', time: 'Вчера', avatar: 'https://picsum.photos/seed/support/200/200', unread: 0 },
    { id: 3, name: 'Сора Ким', lastMessage: 'Новая коллекция уже в продаже', time: 'Пн', avatar: 'https://picsum.photos/seed/sora/200/200', unread: 0 },
  ];

  // Если открыт конкретный чат
  if (activeChat !== null) {
    const chat = chats.find(c => c.id === activeChat);
    return (
      <div className="h-screen flex flex-col pt-12 pb-32">
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveChat(null)} className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <img src={chat?.avatar} alt={chat?.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div>
                <h3 className="font-bold text-sm">{chat?.name}</h3>
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">В сети</p>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6 hide-scrollbar">
          <div className="flex justify-center">
            <span className="glass px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/40">Сегодня</span>
          </div>
          
          <div className="flex justify-start">
            <div className="glass p-4 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-sm leading-relaxed">{chat?.lastMessage}</p>
              <p className="text-[10px] text-white/40 mt-2 text-right">{chat?.time}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-white/90 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
              <p className="text-sm leading-relaxed text-black">Спасибо! Жду с нетерпением.</p>
              <p className="text-[10px] text-black/40 mt-2 text-right">12:47</p>
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          <div className="glass p-2 rounded-full flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Напишите сообщение..." 
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm placeholder:text-white/20"
            />
            <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Список всех чатов
  return (
    <div className="pb-32 pt-12 px-4">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
          )}
          <h2 className="text-3xl font-semibold">Чаты</h2>
        </div>
        <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>

      <div className="space-y-4 px-2">
        {chats.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveChat(chat.id)}
          >
            <GlassCard className="p-4 cursor-pointer hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold text-black">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{chat.time}</span>
                  </div>
                  <p className="text-xs text-white/60 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
