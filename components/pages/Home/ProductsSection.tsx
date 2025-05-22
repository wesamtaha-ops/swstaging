import React from "react";
import { products, product1 } from "@/data/home";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export function ProductsSection() {
  const { t } = useTranslation();

  return (

    <div className="max-w-7xl mx-auto px-6 lg:px-8">

      <div className="mx-auto  my-10 max-w-3xl text-center">
        <p className="mt-2 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-gray-900 sm:text-4xl">
          {t("productsSection.main_title")}
        </p>
        <p className="mt-2 text-lg text-gray-600">
          {t("productsSection.main_description")}
        </p>
      </div>



      {/* Conteneur des cartes */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex flex-col rounded-3xl overflow-hidden shadow-lg bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-60 w-full object-cover rounded-t-3xl"
            />

            <div className="p-6">
              <h3 className="text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">
                {t(product.name)}

              </h3>
              <p className="mt-2 text-gray-600">{t(product.description)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="relative py-20 overflow-hidden "
        style={{ backgroundColor: "#A971DE" }}
      >
        {/* Effet de flou sur les côtés */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-transparent to-purple-200 opacity-50 blur-lg"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Titre et description */}
          <div className="mx-auto  max-w-3xl text-center">
            <span className="px-4 py-1 text-sm font-almarai text-white bg-pink-500 rounded-full">
              {t("productsSection.tag")}
            </span>
            <p className="mt-4 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">
              {t("productsSection.secondary_title")}
            </p>
            <p className="mt-2 text-lg text-white">
              {t("productsSection.secondary_description")}
            </p>
          </div>

          {/* Conteneur des cartes */}
          <div className="mt-10 flex justify-center gap-8">
            {product1.map((product1, index) => (
              <motion.div
                key={product1.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative w-[320px] bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Image flottante */}
                <div className="relative flex justify-center -mt-10">
                  <img
                    src={product1.image}
                    alt={product1.name}
                    className="h-28 w-350 object-contain"
                  />
                </div>

                {/* Contenu texte */}
                <div className="p-6 text-center mt-0">
                  <h3 className="text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">
                    {t(product1.name)}
                  </h3>
                  <p className="mt-2 text-gray-600">{t(product1.description)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
