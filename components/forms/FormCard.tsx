import { Form } from "@/types";
import { Link } from "react-router-dom";
import { FormOptionsDropdown } from "./FormOptionsDropdown";
import moment from "moment";
import { useEffect, useState } from "react";
import { ClipboardCopy, Send } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import axios from "@/src/config/axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

interface FormCardProps {
  form: Form;
  responsesCount: { [key: string]: number };
  onShare: () => void;
  onOptionsClick: () => void;
  onClosingOptions: () => void;
  onStatusChange: (status: "live" | "draft" | "closed") => void;
  averageTime: { [key: string]: number };
  completionData: { [key: string]: number };
}

export function FormCard({
  form,
  onShare,
  responsesCount,
  onOptionsClick,
  onClosingOptions,
  onStatusChange,
  averageTime,
  completionData,
}: FormCardProps) {
  const { t } = useTranslation();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [showPopupC, setShowPopupC] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const { user, isRolePermission } = useAuth();
  const [strokeDashoffset, setStrokeDashoffset] = useState(100);

  const [Status, setStatus] = useState();
  const [isClosed, setIsClosed] = useState(form?.isClosed ?? false);

  const [openDate, setOpenDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const completionPercentage = completionData?.[form._id] || 0;
  const avg = averageTime?.[form._id] || 0;

  const handleShareClick = async (formId: string) => {
    // Ajout de async
    try {
      const res = await axios.get(`https://swbackstg.vercel.app/getsurvey/${formId}`);

      setIsClosed(res.data.isClosed);
      setOpenDate(res.data.openDate ? new Date(res.data.openDate) : null);
      setExpirationDate(
        res.data.expirationDate ? new Date(res.data.expirationDate) : null
      );

      const now = new Date();

      if (
        res.data.isClosed ||
        (res.data.openDate && now < new Date(res.data.openDate)) ||
        (res.data.expirationDate && now > new Date(res.data.expirationDate))
      ) {
        Swal.fire({
          icon: "warning",
          title: t("formCard.unavailableTitle"),
          text: t("formCard.unavailableMessage"),
        });
        return;
      }

      setActivePopup(formId);
    } catch (error) {
      console.error("Erreur lors de la récupération du plan :", error);
    }

    setTimeout(() => {
      setActivePopup(formId);
    }, 1000);
  };

  useEffect(() => {
    const dashoffset = 100 - (completionPercentage / 100) * 100;
    setStrokeDashoffset(dashoffset);
  }, [completionPercentage]);

  const copyToClipboard = (formId: string) => {
    try {
      const link = `http://localhost:5173/publish_survey/${formId}`;
      setCopied(true);
      navigator.clipboard.writeText(link.trim());
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("❌ Erreur de copie :", err);
    }
  };

  const handleSendClick = async (email: string, formId: string) => {
    if (!email) {
      toast.error(" Please enter an email address.");
      return;
    }
    setIsLoading(true);
    setShowPopupC(true);

    try {
      const response = await axios.post(
        `https://swbackstg.vercel.app/publish_survey/${formId}`,
        {
          email,
        }
      );

      if (response.data.message) {
        toast.success(t("formCard.emailSuccess"));
        setActivePopup(null);

        setEmail("");
      }
    } catch (error) {
      toast.error(t("formCard.emailFail"));
      setIsLoading(false);
    }
  };

  return (
    <div className="font-almarai ">
      <div className="w-full bg-white border border-gray-200 shadow-md rounded-xl">
        <div className="flex ">
          <div className="flex flex-col items-center justify-center px-6 bg-[#E9F1FF]">
            <svg className="w-18 h-18" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3068FF4A"
                strokeWidth="4"
              />

              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3068FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dashoffset 1s ease-in-out",
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                }}
              />

              <text
                x="18"
                y="18"
                textAnchor="middle"
                dy=".3em"
                className="text-xs text-[#3068FF] fill-current"
                style={{ fontSize: "6px" }}
              >
                {completionPercentage} %
              </text>
            </svg>
            <span className="mt-4 text-xs text-[#969FB2]">
              {t("formCard.completion")}
            </span>
          </div>

          <div className="flex flex-col w-full p-4">
            <div className="flex items-start justify-between ">
              <div>
                <h2 className="font-almarai text-gray-900 text-md">
                  {/* <p>{form.json?.title?.default || form.json?.title?.ar}</p> */}
                  <h2 className="font-almarai text-gray-900 text-md">
                    <p>
                      <p>
                        {form.json?.title?.default ||
                          form.json?.title?.ar ||
                          form?.title}
                      </p>
                    </p>
                  </h2>
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {t("formCard.edited", {
                    timeAgo: moment(form.updatedAt).fromNow(),
                  })}
                </p>
                <h2 className="mt-2 font-almarai text-gray-500 text-md">
                  {t("formCard.responses", {
                    count: responsesCount[form._id] || 0,
                  })}
                </h2>
              </div>
              <div className="flex space-x-1">
                {isRolePermission("btn_share") && (
                  <button
                    className="p-1 text-gray-400"
                    onClick={() => handleShareClick(form._id)}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3748 10.2812C11.2085 10.2812 11.0423 10.22 10.911 10.0887C10.6573 9.83496 10.6573 9.41496 10.911 9.16121L18.086 1.98621C18.3398 1.73246 18.7598 1.73246 19.0135 1.98621C19.2673 2.23996 19.2673 2.65996 19.0135 2.91371L11.8385 10.0887C11.7073 10.22 11.541 10.2812 11.3748 10.2812Z"
                        fill="#9CA3AF"
                      />
                      <path
                        d="M19.2508 6.60625C18.892 6.60625 18.5945 6.30875 18.5945 5.95V2.40625H15.0508C14.692 2.40625 14.3945 2.10875 14.3945 1.75C14.3945 1.39125 14.692 1.09375 15.0508 1.09375H19.2508C19.6095 1.09375 19.907 1.39125 19.907 1.75V5.95C19.907 6.30875 19.6095 6.60625 19.2508 6.60625Z"
                        fill="#9CA3AF"
                      />
                      <path
                        d="M13.125 19.9062H7.875C3.12375 19.9062 1.09375 17.8762 1.09375 13.125V7.875C1.09375 3.12375 3.12375 1.09375 7.875 1.09375H9.625C9.98375 1.09375 10.2812 1.39125 10.2812 1.75C10.2812 2.10875 9.98375 2.40625 9.625 2.40625H7.875C3.84125 2.40625 2.40625 3.84125 2.40625 7.875V13.125C2.40625 17.1588 3.84125 18.5938 7.875 18.5938H13.125C17.1588 18.5938 18.5938 17.1588 18.5938 13.125V11.375C18.5938 11.0162 18.8913 10.7188 19.25 10.7188C19.6087 10.7188 19.9062 11.0162 19.9062 11.375V13.125C19.9062 17.8762 17.8762 19.9062 13.125 19.9062Z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </button>
                )}
                <FormOptionsDropdown
                  idForm={form._id}
                  onCloseForm={() => {
                    setIsClosed(true);
                    onStatusChange("closed");
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row justify-between mt-8 space-x-2">
              <div className="flex items-center space-x-2 ">
                <span
                  className={`flex items-center px-2 py-2 text-sm font-almarai border rounded-lg w-max-content
                          ${form?.isClosed
                      ? "text-red-700 bg-red-100 border-red-200"
                      : "text-green-700 bg-green-100 border-green-200"
                    }
                            `}
                >
                  <span
                    className={`w-2 h-2 mr-1 rounded-full ${form?.isClosed ? "bg-red-500" : "bg-green-500"
                      }`}
                  ></span>
                  {form?.isClosed !== undefined
                    ? form?.isClosed
                      ? t("formCard.closed")
                      : t("formCard.live")
                    : t("formCard.loading")}
                </span>
                <span className="px-2 py-2 text-sm font-almarai text-blue-600 bg-blue-100 border border-blue-200 rounded-lg w-max">
                  {t("formCard.avgTime", { seconds: avg })}
                </span>
              </div>

              <Link to={`/survey/results/${form._id}`}>
                <span className="flex items-center float-right px-2 py-2 text-gray-500 border border-gray-200 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-sm font-almarai">
                    {t("formCard.seeResults")}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {activePopup === form._id && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="relative w-[600px] p-8 bg-white rounded-lg shadow-lg">
            <button
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
              onClick={() => setActivePopup(null)}
            >
              ✖
            </button>

            {/* 🔹 Si le formulaire est fermé, afficher un message */}
            {Status ? (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="red"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="8"
                      x2="16"
                      y2="16"
                      stroke="red"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="16"
                      x2="16"
                      y2="8"
                      stroke="red"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="text-lg font-almarai">
                    {t("formCard.surveyClosed")}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">
                  {t("formCard.cannotShare")}
                </p>
              </div>
            ) : (
              <>
                {/* 🔹 Si le formulaire est ouvert, afficher les options de partage */}
                <div className="flex items-center space-x-2 text-green-600 flex-column">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="green"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 12l2 2 4-4"
                      stroke="green"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-lg font-almarai">
                    {t("formCard.readyToShare")}
                  </span>
                  <br />
                  <span>{t("formCard.shareInstruction")}</span>
                </div>

                {/* Lien de partage */}
                <div className="mt-6">
                  <label className="block text-lg font-almarai text-gray-700">
                    {t("formCard.shareLink")}
                  </label>
                  <div className="flex items-center mt-2 border border-gray-300 rounded-lg">
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-sm rounded-lg"
                      value={`http://localhost:5173/publish_survey/${form._id} `}
                      readOnly
                    />
                    <button
                      onClick={() => copyToClipboard(form._id)}
                      className="flex items-center px-4 py-2 text-lg text-white bg-gray-800 rounded-r-lg"
                    >
                      <ClipboardCopy size={18} className="mr-1" />
                      {copied ? t("formCard.copied") : t("formCard.copy")}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-lg font-almarai text-gray-700">
                    {t("formCard.sendByEmail")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                    placeholder={t("formCard.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={() => handleSendClick(email, form._id)}
                    className="flex items-center justify-center w-full px-2 py-2 mt-2 text-sm text-white bg-blue-600 rounded-lg"
                    disabled={!email}
                  >
                    {t("formCard.sendEmail")}
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
