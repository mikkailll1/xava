/**
 * Общие элементы интерфейса (UI).
 * Содержит переиспользуемые компоненты, такие как GlassCard и фоновые эффекты.
 */

import React from 'react';
import { motion } from 'motion/react';

// Карточка с эффектом стекла
export const GlassCard = ({ children, className = "", rare = false }: { children: React.ReactNode, className?: string, rare?: boolean, key?: string | number }) => (
  <div className={`glass rounded-3xl overflow-hidden ${rare ? 'rare-card' : ''} ${className}`}>
    {children}
  </div>
);

// Звездный фон с эффектом полярного сияния
export const StarryBackground = () => (
  <div className="star-bg">
    <div className="aurora" />
    <div className="stars" />
    <div className="twinkling" />
  </div>
);
