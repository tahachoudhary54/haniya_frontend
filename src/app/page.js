import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FabricSpecializationSection from "@/components/sections/FabricSpecializationSection";
import ManufacturingExcellenceSection from "@/components/sections/ManufacturingExcellenceSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import WholesaleSolutionsSection from "@/components/sections/WholesaleSolutionsSection";
import ProductionCapacitySection from "@/components/sections/ProductionCapacitySection";
import ClientInquirySection from "@/components/sections/ClientInquirySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FabricSpecializationSection />
        <ManufacturingExcellenceSection />
        <WhyChooseSection />
        <WholesaleSolutionsSection />
        <ProductionCapacitySection />
        <ClientInquirySection />
      </main>
      <Footer />
    </>
  );
}
