/**
 * Компонент Профиля Дизайнера (ProfilDizaynera).
 * Отображает детальную информацию о дизайнере, его коллекциях и товарах.
 * Позволяет подписываться на дизайнера.
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Heart, MoreHorizontal, ShoppingBag } from 'lucide-react';
import { Designer, Product, Collection, UserProfile } from '../types';
import { GlassCard } from './elementy_interfeysa';

interface ProfilDizayneraProps {
  t: any;
  designer: Designer;
  products: Product[];
  collections: Collection[];
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onBack: () => void;
  onProductClick: (p: Product) => void;
}

export const ProfilDizaynera = ({ t, designer, products, collections, user, setUser, onBack, onProductClick }: ProfilDizayneraProps) => {
  const designerProducts = products.filter(p => p.designerId === designer.id);
  const designerCollections = collections.filter(c => c.designerId === designer.id);
  const isSubscribed = user.subscribedDesigners.includes(designer.id);

  // Обработка подписки/отписки
  const onSubscribe = () => {
    setUser(prev => ({
      ...prev,
      subscribedDesigners: isSubscribed 
        ? prev.subscribedDesigners.filter(id => id !== designer.id) 
        : [...prev.subscribedDesigners, designer.id]
    }));
  };

  return (
    <div className="pb-32">
      {/* Шапка профиля с обложкой */}
      <div className="relative h-[400px]">
        <img 
          src={designer.cover} 
          alt={designer.brandName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        
        <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-10">
          <button onClick={onBack} className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="flex items-end gap-6 mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden shadow-2xl">
              <img 
                src={designer.avatar} 
                alt={designer.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-bold tracking-tight mb-1">{designer.brandName}</h1>
              <p className="text-white/60 text-sm">{designer.name}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={onSubscribe}
              className={`flex-1 apple-button py-4 text-sm font-semibold transition-all duration-500 ${
                isSubscribed ? 'glass text-white' : 'bg-white text-black'
              }`}
            >
              {isSubscribed ? t.subscribed : t.follow}
            </button>
            <button className="w-14 h-14 glass rounded-full flex items-center justify-center">
              <Heart size={24} className={isSubscribed ? 'fill-accent text-accent' : ''} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-10 space-y-12">
        {/* Философия дизайнера */}
        <section>
          <h2 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">{t.philosophy}</h2>
          <p className="text-xl font-light leading-relaxed italic text-white/90">
            "{designer.philosophy}"
          </p>
        </section>

        {/* О дизайнере */}
        <section>
          <h2 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">{t.about}</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            {designer.bio}
          </p>
        </section>

        {/* Коллекции */}
        {designerCollections.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-semibold">{t.collection}</h2>
              <button className="text-sm text-white/40 hover:text-white transition-colors">{t.viewAll}</button>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
              {designerCollections.map((collection) => (
                <div key={collection.id} className="flex-shrink-0 w-72">
                  <GlassCard>
                    <div className="relative aspect-[4/5]">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">
                          {collection.season} {collection.year}
                        </p>
                        <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Товары дизайнера */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-semibold">Товары</h2>
            <p className="text-sm text-white/40">{designerProducts.length} позиций</p>
          </div>
          <div className="masonry-grid">
            {designerProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="masonry-item mb-6"
                onClick={() => onProductClick(product)}
              >
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xl font-script text-white/90 tracking-wide">
                      {product.modelName}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
