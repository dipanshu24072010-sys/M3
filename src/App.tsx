import React, { useState, useEffect } from 'react';
import { MenuItem } from './data/restaurantData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { OrderOnlineSection } from './components/OrderOnlineSection';
import { GallerySection } from './components/GallerySection';
import { VisitSection } from './components/VisitSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DineInTrayModal } from './components/DineInTrayModal';
import { ReservationModal } from './components/ReservationModal';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('m3_cafe_tray');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Sync tray items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('m3_cafe_tray', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalTrayCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="min-h-screen bg-[#171512] text-[#fff9f0] selection:bg-[#d8a45b] selection:text-[#171512] font-sans">
      {/* Primary Sticky Top Bar */}
      <Header
        onOpenReservation={() => setIsReservationOpen(true)}
        cartCount={totalTrayCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />
        <AboutSection onOpenReservation={() => setIsReservationOpen(true)} />
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <OrderOnlineSection />
        <GallerySection />
        <VisitSection onOpenReservation={() => setIsReservationOpen(true)} />
        <ReviewsSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Dine-In & Order Tray Drawer/Modal */}
      <DineInTrayModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenReservationWithItems={() => {
          setIsReservationOpen(true);
        }}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
