import React, { useState } from 'react';
import { REVIEWS, ReviewItem, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MessageSquarePlus, Check, X, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState('Ayodhya Resident');
  const [rating, setRating] = useState(5);
  const [favoriteDish, setFavoriteDish] = useState('');
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      alert('Please enter your name and thoughts on M3 Cafe.');
      return;
    }

    const newReview: ReviewItem = {
      id: `r-${Date.now()}`,
      author: authorName,
      role: role || 'Guest Reviewer, Ayodhya',
      rating,
      date: 'Just now',
      comment,
      favoriteDish: favoriteDish || 'Artisan Hazelnut Cappuccino',
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddModal(false);
      setAuthorName('');
      setComment('');
      setFavoriteDish('');
    }, 1800);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#171512] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8a45b] block mb-2">
              Guest Experiences &amp; Praise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fff9f0] leading-tight">
              Loved by Foodies in Ayodhya
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#24201b] border border-[#393229] rounded-lg flex items-center gap-3">
              <div className="font-serif text-3xl font-bold text-[#d8a45b] tabular-nums">
                {RESTAURANT_INFO.ratingScore}
              </div>
              <div>
                <div className="flex items-center text-[#d8a45b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d8a45b]" />
                  ))}
                </div>
                <div className="text-[11px] text-[#bcb5aa]">
                  Based on {RESTAURANT_INFO.reviewCount} local reviews
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#24201b] hover:bg-[#393229] border border-[#d8a45b]/50 text-[#d8a45b] hover:text-[#fff9f0] font-semibold text-xs tracking-wider uppercase rounded transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <article
              key={rev.id}
              className="p-6 bg-[#24201b] border border-[#393229] rounded-xl flex flex-col justify-between hover:border-[#d8a45b]/40 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#d8a45b]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-[#d8a45b]'
                            : 'text-[#81715c]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#81715c]">{rev.date}</span>
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-[#81715c]/30 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="text-sm text-[#ded7cd] leading-relaxed pl-5 italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#393229] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm text-[#fff9f0]">{rev.author}</h4>
                  <p className="text-xs text-[#bcb5aa]">{rev.role}</p>
                </div>

                {rev.favoriteDish && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#bcb5aa] block">
                      Favorite
                    </span>
                    <span className="text-xs text-[#d8a45b] font-medium">
                      {rev.favoriteDish}
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#1f1b16] border border-[#393229] rounded-xl shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-bold text-[#fff9f0]">
                Review M3 Cafe
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#bcb5aa] hover:text-[#fff9f0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <Check className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#fff9f0]">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-[#bcb5aa]">
                  Your review has been added to our community wall in Ayodhya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Tiwari"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Where are you visiting from?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deokali, Ayodhya Dham, Civil Lines, etc."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#d8a45b] focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-[#d8a45b]' : 'text-[#81715c]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    What dish did you like most?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Farmhouse Pizza or Sizzling Brownie"
                    value={favoriteDish}
                    onChange={(e) => setFavoriteDish(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Your Experience &amp; Comments *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other food lovers in Ayodhya about the vibe, food quality, and service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
