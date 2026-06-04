interface BannerPromoProps {
  image: string;
  label?: string;
  headline: string;
  ctaText: string;
  ctaHref?: string;
  align?: 'left' | 'right' | 'center';
  dark?: boolean;
}

export default function BannerPromo({
  image,
  label,
  headline,
  ctaText,
  ctaHref = '#',
  align = 'left',
}: BannerPromoProps) {
  // Determine backgrounds for the text container
  // Limited Collection: align left -> white bg. Fine Jewelry: align right -> soft pastel gray-blue bg
  const bg = align === 'left' ? 'bg-[#ffffff]' : 'bg-[#eef2f5]';
  const flexDir = align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className="w-full border-b border-gray-100">
      <div className={`flex flex-col ${flexDir} w-full`}>
        
        {/* Text Area (Solid Block) */}
        <div className={`flex-1 flex items-center justify-center py-16 px-8 md:px-16 lg:px-24 ${bg} text-[#010101]`}>
          <div className="max-w-md text-left w-full">
            {label && (
              <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
                {label}
              </p>
            )}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-8 text-[#010101]">
              {headline}
            </h2>
            <div className="content-area__cta">
              <a
                href={ctaHref}
                className="btn px-9 py-4 text-[11px] font-sans font-bold tracking-[0.2em] uppercase"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="flex-1 aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden bg-[#f6f6f6] relative">
          <img 
            src={image} 
            alt={headline} 
            className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105" 
          />
        </div>

      </div>
    </section>
  );
}

