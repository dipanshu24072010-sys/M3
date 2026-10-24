import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Ambience', 'Food', 'Beverages', 'Desserts'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#171512] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8a45b] block mb-2">
            A Visual Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fff9f0] leading-tight mb-4">
            Ambience &amp; Culinary Moments
          </h2>
          <p className="text-sm text-[#bcb5aa] leading-relaxed">
            Step inside M3 Cafe &amp; Restaurant. From warm evening lighting to freshly plated artisanal creations.
          </p>
        </div>

        {/* Gallery Category Filter */}
        <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#d8a45b] text-[#171512] font-bold shadow-sm'
                  : 'bg-[#24201b] text-[#bcb5aa] border border-[#393229] hover:text-[#fff9f0] hover:border-[#81715c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-lg overflow-hidden border border-[#393229] bg-[#24201b] cursor-pointer shadow-lg hover:border-[#d8a45b]/60 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-[#171512]/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#171512]/80 border border-[#393229] text-[#fff9f0] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#d8a45b]" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#d8a45b] mb-1">
                  {item.category}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#fff9f0] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#bcb5aa] line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="text-center mt-10">
          <p className="text-xs text-[#81715c] flex items-center justify-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#d8a45b]" />
            <span>Tag us in your photos during your visit at Shakti Nagar, Faizabad!</span>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#24201b] border border-[#393229] text-[#fff9f0] hover:text-[#d8a45b] transition-colors z-10"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#24201b]/80 border border-[#393229] text-[#fff9f0] hover:text-[#d8a45b] transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#24201b]/80 border border-[#393229] text-[#fff9f0] hover:text-[#d8a45b] transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden border border-[#393229] shadow-2xl bg-[#171512] max-h-[70vh]">
              <img
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 text-center max-w-lg">
              <span className="text-[11px] uppercase tracking-wider text-[#d8a45b] font-bold">
                {filteredItems[activeLightboxIndex].category}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#fff9f0] mt-0.5">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-[#bcb5aa] mt-1">
                {filteredItems[activeLightboxIndex].caption}
              </p>
              <div className="text-[11px] text-[#81715c] mt-2 tabular-nums">
                {activeLightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
