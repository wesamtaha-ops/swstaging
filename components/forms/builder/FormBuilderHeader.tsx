import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, Check, ArrowLeft, History, ChevronDown } from 'lucide-react';
import { FormBuilderTabs, TabType } from './FormBuilderTabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTranslation } from 'react-i18next';


interface Version {
  _id: string;
  version: number;

  json: {
    title: string;
    description?: string;
  };
  surveyJson: any;
  themeJson: any;
  createdAt: string;
  createdBy: {
    username?: string;
  };
  updatedBy: { username?: string; email?: string };
}

interface FormBuilderHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSave: (asNewVersion?: boolean) => void;
  onPreview: () => void;
  currentVersion?: Version;
  versions?: Version[];
  onLoadVersion?: (version: Version) => void;
}

export function FormBuilderHeader({
  activeTab,
  onTabChange,
  onSave,
  onPreview,
  currentVersion,
  versions = [],
  onLoadVersion
}: FormBuilderHeaderProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const [versionId, setVersionId] = useState<string | null>(null);
  const { user } = useAuth()
  const handlePublish = async () => {
    try {


      const surveyData = {
        versionId: versionId,
      };


      const validate = await axios.put(`https://swbackstg.onrender.com/backup_survey_version/restore/${versionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });

      if (!validate) {
        throw new Error(`Erreur serveur: ${validate}`);
      }

      navigate('/forms');
    } catch (error) {
      toast.error('Failed to publish form. Please try again.');
    }
  };

  const handleSaveVersion = async () => {
    try {
      await onSave(true);

    } catch (error) {
      toast.error('Failed to save version. Please try again.');
    }
  };

  const handleBack = () => {
    setShowConfirmation(true);
  };

  const confirmNavigation = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  // const formatDate = (date: Date) => {
  //   return new Intl.DateTimeFormat('en-US', {
  //     dateStyle: 'medium',
  //     timeStyle: 'short'
  //   }).format(date);
  // };


  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);

    // Format de la date : Jour/Mois/Année
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Format de l'heure : HH:MM
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Format 24h (mettre true pour AM/PM)
    });

    return `${formattedDate} ${t('formBuilder.at')} ${formattedTime} `;
  };

  return (
    <>
      <div className="border-b border-gray-200 bg-white font-almarai">
        <div className="max-w-screen-2xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('formBuilder.back')}
            </button>

            {/* Centered tabs */}
            <FormBuilderTabs activeTab={activeTab} onTabChange={onTabChange} />

            {/* Action buttons */}
            <div className="flex items-center space-x-2 font-almarai">
              <button
                onClick={onPreview}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                {t('formBuilder.preview')}
              </button>
              {user?.role !== "viewer" &&
                <>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                        <History className="h-4 w-4 mr-2" />
                        {/* Version {currentVersion?.version || 1} */}
                        {t('formBuilder.versions')}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                        sideOffset={5}
                      >
                        <div className="px-4 py-2 border-b border-gray-200 font-almarai">
                          <h3 className="text-sm font-almarai text-gray-900">
                            {t('formBuilder.versionHistory')}
                          </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto font-almarai">
                          {versions.map((version) => (
                            <DropdownMenu.Item
                              key={version._id}
                              className="px-4 py-2 hover:bg-gray-50 focus:outline-none"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {/* <img
                                src={version.createdBy.avatar}
                                alt={version.createdBy.name}
                                className="h-8 w-8 rounded-full"
                              /> */}
                                  <div className="ml-3">
                                    <p className="text-sm font-almarai text-gray-900">
                                      {t('formBuilder.version')}  {version.version} •
                                      <span className="ml-2 text-gray-500">
                                        {" "}
                                        {version.updatedBy?.username}
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      • {formatDate(version.createdAt)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    onLoadVersion?.(version),
                                      setVersionId(version._id);
                                  }}
                                  className="ml-2 px-2 py-1 text-xs font-almarai text-indigo-600 hover:text-indigo-500"
                                >
                                  {t('formBuilder.load')}
                                </button>
                              </div>
                            </DropdownMenu.Item>
                          ))}
                        </div>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>

                  <button
                    onClick={handleSaveVersion}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t('formBuilder.saveAsNewVersion')}
                  </button>

                  <button
                    onClick={handlePublish}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-green-600 hover:bg-green-800 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex-shrink-0 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check-circle h-5 w-5 text-white"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </div>
                    {/* <Check className="h-4 w-4 mr-2" /> */}
                    {/* <span className="flex mr-2 h-2 w-2 items-center justify-center rounded-full p-2 transition-all duration-200 border-2 bg-green-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span data-state="checked" style={{ pointerEvents: "none" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5 stroke-[3] text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </span> */}
                    {t('formBuilder.validateVersion')}
                  </button>

                </>}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog.Root open={showConfirmation} onOpenChange={setShowConfirmation}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[999]" />

          {/* Modal Content */}
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none z-[1000]">
            <Dialog.Title className="text-lg font-almarai text-gray-900 mb-4">
              {t('formBuilder.unsaved.title')}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              {t('formBuilder.unsaved.message')}
            </Dialog.Description>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('formBuilder.unsaved.stay')}
              </button>
              <button
                onClick={confirmNavigation}
                className="px-4 py-2 text-sm font-almarai text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                {t('formBuilder.unsaved.leave')}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}