import React, { useState } from 'react';
import { FAQS, RESTAURANT_INFO } from '../data/restaurantData';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#1f1b16] border-t border-[#393229] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8a45b] block mb-2">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fff9f0] leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#bcb5aa]">
            Everything you need to know before visiting M3 Cafe &amp; Restaurant in Ayodhya.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[#393229] bg-[#24201b] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base font-semibold text-[#fff9f0] flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#d8a45b] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#bcb5aa] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#d8a45b]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#bcb5aa] leading-relaxed border-t border-[#393229]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Help Box */}
        <div className="mt-12 p-6 rounded-xl bg-[#171512] border border-[#393229] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-base font-bold text-[#fff9f0]">
              Need immediate assistance or party bookings in Ayodhya?
            </h4>
            <p className="text-xs text-[#bcb5aa]">
              Our on-site manager in Shakti Nagar, Deokali is happy to assist.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#24201b] border border-[#393229] hover:border-[#d8a45b] text-xs text-[#fff9f0] font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#d8a45b]" />
              <span>Call Manager</span>
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20M3%20Cafe%20Ayodhya%20Team!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#25D366] text-white text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
