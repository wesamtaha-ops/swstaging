import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SocialProof() {
  const { t } = useTranslation();

  const testimonials = t('socialProofTestimonials.testimonials', { returnObjects: true }) as Array<{
    content: string;
    author: {
      name: string;
      role: string;
      company: string;
      image?: string;
    };
  }>;

  const stats = [
    { id: 1, name: t('socialProof.stats.users'), value: '50,000+' },
    { id: 2, name: t('socialProof.stats.forms'), value: '1M+' },
    { id: 3, name: t('socialProof.stats.data'), value: '100M+' },
    { id: 4, name: t('socialProof.stats.satisfaction'), value: '4.9/5' }
  ];

  return (
    <div className="py-24 bg-gray-900 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-almarai leading-7 text-indigo-400">
            {t('socialProof.heading')}
          </h2>
          <p className="mt-2 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">
            {t('socialProof.subheading')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 text-gray-300 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {testimonials.map((testimonial, testimonialIdx) => (
            <div
              key={testimonialIdx}
              className="relative isolate flex flex-col justify-between rounded-2xl bg-white/5 px-6 py-8 ring-1 ring-white/5 hover:bg-white/10 transition duration-300"
            >
              <div className="flex items-center gap-x-2 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-lg leading-normal">{testimonial.content}</p>
              <div className="mt-8 flex items-center gap-x-4">
                {testimonial.author.image ? (
                  <img
                    className="h-12 w-12 rounded-full bg-gray-800"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-almarai text-sm">
                    {testimonial.author.name[0]}
                  </div>
                )}
                <div>
                  <div className="font-almarai text-white">{testimonial.author.name}</div>
                  <div className="text-gray-400">
                    {testimonial.author.role} at {testimonial.author.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-almarai tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
