// import React from "react";
// import { Navigation } from "@/components/navigation/Navigation";

// import { Footer } from "./Footer";
// import { useLocation } from "react-router-dom";
// import { CookieConsentProvider } from "./CookieConsent/CookieConsentProvider";
// import { CookieConsentBanner } from "./CookieConsent/CookieConsentBanner";

// export const Layout: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const location = useLocation();

//   // Hide navigation and footer for form builder routes
//   const isFormBuilder = location.pathname.includes("/forms/new");
//   const isAccount = location.pathname.includes("/account");

//   return (
//     <CookieConsentProvider>
//       <div className="relative flex flex-col min-h-screen">
//         {/* {!isFormBuilder && (
//           <div className="relative z-50">
//             <Navigation />
//           </div>
//         )} */}
//         {!isAccount && (
//           <div className="relative ">
//             <Navigation />
//           </div>
//         )}
//         <main className={`flex-grow ${isFormBuilder ? "bg-gray-50" : ""}`}>
//           {children}
//         </main>
//         {/* {!isFormBuilder && <Footer />} */}
//         {/* {!isAccount && <Footer />} */}

//         <CookieConsentBanner />
//       </div>
//     </CookieConsentProvider>
//   );
// };
import React from "react";
import { Navigation } from "@/components/navigation/Navigation";

import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { CookieConsentProvider } from "./CookieConsent/CookieConsentProvider";
import { CookieConsentBanner } from "./CookieConsent/CookieConsentBanner";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  // Hide navigation and footer for form builder routes
  const isFormBuilder = location.pathname.includes("/forms/new");
  const isAccount = location.pathname.includes("/account");
  const isPublic = location.pathname.includes("/survey");

  return (
    <CookieConsentProvider>
      <div className="relative flex flex-col min-h-screen">
        {/* {!isFormBuilder && (
          <div className="relative z-50">
            <Navigation />
          </div>
        )} */}
        {!isAccount && !isFormBuilder && !isPublic && (
          <div className="relative z-50">
            <Navigation />
          </div>
        )}
        <main className={`flex-grow ${isFormBuilder ? "bg-gray-50" : ""} `}>
          {/* <main className={`flex-grow pt-24 ${isFormBuilder ? "bg-gray-50" : ""} `}> */}
          {children}
        </main>
        {/* {!isFormBuilder && <Footer />}
        {!isAccount && <Footer />} */}

        <CookieConsentBanner />
      </div>
    </CookieConsentProvider>
  );
};
