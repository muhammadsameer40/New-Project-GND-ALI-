import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/products';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  cartCount?: number; // Maintained for compatibility, but handled reactively
}

// Mega Menu Data exactly matching vcoterie.com
const shopByColumns = [
  {
    title: 'Profession',
    links: [
      { label: 'Aesthetics / Injectors', href: '#' },
      { label: 'Dentistry', href: '#' },
      { label: 'Doctors', href: '#' },
      { label: 'Nurses', href: '#' },
      { label: 'Mental Health', href: '#' },
      { label: 'Pharmacy', href: '#' },
      { label: 'Radiology', href: '#' },
      { label: 'Science', href: '#' },
      { label: 'Sonography', href: '#' },
      { label: 'Surgery', href: '#' },
      { label: 'Veterinary Medicine', href: '#' },
      { label: 'All Gifts', href: '#' },
    ]
  },
  {
    title: 'Jewelry',
    links: [
      { label: 'Lockets & Charms', href: '#' },
      { label: 'Bracelets', href: '#' },
      { label: 'Rings', href: '#' },
      { label: 'Earrings', href: '#' },
      { label: 'Chains', href: '#' },
      { label: 'Necklaces', href: '#' },
    ]
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Lapel Pins', href: '#' },
      { label: 'For Your Stethoscope', href: '#' },
      { label: 'Bundles', href: '#' },
      { label: 'Badge Buddies', href: '#' },
      { label: 'Locking Pin Backs', href: '#' },
      { label: 'Rubber Pin Backs', href: '#' },
    ]
  },
  {
    title: 'Trending Now',
    links: [
      { label: 'Stethoscope Collection', href: '#' },
      { label: 'Capsule Collection', href: '#' },
      { label: 'Everyday Essentials', href: '#' },
      { label: 'Hoops and Huggies', href: '#' },
    ]
  }
];

const jewelryMenuColumns = [
  {
    title: 'Categories',
    links: [
      { label: 'Bracelets', href: '#' },
      { label: 'Necklaces', href: '#' },
      { label: 'Chains', href: '#' },
      { label: 'Lockets & Charms', href: '#' },
      { label: 'Stud Earrings', href: '#' },
      { label: 'Earrings', href: '#' },
      { label: 'Rings', href: '#' },
    ]
  },
  {
    title: 'Trending',
    links: [
      { label: 'Pill Collection', href: '#' },
      { label: 'V Coterie Picks', href: '#' },
      { label: 'Stethoscope Charms', href: '#' },
      { label: 'Statement Earrings', href: '#' },
    ]
  }
];

const giftsMenuColumns = [
  {
    title: 'Shop by',
    links: [
      { label: 'Bulk Gifting', href: '#' },
      { label: 'Custom Pins', href: '#' },
      { label: 'Digital Gift Card', href: '#' },
      { label: 'V Coterie Picks', href: '#' },
      { label: 'All Gifts', href: '#' },
    ]
  },
  {
    title: 'Occasions',
    links: [
      { label: 'Graduation', href: '#' },
    ]
  },
  {
    title: 'Gifts by Price',
    links: [
      { label: 'Gifts Under PKR 5,000', href: '#' },
      { label: 'Gifts Under PKR 10,000', href: '#' },
      { label: 'Gifts Under PKR 20,000', href: '#' },
      { label: 'Gifts Under PKR 30,000', href: '#' },
      { label: 'Gifts Under PKR 50,000', href: '#' },
    ]
  }
];

const fineMenuColumns = [
  {
    title: 'Best Sellers',
    links: [
      { label: 'All Fine Jewelry', href: '#' },
      { label: 'Personalized', href: '#' },
      { label: 'Titles', href: '#' },
      { label: 'Lab-Grown Diamonds', href: '#' },
    ]
  }
];

