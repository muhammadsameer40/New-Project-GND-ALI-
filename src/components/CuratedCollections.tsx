import { useState } from 'react';
import { curatedCollections } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function CuratedCollections() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: 'free-snap',
    slides: {
      perView: 2.94,
      spacing: 8,
    },
    breakpoints: {
      '(max-width: 834px)': {
        slides: { perView: 2, spacing: 8 },
      },
      '(max-width: 480px)': {
        slides: { perView: 2.1, spacing: 8 },
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
    <section className="bg-[#010101] py-16 md:py-24 text-white border-b border-gray-900 overflow-hidden">
      <div className="w-full featured-collections-layout md:flex gap-6">
        
        {/* Left Column (Content Area with headers) */}
        <div className="content-area flex flex-col justify-center md:items-center py-8 md:py-16 text-center bg-[#010101] text-white">
          <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#ffffff] mb-3">
            Cure-ated Collections
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight italic mb-5">
            Vital Style
          </h2>
          <p className="text-xs font-sans font-light text-[#ffffff] max-w-md mx-auto md:mx-0 leading-relaxed">
            Our favorites, all in one curated place. Shop by profession, style edits, gift lists, and more.
          </p>
        </div>

        {/* Right Column (Slider Area) */}
        <div className="slider-area w-full relative group/slider flex items-center bg-[#010101]">
          
          {/* Keen Slider Container */}
          <div ref={sliderRef} className="keen-slider cursor-grab active:cursor-grabbing w-full">
            {curatedCollections.map((item) => (
              <div key={item.id} className="keen-slider__slide component--featured-collection-item flex flex-col group select-none bg-[#010101]">
                <a href={item.href} className="block w-full" draggable="false">
                  
                  {/* Image Area with Aspect Ratio 4:5 and Hover swap */}
                  <div className="image-area aspect-[4/5] overflow-hidden bg-[#121212] relative pointer-events-none w-full">
                    {/* Base Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable="false"
                    />
                    {/* Secondary Hover Image (Desktop Only) */}
                    {item.hoverImage && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:block hidden">
                        <img
                          src={item.hoverImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Title - Uppercase sans-serif white text */}
                  <div className="content-area mt-4 text-left">
                    <h3 className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-white group-hover:text-gray-300 transition-colors duration-200">
                      {item.title}
                    </h3>
                  </div>

                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Circle styled white arrows) */}
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                disabled={currentSlide === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-[#010101] shadow-md w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none z-10 hidden md:flex"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                disabled={isEnd}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-[#010101] shadow-md w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none z-10 hidden md:flex"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
