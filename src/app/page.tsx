import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/BrandsSection";
import TrustSection from "@/components/home/TrustSection";
import OrganizationSection from "@/components/home/OrganizationSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Page() {
  return (
    <div className="bg-white">
      <HeroSection />
      <BrandsSection />
      <TrustSection />
      <FeaturedProducts />
      <OrganizationSection />
    </div>
  );
}