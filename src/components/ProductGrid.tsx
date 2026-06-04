import { useState } from 'react';
import { Product, formatPrice } from '../data/products';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

interface ProductGridProps {
  products: Product[];
  sectionLabel: string;
  heading: string;
  italic?: boolean;
}

export default function ProductGrid({ products, sectionLabel, heading, italic }: ProductGridProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: 'free-snap',
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 3, spacing: 12 },
      },
      '(max-width: 640px)': {
        slides: { perView: 2, spacing: 8 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Calculate if we can scroll right
  const isEnd = instanceRef.current
    ? currentSlide >= instanceRef.current.track.details.slides.length - (instanceRef.current.options.slides as any).perView
    : false;

  return (
    <section className="py-16 md:py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#010101] mb-3">
            {sectionLabel}
          </p>
          <h2 className={`font-serif text-3xl md:text-4xl text-[#010101] font-normal leading-tight ${italic ? 'italic' : ''}`}>
            {heading}
          </h2>
        </div>

        {/* Product Slider Wrapper */}
        <div className="relative group/slider">
          
          {/* Keen Slider Container */}
          <div ref={sliderRef} className="keen-slider cursor-grab active:cursor-grabbing">
            {products.map((product) => (
              <div key={product.id} className="keen-slider__slide product-grid-item flex flex-col group/item select-none">
                
                {/* Product Image Area */}
                <div className="product-image-area relative aspect-square overflow-hidden bg-[#f6f6f6] w-full mb-3 pointer-events-none md:pointer-events-auto">
                  <a href="#" className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                      draggable="false"
                    />
                  </a>

                  {/* Badge Overlay */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#010101] text-white text-[9px] font-sans font-bold tracking-[0.15em] px-2.5 py-1 uppercase">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick Add Button Overlay (desktop only, fades in on hover) */}
                  <button 
                    className="absolute bottom-3 right-3 bg-white hover:bg-[#010101] text-[#010101] hover:text-white transition-all duration-300 w-10 h-10 flex items-center justify-center border border-gray-100 shadow-sm opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 duration-300 hidden md:flex pointer-events-auto"
                    aria-label={`Quick Add ${product.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('add-to-cart', {
                        detail: {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category
                        }
                      }));
                    }}
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>

                {/* Product Info Area */}
                <div className="product-info-area text-left">
                  <a href="#" className="group-hover/item:opacity-70 transition-opacity duration-200 block">
                    <h4 className="product-grid-item__title text-xs md:text-sm font-sans font-medium text-[#010101] leading-snug mb-1">
                      {product.name}
                    </h4>
                    <p className="product-grid-item__price text-[11px] md:text-xs text-text-[#010101] font-semibold font-sans">
                      {formatPrice(product.price)}
                    </p>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Arrows (fades in on hover of grid area on desktop) */}
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                disabled={currentSlide === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#010101] text-[#010101] hover:text-white border border-gray-100 shadow-md w-10 h-10 rounded-none flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                disabled={isEnd}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#010101] text-[#010101] hover:text-white border border-gray-100 shadow-md w-10 h-10 rounded-none flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="btn-secondary px-10 py-4 font-sans text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300"
          >
            View All Products
          </a>
        </div>

      </div>
    </section>
  );
}


