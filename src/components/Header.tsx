import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Menu, X, ShoppingBag, Calendar, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenReservation: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#171512]/95 backdrop-blur-md border-b border-[#393229]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex flex-col group whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-[#d8a45b] group-hover:text-[#e5b46f] transition-colors">
              M3 Cafe
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#bcb5aa] font-medium -mt-1">
              &amp; Restaurant · Ayodhya
            </span>
          </a>

          {/* Zone 2: Navigation Links (Single-line, concise) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#e1d9cf]">
            <a
              href="#home"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Our Story
            </a>
            <a
              href="#menu"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Menu &amp; Specials
            </a>
            <a
              href="#order-online"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Order Online
            </a>
            <a
              href="#gallery"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Ambience
            </a>
            <a
              href="#visit"
              className="hover:text-[#d8a45b] transition-colors whitespace-nowrap shrink-0"
            >
              Visit &amp; Contact
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Tray / Order Cart count if active */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg border border-[#393229] bg-[#24201b] hover:border-[#d8a45b] text-[#fff9f0] hover:text-[#d8a45b] transition-colors cursor-pointer"
              title="View Dine-In Tray"
              aria-label="View Dine-In Order Tray"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#d8a45b] text-[#171512] text-xs font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-semibold text-xs tracking-wider uppercase rounded transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#fff9f0] hover:text-[#d8a45b] border border-[#393229] rounded bg-[#24201b]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#393229] bg-[#1a1714] px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#e1d9cf]">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Our Story &amp; Specialities
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Explore Menu
            </a>
            <a
              href="#order-online"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Order Online &amp; Delivery
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Ambience &amp; Photos
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d8a45b] transition-colors"
            >
              Location &amp; Timings
            </a>
          </nav>

          <div className="pt-4 border-t border-[#393229] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 bg-[#d8a45b] text-[#171512] font-bold text-center text-xs tracking-wider uppercase rounded"
            >
              Reserve a Table
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs text-[#bcb5aa] hover:text-[#fff9f0] border border-[#393229] rounded"
            >
              <Phone className="w-3.5 h-3.5 text-[#d8a45b]" />
              Call M3 Cafe: {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
