import React from "react";
import { features } from "@/data/home";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <div className="relative w-full overflow-hidden max-w-7xl">
        <div className="flex gap-4 animate-marquee">
          {/* Utilisation des nouvelles images */}
          {[
            "/src/assets/images/1.png",
            "/src/assets/images/2.png",
            "/src/assets/images/3.png",
            "/src/assets/images/4.png",
            "/src/assets/images/5.png",
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              // alt={Image ${index + 1}}
              className="h-24"
            />
          ))}
        </div>

        <style>
          {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          flex-wrap: nowrap;
          animation: marquee 10s linear infinite;
          will-change: transform;
        }
      `}
        </style>
      </div>
    </div>

    // <div className="max-w-7xl mx-auto px-6 lg:px-8">
    //   <div className="mx-auto max-w-2xl lg:text-center">
    //     <p className="mt-4 text-lg leading-8 text-gray-300">
    //       Build forms, gather data, drive results
    //     </p>
    //   </div>
    //   <div className="relative mt-12 w-full flex flex-col items-center pw-10">
    //     <div
    //       className="flex gap-6 items-center justify-center bg-transparent
    //   inline-flex  bg-white/90 backdrop-blur shadow-lg  border border-gray-100 w-full max-w-[10000px] "
    //     >
    //       <img
    //         src="/assets/blend.png"
    //         alt="Blend"
    //         className="h-17 w-auto filter grayscale mix-blend-multiply  "
    //       />
    //       <img
    //         src="/assets/bloomreach.png"
    //         alt="Bloomreach"
    //         className="h-10 w-auto filter grayscale mix-blend-multiply"
    //       />
    //       <img
    //         src="/assets/cameo.png"
    //         alt="Cameo"
    //         className="h-10 w-auto filter grayscale mix-blend-multiply"
    //       />
    //       <img
    //         src="/assets/hippo.png"
    //         alt="Hippo"
    //         className="h-10 w-auto filter grayscale mix-blend-multiply"
    //       />
    //       <img
    //         src="/assets/bitpanda.png"
    //         alt="Bitpanda"
    //         className="h-10 w-auto filter grayscale mix-blend-multiply"
    //       />
    //       <img
    //         src="/assets/chargebee.png"
    //         alt="Chargebee"
    //         className="h-10 w-auto filter grayscale mix-blend-multiply"
    //       />
    //     </div>
    //   </div>
    //
    // </div>
  );
}
