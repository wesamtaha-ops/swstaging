import React from "react";
import { HeroSection } from "@/components/home/HeroSection.tsx";
import { FeaturesSection } from "./Home/FeaturesSection";
import { ProductsSection } from "./Home/ProductsSection";
import { IndustriesSection } from "./Home/IndustriesSection";
import { PricingSection } from "./Home/PricingSection";
import { TemplatesSection } from "./Home/TemplatesSection";
import { FormPreview } from "../home/FormPreview";
import { Footer } from "../Footer";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
 
        <HeroSection />
     
      <div className="bg-gray-100  py-10">
        <FormPreview />
      </div>
 
      {/* Features Section - Dark */}
      <div className="bg-white pt-15">{<FeaturesSection />}</div>
      {/* Products Section - Light */}
      <div className="bg-transparent pt-15">{<ProductsSection />}</div>
      {/* Industries Section - Dark */}

      <div className="bg-purple pt-15">{<IndustriesSection />}</div>

      {/* Pricing Section - Light */}

      <div className="bg-white pt-15">{<PricingSection />}</div>

      {/* Templates Section - Dark */}
      <div>{<Footer />}</div>
    
    </div>
  );
}
