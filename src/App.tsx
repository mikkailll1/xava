/**
 * Главный файл приложения Xava.
 * Здесь настраивается маршрутизация, управление состоянием пользователя, корзиной и языковыми настройками.
 */

import React, { useState, useEffect, createContext, useContext, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  LayoutGrid,
  Menu,
  MessageCircle,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import { AppScreen, Designer, Product, UserProfile, Review } from './types';
import { DESIGNERS, PRODUCTS, COLLECTIONS } from './data';
import { Language, translations } from './translations';
import { StarryBackground } from './components/elementy_interfeysa';
import { Lenta, ProductDetail } from './components/lenta';
import { DizaynerProfili } from './components/dizayner_profili';
import { ProfilDizaynera } from './components/profil_dizaynera';
import { Chaty } from './components/chaty';
import { Lk, Cart } from './components/lk';
import { PanelNactroyki } from './components/panel_nactroyki';

// Firebase
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  getDocFromServer,
  query,
  where,
  deleteDoc
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

// --- Error Boundary ---

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends (React.Component as any) {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      let errorMessage = "Something went wrong.";
      if (error && error.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.error) errorMessage = parsed.error;
        } catch (e) {
          errorMessage = error.message;
        }
      }

      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-2xl font-bold">Application Error</h2>
          <p className="text-white/60 max-w-md leading-relaxed">
            {errorMessage}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="apple-button bg-white text-black flex items-center gap-2"
          >
            <RefreshCcw size={18} />
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Контекст ---

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations['en'];
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations['en'],
  user: {} as UserProfile,
  setUser: () => {},
});

const useTranslation = () => useContext(LanguageContext);

// --- Компоненты ---

