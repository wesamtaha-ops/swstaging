import React, { useEffect, useState } from "react";
import { HelpCircle, Calendar, Hash, Lock } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import { useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";



interface AccessPanelProps {
  isClosed: boolean;
  onChangeIsClosed: (val: boolean) => void;
}

export function AccessPanel({ isClosed, onChangeIsClosed }: AccessPanelProps) {
  const { t } = useTranslation();
  const { id: surveyId } = useParams();
  console.log(surveyId, "houssem");
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showOpenConfirm, setShowOpenConfirm] = useState(false);

  const [localIsClosed, setLocalIsClosed] = useState(isClosed);
  const [openDate, setOpenDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [submissionLimit, setSubmissionLimit] = useState(false);

  const [openDateEnabled, setOpenDateEnabled] = useState(false);
  const [expirationDateEnabled, setExpirationDateEnabled] = useState(false);
  const [submissionLimitEnabled, setSubmissionLimitEnabled] = useState(false);

  const [openDateChanged, setOpenDateChanged] = useState(false);
  const [expirationDateChanged, setExpirationDateChanged] = useState(false);


  const fetchAccessSettings = async () => {
    try {
      const res = await fetch(`https://backend.votly.co/getsurvey/${surveyId}`);

      const data = await res.json();

      setLocalIsClosed(data.isClosed);
      onChangeIsClosed(data.isClosed);


      setOpenDate(data.openDate ? new Date(data.openDate) : null);
      setExpirationDate(data.expirationDate ? new Date(data.expirationDate) : null);
      setSubmissionLimit(data.submissionLimit || false);

      setOpenDateEnabled(!!data.openDate);
      setExpirationDateEnabled(!!data.expirationDate);
      setSubmissionLimitEnabled(!!data.submissionLimit);


    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchAccessSettings();
    setLocalIsClosed(isClosed);
  }, [isClosed]);



  const updateSurveyAccess = async () => {
    try {
      const payload = {
        isClosed: localIsClosed,
        openDate: openDateEnabled ? openDate?.toISOString() : null,
        expirationDate: expirationDateEnabled ? expirationDate?.toISOString() : null,
        submissionLimit: submissionLimitEnabled ? 100 : null,
      };


      await fetch(`https://backend.votly.co/surveys/access/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      onChangeIsClosed(localIsClosed);
      alert("✅ Params saved !");
    } catch (error) {
      console.error("Error update :", error);
    }
  };

  const handleCloseForm = async () => {
    try {
      const res = await fetch(`https://backend.votly.co/close_survey/${surveyId}/close`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Form closed via AccessPanel", data);
        setLocalIsClosed(true);
        setLocalIsClosed(false); // dans handleOpenForm
        onChangeIsClosed(true); // Mettez à jour dans le parent aussi
      } else {
        console.error("❌ Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  const handleOpenForm = async () => {
    try {
      const res = await fetch(`https://backend.votly.co/close_survey/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Form reopened via AccessPanel", data);
        setLocalIsClosed(false);
        onChangeIsClosed(false); // Mise à jour du parent
      } else {
        console.error("❌ Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };









  const saveOpenDate = async () => {
    try {
      await fetch(`https://backend.votly.co/surveys/access/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openDate: openDate?.toISOString() }),
      });
      setOpenDateChanged(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la date d'ouverture :", error);
    }
  };

  const saveExpirationDate = async () => {
    try {
      await fetch(`https://backend.votly.co/surveys/access/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expirationDate: expirationDate?.toISOString() }),
      });
      setExpirationDateChanged(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la date d'expiration :", error);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">{t("accessPanel.title")}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("accessPanel.description")}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Close Form */}
      <AccessItem
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        title={t("accessPanel.closeForm")}
        description={t("accessPanel.closeFormDesc")}
        checked={localIsClosed}
        onCheckedChange={async (checked) => {
          setLocalIsClosed(checked);
          if (!checked) {
            setShowOpenConfirm(true);
          } else {
            setShowCloseConfirm(true);
          }
        }}
      />
      {/* Open form confirmation */}
      <Dialog.Root open={showOpenConfirm} onOpenChange={setShowOpenConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[400px] bg-white rounded-xl shadow-lg p-6 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center mb-4">
              <XCircle className="w-12 h-12 text-green-600" />
            </div>
            <Dialog.Title className="text-lg   font-bold font-almarai font-almarai  font-almarai text-center">
              {t("accessPanel.confirmOpenTitle")}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-center text-gray-600 mt-2">
              {t("accessPanel.confirmOpenDesc")}
            </Dialog.Description>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowOpenConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                {t("accessPanel.cancel")}

              </button>
              <button
                onClick={async () => {
                  await handleOpenForm();
                  setShowOpenConfirm(false);
                }}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {t("accessPanel.yesOpen")}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


      {/* Close form confirmation */}
      <Dialog.Root open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[400px] bg-white rounded-xl shadow-lg p-6 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <Dialog.Title className="text-lg   font-bold font-almarai font-almarai  font-almarai text-center">
              {t("accessPanel.confirmCloseTitle")}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-center text-gray-600 mt-2">
              {t("accessPanel.confirmCloseDesc")}
            </Dialog.Description>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowCloseConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                {t("accessPanel.cancel")}

              </button>
              <button
                onClick={async () => {
                  await handleCloseForm();
                  setShowCloseConfirm(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                {t("accessPanel.yesClose")}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Open Date */}
      <AccessItem
        icon={<Calendar className="h-5 w-5 text-gray-400" />}
        title={t("accessPanel.openDateTitle")}
        description={t("accessPanel.openDateDesc")}
        checked={openDateEnabled}
        onCheckedChange={(checked) => setOpenDateEnabled(checked)}
      />
      {openDateEnabled && (
        <div className="ml-8 mt-2">
          <label className="block text-sm font-almarai text-gray-700 mb-1">{t("accessPanel.selectOpenDate")}</label>
          <DatePicker
            selected={openDate}
            onChange={(date: Date | null) => setOpenDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholderText={t("accessPanel.selectOpenDate")}
          />
        </div>
      )}



      {/* Expiration Date */}
      <AccessItem
        icon={<Calendar className="h-5 w-5 text-gray-400" />}
        title={t("accessPanel.expirationDateTitle")}
        description={t("accessPanel.expirationDateDesc")}
        checked={expirationDateEnabled}
        onCheckedChange={(checked) => setExpirationDateEnabled(checked)}
      />
      {expirationDateEnabled && (
        <div className="ml-8 mt-2">
          <label className="block text-sm font-almarai text-gray-700 mb-1">{t("accessPanel.selectExpirationDate")}</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date: Date | null) => setExpirationDate(date)}
            minDate={openDate ?? new Date()}
            showTimeSelect
            dateFormat="Pp"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholderText={t("accessPanel.selectExpirationDate")}
          />

        </div>
      )}
      <div className="flex justify-end">
        <button
          onClick={updateSurveyAccess}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 hover:shadow-xl"
        >
          {t("accessPanel.saveChanges")}
        </button>
      </div>







    </div>
  );
}

interface AccessItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function AccessItem({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: AccessItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <div className="ml-3">
            <h3 className="text-sm font-almarai text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <Switch.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
        >
          <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
        </Switch.Root>
      </div>


    </div>

  );
}
