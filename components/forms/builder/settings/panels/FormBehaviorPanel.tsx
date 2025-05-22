import React, { useEffect, useState } from 'react';
import {
  HelpCircle, Globe, Cookie, ArrowRightLeft,
  Save, FastForward, BarChart, Server
} from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import { useParams } from 'react-router-dom';
import axios from '@/src/config/axios';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";


export function FormBehaviorPanel() {
  const { t } = useTranslation();

  const { id: surveyId } = useParams();
  console.log("Survey ID:", surveyId);

  const [settings, setSettings] = useState({
    cookieConsent: false,
    rtlSupport: false,
    disableAutoTranslate: false,
    allowResume: false,
    autoJump: false,
    showProgressBar: false,
    externalStorageOnly: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`https://swbackstg.vercel.app/getsurvey/${surveyId}`);
        const data = res.data;
        setSettings({
          cookieConsent: data.cookieConsent || false,
          rtlSupport: data.rtlSupport || false,
          disableAutoTranslate: data.disableAutoTranslate || false,
          allowResume: data.allowResume || false,
          autoJump: data.autoJump || false,
          showProgressBar: data.showProgressBar || false,
          externalStorageOnly: data.externalStorageOnly || false,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres :", error);
        toast.error("❌ Erreur lors du chargement");
      }
    };

    fetchSettings();
  }, [surveyId]);

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://swbackstg.vercel.app/surveys/behavior/${surveyId}`, settings);
      toast.success("✅ Settings Saved!");
    } catch (error) {
      console.error("Eroor", error);
      toast.error("❌ Error");
    }
  };

  const settingsList = [
    { key: 'cookieConsent', icon: Cookie, title: t("formBehavior.cookieConsent"), description: t("formBehavior.cookieConsentDesc") },
    { key: 'rtlSupport', icon: ArrowRightLeft, title: t("formBehavior.rtlSupport"), description: t("formBehavior.rtlSupportDesc") },
    { key: 'disableAutoTranslate', icon: Globe, title: t("formBehavior.disableAutoTranslate"), description: t("formBehavior.disableAutoTranslateDesc") },
    { key: 'allowResume', icon: Save, title: t("formBehavior.allowResume"), description: t("formBehavior.allowResumeDesc") },
    { key: 'autoJump', icon: FastForward, title: t("formBehavior.autoJump"), description: t("formBehavior.autoJumpDesc") },
    { key: 'showProgressBar', icon: BarChart, title: t("formBehavior.showProgressBar"), description: t("formBehavior.showProgressBarDesc") },
    // { key: 'externalStorageOnly', icon: Server, title: 'Only use external storage', description: 'Limit data storage to external database only (Enterprise)', badge: 'Enterprise' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">{t("formBehavior.title")} </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("formBehavior.description")}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {settingsList.map(({ key, icon: Icon, title, description, badge }) => (
          <div key={key} className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Icon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-almarai text-gray-900">{title}</h3>
                  {badge && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <Switch.Root
              checked={settings[key]}
              onCheckedChange={() => handleToggle(key)}
              className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
            >
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          {t("formBehavior.saveChanges")}
        </button>
      </div>
    </div>
  );
}
