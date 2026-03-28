/**
 * Компонент Панели Настроек (PanelNactroyki).
 * Представляет собой административную панель для управления дизайнерами, товарами и просмотра статистики.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Users, 
  Package, 
  Trash2, 
  Plus, 
  TrendingUp, 
  ShoppingBag, 
  AlertCircle,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { Designer, Product } from '../types';
import { GlassCard } from './elementy_interfeysa';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';

interface PanelNactroykiProps {
  t: any;
  designers: Designer[];
  products: Product[];
  onBack: () => void;
}

export const PanelNactroyki = ({ t, designers, products, onBack }: PanelNactroykiProps) => {
  const [activeTab, setActiveTab] = React.useState<'designers' | 'products' | 'stats'>('stats');
  const [confirmModal, setConfirmModal] = React.useState<{
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', onConfirm: () => {} });

  // Удаление дизайнера и всех его товаров
  const deleteDesigner = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Вы уверены, что хотите удалить этого дизайнера? Все его товары также будут удалены.',
      onConfirm: async () => {
        try {
          // Delete designer
          await deleteDoc(doc(db, 'designers', id));
          
          // Delete associated products
          const designerProducts = products.filter(p => p.designerId === id);
          for (const p of designerProducts) {
            await deleteDoc(doc(db, 'products', p.id));
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.DELETE, `designers/${id}`);
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Удаление конкретного товара
  const deleteProduct = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Удалить этот товар?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'products', id));
        } catch (e) {
          handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Добавление нового дизайнера (через prompt для простоты)
  const addDesigner = async () => {
    const name = prompt('Имя дизайнера:');
    const brand = prompt('Название бренда:');
    if (name && brand) {
      const id = `d${Date.now()}`;
      const newDesigner: Designer = {
        id,
        name,
        brandName: brand,
        avatar: `https://picsum.photos/seed/${brand}/200/200`,
        cover: `https://picsum.photos/seed/${brand}cover/800/400`,
        bio: 'Новый дизайнер на платформе Xava.',
        philosophy: 'Простота и стиль.',
        country: 'Россия',
        followers: 0
      };
      
      try {
        await setDoc(doc(db, 'designers', id), newDesigner);
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `designers/${id}`);
      }
    }
  };

  return (
    <div className="pb-32 pt-12 px-4">
      <div className="flex items-center gap-4 mb-8 px-2">
        <button onClick={onBack} className="w-10 h-10 glass rounded-full flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-3xl font-semibold">Админ-панель</h2>
      </div>

      {/* Вкладки навигации */}
      <div className="flex gap-2 mb-8 px-2">
        {[
          { id: 'stats', label: 'Статистика', icon: TrendingUp },
          { id: 'designers', label: 'Дизайнеры', icon: Users },
          { id: 'products', label: 'Товары', icon: Package },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
              activeTab === tab.id ? 'bg-white text-black' : 'glass text-white/40'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-2">
        {/* Вкладка статистики */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Всего продаж</p>
                <p className="text-3xl font-bold">1.2M {t.rub}</p>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Пользователи</p>
                <p className="text-3xl font-bold">4,567</p>
              </GlassCard>
            </div>
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Активность сайта</h3>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <div className="h-32 flex items-end gap-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent/20 rounded-t-lg relative group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-lg"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Вкладка управления дизайнерами */}
        {activeTab === 'designers' && (
          <div className="space-y-4">
            <button 
              onClick={addDesigner}
              className="w-full py-4 glass border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/30 transition-all"
            >
              <Plus size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">Добавить дизайнера</span>
            </button>
            {designers.map((designer) => (
              <GlassCard key={designer.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={designer.avatar} alt={designer.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-sm">{designer.brandName}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{designer.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteDesigner(designer.id)}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-400 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Вкладка управления товарами */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="glass p-2 rounded-full flex items-center gap-2 mb-4">
              <Search size={18} className="ml-3 text-white/20" />
              <input type="text" placeholder="Поиск товаров..." className="flex-1 bg-transparent px-2 py-2 outline-none text-sm" />
            </div>
            {products.map((product) => (
              <GlassCard key={product.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={product.images[0]} alt={product.name} className="w-12 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-sm truncate w-40">{product.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      {designers.find(d => d.id === product.designerId)?.brandName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold mr-2">{product.price} {t.rub}</p>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-red-400 hover:bg-red-400 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xs bg-[#1a1a1a] border border-white/10 rounded-[32px] p-8 space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                <AlertCircle size={32} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold">Подтверждение</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {confirmModal.title}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmModal.onConfirm}
                  className="w-full py-4 bg-red-500 text-white rounded-full font-bold active:scale-95 transition-all"
                >
                  Удалить
                </button>
                <button
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full py-4 glass rounded-full font-bold active:scale-95 transition-all"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
