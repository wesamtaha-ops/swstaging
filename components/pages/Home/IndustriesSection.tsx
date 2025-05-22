import React, { useState } from "react";
import { motion } from "framer-motion";
import { industries } from "@/data/home";
import { Building } from "lucide-react";
import { useTranslation } from "react-i18next";

export function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const { t } = useTranslation();


  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white">
      {/* 📌 Section Texte (Gauche) */}
      <div>
        <span className="px-4 py-1 text-sm font-almarai text-gray-800 bg-gray-200 rounded-full">
          {t("industries1.label")}
        </span>
        <h2 className="mt-4 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
          {t("industries1.title")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          {t("industries1.subtitle")}
        </p>

        {/* 📌 Liste des industries */}
        <div className="mt-6 space-y-4">
          {industries.map((industry, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndustry(industry)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 
                ${selectedIndustry.name === industry.name
                  ? "bg-blue-500 text-white shadow-lg font-almarai"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 font-almarai"
                }`}
            >
              {/* Icône avec condition pour Building */}
              <div className="p-2 rounded-lg bg-transparent">
                <industry.icon
                  className={`w-5 h-5 ${industry.icon === Building ? "" : "text-black font-almarai"
                    }`}
                />
              </div>
              <div>
                <span className="text-lg font-almarai">{t(industry.name)}</span>
                {selectedIndustry.name === industry.name && (
                  <p className="text-sm text-gray-200">
                    {t(industry.description)}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* 📌 Section Image (Droite) avec effet "fenêtre de navigateur" */}
      <div className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Barre supérieure (effet navigateur) */}
        <div className="absolute top-0 left-0 w-full bg-gray-200 px-4 py-2 flex items-center rounded-t-2xl">
          <span className="h-3 w-3 bg-red-400 rounded-full mr-2"></span>
          <span className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></span>
          <span className="h-3 w-3 bg-green-400 rounded-full"></span>
        </div>

        {/* Image animée */}
        <motion.img
          key={selectedIndustry.image}
          src={selectedIndustry.image}
          alt={selectedIndustry.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[450px] object-cover rounded-b-2xl"
        />
      </div>

    </div>
  );
}
