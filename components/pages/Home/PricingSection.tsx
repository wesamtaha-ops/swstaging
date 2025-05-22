import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pricingTiers } from "@/data/pricing";
import { useTranslation } from "react-i18next";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { t } = useTranslation();

  return (
    <div className="bg-white py-20">
      {/* 🟢 Section Header */}
      <div className="max-w-7xl mx-auto text-center px-6">
        <div className="inline-block px-4 py-1 text-sm font-almarai text-gray-800 bg-purple-200 rounded-full">
          {t("pricing1.label")}
        </div>
        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          {t("pricing1.title")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          {t("pricing1.subtitle")}
        </p>
      </div>

      {/* 🟡 Toggle Monthly/Yearly */}
      <div className="flex justify-center mt-6">
        <div className="p-1 bg-gray-200 rounded-full flex">
          <button
            className={`px-6 py-2 rounded-full font-almarai ${billingCycle === "monthly" ? "bg-gray-900 text-white" : "text-gray-700"
              }`}
            onClick={() => setBillingCycle("monthly")}
          >
            {t("pricing1.payMonthly")}
          </button>
          <button
            className={`px-6 py-2 rounded-full font-almarai ${billingCycle === "yearly" ? "bg-indigo-600 text-white" : "text-gray-700"
              }`}
            onClick={() => setBillingCycle("yearly")}
          >
            {t("pricing1.payYearly")}
          </button>
        </div>
      </div>

      {/* 🏆 Pricing Plans */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* 🏆 Plans de tarification sous forme de grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl shadow-lg p-8 flex flex-col h-full justify-between border ${tier.name === "Premium"
                ? "bg-[#FDD835] text-black shadow-xl relative overflow-hidden"
                : "border-gray-300 bg-white"
                }`}
            >
              {/* 🟨 Effet incurvé pour Premium */}
              {tier.name === "Premium" && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-bl-full"></div>
              )}

              {/* 🟢 Titre et description */}
              <h3 className="text-2xl   font-bold font-almarai font-almarai  font-almarai">{t(tier.name)}</h3>
              <p className="mt-2 text-sm text-gray-800">
                {t("pricing1.test")}
              </p>

              {/* 🟣 Prix */}
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-4xl   font-bold font-almarai font-almarai  font-almarai">${tier.price}</span>
                <span className="ml-1 text-lg text-gray-700">/ {billingCycle}</span>
              </div>


              {/* ✅ Aligner les boutons sur la même ligne */}
              <div className="mt-5 flex justify-center">
                <Link
                  to={`/subscribe/${tier.name.toLowerCase()}`}
                  className="w-full py-3 text-center rounded-lg font-almarai bg-black text-white hover:bg-gray-900"
                >
                  {t("pricing1.startTrial")}
                </Link>
              </div>

              {/* 🟠 Liste des fonctionnalités */}
              <ul className="mt-6 space-y-3 text-gray-900 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    {/* ✅ Nouveau bouton Checkbox */}
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="true"
                      data-state="checked"
                      value="on"
                      className="flex h-5 w-5 items-center justify-center rounded-full p-3 transition-all duration-200 border-2 bg-black shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span data-state="checked" style={{ pointerEvents: "none" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check h-5 w-5 stroke-[3] text-white"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </span>
                    </button>
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </div>
      </div>



    </div>
  );
}
