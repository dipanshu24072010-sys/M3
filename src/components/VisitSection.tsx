import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Clock, Phone, MessageSquare, Copy, Check, Compass, Calendar } from 'lucide-react';

interface VisitSectionProps {
  onOpenReservation: () => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ onOpenReservation }) => {
  const [copied, setCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check live open/closed status based on current time (11:00 AM to 11:30 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentDecimal = now.getHours() + now.getMinutes() / 60;
      const isOpen =
        currentDecimal >= RESTAURANT_INFO.openingHour &&
        currentDecimal < RESTAURANT_INFO.closingHour;
      setIsOpenNow(isOpen);
    };

    checkOpenStatus();
    const timer = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#1f1b16] border-t border-[#393229] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8a45b] block mb-2">
            Come Say Hello
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fff9f0] leading-tight mb-4">
            Visit M3 Cafe &amp; Restaurant
          </h2>
          <p className="text-sm text-[#bcb5aa] leading-relaxed">
            Conveniently located near Big Bazaar in Shakti Nagar, Deokali, Ayodhya. Drop in for artisanal coffee or book ahead for memorable group celebrations.
          </p>
        </div>

        {/* 2-Column Grid: Location Details vs Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Info Card */}
          <div className="lg:col-span-5 bg-[#24201b] border border-[#393229] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              {/* Live Hours Status */}
              <div className="flex items-center justify-between pb-5 border-b border-[#393229]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOpenNow ? 'bg-emerald-400' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#fff9f0]">
                    {isOpenNow ? 'Open Now' : 'Closed Now'}
                  </span>
                </div>
                <span className="text-xs text-[#d8a45b] font-medium">
                  {isOpenNow
                    ? 'Closes at 11:30 PM'
                    : 'Opens today at 11:00 AM'}
                </span>
              </div>

              {/* Address Item */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#d8a45b]">
                  <MapPin className="w-4 h-4" />
                  <span>Our Location</span>
                </div>
                <p className="text-sm text-[#ded7cd] leading-relaxed">
                  Near Big Bazaar, Shakti Nagar, Deokali,<br />
                  Ayodhya, Uttar Pradesh 224001, India
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs text-[#bcb5aa] hover:text-[#d8a45b] transition-colors cursor-pointer pt-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Opening Hours Item */}
              <div className="space-y-1.5 pt-4 border-t border-[#393229]">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#d8a45b]">
                  <Clock className="w-4 h-4" />
                  <span>Operating Timings</span>
                </div>
                <div className="text-sm text-[#fff9f0] font-medium">
                  Monday – Sunday: 11:00 AM – 11:30 PM
                </div>
                <p className="text-xs text-[#bcb5aa]">
                  Open all 7 days of the week, including public holidays.
                </p>
              </div>

              {/* Direct Calling & Inquiries */}
              <div className="space-y-2 pt-4 border-t border-[#393229]">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#d8a45b]">
                  <Phone className="w-4 h-4" />
                  <span>Phone &amp; Inquiries</span>
                </div>
                <p className="text-xs text-[#bcb5aa]">
                  For table confirmations, birthdays, and takeaway pickups in Ayodhya:
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#171512] border border-[#393229] hover:border-[#d8a45b] text-xs text-[#fff9f0] font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d8a45b]" />
                    <span>{RESTAURANT_INFO.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20M3%20Cafe%20Ayodhya,%20I%20would%20like%20to%20inquire%20about%20visiting`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#171512] border border-[#393229] hover:border-[#25D366] text-xs text-[#fff9f0] font-medium transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps ↗</span>
              </a>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#81715c] hover:border-[#d8a45b] text-[#fff9f0] hover:text-[#d8a45b] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#d8a45b]" />
                <span>Reserve Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Embedded Map */}
          <div className="lg:col-span-7 bg-[#24201b] border border-[#393229] rounded-xl overflow-hidden shadow-xl min-h-[420px] flex flex-col">
            <div className="p-4 bg-[#171512] border-b border-[#393229] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d8a45b]" />
                <span className="text-xs font-bold text-[#fff9f0]">
                  Live Location Map · Shakti Nagar, Deokali, Ayodhya
                </span>
              </div>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#d8a45b] hover:underline flex items-center gap-1"
              >
                <span>Full Directions</span>
                <span>↗</span>
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[380px] bg-[#1a1714]">
              <iframe
                title="M3 Cafe and Restaurant Location in Ayodhya"
                src="https://maps.google.com/maps?q=M3%20Cafe%20%26%20Restaurant%20Shakti%20Nagar%20Deokali%20Ayodhya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
