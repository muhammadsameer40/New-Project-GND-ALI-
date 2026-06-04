import { useState } from 'react';

interface Slide {
  headline: string;
  subline: string;
  cta: string;
  image: string;
  dark?: boolean;
}

const mainSlides: Slide[] = [
  {
    headline: 'Crafted in Pure Gold',
    subline: 'Hallmarked 22K & 24K gold jewelry — for moments that last forever.',
    cta: 'Shop Now',
    image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    dark: true,
  },
];

const featuredBanners = [
  {
    headline: 'Brace Yourself',
    subline: 'Diamond tennis bracelets',
    cta: 'Shop Bracelets',
    image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop',
  },
  {
    headline: 'To Have & To Hold',
    subline: 'Ring Keeper collection',
    cta: 'Shop Ring Keeper',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=1000&h=800&fit=crop',
  },
];

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-gray-100">

        {/* Left Column */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[82vh] md:min-h-[600px] md:max-h-[720px] overflow-hidden bg-gray-50 group">

          <img
            src="https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Brace Yourself"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:bg-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center translate-y-24 md:translate-y-28">
              <h2 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] font-normal mb-4">
                Brace Yourself
              </h2>

              <a
                href="#"
                className="text-white text-[11px] font-sans font-bold tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity"
              >
                Shop Now
              </a>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[82vh] md:min-h-[600px] md:max-h-[720px] overflow-hidden bg-gray-50 group border-t border-gray-100 md:border-t-0 md:border-l">

          <img
            src="https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="To Have & To Hold"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:bg-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center translate-y-24 md:translate-y-28">
              <h2 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] font-normal mb-4">
                To Have & <br />
                To Hold
              </h2>

              <a
                href="#"
                className="text-white text-[11px] font-sans font-bold tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity"
              >
                Shop Ring Keeper
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

