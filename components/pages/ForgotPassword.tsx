import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";


export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
     try {
    const response = await fetch("https://backend.votly.co/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsSuccess(true);
      toast.success(data.msg || t("forgotPassword.toastSuccess"), {
        icon: "📧",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.error(data.msg || t("forgotPassword.toastError"), {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  } catch (error) {
    toast.error(t("forgotPassword.toastError"), {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } finally {
    setIsLoading(false);
  }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center text-sm font-almarai text-gray-500 hover:text-indigo-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("forgotPassword.backToLogin")}
        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          {!isSuccess ? (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100"
                  >
                    <Mail className="h-8 w-8 text-indigo-600" />
                  </motion.div>
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    {t("forgotPassword.forgotPasswordTitle")}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("forgotPassword.forgotPasswordSubtitle")}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-almarai text-gray-700"
                  >
                    {t("forgotPassword.emailLabel")}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={t("forgotPassword.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      t("forgotPassword.resendEmail")
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-almarai text-gray-900 mb-2">
                {t("forgotPassword.checkEmailTitle")}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {t("forgotPassword.checkEmailMessage")}
                <br />
                <span className="font-almarai text-gray-900">{email}</span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("forgotPassword.resendEmail")}
                </button>
                <Link
                  to="/login"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-almarai rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("forgotPassword.backToLogin")}
                </Link>
              </div>
            </motion.div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t("forgotPassword.needHelp")}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/contact"
                className="text-sm font-almarai text-indigo-600 hover:text-indigo-500"
              >
                {t("forgotPassword.contactSupport")}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
