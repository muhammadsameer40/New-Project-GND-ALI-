export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  category: string;
}

export interface Collection {
  id: number;
  name: string;
  image: string;
  href: string;
}

export const trendingProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Diamond Solitaire Ring',
    price: 24999,
    badge: 'BEST SELLER',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 2,
    name: '22K Gold Cuban Link Chain',
    price: 12500,
    badge: 'NEW',
    category: 'Chains',
    image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 3,
    name: 'Diamond Tennis Bracelet',
    price: 35000,
    badge: 'BEST SELLER',
    category: 'Bracelets',
    image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 4,
    name: 'Gold Hoop Earrings',
    price: 8500,
    category: 'Earrings',
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 5,
    name: 'Diamond Pendant Necklace',
    price: 18000,
    badge: 'NEW',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 6,
    name: '18K Gold Bangle Set',
    price: 6500,
    badge: 'SELLING FAST',
    category: 'Bracelets',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 7,
    name: 'Princess Cut Diamond Ring',
    price: 42000,
    badge: 'BEST SELLER',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 8,
    name: 'Gold Rope Chain 22K',
    price: 15000,
    category: 'Chains',
    image: 'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 9,
    name: 'Diamond Eternity Band',
    price: 38000,
    badge: 'BEST SELLER',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/5442460/pexels-photo-5442460.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 10,
    name: 'Gold Heart Locket Necklace',
    price: 9500,
    badge: 'NEW',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/3290240/pexels-photo-3290240.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 11,
    name: 'Diamond Stud Earrings',
    price: 12000,
    badge: 'BEST SELLER',
    category: 'Earrings',
    image: 'https://images.pexels.com/photos/4947426/pexels-photo-4947426.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 12,
    name: 'Rose Gold Twisted Ring',
    price: 7200,
    category: 'Rings',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

export const newArrivals: Product[] = [
  {
    id: 101,
    name: 'Pavé Diamond Cluster Ring',
    price: 55000,
    badge: 'NEW',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 102,
    name: 'Gold Layered Chain Necklace',
    price: 11000,
    badge: 'NEW',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 103,
    name: 'Diamond Riviera Bracelet',
    price: 28000,
    badge: 'NEW',
    category: 'Bracelets',
    image: 'https://images.pexels.com/photos/3290240/pexels-photo-3290240.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 104,
    name: 'Chandelier Drop Earrings',
    price: 16500,
    badge: 'NEW',
    category: 'Earrings',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
  },
  {
    id: 105,
    name: 'Three-Stone Diamond Ring',
    price: 62000,
    badge: 'NEW',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/5442460/pexels-photo-5442460.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 106,
    name: '24K Gold Figaro Chain',
    price: 9800,
    badge: 'NEW',
    category: 'Chains',
    image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 107,
    name: 'Infinity Diamond Band',
    price: 31000,
    badge: 'NEW',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    id: 108,
    name: 'Pearl & Gold Pendant',
    price: 7500,
    badge: 'NEW',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

export const signatureCollections: Collection[] = [
  {
    id: 1,
    name: 'Best Sellers',
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    href: '#',
  },
  {
    id: 2,
    name: 'Diamond Collection',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    href: '#',
  },
  {
    id: 3,
    name: 'Gold Chains',
    image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    href: '#',
  },
  {
    id: 4,
    name: 'Bracelets & Bangles',
    image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    href: '#',
  },
];

export const curatedCollections = [
  {
    id: 1,
    label: 'Fine Jewelry',
    title: 'Prognosis: Timeless',
    image: 'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
  {
    id: 2,
    label: 'Bridal Collection',
    title: 'To Have & To Hold',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/5442460/pexels-photo-5442460.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
  {
    id: 3,
    label: 'Gifting Guide',
    title: 'The Perfect Gift',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
  {
    id: 4,
    label: 'Everyday Elegance',
    title: 'Wear Every Day',
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
  {
    id: 5,
    label: 'New Arrivals',
    title: 'Fresh Gold Drops',
    image: 'https://images.pexels.com/photos/5442460/pexels-photo-5442460.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
  {
    id: 6,
    label: 'Custom Design',
    title: 'Make It Yours',
    image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    hoverImage: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop',
    href: '#',
  },
];

export const categoryIcons = [
  { name: 'Best Sellers', image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Rings', image: 'https://images.pexels.com/photos/2733486/pexels-photo-2733486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Necklaces', image: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Gold Chains', image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Bracelets', image: 'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Earrings', image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Diamond', image: 'https://images.pexels.com/photos/5442460/pexels-photo-5442460.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Pendants', image: 'https://images.pexels.com/photos/3290240/pexels-photo-3290240.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
  { name: 'Fine Jewelry', image: 'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', href: '#' },
];

export const formatPrice = (price: number) =>
  `PKR ${price.toLocaleString('en-PK')}`;
