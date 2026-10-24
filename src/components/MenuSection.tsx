import React, { useState, useMemo } from 'react';
import {
  OFFICIAL_MENU_TABLE,
  MENU_ITEMS,
  MENU_BOOKLET_CARDS,
  MenuItem,
  MenuTableRow,
  MenuBookletCard,
  RESTAURANT_INFO,
} from '../data/restaurantData';
import {
  Search,
  Plus,
  Check,
  Utensils,
  Star,
  Clock,
  Filter,
  X,
  ArrowRight,
  Compass,
  ShoppingBag,
} from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItems: { item: MenuItem; quantity: number }[];
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartItems,
  onOpenCart,
}) => {
  const [selectedCategoryRow, setSelectedCategoryRow] = useState<MenuTableRow | null>(null);
  const [selectedBookletCard, setSelectedBookletCard] = useState<MenuBookletCard | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'beverage'>('all');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  // Filtered menu items for the live dishes list
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === 'all' || item.categoryId === activeCategoryFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && item.diet === 'veg') ||
        (dietFilter === 'beverage' && item.diet === 'beverage');

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategoryFilter, searchQuery, dietFilter]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  const getItemQuantity = (id: string) => {
    const found = cartItems.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  const handleSeeMenuClick = (row: MenuTableRow) => {
    setSelectedCategoryRow(row);
  };

  // Dishes belonging to currently inspected category row
  const categoryDishes = useMemo(() => {
    if (!selectedCategoryRow) return [];
    return MENU_ITEMS.filter((item) => item.categoryId === selectedCategoryRow.categoryId);
  }, [selectedCategoryRow]);

  // Dishes belonging to currently inspected booklet card
  const cardDishes = useMemo(() => {
    if (!selectedBookletCard) return [];
    return MENU_ITEMS.filter((item) => item.categoryId === selectedBookletCard.categoryId);
  }, [selectedBookletCard]);

  return (
    <section id="menu" className="bg-[#111a16] text-[#f7f2e8] py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-[#39463e]">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* SECTION 1: OFFICIAL FOOD MENU TABLE (Exact structure requested) */}
        <div>
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#d8b878] mb-2 tracking-tight">
              M3 Cafe &amp; Restaurant
            </h2>
            <p className="text-sm sm:text-base text-[#dddddd] font-medium tracking-wide">
              Our Food Menu · Ayodhya
            </p>
            <div className="mt-3">
              <a
                className="inline-flex items-center gap-2 bg-[#d9b779] hover:bg-[#e5c78f] text-[#171713] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Compass className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* 15-Category Official Menu Table */}
          <div className="overflow-x-auto rounded-lg border border-[#39463e] shadow-2xl bg-[#1b2721] max-w-4xl mx-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#c7a568] text-[#172019]">
                  <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-16 text-center">
                    S.No.
                  </th>
                  <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-52">
                    Category
                  </th>
                  <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">
                    Menu Items
                  </th>
                  <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-right w-32">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#39463e]">
                {OFFICIAL_MENU_TABLE.map((row) => (
                  <tr
                    key={row.sNo}
                    onClick={() => handleSeeMenuClick(row)}
                    className="hover:bg-[#29382f] transition-colors cursor-pointer group"
                    title="Click to view all dishes and prices"
                  >
                    <td className="py-3 px-4 text-center font-mono text-xs text-[#d8b878] font-bold">
                      {row.sNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#fff9ee] group-hover:text-[#d8b878] transition-colors whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="py-3 px-4 text-[#c7c7c7] text-xs">
                      {row.menuItems}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d8b878] group-hover:text-[#fff9ee] transition-colors underline decoration-[#d8b878]/50">
                        <span>See Menu</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center mt-5 text-[#d8b878] text-xs sm:text-sm font-medium">
            Please check the menu images &amp; live cards for exact dish names and prices. Tap &ldquo;See Menu&rdquo; on any row to view dishes.
          </p>
        </div>

        {/* SECTION 2: MENU GALLERY (10 Boards from requested HTML) */}
        <div className="pt-8 border-t border-[#39463e]/60">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8b878] block mb-1">
              Visual Tour
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fff9ee]">
              Menu Boards &amp; Speciality Cards
            </h3>
            <p className="text-xs sm:text-sm text-[#bcb5aa] mt-1">
              Select any board to view our chef-recommended preparations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {MENU_BOOKLET_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedBookletCard(card)}
                className="bg-[#1c261f] p-3 border border-[#554b36] hover:border-[#d9b779] rounded-md shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="relative h-44 w-full overflow-hidden rounded bg-[#111713]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c261f] via-transparent to-transparent opacity-75" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#111713]/90 text-[10px] font-bold text-[#d9b779] border border-[#554b36]">
                    {card.itemCount}
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-center text-[#fff9ee] mt-3 mb-1 group-hover:text-[#d9b779] transition-colors">
                  {card.title}
                </h4>
                <p className="text-[11px] text-[#bcb5aa] text-center line-clamp-2 px-2 mb-3">
                  {card.description}
                </p>

                <div className="pt-2 border-t border-[#39463e] flex items-center justify-between text-xs text-[#d9b779]">
                  <span className="text-[11px] text-[#c7c7c7]">Explore dishes</span>
                  <span className="flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>View Menu</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: LIVE DISHES & INTERACTIVE DINE-IN TRAY */}
        <div className="pt-10 border-t border-[#39463e]/60">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d8b878] block mb-1">
              Order Online &amp; Dine-In
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fff9ee]">
              All Dishes with Live ₹ Prices
            </h3>
            <p className="text-xs sm:text-sm text-[#bcb5aa] mt-1">
              Search by name, filter by diet, and add items directly to your order tray.
            </p>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#81715c]" />
                <input
                  type="text"
                  placeholder="Search momos, dal makhani, paneer tikka, shake, coffee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#1b2721] border border-[#39463e] rounded text-sm text-[#fff9ee] placeholder-[#81715c] focus:outline-none focus:border-[#d9b779]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#81715c] hover:text-[#fff9ee]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Diet Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#bcb5aa] flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#d9b779]" />
                  <span>Diet:</span>
                </span>
                <div className="flex items-center gap-1 p-1 bg-[#1b2721] border border-[#39463e] rounded">
                  <button
                    onClick={() => setDietFilter('all')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      dietFilter === 'all'
                        ? 'bg-[#d9b779] text-[#171713] font-semibold'
                        : 'text-[#bcb5aa] hover:text-[#fff9ee]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietFilter('veg')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      dietFilter === 'veg'
                        ? 'bg-[#d9b779] text-[#171713] font-semibold'
                        : 'text-[#bcb5aa] hover:text-[#fff9ee]'
                    }`}
                  >
                    Pure Veg
                  </button>
                  <button
                    onClick={() => setDietFilter('beverage')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      dietFilter === 'beverage'
                        ? 'bg-[#d9b779] text-[#171713] font-semibold'
                        : 'text-[#bcb5aa] hover:text-[#fff9ee]'
                    }`}
                  >
                    Beverages
                  </button>
                </div>
              </div>
            </div>

            {/* Category Quick Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => {
                  setActiveCategoryFilter('all');
                  setSearchQuery('');
                }}
                className={`px-3.5 py-1.5 text-xs rounded transition-all whitespace-nowrap shrink-0 ${
                  activeCategoryFilter === 'all' && searchQuery === ''
                    ? 'bg-[#d9b779] text-[#171713] font-bold'
                    : 'bg-[#1b2721] text-[#c7c7c7] border border-[#39463e] hover:text-[#fff9ee]'
                }`}
              >
                All Categories ({MENU_ITEMS.length})
              </button>

              {OFFICIAL_MENU_TABLE.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => {
                    setActiveCategoryFilter(cat.categoryId);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-1.5 text-xs rounded transition-all whitespace-nowrap shrink-0 ${
                    activeCategoryFilter === cat.categoryId
                      ? 'bg-[#d9b779] text-[#171713] font-bold'
                      : 'bg-[#1b2721] text-[#c7c7c7] border border-[#39463e] hover:text-[#fff9ee]'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Cards Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                const isJustAdded = addedItemId === item.id;

                return (
                  <article
                    key={item.id}
                    className="bg-[#1c261f] border border-[#39463e] hover:border-[#d9b779]/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-lg"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-[#111713]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c261f] via-transparent to-transparent opacity-80" />

                      {item.badge && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#111713]/90 border border-[#d9b779]/40 text-[#d9b779] text-[10px] uppercase font-bold tracking-wider">
                          {item.badge}
                        </div>
                      )}

                      <div className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded bg-[#111713]/90 border border-[#39463e]">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.diet === 'veg'
                              ? 'bg-emerald-500'
                              : 'bg-amber-400'
                          }`}
                          title={item.diet === 'veg' ? 'Vegetarian' : 'Beverage'}
                        />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#bcb5aa] mb-1.5">
                          <span className="text-[#d9b779] font-medium">{item.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.prepTime}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 text-[#ded7cd]">
                            <Star className="w-3 h-3 text-[#d9b779] fill-[#d9b779]" />
                            <span className="tabular-nums">{item.rating}</span>
                          </span>
                        </div>

                        <h4 className="font-serif text-base font-bold text-[#fff9ee] group-hover:text-[#d9b779] transition-colors mb-1.5">
                          {item.name}
                        </h4>

                        <p className="text-xs text-[#bcb5aa] leading-relaxed line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#39463e] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#bcb5aa] block">Price</span>
                          <span className="font-serif text-lg font-bold text-[#d9b779] tabular-nums">
                            ₹{item.price}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAdd(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider rounded transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : qty > 0
                              ? 'bg-[#d9b779] text-[#171713] hover:bg-[#e5c78f]'
                              : 'border border-[#81715c] text-[#fff9ee] hover:border-[#d9b779] hover:text-[#d9b779] bg-[#111713]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : qty > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>In Tray ({qty})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Tray</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 px-4 bg-[#1c261f] border border-[#39463e] rounded-lg max-w-md mx-auto">
              <Utensils className="w-10 h-10 text-[#81715c] mx-auto mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#fff9ee] mb-1">
                No items match filters
              </h4>
              <p className="text-xs text-[#bcb5aa] mb-4">
                Clear search query or reset category filter to see all dishes.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategoryFilter('all');
                  setDietFilter('all');
                }}
                className="px-4 py-2 bg-[#d9b779] text-[#171713] font-semibold text-xs tracking-wider uppercase rounded"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Quick Order Tray Bar */}
          {cartItems.length > 0 && (
            <div className="mt-10 p-4 rounded-lg bg-[#1c261f] border border-[#d9b779] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d9b779] text-[#171713] flex items-center justify-center font-bold text-sm tabular-nums">
                  {cartItems.reduce((acc, c) => acc + c.quantity, 0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#fff9ee]">
                    Your Dine-In &amp; Order Tray
                  </div>
                  <div className="text-xs text-[#bcb5aa]">
                    {cartItems.length} dish(es) in tray · Send instant WhatsApp order to M3 Cafe Ayodhya
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenCart}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#d9b779] hover:bg-[#e5c78f] text-[#171713] font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md"
              >
                View Tray &amp; Send Inquiry ↗
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: VIEW DISHES FOR A TABLE CATEGORY (When clicking "See Menu" on row) */}
      {selectedCategoryRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1c261f] border border-[#554b36] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#39463e] bg-[#172019]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#d9b779] font-bold block">
                  Category #{selectedCategoryRow.sNo}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#fff9ee]">
                  {selectedCategoryRow.category}
                </h3>
                <p className="text-xs text-[#bcb5aa]">
                  {selectedCategoryRow.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedCategoryRow(null)}
                className="p-1.5 text-[#bcb5aa] hover:text-[#fff9ee] rounded"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="text-xs text-[#d9b779] font-medium pb-2 border-b border-[#39463e]">
                Available Dishes in {selectedCategoryRow.category}:
              </div>

              {categoryDishes.length > 0 ? (
                <div className="space-y-3 divide-y divide-[#39463e]/60">
                  {categoryDishes.map((dish) => {
                    const qty = getItemQuantity(dish.id);
                    const isJustAdded = addedItemId === dish.id;

                    return (
                      <div key={dish.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                dish.diet === 'veg' ? 'bg-emerald-500' : 'bg-amber-400'
                              }`}
                            />
                            <h4 className="font-medium text-sm text-[#fff9ee] truncate">
                              {dish.name}
                            </h4>
                          </div>
                          <p className="text-xs text-[#bcb5aa] line-clamp-1 mt-0.5">
                            {dish.description}
                          </p>
                          <div className="text-xs font-serif font-bold text-[#d9b779] mt-1 tabular-nums">
                            ₹{dish.price}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAdd(dish)}
                          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : qty > 0
                              ? 'bg-[#d9b779] text-[#171713]'
                              : 'border border-[#81715c] text-[#fff9ee] hover:border-[#d9b779]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : qty > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>In Tray ({qty})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-[#bcb5aa]">
                  Special order available upon request. Ask our team!
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-[#39463e] bg-[#172019] flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveCategoryFilter(selectedCategoryRow.categoryId);
                  setSelectedCategoryRow(null);
                }}
                className="text-xs text-[#d9b779] hover:underline"
              >
                Filter main menu by {selectedCategoryRow.category} →
              </button>

              <button
                onClick={() => setSelectedCategoryRow(null)}
                className="px-4 py-2 bg-[#d9b779] text-[#171713] text-xs font-bold uppercase tracking-wider rounded"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW DETAILS OF A MENU BOARD CARD */}
      {selectedBookletCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#1c261f] border border-[#554b36] rounded-xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#39463e]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#d9b779] font-bold block">
                  Official Menu Board
                </span>
                <h3 className="font-serif text-xl font-bold text-[#fff9ee]">
                  {selectedBookletCard.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookletCard(null)}
                className="p-1 text-[#bcb5aa] hover:text-[#fff9ee]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 rounded-lg overflow-hidden border border-[#39463e] h-48 bg-[#111713]">
              <img
                src={selectedBookletCard.image}
                alt={selectedBookletCard.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#dddddd] leading-relaxed">
                {selectedBookletCard.description}
              </p>

              <div>
                <span className="text-xs font-semibold text-[#d9b779] block mb-1.5">
                  Popular Offerings in this Board:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedBookletCard.highlights.map((dish, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#111713] border border-[#39463e] rounded text-xs text-[#fff9ee]"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {cardDishes.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#d9b779] block mb-2">
                    Direct Order Items:
                  </span>
                  <div className="space-y-2">
                    {cardDishes.map((item) => (
                      <div key={item.id} className="p-2.5 rounded bg-[#111713] border border-[#39463e] flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#fff9ee]">{item.name}</div>
                          <div className="text-[11px] text-[#d9b779] font-mono">₹{item.price}</div>
                        </div>
                        <button
                          onClick={() => handleAdd(item)}
                          className="px-2.5 py-1 text-xs bg-[#d9b779] text-[#171713] font-bold rounded"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#39463e] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveCategoryFilter(selectedBookletCard.categoryId);
                  setSelectedBookletCard(null);
                }}
                className="flex-1 py-2.5 bg-[#d9b779] text-[#171713] font-bold text-xs uppercase tracking-wider rounded text-center transition-colors hover:bg-[#e5c78f]"
              >
                Filter All Dishes by this Board
              </button>

              <button
                onClick={() => setSelectedBookletCard(null)}
                className="px-4 py-2.5 border border-[#39463e] text-[#fff9ee] text-xs font-semibold rounded uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
