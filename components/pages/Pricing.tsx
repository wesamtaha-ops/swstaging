import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { store } from "../../src/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlan } from "../../src/features/survey/SurveySlice";
import axios from "axios";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
  "pk_test_51Mr6FuBX82yYbD23by3O6UsbmgcUWMG10w5HrBrTJgtJkTqvA6tNY4Yu0eXeQ7ZQUw9EsxBgIIpqhSbNlOLv8XwJ00WZqM36Qo"
);

interface FAQQuestion {
  question: string;
  answer?: string;
}

const Pricing = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const questions: FAQQuestion[] = t("faq.questions", {
    returnObjects: true,
  }) as FAQQuestion[];
  const [planUser, setPlan] = useState("");
  const plans = [
    {
      title: t("pricing.tiers.free.name"),
      price: "$0",
      yearlyPrice: "$0",
      features: [
        t("pricing.tiers.free.features.limitedSurveys"),
        t("pricing.tiers.free.features.basicQuestions"),
        t("pricing.tiers.free.features.emailVerification"),
        t("pricing.tiers.free.features.basicSecurity"),
        t("pricing.tiers.free.features.limitedReporting"),
      ],
    },
    {
      title: t("pricing.tiers.basic.name"),
      price: "$49",
      yearlyPrice: "$529",
      features: [
        t("pricing.tiers.basic.features.unlimitedSurveys"),
        t("pricing.tiers.basic.features.advancedQuestions"),
        t("pricing.tiers.basic.features.emailSms"),
        t("pricing.tiers.basic.features.abTesting"),
        t("pricing.tiers.basic.features.customEmails"),
        t("pricing.tiers.basic.features.enhancedReporting"),
      ],
    },
    {
      title: t("pricing.tiers.advanced.name"),
      price: "$99",
      yearlyPrice: "$1069",
      features: [
        t("pricing.tiers.advanced.features.fullLogic"),
        t("pricing.tiers.advanced.features.aiQuestions"),
        t("pricing.tiers.advanced.features.conversationalQuestions"),
        t("pricing.tiers.advanced.features.fullReporting"),
        t("pricing.tiers.advanced.features.multiLanguage"),
        t("pricing.tiers.advanced.features.smsEmailAb"),
        t("pricing.tiers.advanced.features.turfNps"),
      ],
    },
    {
      title: t("pricing.tiers.premium.name"),
      price: "$199",
      yearlyPrice: "$2149",
      features: [
        t("pricing.tiers.premium.features.allUnlocked"),
        t("pricing.tiers.premium.features.unlimitedUsersLanguages"),
        t("pricing.tiers.premium.features.advancedIntegrations"),
        t("pricing.tiers.premium.features.dynamicReporting"),
        t("pricing.tiers.premium.features.roleAccess"),
        t("pricing.tiers.premium.features.apiAccess"),
        t("pricing.tiers.premium.features.gdpr"),
      ],
      premium: true,
      popular: true,
    },
  ];

  const [billingCycle, setBillingCycle] = useState("monthly");
  // const [endDate, setEndDate] = useState(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const { data } = await axios.get(
          ` https://backend.votly.co/user/plan/${user?._id}`
        );
        console.log(data, "data");
        setPlan(data.plan);
        setEndDate(new Date(data.endDate).toLocaleDateString("fr-FR") ?? "");
      } catch (error) {
        console.error("Erreur lors de la récupération du plan :", error);
      }
    };

    if (user?._id) fetchuser();
  }, [user?._id, dispatch]);

  return (
    <div className="">
      <div className="relative flex flex-col items-center w-full pt-20 pb-12 overflow-hidden bg-white">
        {/* Background avec image */}
        <div
          className="absolute top-0 left-0 w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/images/head.jpg')" }}
        ></div>

        {/* Titre principal immédiatement après la navbar */}
        <h1 className="relative z-10 text-5xl   font-bold font-almarai font-almarai text-center text-white font-almarai">
          {t("pricing22.title1")}
        </h1>

        {/* Bloc du pricing monté plus haut */}
        <div className="relative flex flex-col items-start max-w-4xl gap-12 p-10 mx-auto mt-6  bg-[#F8F8F8] md:flex-row rounded-3xl z-10">
          {/* Colonne gauche : Avantages */}
          <div className=" flex-[2] space-y-5 text-left">
            <h2 className="text-lg font-extrabold text-[#3D3B3B] font-inter">
              {t("pricing22.included")}
            </h2>
            <ul className="space-y-5 text-gray-700 font-almarai">
              {[
                t("pricing22.features.limitedSurveys"),
                t("pricing22.features.basicQuestions"),
                t("pricing22.features.emailVerification"),
                t("pricing22.features.basicSecurity"),
                t("pricing22.features.limitedReporting"),
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 font-inter"
                >
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
                    <svg
                      width="39"
                      height="39"
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_607_4462)">
                        <path
                          d="M19.1176 38.2353C29.6763 38.2353 38.2353 29.6763 38.2353 19.1176C38.2353 8.55897 29.6763 0 19.1176 0C8.55897 0 0 8.55897 0 19.1176C0 29.6763 8.55897 38.2353 19.1176 38.2353Z"
                          fill="#3068FF"
                        />
                        <path
                          d="M10.4658 20.3538L15.4097 25.2976L27.7693 12.938"
                          stroke="white"
                          stroke-width="2.94118"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_607_4462">
                          <rect width="38.2353" height="38.2353" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[#3D3B3B] text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : Prix aligné avec "What’s included" */}
          <div className="flex flex-col items-end space-y-4 flex-2">
            <div className="flex items-center justify-end w-full space-x-3">
              <div className="relative p-3 bg-gray-200 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-[#D0BFFF] rounded-full"></div>
                </div>
              </div>
              <h2 className="text-xl font-black text-[#3D3B3B] font-inter">
                {t("pricing22.alwaysFree")}
              </h2>
            </div>

            <div className="flex items-baseline justify-end w-full space-x-2">
              <p className="text-5xl font-semibold leading-tight text-[#3D3B3B] font-inter">
                $0
              </p>
              <p className="text-lg text-[#6F6C90] font-inter">
                {" "}
                {t("pricing22.monthly")}
              </p>
            </div>
          </div>

          {/* Bouton Call-to-Action */}
          {/* <div className="absolute bottom-[-22px] left-1/2 transform -translate-x-1/2">
            <button className="py-3   font-bold font-almarai font-almarai text-white transition bg-blue-600 shadow-md rounded-xl px-7 hover:bg-blue-700 font-almarai">
              Get started
            </button>
          </div> */}
        </div>
      </div>

      <div className="mb-4 text-center">
        <p className="mt-6 mb-6 text-lg text-center text-gray-600 font-almarai">
          {t("pricing22.explorePremium")}
        </p>
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

        <div className="inline-block px-4 py-2 text-sm  text-[#3D3B3B] bg-[#DAD4FF] rounded-full mb-4 mt-6 font-inter">
          {t("pricing1.label")}
        </div>
        <h1 className="text-5xl font-semibold from-neutral-95 font-almarai text-border">
          {t("pricing22.explorePremium")}
        </h1>
        <p className="text-lg text-[#3D3B3B] mt-4 font-almarai">
          {t("pricing22.startFree")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl font-almarai">
        {plans.map((plan, index) => {
          const isCurrentPlan = plan.title === planUser;

          return (
            <div
              key={index}
              className={`relative rounded-2xl shadow-xl p-8 flex flex-col h-full justify-between 
          ${isCurrentPlan
                  ? "border-4 border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200"
                }
         
          ${plan.premium ? "bg-cover bg-center" : "bg-white"}
`}
              style={{
                backgroundImage: plan.premium
                  ? "url('/src/assets/images/bg.png')"
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Badge "Current Plan" */}
              {isCurrentPlan && (
                <div className="absolute flex flex-col items-end top-2 right-2 font-inter">
                  <div className="px-3 py-1 text-xs text-white bg-blue-500 rounded-full">
                    {t("pricing22.currentPlan")}
                  </div>
                  {endDate && planUser !== t("pricing.tiers.free.name") && (
                    <div className="px-1 py-1 mt-1 text-xs font-thin text-white bg-gray-700 rounded-full">
                      {endDate}
                    </div>
                  )}
                </div>
              )}

              {/* Titre du plan */}
              <h2 className="text-2xl   font-bold font-almarai font-almarai text-[#3D3B3B] font-almarai">
                {plan.title}
              </h2>

              {/* Prix */}
              <div className="flex items-baseline mt-4 text-[#3D3B3B] h-16 space-x-2">
                <span className="text-4xl   font-bold font-almarai font-almarai font-inter">
                  {billingCycle === "monthly" ? plan.price : plan.yearlyPrice}
                </span>
                <span className="text-xs text-[#6F6C90]">
                  {billingCycle === "monthly"
                    ? t("pricing22.monthly")
                    : t("pricing22.yearly")}
                </span>
              </div>

              {/* Liste des fonctionnalités */}
              <ul className="mt-6 space-y-3 text-sm text-gray-600 font-inter">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_607_4641)">
                          <path
                            d="M16.8196 33.6392C26.109 33.6392 33.6392 26.109 33.6392 16.8196C33.6392 7.53013 26.109 0 16.8196 0C7.53013 0 0 7.53013 0 16.8196C0 26.109 7.53013 33.6392 16.8196 33.6392Z"
                            fill="#3D3B3B"
                          />
                          <path
                            d="M9.20752 17.9072L13.5571 22.2567L24.431 11.3828"
                            stroke="white"
                            strokeWidth="2.58763"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_607_4641">
                            <rect
                              width="33.6392"
                              height="33.6392"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bouton Call-to-Action */}
              <div className="flex-grow"></div>
              {user?.role &&
                (!isCurrentPlan ? (
                  <Link to={`/subscribe/${plan.title}`}>
                    <button className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-xl hover:bg-blue-700 font-inter">
                      {t("pricing22.getStarted")}
                    </button>
                  </Link>
                ) : (
                  <button
                    className="w-full px-4 py-2 mt-6 text-white bg-gray-400 cursor-not-allowed rounded-xl font-inter"
                    disabled
                  >
                    {isCurrentPlan ? "Current Plan" : "Not Available"}
                  </button>
                ))}
            </div>
          );
        })}
      </div>

      {/* Tableau de comparaison des plans */}

      <div className="px-6 mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-5 gap-6 pb-4 border-b border-gray-300 font-almarai">
          {/* Colonne de gauche */}
          <h2 className="col-span-1   font-bold font-almarai font-almarai text-customGray text-1xl font-almarai">
            {t("pricing22.explorePremium")} <br /> {t("pricing22.comparing")}{" "}
            <br /> {t("pricing22.plan")}
          </h2>

          {/* Titres des colonnes des plans */}
          <div className="grid grid-cols-4 col-span-4 gap-6 text-customGray">
            {[
              {
                title: t("pricing.tiers.free.name"),
                desc: t("pricing.tiers.free.description"),
              },
              {
                title: t("pricing.tiers.basic.name"),
                desc: t("pricing.tiers.basic.description"),
              },
              {
                title: t("pricing.tiers.advanced.name"),
                desc: t("pricing.tiers.advanced.description"),
              },
              {
                title: t("pricing.tiers.premium.name"),
                desc: t("pricing.tiers.premium.description"),
              },
            ].map((plan, index) => (
              <div key={index} className="text-left">
                <h3 className="text-lg   font-bold font-almarai font-almarai font-almarai">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-500">{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tableau des fonctionnalités */}
        <div className="overflow-x-auto font-almarai">
          <table className="w-full border-collapse">
            <tbody className="text-gray-700">
              {[
                [
                  t("pricing.table.surveyCreation"),
                  t("pricing.table.basic"),
                  t("pricing.table.advanced"),
                  t("pricing.table.fullLogic"),
                  t("pricing.table.enterprise"),
                ],
                [
                  t("pricing.table.responseLimit"),
                  "100",
                  t("pricing.table.unlimited"),
                  t("pricing.table.unlimited"),
                  t("pricing.table.unlimited"),
                ],
                [
                  t("pricing.table.analytics"),
                  t("pricing.table.basic"),
                  t("pricing.table.enhanced"),
                  t("pricing.table.advanced"),
                  t("pricing.table.custom"),
                ],
                [
                  t("pricing.table.aiFeatures"),
                  "—",
                  t("pricing.table.basic"),
                  t("pricing.table.advanced"),
                  t("pricing.table.enterprise"),
                ],
                [
                  t("pricing.table.analytics"),
                  t("pricing.table.basic"),
                  t("pricing.table.enhanced"),
                  t("pricing.table.advanced"),
                  t("pricing.table.custom"),
                ],
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-300">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-4 ${j === 0 ? " font-bold font-almarai text-gray-600" : "text-gray-900"
                        }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Témoignage */}

      <div className="relative max-w-4xl px-6 mx-auto mt-12 font-almarai">
        <div className="bg-[#F6F6F6] rounded-3xl  p-10 flex items-center shadow-md relative">
          {/* Image de profil (bien positionnée à l'intérieur du box) */}

          <div className="relative left-0 flex-shrink-0">
            <img
              src="src/assets/images/avatar.png"
              alt="User"
              className="w-32 h-32 rounded-full border-[8px] border-[#97B0F3] object-cover"
            />
          </div>

          {/* Contenu du témoignage */}
          <div className="relative flex-1 ml-8 font-inter">
            {/* Guillemets au début */}
            <span className="text-6xl   font-bold font-almarai font-almarai text-gray-800 font-serif block mt-[-10px] ">
              <svg
                width="30"
                height="30"
                viewBox="0 0 79 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 59.7073V43.2835C0 38.4362 0.912433 33.3323 2.7373 27.9718C4.56217 22.6112 7.09987 17.4788 10.3504 12.5745C13.601 7.67013 17.4218 3.47864 21.8129 0L34.4729 9.06729C30.9942 14.1427 28.0288 19.4462 25.5766 24.9778C23.1245 30.5095 21.8984 36.5258 21.8984 43.0269V59.7073H0ZM43.6257 59.7073V43.2835C43.6257 38.4362 44.5381 33.3323 46.363 27.9718C48.1879 22.6112 50.7256 17.4788 53.9761 12.5745C57.2267 7.67013 61.0475 3.47864 65.4386 0L78.0986 9.06729C74.6199 14.1427 71.6545 19.4462 69.2023 24.9778C66.7502 30.5095 65.5241 36.5258 65.5241 43.0269V59.7073H43.6257Z"
                  fill="#3D3B3B"
                />
              </svg>
            </span>

            {/* Texte du témoignage */}
            <p className="text-sm leading-relaxed text-[#3D3B3B]">
              {t("temoignage.description1")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#3D3B3B]">
              {t("temoignage.description2")}
            </p>

            {/* Nom et description */}
            <p className="mt-4 font-semibold text-[#3D3B3B]">
              {t("temoignage.const")}
            </p>
            <p className="text-sm text-gray-500">{t("temoignage.const2")}</p>

            {/* Guillemets à la fin */}
            <span className="absolute font-serif text-6xl   font-bold font-almarai font-almarai text-gray-800 bottom-4 right-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 79 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M78.0986 0V16.4238C78.0986 21.2711 77.1861 26.375 75.3613 31.7356C73.5364 37.0961 70.9987 42.2285 67.7482 47.1329C64.4976 52.0372 60.6768 56.2287 56.2857 59.7073L43.6257 50.64C47.1044 45.5646 50.0698 40.2611 52.5219 34.7295C54.9741 29.1979 56.2002 23.1815 56.2002 16.6804V0H78.0986ZM34.4729 0V16.4238C34.4729 21.2711 33.5604 26.375 31.7356 31.7356C29.9107 37.0961 27.373 42.2285 24.1225 47.1329C20.8719 52.0372 17.0511 56.2287 12.66 59.7073L0 50.64C3.47865 45.5646 6.44406 40.2611 8.89622 34.7295C11.3484 29.1979 12.5745 23.1815 12.5745 16.6804V0H34.4729Z"
                  fill="#3D3B3B"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* Section Services */}
      <div className="relative bg-[#020617] py-20 text-white overflow-hidden font-almarai mt-12">
        {/* Icônes décoratives */}
        <div className="absolute flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-md top-10 left-10 rotate-12">
          <svg
            width="35"
            height="35"
            viewBox="0 0 56 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.5225 23.0297C43.7258 16.3695 36.8639 12.4078 30.2262 14.1984C25.5751 15.4205 22.254 19.126 21.2517 23.5031L10.6536 26.3429C9.90123 26.5566 9.01944 27.3245 8.72334 28.0685L7.35294 31.4325C6.91593 32.5526 7.31249 34.0777 8.25924 34.8149L11.1281 37.043C11.7565 37.5393 12.8959 37.7778 13.6708 37.558L15.5198 37.0626C15.9625 36.9561 16.2267 36.4986 16.1058 36.0476L14.9337 31.6731C14.7584 31.0192 15.1546 30.333 15.8085 30.1578C16.4625 29.9825 17.1486 30.3787 17.3239 31.0326L18.5021 35.4297C18.6169 35.8581 19.0743 36.1223 19.5027 36.0075L24.2749 34.7408C27.3089 38.0365 32.0461 39.5706 36.6829 38.3403C43.3349 36.5579 47.3049 29.6817 45.5225 23.0297ZM31.5389 29.7855C29.5661 28.6466 28.8894 26.1211 30.0284 24.1483C31.1674 22.1755 33.6929 21.4988 35.6657 22.6378C37.6384 23.7768 38.3151 26.3023 37.1762 28.275C36.0372 30.2478 33.5117 30.9245 31.5389 29.7855Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute flex items-center justify-center w-12 h-12 bg-green-500 rounded-md top-1/3 right-16 -rotate-12">
          <svg
            width="35"
            height="35"
            viewBox="0 0 56 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.5225 23.0297C43.7258 16.3695 36.8639 12.4078 30.2262 14.1984C25.5751 15.4205 22.254 19.126 21.2517 23.5031L10.6536 26.3429C9.90123 26.5566 9.01944 27.3245 8.72334 28.0685L7.35294 31.4325C6.91593 32.5526 7.31249 34.0777 8.25924 34.8149L11.1281 37.043C11.7565 37.5393 12.8959 37.7778 13.6708 37.558L15.5198 37.0626C15.9625 36.9561 16.2267 36.4986 16.1058 36.0476L14.9337 31.6731C14.7584 31.0192 15.1546 30.333 15.8085 30.1578C16.4625 29.9825 17.1486 30.3787 17.3239 31.0326L18.5021 35.4297C18.6169 35.8581 19.0743 36.1223 19.5027 36.0075L24.2749 34.7408C27.3089 38.0365 32.0461 39.5706 36.6829 38.3403C43.3349 36.5579 47.3049 29.6817 45.5225 23.0297ZM31.5389 29.7855C29.5661 28.6466 28.8894 26.1211 30.0284 24.1483C31.1674 22.1755 33.6929 21.4988 35.6657 22.6378C37.6384 23.7768 38.3151 26.3023 37.1762 28.275C36.0372 30.2478 33.5117 30.9245 31.5389 29.7855Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute flex items-center justify-center w-12 h-12 bg-purple-500 rounded-md bottom-12 left-1/3 rotate-6">
          <svg
            width="35"
            height="35"
            viewBox="0 0 56 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.5225 23.0297C43.7258 16.3695 36.8639 12.4078 30.2262 14.1984C25.5751 15.4205 22.254 19.126 21.2517 23.5031L10.6536 26.3429C9.90123 26.5566 9.01944 27.3245 8.72334 28.0685L7.35294 31.4325C6.91593 32.5526 7.31249 34.0777 8.25924 34.8149L11.1281 37.043C11.7565 37.5393 12.8959 37.7778 13.6708 37.558L15.5198 37.0626C15.9625 36.9561 16.2267 36.4986 16.1058 36.0476L14.9337 31.6731C14.7584 31.0192 15.1546 30.333 15.8085 30.1578C16.4625 29.9825 17.1486 30.3787 17.3239 31.0326L18.5021 35.4297C18.6169 35.8581 19.0743 36.1223 19.5027 36.0075L24.2749 34.7408C27.3089 38.0365 32.0461 39.5706 36.6829 38.3403C43.3349 36.5579 47.3049 29.6817 45.5225 23.0297ZM31.5389 29.7855C29.5661 28.6466 28.8894 26.1211 30.0284 24.1483C31.1674 22.1755 33.6929 21.4988 35.6657 22.6378C37.6384 23.7768 38.3151 26.3023 37.1762 28.275C36.0372 30.2478 33.5117 30.9245 31.5389 29.7855Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Contenu centré */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Bouton "About us" */}
          <button className="px-6 py-2 mb-6 text-sm text-white bg-[#97B0F3] rounded-full">
            {t("footer_pricing.aboutUs")}
          </button>

          {/* Titre principal */}
          <h2 className="text-5xl   font-bold font-almarai font-almarai font-almarai">
            <span className="px-1 mr-[-0.2em] text-white bg-purple-500">
              {t("footer_pricing.title").split(" ")[0]}
            </span>{" "}
            <span className="relative">
              {t("footer_pricing.title").split(" ")[1]}
            </span>
          </h2>

          <p className="mt-4 text-gray-400">
            {t("footer_pricing.description")}
          </p>

          {/* Liste des services */}
          <div className="grid grid-cols-3 gap-8 mt-10">
            {[1, 2, 3].map((col, index) => (
              <ul key={index} className="space-y-4">
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-3">
                    {" "}
                    {t("footer_pricing.services.unlimitedSurveys")}
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-3">
                    {t("footer_pricing.services.advancedQuestionTypes")}
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-3">
                    {t("footer_pricing.services.emailCampaigns")}
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-3">
                    {t("footer_pricing.services.abTesting")}
                  </span>
                </li>
              </ul>
            ))}
          </div>

          {/* Bouton d'action */}
          <button className="px-6 py-2 mt-8 text-xs text-white bg-[#3068FF] rounded-lg">
            {t("footer_pricing.learnMore")}
          </button>
        </div>

        {/* Bordures décoratives */}
      </div>
      <section className="max-w-4xl py-16 mx-auto font-almarai">
        {/* Titre */}
        <h2 className="text-5xl text-center font-almarai text-border text-[#282828]">
          {t("faq.title")}
        </h2>
        <p className="mt-2 font-semibold text-center text-gray-500">
          {t("faq.subtitle")}
        </p>

        {/* Liste des questions */}
        <div className="mt-10 space-y-4">
          {/* Question ouverte avec contenu visible */}
          <div className="p-6 border border-gray-300 shadow-md rounded-xl">
            <button className="flex items-center justify-between w-full font-semibold">
              <span>{questions[0].question}</span>
              <span className="flex items-center justify-center w-10 h-10 bg-black rounded-full shadow-md">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 25 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.78076 1.83789L12.3134 12.323L22.8461 1.83789"
                    stroke="white"
                    stroke-width="2.55134"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
            <p className="mt-4 text-gray-600">{questions[0].answer}</p>
          </div>

          {/* Questions fermées avec boutons identiques */}
          {questions.slice(1).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-white shadow-md rounded-xl"
            >
              <span className="font-semibold">{item.question}</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full shadow-md">
                <svg
                  width="8"
                  height="25"
                  viewBox="0 0 14 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.34619 23.0273L11.831"
                    stroke="black"
                    strokeWidth="2.55134"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Pricing;
