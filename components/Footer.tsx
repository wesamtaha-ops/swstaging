import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Section: Explore */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.explore.title")}</h3>
            <ul className="space-y-3">
              {["goPro", "exploreDesigns", "createDesigns", "playoffs"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.explore.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Collaborate */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.collaborate.title")}</h3>
            <ul className="space-y-3">
              {["about", "careers", "supports", "mediaKits"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.collaborate.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Innovate */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.innovate.title")}</h3>
            <ul className="space-y-3">
              {["tags", "api", "places", "creativeMarkets"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.innovate.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: About */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.about.title")}</h3>
            <ul className="space-y-3">
              {["community", "designers", "support", "terms"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.about.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Resources */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.resources.title")}</h3>
            <ul className="space-y-3">
              {["bestPractices", "downloads", "whatsNew", "privacy"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.resources.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Design Assets */}
          <div>
            <h3 className="text-lg font-almarai mb-4">{t("footer.designAssets.title")}</h3>
            <ul className="space-y-3">
              {["sketch", "adobeXd", "framer", "misc"].map((key, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Link to="#" className="hover:underline">
                    {t(`footer.designAssets.items.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/logo.png"
              alt="VOTLY Logo"
              className="h-8 filter brightness-0 invert"
            />
          </div>

          <Link
            to="/signup"
            className="px-6 py-2 text-sm font-almarai bg-white text-black rounded-full hover:bg-gray-300 transition"
          >
            {t("footer.signup")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
