import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Compass, Calendar, ArrowRight, Clock, MapPin, Coffee, UtensilsCrossed, Users } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  return (
    <section id="home" className="relative min-h-[720px] lg:min-h-[780px] flex flex-col justify-between overflow-hidden">
      {/* Background with Generated High-Res Ambience Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_INFO.images.hero}
          alt="M3 Cafe & Restaurant warm interior ambiance in Ayodhya"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171512] via-[#171512]/85 to-[#171512]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-[#171512]/40" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 flex-1 flex items-center">
        <div className="max-w-3xl">
          {/* Eyebrow kicker with clean typographic discipline */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#d8a45b] mb-4">
            <span className="w-6 h-[1px] bg-[#d8a45b]" />
            <span>Welcome to M3 Cafe &amp; Restaurant · Ayodhya</span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fff9f0] leading-[1.08] text-balance mb-6">
            Good Food.{' '}
            <span className="text-[#d8a45b] italic font-normal">
              Great Moments.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#ded7cd] leading-relaxed max-w-2xl mb-8">
            Discover M3 Cafe &amp; Restaurant in Ayodhya. Located in Shakti Nagar, Deokali — a welcoming sanctuary for artisanal brews, clay-oven tandoori starters, momos, pizzas, and decadent sizzling desserts.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-semibold text-xs tracking-wider uppercase rounded transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#81715c] hover:border-[#d8a45b] bg-[#24201b]/70 hover:bg-[#24201b] text-[#fff9f0] hover:text-[#d8a45b] font-semibold text-xs tracking-wider uppercase rounded transition-all cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#d8a45b]" />
              <span>Reserve a Table</span>
            </button>

            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs text-[#bcb5aa] hover:text-[#d8a45b] transition-colors"
            >
              <Compass className="w-4 h-4 text-[#d8a45b]" />
              <span>Get Directions ↗</span>
            </a>
          </div>

          {/* Clean Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#bcb5aa] border-t border-[#393229]/80 pt-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d8a45b]" />
              <span>Near Big Bazaar, Shakti Nagar, Deokali · Ayodhya, UP</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d8a45b]" />
              <span>Daily {RESTAURANT_INFO.hoursDisplay}</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="text-[#d8a45b] font-medium">
              ★ {RESTAURANT_INFO.ratingScore} ({RESTAURANT_INFO.reviewCount} Reviews)
            </div>
          </div>
        </div>
      </div>

      {/* 3-Pillar Feature Ribbon */}
      <div className="relative z-10 bg-[#d8a45b] text-[#171512] py-6 border-t border-[#e5b46f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#171512]/15">
            <div className="flex flex-col items-center px-4 py-1">
              <div className="flex items-center gap-2 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-[#171512]" />
                <strong className="font-serif text-lg font-bold">Food &amp; Flavours</strong>
              </div>
              <span className="text-xs text-[#2b2217] font-medium">Tandoor specials, momos, pizzas &amp; curries</span>
            </div>

            <div className="flex flex-col items-center px-4 py-1">
              <div className="flex items-center gap-2 mb-1">
                <Coffee className="w-4 h-4 text-[#171512]" />
                <strong className="font-serif text-lg font-bold">Craft Brews &amp; Smoothies</strong>
              </div>
              <span className="text-xs text-[#2b2217] font-medium">Specialty espresso roasts, cold brews &amp; sparkling coolers</span>
            </div>

            <div className="flex flex-col items-center px-4 py-1">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#171512]" />
                <strong className="font-serif text-lg font-bold">Your Cafe Stop in Ayodhya</strong>
              </div>
              <span className="text-xs text-[#2b2217] font-medium">Near Big Bazaar, Shakti Nagar · Open Daily till 11:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
