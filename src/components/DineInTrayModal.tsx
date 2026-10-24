import React, { useState } from 'react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface DineInTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenReservationWithItems?: () => void;
}

export const DineInTrayModal: React.FC<DineInTrayModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenReservationWithItems,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, c) => sum + c.item.price * c.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;

  const handleSendWhatsApp = () => {
    if (!guestName || !guestPhone) {
      alert('Please provide your name and phone number for the order inquiry.');
      return;
    }

    const itemsSummary = cartItems
      .map((c) => `• ${c.quantity}x ${c.item.name} (₹${c.item.price * c.quantity})`)
      .join('\n');

    const message = `*M3 CAFE & RESTAURANT - ORDER INQUIRY*\n` +
      `--------------------------------\n` +
      `👤 *Customer:* ${guestName}\n` +
      `📞 *Phone:* ${guestPhone}\n` +
      `🍽️ *Type:* ${orderType === 'dine-in' ? 'Dine-In Table Order' : 'Takeaway / Pickup'}\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : '') +
      `\n*Selected Dishes:*\n${itemsSummary}\n\n` +
      `*Subtotal:* ₹${subtotal}\n` +
      `*Estimated GST (5%):* ₹${gst}\n` +
      `*Estimated Total:* ₹${grandTotal}\n` +
      `--------------------------------\n` +
      `Sent via M3 Cafe & Restaurant Web Portal (Ayodhya)`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#1f1b16] border border-[#393229] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#393229] bg-[#24201b]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d8a45b]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#fff9f0]">
                Your Order Tray
              </h3>
              <span className="text-[11px] text-[#bcb5aa]">
                M3 Cafe &amp; Restaurant · Ayodhya
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#bcb5aa] hover:text-[#fff9f0] rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#fff9f0]">
                Inquiry Sent to M3 Cafe!
              </h4>
              <p className="text-sm text-[#bcb5aa] max-w-md mx-auto">
                Thank you, <strong className="text-[#fff9f0]">{guestName}</strong>! Your order inquiry has been initiated on WhatsApp. Our cafe team in Shakti Nagar will confirm availability immediately.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-[#d8a45b] text-[#171512] font-semibold text-xs tracking-wider uppercase rounded"
                >
                  Done
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#81715c] mx-auto opacity-50" />
              <p className="font-serif text-lg text-[#fff9f0]">Your tray is empty</p>
              <p className="text-xs text-[#bcb5aa]">
                Browse our menu and tap &quot;Add to Tray&quot; on your favorite dishes and beverages.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-[#d8a45b] text-[#171512] font-semibold text-xs tracking-wider uppercase rounded"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle */}
              <div className="flex items-center gap-2 p-1 bg-[#171512] border border-[#393229] rounded-lg">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                    orderType === 'dine-in'
                      ? 'bg-[#d8a45b] text-[#171512]'
                      : 'text-[#bcb5aa] hover:text-[#fff9f0]'
                  }`}
                >
                  Dine-In Table Order
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                    orderType === 'takeaway'
                      ? 'bg-[#d8a45b] text-[#171512]'
                      : 'text-[#bcb5aa] hover:text-[#fff9f0]'
                  }`}
                >
                  Takeaway / Pickup
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-[#393229]/60">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#fff9f0] truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#bcb5aa]">
                        ₹{item.price} each · <span className="text-[#d8a45b] font-medium">₹{item.price * quantity}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#393229] rounded bg-[#171512]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1.5 text-[#bcb5aa] hover:text-[#fff9f0]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#fff9f0] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1.5 text-[#bcb5aa] hover:text-[#fff9f0]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#81715c] hover:text-rose-400"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Breakdown */}
              <div className="p-4 rounded-lg bg-[#171512] border border-[#393229] space-y-2 text-xs">
                <div className="flex justify-between text-[#bcb5aa]">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums font-medium text-[#fff9f0]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#bcb5aa]">
                  <span>GST (5%)</span>
                  <span className="tabular-nums font-medium text-[#fff9f0]">₹{gst}</span>
                </div>
                <div className="pt-2 border-t border-[#393229] flex justify-between text-sm font-bold text-[#fff9f0]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-base text-[#d8a45b] tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              {/* Customer Info for WhatsApp Order */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#d8a45b] uppercase tracking-wider block">
                  Contact Details for Confirmation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#bcb5aa] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#bcb5aa] block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#bcb5aa] block mb-1">Special Request / Table Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, no onions, or birthday table setting"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171512] border border-[#393229] rounded text-xs text-[#fff9f0] focus:outline-none focus:border-[#d8a45b]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!submitted && cartItems.length > 0 && (
          <div className="px-6 py-4 border-t border-[#393229] bg-[#24201b] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClearCart}
              className="text-xs text-[#81715c] hover:text-rose-400 self-start sm:self-auto"
            >
              Clear Tray
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onOpenReservationWithItems && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservationWithItems();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#81715c] hover:border-[#d8a45b] text-[#fff9f0] text-xs font-semibold rounded uppercase tracking-wider"
                >
                  Book Table
                </button>
              )}

              <button
                onClick={handleSendWhatsApp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
