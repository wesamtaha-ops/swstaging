import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../providers/AuthProvider";
import { AppDispatch } from "@/src/app/store";
import { useDispatch } from "react-redux";
import { DeleteById } from "@/src/features/users/userSlice";
import { useTranslation } from "react-i18next";


export function ProfileTab() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert(t("profile.errorUpdate"));
      return;
    }

    try {
      const response = await fetch(`https://backend.votly.co//user/put/${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: formData.username }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: t("profile.successTitle"),
          text: data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });

        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        Swal.fire({
          title: t("profile.errorTitle"),
          text: data.msg,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        title: t("profile.serverError"),
        text: t("profile.tryAgain"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const deleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(DeleteById(user?._id ?? ""));
      Swal.fire({
        icon: "success",
        title: t("profile.deleteSuccess"),
        timer: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 flex">
      <div className="w-full max-w-5xl space-y-8">
        <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">
          {t("profile.title")}
        </h2>

        <div className="block w-full">
          <div className="bg-gray-100 rounded-lg border-t border-gray-200 w-full mb-4 px-4 py-2">
            <h3 className="text-lg font-almarai text-gray-900">
              {t("profile.general")}
            </h3>
          </div>

          <label className="block text-sm font-almarai text-gray-700 mb-2">
            {t("profile.username")}
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md sm:text-sm"
          />
        </div>

        <div className="block w-full">
          <div className="bg-gray-100 rounded-lg border-t border-gray-200 w-full mb-4 px-4 py-2">
            <h3 className="text-lg font-almarai text-gray-900">
              {t("profile.email")}
            </h3>
          </div>
          <label className="block text-sm font-almarai text-gray-700 mb-5 mt-4">
            {t("profile.email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md sm:text-sm"
          />
        </div>

        <div className="block w-full">
          <div className="bg-gray-100 rounded-lg border-t border-gray-200 w-full mb-4 px-4 py-2">
            <h3 className="text-lg font-almarai text-gray-900">
              {t("profile.security")}
            </h3>
          </div>

          <div className="block space-y-6">
            {["currentPassword", "newPassword", "confirmPassword"].map(
              (field, index) => (
                <div key={index}>
                  <label className="block text-sm font-almarai text-gray-700 mb-5 mt-4">
                    {t(`profile.${field}`)}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                      value={passwords[field as keyof typeof passwords]}
                      placeholder={t(`profile.placeholder.${field}`)}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          [field]: e.target.value,
                        })
                      }
                      className={`w-full p-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md sm:text-sm ${isRTL ? "pr-14 text-right" : "pl-14"}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility(field as keyof typeof showPassword)
                      }
                      className={`absolute inset-y-0 ${isRTL ? "right-3" : "left-3"} flex items-center text-gray-500 hover:text-gray-700`}
                    >
                      {showPassword[field as keyof typeof showPassword] ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 hover:shadow-xl"
          >
            {t("profile.save")}
          </button>
        </div>

        <div className="block w-full">
          <div className="bg-gray-100 rounded-lg border-t border-gray-200 w-full mb-4 px-4 py-2">
            <h3 className="text-lg font-almarai text-gray-900">
              {t("profile.delete")}
            </h3>
          </div>
          <h2 className="text-lg font-almarai text-red-600 mt-10">
            {t("profile.delete")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("profile.deleteWarning")}
          </p>
          <div className="flex justify-end">
            <button
              onClick={deleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 hover:shadow-xl"
            >
              {t("profile.delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
