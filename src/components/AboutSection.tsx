export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Column (Image Block) */}
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-[#f6f6f6] w-full">
          <img
            src="https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop"
            alt="Ali Gold n Diamond Workshop"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Right Column (Text Block) */}
        <div className="text-left md:pl-6 text-[#010101]">
          <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#000000] mb-3">
            About Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6 text-[#010101]">
            Gold is In Our Blood
          </h2>
          
          <div className="content-area__content rte text-gray-600 font-sans text-sm font-light leading-relaxed mb-6 space-y-4">
            <p>
              At Ali Gold n Diamond, we believe every piece of jewelry tells a story. With decades of expertise in crafting certified gold and diamond jewelry, we bring you pieces that are as timeless as the moments they commemorate.
            </p>
            <p>
              Each piece is hallmarked and certified — because you deserve nothing less than the finest.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 mb-10 border-t border-b border-gray-100 py-6">
            {[
              { value: '25+', label: 'Years of Excellence' },
              { value: '22K', label: 'Hallmarked Gold' },
              { value: 'GIA', label: 'Certified Diamonds' },
            ].map((item) => (
              <div key={item.label} className="text-left">
                <p className="font-serif text-2xl text-[#010101] font-normal">{item.value}</p>
                <p className="text-[10px] text-black uppercase tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="content-area__cta">
            <a
              href="#"
              className="btn px-9 py-4 text-[11px] font-sans font-bold tracking-[0.2em] uppercase"
            >
              Our Story
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

