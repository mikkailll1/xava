/**
 * Компонент Ленты (Lenta) и Деталей Продукта (ProductDetail).
 * Отображает ленту товаров с персональными рекомендациями и подробную информацию о выбранном товаре.
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShoppingBag, 
  Plus, 
  ChevronLeft, 
  Share2, 
  Check, 
  Star, 
  MessageCircle,
  Send,
  ArrowRight
} from 'lucide-react';
import { Product, Designer, Review } from '../types';

interface LentaProps {
  t: any;
  products: Product[];
  designers: Designer[];
  user: any;
  onProductClick: (p: Product) => void;
  onDesignerClick: (d: Designer) => void;
}

export const Lenta = ({ t, products, designers, user, onProductClick, onDesignerClick }: LentaProps) => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'following'>('all');

  const allDisplayProducts = activeTab === 'all' 
    ? products
    : products.filter(p => user.subscribedDesigners.includes(p.designerId));

  return (
    <div className="pb-32 pt-4 bg-black min-h-screen">
      <div className="flex justify-between items-center px-4 mb-6">
        <div className="relative flex flex-col items-center">
          <button 
            onClick={() => setActiveTab('all')}
            className={`text-white text-base font-bold pb-2 px-2 transition-opacity ${activeTab === 'all' ? 'opacity-100' : 'opacity-40'}`}
          >
            Все
          </button>
          {activeTab === 'all' && <div className="absolute bottom-0 w-8 h-1 bg-white rounded-full" />}
        </div>
        <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
          <Plus size={20} className="text-white" />
        </button>
      </div>

      <div className="masonry-grid px-3">
        {allDisplayProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="masonry-item"
            onClick={() => onProductClick(product)}
          >
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[24px]">
                {product.category === 'Цитата' ? (
                  <div className="bg-white p-6 aspect-square flex items-center justify-center text-center">
                    <p className="text-black text-sm font-medium leading-relaxed italic font-serif">
                      "{product.description}"
                    </p>
                  </div>
                ) : (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
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
    </div>
  );
};

interface ProductDetailProps {
  t: any;
  product: Product;
  designer: Designer;
  allProducts: Product[];
  onBack: () => void;
  onAddToBag: (p: Product, size: string) => void;
  onProductClick: (p: Product) => void;
  onWriteToDesigner: (designerId: string) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  user: any;
}

export const ProductDetail = ({ 
  t, 
  product, 
  designer, 
  allProducts, 
  onBack, 
  onAddToBag, 
  onProductClick,
  onWriteToDesigner,
  addReview,
  user
}: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const averageRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / product.reviews.length).toFixed(1);
  }, [product.reviews]);

  const similarProducts = useMemo(() => {
    return allProducts
      .filter(p => p.id !== product.id && (p.designerId === product.designerId || p.category === product.category))
      .slice(0, 6);
  }, [allProducts, product]);

  const handleAdd = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert(t.selectSize || 'Выберите размер');
      return;
    }
    onAddToBag(product, selectedSize || 'One Size');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleSubmitReview = () => {
    if (!newComment.trim()) return;
    addReview(product.id, {
      userId: user.id,
      userName: user.name,
      rating: newRating,
      comment: newComment
    });
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="pb-32 min-h-screen bg-black text-white overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white">
            <Share2 size={20} />
          </button>
          <button className="pinterest-save-btn">
            Сохранить
          </button>
        </div>
      </div>

      {/* Main Photo */}
      <div className="w-full relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-8">
        {/* Title & Price */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-white/90">{product.price.toLocaleString()} {t.rub || '₽'}</p>
            {averageRating !== 0 && (
              <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                <Star size={14} className="fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-bold">{averageRating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 leading-relaxed font-light">
          {product.description}
        </p>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white/40">Выберите размер</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all border ${
                    selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Designer Profile */}
        <div className="glass p-5 rounded-[24px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={designer.avatar} className="w-14 h-14 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
            <div>
              <h4 className="font-bold text-base">{designer.name}</h4>
              <p className="text-xs text-white/40">{designer.brandName}</p>
            </div>
          </div>
          <button 
            onClick={() => onWriteToDesigner(designer.id)}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <MessageCircle size={20} />
          </button>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAdd}
          disabled={isAdded}
          className={`w-full py-5 rounded-full text-lg font-bold transition-all duration-500 flex items-center justify-center gap-3 ${
            isAdded ? 'bg-emerald-500 text-white' : 'bg-white text-black'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={24} />
              {t.addedToBag || 'Добавлено'}
            </>
          ) : (
            <>
              <ShoppingBag size={24} />
              {t.addToBag || 'В корзину'}
            </>
          )}
        </button>

        {/* Reviews Block */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Отзывы ({(product.reviews || []).length})</h3>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-sm text-white/60 underline underline-offset-4"
            >
              Оставить отзыв
            </button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4 glass p-5 rounded-[24px]"
              >
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setNewRating(s)}>
                      <Star size={24} className={s <= newRating ? 'fill-yellow-500 text-yellow-500' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ваш отзыв..."
                  className="w-full bg-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 ring-white/20 min-h-[100px]"
                />
                <button 
                  onClick={handleSubmitReview}
                  className="w-full py-3 bg-white text-black rounded-full font-bold text-sm"
                >
                  Отправить
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {(product.reviews || []).slice(0, 4).map((review) => (
              <div key={review.id} className="space-y-2 pb-4 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{review.userName}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-white/10'} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-white/30 uppercase tracking-tighter">{review.date}</span>
                </div>
                <p className="text-sm text-white/60 font-light">{review.comment}</p>
              </div>
            ))}
            {(!product.reviews || product.reviews.length === 0) && (
              <p className="text-center text-white/30 py-8 text-sm italic">Пока нет отзывов. Будьте первым!</p>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold">Похожие товары</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
            {similarProducts.map((p) => (
              <motion.div 
                key={p.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onProductClick(p)}
                className="flex-shrink-0 w-32 space-y-2"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={p.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <p className="text-[10px] font-script text-center text-white/80">{p.modelName}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
