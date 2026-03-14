import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import CategorySection from "./components/CategorySection";
import TrendingProducts from "./components/TrendingProducts";
import DealOfTheDay from "./components/DealOfTheDay";
import FeaturedCollections from "./components/FeaturedCollections";
import TrustSection from "./components/TrustSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Navbar />
      <HeroBanner />
      <CategorySection />
      <TrendingProducts />
      <DealOfTheDay />
      <FeaturedCollections />
      <TrustSection />
      <Footer />
    </main>
  );
}
