import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12100e] border-t border-[#393229] text-[#bcb5aa] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#home" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#d8a45b]">
                M3 Cafe
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#bcb5aa] font-medium">
                &amp; Restaurant · Ayodhya
              </span>
            </a>
            <p className="text-xs text-[#bcb5aa] leading-relaxed">
              Your premier destination for artisanal coffee, stone-baked pizzas, delicious snacks, and cozy moments in Ayodhya, Uttar Pradesh.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d8a45b]">
              <span>★ 4.8 Rating</span>
              <span aria-hidden="true">·</span>
              <span>380+ Verified Guests</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#fff9f0] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#d8a45b] transition-colors">
                  Home &amp; Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d8a45b] transition-colors">
                  Our Story &amp; Ambience
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d8a45b] transition-colors">
                  Explore Full Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d8a45b] transition-colors">
                  Food &amp; Space Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#d8a45b] transition-colors">
                  Location &amp; Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Visit & Timings */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#fff9f0] uppercase tracking-wider">
              Hours &amp; Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d8a45b] shrink-0 mt-0.5" />
                <span>Everyday: 11:00 AM – 11:30 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d8a45b] shrink-0 mt-0.5" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#fff9f0]">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d8a45b] shrink-0 mt-0.5" />
                <span>Near Big Bazaar, Shakti Nagar, Deokali, Ayodhya 224001</span>
              </div>
            </div>
          </div>

          {/* Google Maps Directions Card */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#fff9f0] uppercase tracking-wider">
              Find Our Cafe in Ayodhya
            </h4>
            <p className="text-xs text-[#bcb5aa]">
              Located in the heart of Shakti Nagar, Deokali, Ayodhya. Easily accessible with dedicated vehicle parking.
            </p>
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#24201b] hover:bg-[#393229] border border-[#d8a45b]/50 text-[#d8a45b] hover:text-[#fff9f0] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              <span>Get Directions ↗</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#393229] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} M3 Cafe &amp; Restaurant. All rights reserved.</p>
          <p className="text-[#81715c]">
            Ayodhya, Uttar Pradesh 224001, India
          </p>
        </div>
      </div>
    </footer>
  );
};
