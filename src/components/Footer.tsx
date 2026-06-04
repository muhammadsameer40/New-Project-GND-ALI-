import { useState } from 'react';
import { Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const columns = [
    {
      id: 'shop',
      title: 'Shop Gold',
      links: [
        { label: 'Rings', href: '#' },
        { label: 'Necklaces', href: '#' },
        { label: 'Bracelets', href: '#' },
        { label: 'Earrings', href: '#' },
        { label: 'Gold Chains', href: '#' },
        { label: 'Pendants', href: '#' },
        { label: 'Best Sellers', href: '#' },
      ]
    },
    {
      id: 'help',
      title: 'Get Help',
      links: [
        { label: 'FAQs', href: '#' },
        { label: 'Shipping & Delivery', href: '#' },
        { label: 'Returns & Exchanges', href: '#' },
        { label: 'Care Instructions', href: '#' },
        { label: 'Contact Us', href: '#' },
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'Our Story', href: '#' },
        { label: 'Certifications', href: '#' },
        { label: 'Custom Design', href: '#' },
        { label: 'Partner With Us', href: '#' },
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setMobileExpanded(mobileExpanded === id ? null : id);
  };

  return (
    <footer className="bg-[#faf9f9] border-t border-gray-100 text-[#010101] pt-16 pb-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Main Footer Container (Newsletter + Links) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between border-b border-gray-100 pb-12 mb-10">
          
          {/* Left Area (Newsletter Signup) */}
          <div className="flex-1 max-w-lg text-left">
            <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#010101] mb-3">
              Enjoy 10% off your first order.
            </h3>
            <p className="text-xs text-[#000000] font-sans font-light leading-relaxed mb-6">
              Sign up for exclusive promos and first-access to new gold and diamond arrivals, straight to your inbox.
            </p>
            
            <form className="flex w-full max-w-md gap-0 mb-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="flex-1 bg-white border border-gray-300 text-xs px-4 py-3.5 outline-none focus:border-[#010101] transition-colors rounded-none placeholder:text-[#000000] text-[#010101]"
              />
              <button
                type="submit"
                className="btn bg-[#010101] text-white hover:bg-white hover:text-[#010101] border border-[#010101] text-[10px] font-bold tracking-wider uppercase px-6 py-3.5 transition-colors rounded-none"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-[10px] text-[#000000] font-sans font-light">
              By signing up you confirm you have read and agree to our <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>

          {/* Right Area (Link Menus) */}
          <div className="flex-1 lg:max-w-2xl">
            {/* Desktop Link list (visible on larger screens) */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {columns.map((col) => (
                <div key={col.id} className="text-left">
                  <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#010101] mb-5">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-xs text-[#000000] hover:text-[#010101] transition-colors duration-200 block py-0.5 underline__hover"
                        >
                          {col.id === 'shop' && link.label === 'Best Sellers' ? (
                            <strong>{link.label}</strong>
                          ) : (
                            link.label
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile Link list Accordion */}
            <div className="md:hidden space-y-2">
              {columns.map((col) => (
                <div key={col.id} className="border-b border-gray-100 pb-2">
                  <button
                    className="w-full flex items-center justify-between py-3 text-xs font-bold tracking-widest text-[#010101] uppercase text-left"
                    onClick={() => toggleExpand(col.id)}
                  >
                    <span>{col.title}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${mobileExpanded === col.id ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === col.id && (
                    <ul className="space-y-2.5 pl-2 pb-3 pt-1 text-left">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="text-xs text-gray-500 hover:text-[#010101] block py-0.5">{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Footer Container (Socials, Copyright, and Currency Switcher) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          
          {/* Social Icons list */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Facebook size={15} />, href: '#', label: 'Facebook' },
              { icon: <Instagram size={15} />, href: '#', label: 'Instagram' },
              { icon: <Youtube size={15} />, href: '#', label: 'YouTube' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 flex items-center justify-center border border-black text-black hover:text-[#010101] hover:border-[#010101] transition-all rounded-none bg-white"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Sub Footer details */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[11px] text-[#000000] font-sans">
            <p>&copy; {new Date().getFullYear()} Ali Gold n Diamond. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#010101] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#010101] transition-colors">Privacy Policy</a>
              
              {/* Currency Selector aesthetic mock */}
              <div className="flex items-center gap-1 cursor-pointer text-black font-bold border border-black px-3 py-1 bg-white hover:border-[#010101] hover:text-[#010101] transition-all">
                <span>PKR</span>
                <ChevronDown size={10} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

