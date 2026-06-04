import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ShopByOccasion() {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: 'engagement', label: 'Engagement Rings' },
    { value: 'wedding', label: 'Wedding Bands' },
    { value: 'anniversary', label: 'Anniversary Gifts' },
    { value: 'bridal', label: 'Bridal Jewelry Sets' },
    { value: 'graduation', label: 'Graduation Gifts' },
    { value: 'birthday', label: 'Birthday Gifting' },
    { value: 'everyday', label: 'Everyday Essentials' },
    { value: 'custom', label: 'Custom Jewelry' },
  ];

  // Click outside listener to automatically close custom dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="w-full bg-[#faf9f9] border-b border-gray-100 flex flex-col md:flex-row items-stretch min-h-[420px] md:min-h-[500px] overflow-hidden select-none">
      
      {/* Left Column (Product Image on Light Background) */}
      <div className="hidden md:block md:w-[35%] relative overflow-hidden bg-[#faf9f9]">
        <img
          src="https://images.pexels.com/photos/3290240/pexels-photo-3290240.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop"
          alt="Necklace on light background"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] hover:scale-105"
        />
      </div>

      {/* Center Column (Centered Selector Form Area) */}
      <div className="w-full md:w-[30%] flex flex-col justify-center items-center text-center text-[#010101] px-6 py-12 bg-[#faf9f9] min-h-[400px] md:min-h-0">
        <h2 className="font-serif text-2xl md:text-3xl text-[#010101] font-normal tracking-[0.02em] leading-tight mb-4">
          Shop by Occasion
        </h2>
        <p className="text-xs md:text-sm font-sans font-light text-[#000000] mb-8 leading-relaxed max-w-[280px] md:max-w-none">
          Whether you're celebrating a milestone, gifting a loved one, or treating yourself — we have the perfect piece for every occasion.
        </p>

        {/* Custom Select Dropdown */}
        <div ref={dropdownRef} className="relative mb-2 w-full max-w-[320px] z-30">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#f6f6f6] text-[#010101] text-xs px-4 py-3.5 outline-none flex items-center justify-between cursor-pointer select-none rounded-none border border-gray-200 shadow-sm"
          >
            <span className="font-sans font-medium tracking-wider uppercase text-left">
              {selected ? categories.find(c => c.value === selected)?.label : "Select from the drop down"}
            </span>
            <ChevronDown size={14} className={`text-[#010101] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isOpen && (
            <div className="absolute left-0 right-0 top-full bg-[#f6f6f6] text-[#010101] border border-gray-200 border-t-0 z-50 max-h-[220px] overflow-y-auto rounded-none shadow-md">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  onClick={() => {
                    setSelected(cat.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-xs font-sans tracking-wider uppercase cursor-pointer hover:bg-gray-200 transition-colors text-left ${
                    selected === cat.value ? 'bg-gray-250 font-bold' : ''
                  }`}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shop Button */}
        <div className="h-16 w-full max-w-[320px]">
          {selected && (
            <a
              href="#"
              className="inline-flex items-center justify-center bg-[#010101] text-white hover:bg-white hover:text-[#010101] border border-[#010101] transition-all duration-300 text-[11px] font-sans font-bold tracking-[0.2em] uppercase py-3.5 px-8 w-full rounded-none shadow-md mt-4"
            >
              Shop {categories.find((c) => c.value === selected)?.label}
            </a>
          )}
        </div>
      </div>

      {/* Right Column (Model Image on Light Background) */}
      <div className="hidden md:block md:w-[35%] relative overflow-hidden bg-[#faf9f9]">
        <img
          src="https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop"
          alt="Model wearing ring on light background"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] hover:scale-105"
        />
      </div>

    </section>
  );
}
