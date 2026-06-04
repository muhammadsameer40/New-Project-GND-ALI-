import { useEffect, useRef } from 'react';

const messages = [
  'Sign up for email & get 10% off your first order.',
  'Free shipping on orders of PKR 25,000 or more.',
  'Certified 22K & 24K Gold — Hallmarked Jewelry.',
  'Natural Diamonds — GIA Certified Stones.',
];

export default function AnnouncementBar() {
  const listRef = useRef<HTMLUListElement>(null);

  // Double the list elements to ensure smooth continuous marquee effect
  const doubledMessages = [...messages, ...messages, ...messages];

  return (
    <div 
      className="announcement-bar flex items-center justify-between overflow-hidden py-3 text-white"
      style={{
        backgroundColor: '#010101',
        borderBottom: '1px solid #1a1a1a',
        fontSize: '11px',
        letterSpacing: '0.15em'
      }}
    >
      <div className="announcement-bar-outer flex items-center justify-center">
        <ul ref={listRef} className="announcement-bar__list flex items-center">
          {doubledMessages.map((msg, i) => (
            <li 
              key={i} 
              className="announcement-bar__item font-sans text-xs uppercase opacity-90 transition-opacity hover:opacity-100"
            >
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

