import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('Casual Dine-In');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // Generate reference code
    const ref = `M3-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(ref);
  };

  const handleSendToWhatsApp = () => {
    const message = `*M3 CAFE & RESTAURANT - TABLE RESERVATION*\n` +
      `--------------------------------------\n` +
      `🔖 *Booking Ref:* ${confirmationCode}\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📅 *Date:* ${date}\n` +
      `⏰ *Time:* ${time}\n` +
      `👥 *Guests:* ${guests} Persons\n` +
      `🎉 *Occasion:* ${occasion}\n` +
      (specialNotes ? `📝 *Special Request:* ${specialNotes}\n` : '') +
      `--------------------------------------\n` +
      `Location: Near Big Bazaar, Shakti Nagar, Deokali, Ayodhya\n` +
      `Please confirm availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  const resetAndClose = () => {
    setConfirmationCode(null);
    setName('');
    setPhone('');
    setSpecialNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1f1b16] border border-[#393229] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#393229] bg-[#24201b]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#d8a45b]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#fff9f0]">
                Reserve a Table
              </h3>
              <span className="text-[11px] text-[#bcb5aa]">
                M3 Cafe &amp; Restaurant · Ayodhya, Uttar Pradesh
              </span>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 text-[#bcb5aa] hover:text-[#fff9f0] rounded transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {confirmationCode ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-5">
              <CheckCircle2 className="w-16 h-16 text-[#d8a45b] mx-auto animate-bounce-short" />
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d8a45b] font-bold">
                  Reservation Received
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#fff9f0] mt-1">
                  You&apos;re Set, {name}!
                </h4>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-lg bg-[#171512] border border-[#393229] text-left text-xs space-y-2.5 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-[#393229] pb-2">
                  <span className="text-[#bcb5aa]">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#d8a45b]">{confirmationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcb5aa]">Date &amp; Time:</span>
                  <span className="text-[#fff9f0] font-medium">{date} at {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcb5aa]">Party Size:</span>
                  <span className="text-[#fff9f0] font-medium">{guests} Guests ({occasion})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcb5aa]">Contact:</span>
                  <span className="text-[#fff9f0] font-medium">{phone}</span>
                </div>
                <div className="flex justify-between border-t border-[#393229] pt-2">
                  <span className="text-[#bcb5aa]">Location:</span>
                  <span className="text-[#fff9f0] font-medium">Shakti Nagar, Deokali</span>
                </div>
              </div>

              <p className="text-xs text-[#bcb5aa] max-w-sm mx-auto">
                Our manager will reserve your spot. Tap below to notify us directly on WhatsApp for priority seating!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-5 py-3 border border-[#393229] hover:border-[#d8a45b] text-[#fff9f0] text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Susheela Devi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171512] border border-[#393229] rounded text-sm text-[#fff9f0] placeholder-[#81715c] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 94520 81234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171512] border border-[#393229] rounded text-sm text-[#fff9f0] placeholder-[#81715c] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#d8a45b]" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d8a45b]" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  >
                    <option value="11:30">11:30 AM</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM (Tea/Coffee)</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="19:00">07:00 PM (Evening)</option>
                    <option value="20:00">08:00 PM (Dinner)</option>
                    <option value="21:00">09:00 PM</option>
                    <option value="22:00">10:00 PM (Late Night)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#bcb5aa] block mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#d8a45b]" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons (Table of 2)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Booth)</option>
                    <option value="5-6">5 to 6 Persons</option>
                    <option value="7-10">7 to 10 Persons (Party Table)</option>
                    <option value="10+">10+ Persons (Private Hall)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#bcb5aa] block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#d8a45b]" />
                  <span>Occasion / Purpose</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Casual Dine-In',
                    'Birthday Party',
                    'Anniversary Celebration',
                    'Family Dinner',
                    'Friends Hangout',
                    'Meeting / Study',
                  ].map((occ) => (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      className={`px-2.5 py-1.5 text-xs rounded border transition-colors cursor-pointer text-left ${
                        occasion === occ
                          ? 'bg-[#d8a45b] text-[#171512] border-[#d8a45b] font-semibold'
                          : 'bg-[#171512] text-[#bcb5aa] border-[#393229] hover:border-[#81715c]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#bcb5aa] block mb-1">
                  Special Notes or Dietary Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday cake table arrangement, quiet booth near window, etc."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] placeholder-[#81715c] focus:outline-none focus:border-[#d8a45b]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#d8a45b] hover:bg-[#e5b46f] text-[#171512] font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md"
                >
                  Confirm Table Reservation
                </button>
                <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-[#bcb5aa]">
                  <Phone className="w-3 h-3 text-[#d8a45b]" />
                  <span>Need instant booking? Call: {RESTAURANT_INFO.phone}</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