const Navbar = ({ currentScreen, setScreen, cartCount, isVisible }: { currentScreen: AppScreen, setScreen: (s: AppScreen) => void, cartCount: number, isVisible: boolean }) => {
  const { t } = useTranslation();
  const navItems = [
    { id: 'lenta', icon: LayoutGrid, label: t.explore },
    { id: 'dizayner_profili', icon: Menu, label: t.designers },
    { id: 'chaty', icon: MessageCircle, label: t.chat },
    { id: 'cart', icon: ShoppingBag, label: t.bag, badge: cartCount },
    { id: 'lk', icon: User, label: t.profile },
  ];

  const hiddenScreens: AppScreen[] = ['login', 'product-detail', 'panel_nactroyki', 'profil_dizaynera'];
  if (hiddenScreens.includes(currentScreen)) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          drag
          dragSnapToOrigin
          dragConstraints={{ left: 0, right: 0, top: -500, bottom: 0 }}
          dragElastic={0.1}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl active:cursor-grabbing">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setScreen(item.id as AppScreen)}
                className={`transition-all duration-300 flex flex-col items-center gap-1 relative ${
                  currentScreen === item.id ? 'text-white scale-110' : 'text-white/40 hover:text-white/80'
                }`}
              >
                <item.icon size={22} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
                {item.badge ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E60023] text-[8px] font-bold rounded-full flex items-center justify-center text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Основное приложение ---

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [screen, setScreen] = useState<AppScreen>('login');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [cart, setCart] = useState<{ product: Product, size: string, quantity: number }[]>([]);
  
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- Firebase Sync ---

  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    // Auth listener
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsAuthReady(true);
      if (firebaseUser) {
        // User is logged in
        const userRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen for user profile
        const unsubUser = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.data() as UserProfile);
            if (screen === 'login') setScreen('lenta');
          } else {
            // Create new user profile
            const newUser: UserProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/200/200`,
              role: firebaseUser.email === 'tazabievvv@gmail.com' ? 'admin' : 'user',
              addresses: [],
              paymentMethods: [],
              orders: [],
              likedProducts: [],
              favoriteProducts: [],
              subscribedDesigners: [],
              viewedDesigners: []
            };
            setDoc(userRef, newUser).catch(e => 
              handleFirestoreError(e, OperationType.WRITE, `users/${firebaseUser.uid}`)
            );
          }
        }, (error) => handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`));

        return () => unsubUser();
      } else {
        // User is logged out
        setUser(null);
        setScreen('login');
      }
    });

    // Listen for designers (Public read)
    const unsubDesigners = onSnapshot(collection(db, 'designers'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Designer);
      if (data.length === 0 && auth.currentUser) {
        // Seed initial data if empty and user is logged in (to have permissions)
        DESIGNERS.forEach(async (d) => {
          try {
            await setDoc(doc(db, 'designers', d.id), d);
          } catch (e) {
            // Silently fail if not admin, but log if it's a real error
            if (!(e instanceof Error && e.message.includes('insufficient permissions'))) {
              handleFirestoreError(e, OperationType.WRITE, `designers/${d.id}`);
            }
          }
        });
      } else {
        setDesigners(data);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'designers'));

    // Listen for products (Public read)
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Product);
      if (data.length === 0 && auth.currentUser) {
        // Seed initial data if empty
        PRODUCTS.forEach(async (p) => {
          try {
            await setDoc(doc(db, 'products', p.id), { ...p, reviews: p.reviews || [] });
          } catch (e) {
            if (!(e instanceof Error && e.message.includes('insufficient permissions'))) {
              handleFirestoreError(e, OperationType.WRITE, `products/${p.id}`);
            }
          }
        });
      } else {
        setProducts(data.map(p => ({ ...p, reviews: p.reviews || [] })));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'products'));

    return () => {
      unsubAuth();
      unsubDesigners();
      unsubProducts();
    };
  }, []);

  // Sync user profile to Firestore
  const updateRemoteUser = async (updatedUser: UserProfile) => {
    try {
      await setDoc(doc(db, 'users', updatedUser.id), updatedUser, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${updatedUser.id}`);
    }
  };
  const [isNavVisible, setIsNavVisible] = useState(true);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const t = translations[lang];

  const handleScroll = () => {
    setIsNavVisible(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsNavVisible(false);
    }, 5000);
  };

  useEffect(() => {
    // Initial show
    setIsNavVisible(true);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsNavVisible(false);
    }, 5000);

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setScreen('login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const onProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen('product-detail');
    
    // Scroll to top of the detail screen
    const container = document.querySelector('.overflow-y-auto');
    if (container) container.scrollTop = 0;

    if (user && !user.viewedDesigners.includes(product.designerId)) {
      const updatedUser = {
        ...user,
        viewedDesigners: [product.designerId, ...user.viewedDesigners].slice(0, 5)
      };
      setUser(updatedUser);
      updateRemoteUser(updatedUser);
    }
  };

  const addReview = async (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    const product = products.find(p => p.id === productId);
    if (product) {
      const updatedReviews = [newReview, ...(product.reviews || [])];
      try {
        await updateDoc(doc(db, 'products', productId), {
          reviews: updatedReviews
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, `products/${productId}`);
      }
    }

    // Update selected product if it's the one being reviewed
    if (selectedProduct?.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, reviews: [newReview, ...(prev.reviews || [])] } : null);
    }
  };

  const onDesignerClick = (designer: Designer) => {
    setSelectedDesigner(designer);
    setScreen('profil_dizaynera');
  };

  const onAddToBag = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center px-8 transition-all duration-500 bg-black text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-7xl font-normal font-script text-white">Xava</h1>
                <p className="text-white/60">{t.welcomeBack}</p>
              </div>
              
              <div className="space-y-4 pt-8">
                <button 
                  onClick={handleLogin} 
                  className="w-full bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white/90 transition-all active:scale-95"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                  {t.login} with Google
                </button>
                <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">
                  Secure access via Firebase
                </p>
              </div>
            </motion.div>
          </div>
        );
      case 'lenta':
        return user ? <Lenta t={t} products={products} designers={designers} user={user} onProductClick={onProductClick} onDesignerClick={onDesignerClick} /> : null;
      case 'dizayner_profili':
        return <DizaynerProfili t={t} designers={designers} onDesignerClick={onDesignerClick} />;
      case 'profil_dizaynera':
        return selectedDesigner && user ? (
          <ProfilDizaynera 
            t={t} 
            designer={selectedDesigner} 
            products={products.filter(p => p.designerId === selectedDesigner.id)} 
            collections={COLLECTIONS.filter(c => c.designerId === selectedDesigner.id)}
            user={user} 
            setUser={setUser} 
            onBack={() => setScreen('dizayner_profili')} 
            onProductClick={onProductClick} 
          />
        ) : null;
      case 'chaty':
        return user ? <Chaty t={t} user={user} designers={designers} /> : null;
      case 'lk':
        return user ? (
          <Lk 
            t={t} 
            user={user} 
            setUser={setUser} 
            designers={designers} 
            products={products} 
            onLogout={handleLogout} 
            onAdminPanelClick={() => setScreen('panel_nactroyki')}
          />
        ) : null;
      case 'panel_nactroyki':
        return (
          <PanelNactroyki 
            t={t} 
            designers={designers} 
            products={products} 
            onBack={() => setScreen('lk')} 
          />
        );
      case 'product-detail':
        return selectedProduct && user ? (
          <ProductDetail 
            t={t} 
            product={selectedProduct} 
            designer={designers.find(d => d.id === selectedProduct.designerId)!} 
            allProducts={products}
            onBack={() => setScreen('lenta')} 
            onAddToBag={onAddToBag} 
            onProductClick={onProductClick}
            onWriteToDesigner={(designerId) => {
              // Logic to open chat with specific designer
              setScreen('chaty');
            }}
            addReview={addReview}
            user={user}
          />
        ) : null;
      case 'cart':
        return <Cart t={t} cart={cart} setCart={setCart} onBack={() => setScreen('lenta')} onCheckout={() => alert('Order Placed!')} />;
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={{ lang, setLang, t, user, setUser }}>
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white flex items-center justify-center">
          <div className="mobile-container w-full flex flex-col" onScroll={handleScroll} onTouchMove={handleScroll}>
            <div className="flex-1 overflow-y-auto hide-scrollbar relative" onScroll={handleScroll}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-full"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
            <Navbar currentScreen={screen} setScreen={setScreen} cartCount={cart.length} isVisible={isNavVisible} />
          </div>
        </div>
      </LanguageContext.Provider>
    </ErrorBoundary>
  );
}
