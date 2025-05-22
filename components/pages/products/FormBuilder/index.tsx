import React from 'react';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Benefits } from './sections/Benefits';
import { UseCases } from './sections/UseCases';
import { TechnicalSpecs } from './sections/TechnicalSpecs';
import { PricingOverview } from './sections/PricingOverview';
import { SocialProof } from './sections/SocialProof';
import { CTASection } from './sections/CTASection';

export default function FormBuilderProduct() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Features />
      <Benefits />
      <UseCases />
      <TechnicalSpecs />
      <PricingOverview />
      <SocialProof />
      <CTASection />
    </div>
  );
}