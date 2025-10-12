
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import StatsSection from "@/components/home/StatsSection";
import ShopPreview from "@/components/home/ShopPreview";
import TourismPreview from "@/components/home/TourismPreview";
import InvestorPreview from "@/components/home/InvestorPreview";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <StatsSection />
        <ShopPreview />
        {/* <TourismPreview /> */}
        {/* <InvestorPreview /> */}
      </main>
      <Footer />
    </>
  );
};

export default Index;
