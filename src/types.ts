/**
 * Этот файл содержит все основные интерфейсы и типы данных для приложения Xava.
 * Здесь определены структуры для дизайнеров, продуктов, коллекций, заказов и профилей пользователей.
 */

export interface Designer {
  id: string;
  name: string;
  brandName: string;
  avatar: string;
  cover: string;
  bio: string;
  philosophy: string;
  country: string;
  followers: number;
}

export interface Product {
  id: string;
  designerId: string;
  name: string;
  modelName: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
  materials: string;
  care: string;
  category: string;
  isNew?: boolean;
  reviews: Review[];
}

export interface Collection {
  id: string;
  designerId: string;
  name: string;
  season: string;
  year: number;
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Order {
  id: string;
  date: string;
  items: Product[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'returned';
  trackingNumber?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'applepay';
  last4: string;
  expiry: string;
}

export type UserRole = 'user' | 'designer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  addresses: string[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  likedProducts: string[];
  favoriteProducts: string[];
  subscribedDesigners: string[];
  viewedDesigners: string[];
}

export type AppScreen = 'login' | 'lenta' | 'dizayner_profili' | 'profil_dizaynera' | 'chaty' | 'lk' | 'panel_nactroyki' | 'product-detail' | 'cart';
