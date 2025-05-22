import { PricingTier } from './pricing/PricingTier';
import { ComparisonTable } from './pricing/ComparisonTable';
import { pricingTiers } from './pricing/pricingData';

export const PricingSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-almarai leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for you
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Start with our free plan and scale as you grow. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>

        <ComparisonTable tiers={pricingTiers} />
      </div>
    </div>
  );
};