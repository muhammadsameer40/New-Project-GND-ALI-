import { categoryIcons } from '../data/products';

export default function CategoryRow() {
  return (
    <section className="bg-white border-b border-gray-100 py-5 px-4">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-start justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto pb-1 scrollbar-hide">
          {categoryIcons.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold-500 transition-all duration-200 shadow-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] text-charcoal-700 font-medium text-center leading-tight tracking-wide group-hover:text-gold-600 transition-colors">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
