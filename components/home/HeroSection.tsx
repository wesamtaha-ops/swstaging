import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/video_landing_page.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Main Content */}
      <div className="mx-auto max-w-[90rem] px-6 pb-24 pt-10 sm:pb-32 lg:block lg:px-8 lg:py-20">
        {/* Text Content */}
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 xl:max-w-2xl text-center">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 text-4xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-6xl xl:text-7xl font-almarai"
          >
            {t("hero.title")}
            <span className="relative whitespace-nowrap">
              <span className="relative">   {t("hero1.subtitle")}</span>
            </span>
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-lg leading-8 text-white xl:text-xl max-w-2xl font-almarai"
          >
            {t("hero.description")}
          </motion.p>

          {/* Animated CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6 Inter"
          >
            <Link
              to="/signup"
              className="rounded-md bg-[#4C3AE3] px-6 py-3 text-base font-almarai text-white shadow-sm hover:bg-[#3068FF] transition-all duration-300 hover:scale-105 xl:text-lg"
            >
              {t("hero1.cta")}
            </Link>
          </motion.div>
        </div>
        {/* FormPreview - Directly Below Video */}
        <div className="relative z-10 flex justify-center"></div>
      </div>

    </div>
  );
};
