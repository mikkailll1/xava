/**
 * Компонент Списка Дизайнеров (DizaynerProfili).
 * Отображает список всех доступных дизайнеров с краткой информацией о каждом.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, ChevronLeft, ArrowRight } from 'lucide-react';
import { Designer } from '../types';
import { GlassCard } from './elementy_interfeysa';

interface DizaynerProfiliProps {
  t: any;
  designers: Designer[];
  onDesignerClick: (d: Designer) => void;
  onBack?: () => void;
}

export const DizaynerProfili = ({ t, designers, onDesignerClick, onBack }: DizaynerProfiliProps) => {
  return (
    <div className="pb-32 pt-12 px-4">
      <div className="flex items-center gap-4 mb-8 px-2">
        {onBack && (
          <button onClick={onBack} className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
        )}
        <h2 className="text-3xl font-semibold">{t.designers}</h2>
      </div>

      <div className="space-y-6 px-2">
        {designers.map((designer, i) => (
          <motion.div
            key={designer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onDesignerClick(designer)}
          >
            <GlassCard className="p-6 group cursor-pointer hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img 
                    src={designer.avatar} 
                    alt={designer.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Код страны дизайнера */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold text-black">
                    {designer.country.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{designer.brandName}</h3>
                  <p className="text-sm text-white/40 mb-3">{designer.name}</p>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/60">
                    <span>{designer.followers.toLocaleString()} {t.followers}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>{designer.country}</span>
                  </div>
                </div>
                <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
