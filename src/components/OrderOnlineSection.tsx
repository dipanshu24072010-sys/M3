import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { QrCode, Phone, MessageSquare, Truck, Utensils, Check, Copy, ExternalLink, Download } from 'lucide-react';

export const OrderOnlineSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const siteUrl = 'https://m3cafeandrestaurant.com';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="order-online"
      className="bg-[#063d25] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative border-t border-b border-[#0f5434]"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#ffda32] block mb-2">
            Doorstep Delivery &amp; Takeaway
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffda32] tracking-tight mb-2">
            M3 Cafe &amp; Restaurant
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Order Online, Enjoy at Home!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto mt-2">
            Craving fresh artisanal coffee, steaming momos, stone-baked pizzas, or rich dal makhani in Ayodhya? We deliver piping hot food right to your doorstep.
          </p>
        </div>

        {/* QR Code Section */}
        <div className="bg-[#08482d] border border-[#16663f] rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-xl">
          <div className="flex items-center justify-center gap-2 text-base font-bold text-[#ffda32] mb-3">
            <QrCode className="w-5 h-5" />
            <span>Scan QR to Visit Our Website</span>
          </div>

          <div className="inline-block bg-white p-3 rounded-xl shadow-lg my-2">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fm3cafeandrestaurant.com"
              alt="M3 Cafe website QR code"
              className="w-44 h-44 mx-auto object-contain block"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-emerald-200 mt-3">
            Scan the QR code with your phone camera to explore our menu anytime.
          </p>

          <button
            onClick={handleCopyLink}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#063d25] border border-[#1b6d44] hover:border-[#ffda32] text-[11px] text-emerald-100 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Website Link</span>
              </>
            )}
          </button>
        </div>

        {/* Order Through Food Partners */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">
            Order Through Our Food Partners
          </h3>
          <p className="text-xs text-emerald-200">
            Available on your favourite delivery platforms across Ayodhya:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Swiggy Button */}
            <a
              href="https://www.swiggy.com/restaurants"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-72 py-4 px-6 bg-[#fc8019] hover:bg-[#e7700e] text-white font-bold text-sm rounded-xl text-center shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Order on Swiggy</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Zomato Button */}
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-72 py-4 px-6 bg-[#e23744] hover:bg-[#cb2a36] text-white font-bold text-sm rounded-xl text-center shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Order on Zomato</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Restaurant Pamphlet Card */}
        <div className="pt-6 border-t border-[#0f5434]">
          <h3 className="text-xl font-bold text-[#ffda32] mb-2">
            Our Restaurant Pamphlet
          </h3>
          <p className="text-xs text-emerald-200 mb-5">
            M3 Cafe &amp; Restaurant complete ordering menu card &amp; party catering guide
          </p>

          <div className="bg-[#08482d] border border-[#16663f] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#1b6d44] gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffda32] block">
                  Official Menu Pamphlet
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">
                  M3 Cafe &amp; Restaurant · Ayodhya
                </h4>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Near Big Bazaar, Shakti Nagar, Deokali · Ph: +91 95986 74669
                </p>
              </div>

              <a
                href="#menu"
                className="px-4 py-2 rounded-lg bg-[#ffda32] text-[#063d25] font-bold text-xs uppercase tracking-wider hover:bg-[#ffe156] transition-colors whitespace-nowrap"
              >
                View Full Menu
              </a>
            </div>

            {/* Pamphlet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5 text-xs text-emerald-100">
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">🥟 Momos &amp; Starters</strong>
                <span>Steamed, Fried &amp; Kurkure</span>
              </div>
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">🔥 Tandoor Kebabs</strong>
                <span>Paneer Tikka &amp; Chaap</span>
              </div>
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">🍛 Dal &amp; Curries</strong>
                <span>Dal Makhani &amp; Shahi Paneer</span>
              </div>
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">🍕 Pizza &amp; Pasta</strong>
                <span>Stone-Baked &amp; Alfredo</span>
              </div>
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">☕ Brews &amp; Shakes</strong>
                <span>Cappuccino &amp; Shakes</span>
              </div>
              <div className="p-2.5 rounded bg-[#063d25]/60 border border-[#16663f]">
                <strong className="block text-white font-semibold mb-0.5">🍨 Sizzling Desserts</strong>
                <span>Brownie with Gelato</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b6d44] text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#ffda32]" />
                <span>Free doorstep delivery within 3 km in Ayodhya on orders ₹299+</span>
              </span>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20M3%20Cafe,%20please%20send%20the%20digital%20menu%20pamphlet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffda32] hover:underline font-semibold"
              >
                Request PDF on WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* We Deliver at Your Doorstep Banner */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Truck className="w-6 h-6 text-[#ffda32]" />
            <span>We Deliver at Your Doorstep</span>
          </h3>

          <div className="relative rounded-2xl overflow-hidden border border-[#16663f] shadow-2xl max-w-4xl mx-auto">
            <img
              src={RESTAURANT_INFO.images.deliveryBanner}
              alt="M3 Cafe fresh delivery packaged at your doorstep"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#063d25] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-left p-4 rounded-xl bg-[#063d25]/90 border border-[#16663f] backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-bold text-[#ffda32] block">
                  Hygienic Eco-Friendly Packaging
                </span>
                <p className="text-xs text-emerald-100">
                  Special heat-sealed containers retain steam, crunch, and authentic flavours all the way to your dining table.
                </p>
              </div>
              <span className="text-xs font-bold text-white bg-[#0f5434] px-3 py-1.5 rounded-lg whitespace-nowrap">
                11:00 AM – 11:30 PM
              </span>
            </div>
          </div>
        </div>

        {/* Direct Call & WhatsApp Contact */}
        <div className="pt-6 border-t border-[#0f5434] space-y-4">
          <div className="flex items-center justify-center gap-2 text-base font-semibold text-white">
            <Phone className="w-5 h-5 text-[#ffda32]" />
            <span>Call or WhatsApp:</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="font-bold text-[#ffda32] hover:underline text-lg tabular-nums"
            >
              {RESTAURANT_INFO.phone}
            </a>
          </div>

          <div>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20M3%20Cafe,%20I%20would%20like%20to%20order%20for%20home%20delivery!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>

          <p className="text-xs text-emerald-300">
            M3 Cafe &amp; Restaurant · Shakti Nagar, Deokali, Ayodhya, UP 224001
          </p>
        </div>
      </div>
    </section>
  );
};