// Footer navigation link groupings inside mobile drawer to match vcoterie.com
const mobileFooterLinks = [
  { label: 'FAQs', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns & Exchanges', href: '#' },
  { label: 'Sign Up For Texts', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export default function Header({ cartCount: initialCartCount = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  // Custom dropdown expander for nested submenus on mobile
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);

  // Cart State (stored in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ali_gold_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftChecked, setGiftChecked] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Synchronize cart changes with localStorage
  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('ali_gold_cart', JSON.stringify(newItems));
  };

  const addToCart = (product: Product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      const updated = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updated);
    } else {
      updateCart([...cartItems, { ...product, quantity: 1 }]);
    }
    // Automatically slide cart drawer open
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    updateCart(updated);
  };

  const removeFromCart = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
  };

  // Add listener for global 'add-to-cart' event (triggered by Product Cards, etc.)
  useEffect(() => {
    const handleAddToCartEvent = (e: Event) => {
      const product = (e as CustomEvent).detail as Product;
      if (product) {
        addToCart(product);
      }
    };
    window.addEventListener('add-to-cart', handleAddToCartEvent);
    return () => window.removeEventListener('add-to-cart', handleAddToCartEvent);
  }, [cartItems]);

  // Prevent background scrolling when side drawers are open
  useEffect(() => {
    if (isCartOpen || mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen, mobileOpen]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping threshold calculations (matching Announcement Bar threshold PKR 25,000)
  const freeShippingThreshold = 25000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeeded = freeShippingThreshold - subtotal;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment gateway loading
    setTimeout(() => {
      setIsCheckingOut(false);
      alert(`Thank you for your order! Checkout simulated successfully.\n\nSubtotal: ${formatPrice(subtotal)}\nItems Count: ${totalItemsCount}${giftChecked ? `\nGift Message: "${giftMessage}"` : ''}`);
      updateCart([]); // Reset cart
      setIsCartOpen(false);
      setGiftChecked(false);
      setGiftMessage('');
    }, 1500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Search results for "${searchQuery}" (Demo Mode)`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 w-full ${
          scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-100/50'
        }`}
      >
        {/* Desktop Header Layout */}
        <div className="hidden md:flex items-center justify-between px-8 lg:px-16 py-0 h-20 max-w-screen-2xl mx-auto">
          
          {/* 1. Left Nav Link Items */}
          <nav className="left-nav-area flex items-center gap-10 h-full">
            
            {/* Nav Item: Shop By (Mega Menu) */}
            <div className="nav-item flex items-center h-full group">
              <a
                href="#"
                className="underline__hover flex items-center text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7"
              >
                Shop By
              </a>
              
              {/* Shop By Mega Menu Panel */}
              <div className="mega-menu">
                <div className="max-w-screen-2xl mx-auto px-16 py-10 flex gap-12">
                  <div className="flex-1 grid grid-cols-4 gap-8">
                    {shopByColumns.map((col) => (
                      <div key={col.title}>
                        <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#010101] mb-4 border-b border-gray-100 pb-2">
                          {col.title}
                        </h4>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-[11px] font-sans text-gray-500 hover:text-[#010101] transition-colors duration-200 block py-0.5 tracking-wider"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right hand side dual image cards block */}
                  <div className="w-[450px] flex-shrink-0 border-l border-gray-100 pl-8 flex gap-6">
                    <div className="flex-1 group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/Dora_BotoxStuds_460x307.jpg" 
                          alt="Smooth Operators" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">Smooth Operators</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Shop Now</a>
                      </div>
                    </div>
                    
                    <div className="flex-1 group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/Dr_Script_Ring_460x307.jpg" 
                          alt="Best Sellers" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">Best Sellers</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Shop Rings</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Item: Jewelry (Mega Menu) */}
            <div className="nav-item flex items-center h-full group">
              <a
                href="#"
                className="underline__hover flex items-center text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7"
              >
                Jewelry
              </a>
              
              {/* Jewelry Mega Menu Panel */}
              <div className="mega-menu">
                <div className="max-w-screen-2xl mx-auto px-16 py-10 flex gap-12">
                  <div className="flex-1 grid grid-cols-3 gap-8">
                    {jewelryMenuColumns.map((col) => (
                      <div key={col.title}>
                        <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#010101] mb-4 border-b border-gray-100 pb-2">
                          {col.title}
                        </h4>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-[11px] font-sans text-gray-500 hover:text-[#010101] transition-colors duration-200 block py-0.5 tracking-wider"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div></div> {/* Spacing Column */}
                  </div>
                  
                  {/* Right hand side single image card block */}
                  <div className="w-[300px] flex-shrink-0 border-l border-gray-100 pl-8">
                    <div className="group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/Charms_Hanging_460x307.jpg" 
                          alt="So Charming" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">So Charming</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Shop Charms</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Item: Best Sellers (Link) */}
            <a href="#" className="underline__hover text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7">
              Best Sellers
            </a>

            {/* Nav Item: Gifts (Mega Menu) */}
            <div className="nav-item flex items-center h-full group">
              <a
                href="#"
                className="underline__hover flex items-center text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7"
              >
                Gifts
              </a>
              
              {/* Gifts Mega Menu Panel */}
              <div className="mega-menu">
                <div className="max-w-screen-2xl mx-auto px-16 py-10 flex gap-12">
                  <div className="flex-1 grid grid-cols-3 gap-8">
                    {giftsMenuColumns.map((col) => (
                      <div key={col.title}>
                        <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#010101] mb-4 border-b border-gray-100 pb-2">
                          {col.title}
                        </h4>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-[11px] font-sans text-gray-500 hover:text-[#010101] transition-colors duration-200 block py-0.5 tracking-wider"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right hand side dual image cards block */}
                  <div className="w-[450px] flex-shrink-0 border-l border-gray-100 pl-8 flex gap-6">
                    <div className="flex-1 group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/Dora_PillBottle_AnatomicalHeart_460x307.jpg" 
                          alt="Make It Special" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">Make It Special</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Shop Gifts</a>
                      </div>
                    </div>
                    
                    <div className="flex-1 group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/V_Coterie_Gift_Card_460x307.png" 
                          alt="Gift Cards" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">Gift Cards</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Buy Gift Cards</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Item: Sale (Link) */}
            <a href="#" className="underline__hover text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7">
              Sale
            </a>

            {/* Nav Item: Our Story (Link) */}
            <a href="#" className="underline__hover text-[13px] font-sans font-semibold tracking-[0.03em] text-[#010101] py-7">
              Our Story
            </a>

            {/* Nav Item: Fine Logo (Mega Menu) */}
            <div className="nav-item flex items-center h-full group">
              <a href="#" className="flex items-center py-7">
                <img 
                  src="https://vcoterie.com/cdn/shop/files/Fine_87227d4f-2d89-4845-b1c3-6a3895135e39.png" 
                  alt="Fine Jewelry Logo" 
                  className="h-[22px] w-auto object-contain transition-opacity duration-200 hover:opacity-70"
                />
              </a>
              
              {/* Fine Jewelry Mega Menu Panel */}
              <div className="mega-menu">
                <div className="max-w-screen-2xl mx-auto px-16 py-10 flex gap-12">
                  <div className="flex-1 grid grid-cols-3 gap-8">
                    {fineMenuColumns.map((col) => (
                      <div key={col.title}>
                        <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#010101] mb-4 border-b border-gray-100 pb-2">
                          {col.title}
                        </h4>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-[11px] font-sans text-gray-500 hover:text-[#010101] transition-colors duration-200 block py-0.5 tracking-wider"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div></div> {/* Spacing Column */}
                    <div></div> {/* Spacing Column */}
                  </div>
                  
                  {/* Right hand side single image card block */}
                  <div className="w-[300px] flex-shrink-0 border-l border-gray-100 pl-8">
                    <div className="group/navcard relative overflow-hidden block bg-gray-50">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src="https://vcoterie.com/cdn/shop/files/Stethoscope-Letter-Necklace-Fine_460x307.gif" 
                          alt="Personalized" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/navcard:scale-105"
                        />
                      </div>
                      <div className="mt-3">
                        <h5 className="font-serif text-sm font-normal italic text-[#010101]">Personalized</h5>
                        <a href="#" className="link-cta mt-1 text-[9px]">Discover Fine</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </nav>

          {/* 2. Middle Centered Logo (Kept User's Original Logo) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <a href="/">
              <img 
                src="/1gm8K.jpg" 
                alt="Ali Gold n Diamond" 
                className="h-[52px] w-auto object-contain transition-transform duration-300 hover:scale-105" 
              />
            </a>
          </div>

          {/* 3. Right Icons and Actions */}
          <nav className="right-nav-area flex items-center gap-6">
            
            {/* Search Input inline with icon */}
            <form onSubmit={handleSearchSubmit} className="hidden xl:flex items-center border-b border-[#010101] pb-1 w-[180px] gap-2">
              <button type="submit" className="text-[#010101] hover:opacity-70 transition-opacity">
                <Search size={16} className="stroke-[2.5]" />
              </button>
              <input 
                type="search" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs font-sans outline-none text-[#010101] placeholder-gray-400 w-full font-medium"
              />
            </form>

            {/* Search icon for small screens (displays mockup query box) */}
            <button 
              onClick={() => {
                const q = prompt("What are you looking for?");
                if (q) alert(`Search results for "${q}" (Demo Mode)`);
              }}
              className="xl:hidden p-1.5 text-[#010101] hover:opacity-75 transition-opacity" 
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Account link icon */}
            <a href="#" className="p-1.5 text-[#010101] hover:opacity-75 transition-opacity" aria-label="Account">
              <User size={18} />
            </a>

            {/* Shopping Cart Icon Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 text-[#010101] hover:opacity-75 transition-opacity relative flex items-center" 
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#010101] text-white text-[9px] w-[14px] h-[14px] flex items-center justify-center rounded-full font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Header view */}
        <div className="flex md:hidden items-center justify-between px-5 h-16 relative">
          
          {/* Hamburger trigger */}
          <button onClick={() => setMobileOpen(true)} className="p-1 text-[#010101]" aria-label="Menu">
            <Menu size={20} />
          </button>
          
          {/* Mobile centered logo */}
          <a href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="/Logo_Ali.webp" alt="Ali Gold n Diamond" className="h-9 w-auto object-contain" />
          </a>
          
          {/* Mobile Right hand icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const q = prompt("What are you looking for?");
                if (q) alert(`Search results for "${q}" (Demo Mode)`);
              }}
              className="p-1 text-[#010101]" 
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-[#010101] relative flex items-center" 
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#010101] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation sliding drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            
            {/* Drawer Content */}
            <div className="relative bg-white w-80 h-full overflow-y-auto shadow-2xl flex flex-col transition-transform duration-300">
              
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <img src="/Logo_Ali.webp" alt="Ali Gold n Diamond" className="h-10 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)} className="p-1 text-[#010101]" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              
              {/* Search input in mobile menu */}
              <div className="px-6 py-4 border-b border-gray-50">
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-50 px-3 py-2 border border-gray-200">
                  <input 
                    type="search" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs font-sans tracking-widest outline-none text-[#010101] placeholder-gray-400 w-full uppercase"
                  />
                  <button type="submit" className="p-0.5 text-gray-500">
                    <Search size={14} />
                  </button>
                </form>
              </div>
              
              {/* Drawer Accordion Links */}
              <nav className="flex-1 py-4">
                
                {/* Accordion: Shop By */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase"
                    onClick={() => setMobileExpanded(mobileExpanded === 'shopBy' ? null : 'shopBy')}
                  >
                    Shop By
                    <ChevronDown size={12} className={`transition-transform duration-200 ${mobileExpanded === 'shopBy' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'shopBy' && (
                    <div className="bg-[#faf9f9] border-t border-b border-gray-100/50 py-2">
                      {shopByColumns.map((col) => (
                        <div key={col.title} className="px-8 py-2">
                          <button 
                            onClick={() => setMobileSubExpanded(mobileSubExpanded === col.title ? null : col.title)}
                            className="w-full text-left text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5 flex items-center justify-between"
                          >
                            {col.title}
                            <ChevronDown size={10} className={`transition-transform duration-200 ${mobileSubExpanded === col.title ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileSubExpanded === col.title && (
                            <ul className="space-y-1.5 pl-2 pb-2 mt-1">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <a href={link.href} className="text-[11px] font-sans text-gray-700 block py-0.5 tracking-wider">{link.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion: Jewelry */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase"
                    onClick={() => setMobileExpanded(mobileExpanded === 'jewelry' ? null : 'jewelry')}
                  >
                    Jewelry
                    <ChevronDown size={12} className={`transition-transform duration-200 ${mobileExpanded === 'jewelry' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'jewelry' && (
                    <div className="bg-[#faf9f9] border-t border-b border-gray-100/50 py-2">
                      {jewelryMenuColumns.map((col) => (
                        <div key={col.title} className="px-8 py-2">
                          <button 
                            onClick={() => setMobileSubExpanded(mobileSubExpanded === col.title ? null : col.title)}
                            className="w-full text-left text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5 flex items-center justify-between"
                          >
                            {col.title}
                            <ChevronDown size={10} className={`transition-transform duration-200 ${mobileSubExpanded === col.title ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileSubExpanded === col.title && (
                            <ul className="space-y-1.5 pl-2 pb-2 mt-1">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <a href={link.href} className="text-[11px] font-sans text-gray-700 block py-0.5 tracking-wider">{link.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Link: Best Sellers */}
                <a href="#" className="block px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase">
                  Best Sellers
                </a>

                {/* Accordion: Gifts */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase"
                    onClick={() => setMobileExpanded(mobileExpanded === 'gifts' ? null : 'gifts')}
                  >
                    Gifts
                    <ChevronDown size={12} className={`transition-transform duration-200 ${mobileExpanded === 'gifts' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'gifts' && (
                    <div className="bg-[#faf9f9] border-t border-b border-gray-100/50 py-2">
                      {giftsMenuColumns.map((col) => (
                        <div key={col.title} className="px-8 py-2">
                          <button 
                            onClick={() => setMobileSubExpanded(mobileSubExpanded === col.title ? null : col.title)}
                            className="w-full text-left text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5 flex items-center justify-between"
                          >
                            {col.title}
                            <ChevronDown size={10} className={`transition-transform duration-200 ${mobileSubExpanded === col.title ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileSubExpanded === col.title && (
                            <ul className="space-y-1.5 pl-2 pb-2 mt-1">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <a href={link.href} className="text-[11px] font-sans text-gray-700 block py-0.5 tracking-wider">{link.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Link: Sale */}
                <a href="#" className="block px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase">
                  Sale
                </a>

                {/* Link: Our Story */}
                <a href="#" className="block px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase">
                  Our Story
                </a>

                {/* Accordion: Fine Jewelry */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[11px] font-sans font-bold tracking-widest text-[#010101] uppercase"
                    onClick={() => setMobileExpanded(mobileExpanded === 'fine' ? null : 'fine')}
                  >
                    Fine Jewelry
                    <ChevronDown size={12} className={`transition-transform duration-200 ${mobileExpanded === 'fine' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === 'fine' && (
                    <div className="bg-[#faf9f9] border-t border-b border-gray-100/50 py-2">
                      {fineMenuColumns.map((col) => (
                        <div key={col.title} className="px-8 py-2">
                          <button 
                            onClick={() => setMobileSubExpanded(mobileSubExpanded === col.title ? null : col.title)}
                            className="w-full text-left text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1.5 flex items-center justify-between"
                          >
                            {col.title}
                            <ChevronDown size={10} className={`transition-transform duration-200 ${mobileSubExpanded === col.title ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileSubExpanded === col.title && (
                            <ul className="space-y-1.5 pl-2 pb-2 mt-1">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <a href={link.href} className="text-[11px] font-sans text-gray-700 block py-0.5 tracking-wider">{link.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Drawer Footer Utilities */}
                <div className="mt-8 pt-8 border-t border-gray-100 px-6">
                  <ul className="space-y-3">
                    {mobileFooterLinks.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="text-xs font-sans font-normal text-gray-500 hover:text-[#010101] tracking-wide block py-0.5">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
              
              {/* Account details in drawer */}
              <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-3">
                <a href="#" className="flex items-center gap-2 text-xs font-bold text-[#010101] uppercase tracking-wider font-sans">
                  <User size={14} /> Account
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Side Cart Drawer Component (Right Align) */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        />

        {/* Sliding Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Cart Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-[#010101] flex items-center gap-2">
              Shopping Bag
              {totalItemsCount > 0 && <span className="text-gray-400 font-normal">({totalItemsCount})</span>}
            </h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#010101] hover:opacity-75 transition-opacity" 
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            
            {cartItems.length > 0 ? (
              <>
                {/* Free Shipping Progress Indicator */}
                <div className="mb-6 bg-gray-50 p-4 border border-gray-100 text-center">
                  {isFreeShipping ? (
                    <p className="text-[11px] font-sans font-bold uppercase tracking-[0.05em] text-[#010101]">
                      🎉 Congratulations! You have unlocked <span className="underline">FREE SHIPPING</span>
                    </p>
                  ) : (
                    <p className="text-[11px] font-sans tracking-[0.05em] text-gray-600">
                      You are only <span className="font-bold text-[#010101]">{formatPrice(amountNeeded)}</span> away from <span className="font-bold">FREE SHIPPING</span>
                    </p>
                  )}
                  {/* Progress track */}
                  <div className="mt-2.5 w-full bg-gray-200 h-1 rounded-none overflow-hidden">
                    <div 
                      className="bg-[#010101] h-full transition-all duration-500 ease-out" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4 flex-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                      {/* Image */}
                      <div className="w-20 h-20 bg-[#f6f6f6] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-[11px] font-sans font-medium text-[#010101] uppercase tracking-wider leading-snug">
                              {item.name}
                            </h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          {item.category && (
                            <p className="text-[9px] font-sans text-gray-400 uppercase tracking-widest mt-0.5">
                              {item.category}
                            </p>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 text-xs font-sans text-[#010101] font-bold min-w-[20px] text-center select-none">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <span className="text-[11px] font-sans font-bold text-[#010101]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Empty State matching vcoterie
              <div className="flex-1 flex flex-col justify-center items-center text-center py-12">
                <ShoppingBag size={32} className="text-gray-300 mb-4 stroke-1" />
                <h4 className="font-serif text-lg text-[#010101] italic font-normal mb-2">Your bag is empty.</h4>
                <p className="text-[11px] font-sans text-gray-400 uppercase tracking-[0.1em] mb-8">Add beautiful pieces to get started.</p>
                
                {/* Empty State Browse Link categories */}
                <div className="w-full text-left border-t border-gray-100 pt-6">
                  <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#010101] uppercase mb-4">Start Shopping</p>
                  <ul className="space-y-3.5">
                    {['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Chains'].map((cat) => (
                      <li key={cat} className="border-b border-gray-50 pb-2">
                        <a 
                          href="#" 
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-sans text-gray-600 hover:text-[#010101] hover:pl-1 transition-all duration-300 flex items-center justify-between uppercase tracking-widest font-medium"
                        >
                          {cat}
                          <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50">
              
              {/* Gift Message Accordion option */}
              <div className="border-b border-gray-200/60 pb-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={giftChecked}
                    onChange={(e) => setGiftChecked(e.target.checked)}
                    className="accent-[#010101]"
                  />
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-gray-700">
                    Add a free gift message
                  </span>
                </label>
                
                {giftChecked && (
                  <div className="mt-2.5 animate-fade-in">
                    <textarea
                      placeholder="Write your personal gift message here..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value.slice(0, 250))}
                      rows={2.5}
                      className="w-full text-xs font-sans p-2 border border-gray-200 outline-none focus:border-[#010101] bg-white resize-none"
                    />
                    <div className="text-right text-[9px] text-gray-400 tracking-wider mt-0.5">
                      {giftMessage.length}/250 characters
                    </div>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#010101]">Subtotal</span>
                <span className="text-sm font-sans font-bold text-[#010101]">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[9px] font-sans text-gray-400 uppercase tracking-widest leading-normal">
                Shipping, duties, and taxes calculated at checkout.
              </p>

              {/* Checkout CTA */}
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#010101] text-white hover:bg-white hover:text-[#010101] border border-[#010101] transition-all duration-300 font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 rounded-none flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-400"
              >
                {isCheckingOut ? (
                  <>
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </>
                ) : (
                  'Proceed To Checkout'
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
