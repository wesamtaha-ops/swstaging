import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PricingTierProps {
  name: string;
  price: number;
  features: string[];
  cta: string;
  mostPopular: boolean;
}

export const PricingTier = ({ name, price, features, cta, mostPopular }: PricingTierProps) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg ring-1 ${mostPopular ? 'ring-indigo-600 scale-105 z-10' : 'ring-gray-200'
        }`}
    >
      {mostPopular && (
        <p className="absolute -top-3 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-600 px-3 py-1 text-center text-sm font-almarai text-white">
          Most popular
        </p>
      )}
      <div className="p-8">
        <h3 className="text-lg font-almarai leading-8">{name}</h3>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl   font-bold font-almarai font-almarai  font-almarai tracking-tight">${price}</span>
          {price > 0 && <span className="text-gray-500">/month</span>}
        </p>
        <ul className="mt-8 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check
                className={`h-6 w-5 flex-none ${mostPopular ? 'text-indigo-600' : 'text-gray-600'
                  }`}
              />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to={price === 0 ? '/signup' : price === 199 ? '/contact' : `/signup?plan=${name.toLowerCase()}`}
          className="mt-8 block rounded-md px-3 py-2 text-center text-sm font-almarai leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
};