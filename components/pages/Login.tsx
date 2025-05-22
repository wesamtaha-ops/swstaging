import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import api from "@/src/config/axios";
import {
  selectAddCompanyStatus,
  CreateCompany,
} from "@/src/features/company/companySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import { useSelector } from "react-redux";
import { createWorkspace } from "@/src/features/workspace/workspaceSlice";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: t("login.field"),
        text: t("login.text1"),
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/user/login", { email, password });
      const { user } = response.data;

      if (user.role === "user" && !user.companyId && !user.workspaceId) {
        const companyRes = await dispatch(
          CreateCompany({
            name: `DefaultCompany-${user.username}`,
            Owner: user._id,
          })
        ).unwrap();


        const companyId = companyRes._id;

        await dispatch(
          createWorkspace({
            name: `Workspace-${user.username}`,
            companyOwner: companyId,
          })
        ).unwrap();

      }


      window.location.href = "/forms";
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("login.connection"),
        text: error.message || "Email ou mot de passe incorrect !",
      });
      setError(error.message || "Email ou mot de passe incorrect !");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen font-almarai">
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <div className="max-w-md w-full">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-center font-almarai text-2xl font-almarai text-gray-800">
              {t("login.welcome")}
            </h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="flex flex-row text-md font-almarai text-gray-700"
                >
                  {t("login.email_label")}
                  <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      e.target.setCustomValidity("");
                    }}
                    onInvalid={(e) => {
                      (e.target as HTMLInputElement).setCustomValidity(t("login.error"));
                    }}
                    className={`appearance-none block w-full px-4 py-4 border ${error ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder={t("login.email_placeholder")}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="flex flex-row text-md font-almarai text-gray-700"
                >
                  {t("login.password_label")}
                  <span className="text-red-500 ml-1 text-lg   font-bold font-almarai font-almarai  font-almarai">*</span>
                </label>
                <div
                  className={`mt-1 relative flex items-center ${i18n.language === "ar" ? "flex-row-reverse" : ""
                    }`}
                >
                  {/* Bouton Afficher/Masquer le mot de passe */}
                  <button
                    type="button"
                    className="absolute inset-y-0 px-3 flex items-center text-gray-500"
                    style={i18n.language === "ar" ? { left: "10px" } : { right: "10px" }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>

                  {/* Champ Mot de passe */}
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full px-4 py-4 border ${error ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder={t("login.password_placeholder")}
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 text-white font-almarai rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? t("login.loading") : t("login.login_button")}
                </button>
              </div>

              {/* Message d'erreur */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>



      {/* Section de droite avec l'image de fond */}
      <div
        className="w-1/2 flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url('/assets/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-40"></div>

        <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
          <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-green-600">
            {t("login.about_us")}
          </button>
          <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai text-black my-6">
            {t("login.build_a_form")}
          </h1>

          {/* Section des logos alignée en bas */}
          <div className="absolute bottom-12 w-full flex flex-col items-center">
            <div className="flex gap-6 items-center justify-center bg-transparent">
              <img
                src="/assets/blend.png"
                alt="Blend"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/bloomreach.png"
                alt="Bloomreach"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/cameo.png"
                alt="Cameo"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/hippo.png"
                alt="Hippo"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/bitpanda.png"
                alt="Bitpanda"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
              <img
                src="/assets/chargebee.png"
                alt="Chargebee"
                className="h-7 bg-grey filter grayscale mix-blend-multiply"
              />
            </div>
            <p className="text-gray-600 mt-4 mb-2">
              {t("login.trusted_by_clients")}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}


