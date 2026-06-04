import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import CollectionCards from './components/CollectionCards';
import BannerPromo from './components/BannerPromo';
import AboutSection from './components/AboutSection';
import ShopByOccasion from './components/ShopByOccasion';
import CuratedCollections from './components/CuratedCollections';
import Footer from './components/Footer';
import { trendingProducts, newArrivals } from './data/products';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <AnnouncementBar />
      <Header />
      <HeroSection />

      <ProductGrid
        products={trendingProducts}
        sectionLabel="Most Popular"
        heading="Trending Now"
        italic
      />

      <CollectionCards />

    



      <ShopByOccasion />

<ProductGrid
        products={newArrivals}
        sectionLabel="See What's New"
        heading="New and Brilliant"
        italic
      />


      <CuratedCollections />

      <AboutSection />

      <Footer />
    </div>
  );
}
