import { signatureCollections } from '../data/products';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function CollectionCards() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: 'free-snap',
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 834px)': {
        slides: { perView: 2, spacing: 12 },
      },
      '(max-width: 480px)': {
        slides: { perView: 2.1, spacing: 8 },
      },
    },
  });

  return (
    <section className="py-16 md:py-16 px-4 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#010101] mb-3">
            Signature Styles
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#010101] font-normal leading-tight">
            Shop by Collection
          </h2>
        </div>

        {/* Slider Container */}
        <div ref={sliderRef} className="keen-slider cursor-grab active:cursor-grabbing md:cursor-default">
          {signatureCollections.map((col) => (
            <div key={col.id} className="keen-slider__slide component--featured-collection-item flex flex-col group select-none">
              <a href={col.href} className="block w-full" draggable="false">
                
                {/* Image Container with Zoom effect */}
                <div className="image-area aspect-[3/4] overflow-hidden bg-[#f6f6f6] relative pointer-events-none">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable="false"
                  />
                </div>

                {/* Content Area underneath the image */}
                <div className="content-area mt-3 text-left">
                  <h3 className="font-serif text-base md:text-lg font-normal text-[#000000] group-hover:opacity-70 transition-opacity duration-200">
                    {col.name}
                  </h3>
                </div>

              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


