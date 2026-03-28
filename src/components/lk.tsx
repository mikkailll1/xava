/**
 * Компонент Личного Кабинета (LK) и Корзины.
 * Позволяет пользователю просматривать свой профиль, историю заказов и управлять корзиной покупок.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X, 
  Globe, 
  Check, 
  Shield, 
  LayoutDashboard, 
  Users, 
  Trash2,
  Package,
  Star,
  ArrowRight,
  Minus
} from 'lucide-react';
import { UserProfile, Order, PaymentMethod, Designer, Product } from '../types';
import { GlassCard } from './elementy_interfeysa';

interface LkProps {
  t: any;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  designers: Designer[];
  products: Product[];
  onLogout: () => void;
  onAdminPanelClick: () => void;
}

export const Lk = ({ t, user, setUser, designers, products, onLogout, onAdminPanelClick }: LkProps) => {
  const [subScreen, setSubScreen] = React.useState<string | null>(null);

  const renderSubScreen = () => {
    switch (subScreen) {
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setSubScreen(null)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-2xl font-bold">{t.orders}</h2>
            </div>
            {user.orders.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40">{t.noOrders}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map(order => (
                  <div key={order.id} className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.orderId}</p>
                        <p className="font-mono text-sm">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.orderStatus}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                          order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                          order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'returned' ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/60'
                        }`}>
                          {t[order.status]}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                      {order.items.map((item, i) => (
                        <img key={i} src={item.images[0]} className="w-12 h-16 rounded-lg object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                      ))}
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-white/5">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.orderDate}</p>
                        <p className="text-sm">{order.date}</p>
                      </div>
                      <p className="text-lg font-bold">{order.total} {t.rub}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Заголовок профиля */}
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="relative w-24 h-24">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white/5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">{user.name}</h2>
                <p className="text-white/40 text-sm">{user.email}</p>
                <div className="flex justify-center mt-3">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-white uppercase font-bold tracking-widest">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Действия, специфичные для ролей */}
            <div className="space-y-3">
              {user.role === 'admin' && (
                <button 
                  onClick={onAdminPanelClick}
                  className="w-full bg-white/5 p-5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all duration-300 border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold">Панель управления</h4>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">Управление сайтом</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </button>
              )}
            </div>

            {/* Пункты меню */}
            <div className="space-y-2">
              <button onClick={() => setSubScreen('orders')} className="w-full bg-white/5 p-5 rounded-2xl flex items-center justify-between group border border-white/5">
                <div className="flex items-center gap-4">
                  <ShoppingBag size={20} className="text-white/40" />
                  <span className="text-sm font-bold">{t.orders}</span>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
              </button>

              <button className="w-full bg-white/5 p-5 rounded-2xl flex items-center justify-between group border border-white/5">
                <div className="flex items-center gap-4">
                  <Heart size={20} className="text-white/40" />
                  <span className="text-sm font-bold">{t.wishlist}</span>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
              </button>

              <button className="w-full bg-white/5 p-5 rounded-2xl flex items-center justify-between group border border-white/5">
                <div className="flex items-center gap-4">
                  <Settings size={20} className="text-white/40" />
                  <span className="text-sm font-bold">{t.settings}</span>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
              </button>
            </div>

            <button 
              onClick={onLogout}
              className="w-full py-5 text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-2xl transition-colors"
            >
              {t.logout}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="pb-32 pt-12 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={subScreen || 'main'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSubScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface CartProps {
  t: any;
  cart: { product: Product, size: string, quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ product: Product, size: string, quantity: number }[]>>;
  onBack: () => void;
  onCheckout: () => void;
}

export const Cart = ({ t, cart, setCart, onBack, onCheckout }: CartProps) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = 1500;
  const total = subtotal + shipping;

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-8 text-center space-y-6 bg-black">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/20">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{t.bagEmpty}</h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">Ваша корзина пуста. Исследуйте наши коллекции, чтобы найти что-то особенное.</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-white text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 group"
        >
          {t.explore}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-12 px-6 bg-black min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-3xl font-bold">{t.yourBag}</h2>
      </div>

      <div className="space-y-6 mb-12">
        <AnimatePresence mode="popLayout">
          {cart.map((item, i) => (
            <motion.div
              key={`${item.product.id}-${item.size}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white/5 p-4 rounded-3xl flex gap-6 relative group border border-white/5">
                <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold truncate w-40">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(i)}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Size: {item.size}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center bg-white/5 rounded-full p-1 gap-4">
                      <button 
                        onClick={() => updateQuantity(i, -1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(i, 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold">{item.product.price * item.quantity} {t.rub}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 p-6 rounded-3xl space-y-4 border border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-white/40">{t.subtotal}</span>
            <span className="font-medium">{subtotal} {t.rub}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/40">{t.shipping}</span>
            <span className="font-medium">{shipping} {t.rub}</span>
          </div>
          <div className="h-px bg-white/5 my-2" />
          <div className="flex justify-between text-xl font-bold">
            <span>{t.total}</span>
            <span className="text-white">{total} {t.rub}</span>
          </div>
        </div>

        <button 
          onClick={onCheckout}
          className="w-full py-5 rounded-full text-lg font-bold shadow-2xl bg-white text-black flex items-center justify-center gap-3 group"
        >
          {t.checkout}
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
