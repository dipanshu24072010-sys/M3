import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Sparkles, Coffee, HeartHandshake, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenReservation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#171512] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cafe Interior Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#393229] shadow-2xl group">
              <img
                src={RESTAURANT_INFO.images.about}
                alt="M3 Cafe cozy interior and dining area in Ayodhya"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-transparent opacity-80" />

              {/* Quiet editorial caption tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#171512]/90 border border-[#393229] backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-[#d8a45b]">M3 Dining Corner</span>
                  <span className="text-[#bcb5aa]">Shakti Nagar, Ayodhya</span>
                </div>
                <p className="text-[11px] text-[#ded7cd] mt-1">
                  Air-conditioned comfort with natural morning light and evening mood ambience.
                </p>
              </div>
            </div>

            {/* Accent decorative geometry */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#d8a45b]/30 -z-0 pointer-events-none" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#d8a45b] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story &amp; Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fff9f0] leading-tight text-balance mb-6">
              A place for food, friends &amp; good times in Ayodhya.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#bcb5aa] leading-relaxed mb-8">
              <p>
                Welcome to <strong className="text-[#fff9f0]">M3 Cafe &amp; Restaurant</strong>, located in
                Ayodhya, Uttar Pradesh. Whether you are meeting friends, hosting a birthday celebration, or taking a refreshing food break, discover a welcoming spot for your next visit.
              </p>
              <p>
                Explore our diverse menu featuring steaming momos, clay-oven tandoor appetizers, rich North Indian curries, artisan pizzas, creamy pastas, artisanal coffees, refreshing smoothies, and sweet desserts. We look forward to welcoming you in Shakti Nagar, Deokali, Ayodhya.
              </p>
            </div>

            {/* Key Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {RESTAURANT_INFO.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded border border-[#393229] bg-[#24201b] hover:border-[#d8a45b]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#fff9f0] mb-1">
                    {idx === 0 && <Coffee className="w-4 h-4 text-[#d8a45b]" />}
                    {idx === 1 && <HeartHandshake className="w-4 h-4 text-[#d8a45b]" />}
                    {idx === 2 && <Sparkles className="w-4 h-4 text-[#d8a45b]" />}
                    {idx === 3 && <ShieldCheck className="w-4 h-4 text-[#d8a45b]" />}
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#bcb5aa] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Landmark Distance Bar */}
            <div className="p-4 rounded border border-[#393229] bg-[#1a1714] mb-8">
              <div className="text-xs font-semibold text-[#d8a45b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Ayodhya City Proximity &amp; Easy Access</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {RESTAURANT_INFO.landmarks.map((landmark, idx) => (
                  <div key={idx} className="border-l border-[#393229] pl-2.5">
                    <div className="text-[#fff9f0] font-medium truncate">{landmark.name}</div>
                    <div className="text-[11px] text-[#bcb5aa]">{landmark.distance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-semibold text-xs tracking-wider uppercase rounded transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Book a Celebration Table
              </button>

              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 border border-[#393229] hover:border-[#d8a45b] text-[#fff9f0] hover:text-[#d8a45b] text-xs font-semibold tracking-wider uppercase rounded transition-colors"
              >
                <span>Visit M3 Cafe on Maps ↗</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
