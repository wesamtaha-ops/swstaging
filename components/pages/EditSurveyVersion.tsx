import React, { useState, useEffect, useRef } from "react";

import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { Model } from "survey-core";
import { Laptop } from "lucide-react";
import toast from "react-hot-toast";
import { setLicenseKey } from "survey-core";
import axios from "axios";
import { FormBuilderHeader } from "@/components/forms/builder/FormBuilderHeader";
import { FormPreview } from "@/components/forms/builder/FormPreview";
import { ShareTab } from "@/components/forms/builder/ShareTab";
import { SettingsTab } from "@/components/forms/builder/settings/SettingsTab";
import { ThemeEditor } from "@/components/forms/builder/ThemeEditor/ThemeEditor";
import { CommentsTab } from "@/components/forms/builder/CommentsTab";
import { TabType } from "@/components/forms/builder/FormBuilderTabs";
import FormResults from "@/components/pages/FormResults";
import { store } from "../../src/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/pages/Spinner";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

// Import custom theme styles
import "@/styles/survey.css";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

interface Version {
  id: string;
  number: number;
  createdAt: Date;
  createdBy: {
    name: string;
    avatar: string;
  };
  surveyJson: any;
  themeJson: any;
}

interface SurveyData {
  json: any; // 👈 Peut être amélioré en ajoutant une interface plus stricte
  title?: string;
}

// Default survey configuration
const defaultSurveyJson = {
  pages: [
    {
      name: "page1",
      title: "Page 1",
      elements: [],
    },
  ],
  showQuestionNumbers: "off",
  questionErrorLocation: "bottom",
  showProgressBar: "top",
  progressBarType: "questions",
};

export default function FormBuilder() {
  const [activeTab, setActiveTab] = useState<TabType>("editor");
  const [showPreview, setShowPreview] = useState(false);
  const [survey, setSurvey] = useState<Model | null>(null);
  const [creator, setCreator] = useState<SurveyCreator | null>(null);
  const [isCreatorReady, setIsCreatorReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersion, setCurrentVersion] = useState<Version | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const id_user = useSelector((state: any) => state.survey.user._id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { versionId } = useParams<{ versionId: string }>();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 🔹 Récupère l'ID du formulaire depuis l'URL

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeCreator = async () => {
      if (!containerRef.current || creator) return;

      setLicenseKey(
        "MmRhZmIxZTctYWQyYy00MWM3LThkMWYtYmRjOTE5Zjc0ZmIwOzE9MjAyNS0xMS0yMiwyPTIwMjUtMTEtMjIsND0yMDI1LTExLTIy"
      );

      try {
        // Create new instance
        const newCreator = new SurveyCreator({
          showLogicTab: true,
          showTranslationTab: true,
          isAutoSave: true,
          showPreviewTab: false,
          showThemeTab: false,
          showJSONEditorTab: true,
          haveCommercialLicense: true,
          showEmbeddedSurveyTab: false,
          showOptions: false,
          maxVisibleChoices: 10,
          allowModifyPages: true,
          questionTypes: [
            "text",
            "checkbox",
            "radiogroup",
            "dropdown",
            "comment",
            "rating",
            "ranking",
            "boolean",
            "matrix",
            "matrixdropdown",
            "multipletext",
            "panel",
            "paneldynamic",
            "html",
          ],
        });
        if (!versionId) return;

        const fetchSurvey = async () => {
          try {
            const { data } = await axios.get<SurveyData>(`https://swbackstg.onrender.com/survey_version/version/${versionId}`

            );
            if (!data || !data.json) {
              console.error("Aucune donnée trouvée !");
              return;
            }

            const newCreator = new SurveyCreator();
            newCreator.JSON = data.json; // 🔹 Charge le formulaire existant dans SurveyJS Creator
            setCreator(newCreator);
          } catch (error) {
            console.error("❌ Erreur chargement formulaire :", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchSurvey();
        // Set initial survey JSON
        //newCreator.text = JSON.stringify(defaultSurveyJson);

        // Set up autosave
        newCreator.saveSurveyFunc = (
          saveNo: number,
          callback: (no: number, success: boolean) => void
        ) => {
          saveToServer(newCreator.JSON)
            .then(() => callback(saveNo, true))
            .catch(() => callback(saveNo, false));
        };

        if (!mounted) return;

        // Set state
        setCreator(newCreator);
        setIsCreatorReady(true);

        // Set initial survey
        const initialSurvey = new Model(newCreator.JSON);
        setSurvey(initialSurvey);

        // Load initial version
        const mockVersion: Version = {
          id: "1",
          number: 1,
          createdAt: new Date(),
          createdBy: {
            name: "John Doe",
            avatar: "https://ui-avatars.com/api/?name=John+Doe",
          },
          surveyJson: newCreator.JSON,
          themeJson: {},
        };
        setVersions([mockVersion]);
        setCurrentVersion(mockVersion);
      } catch (error) {
        console.error("Error initializing form builder:", error);
        toast.error("Failed to initialize form builder. Please try again.");
      }
    };

    initializeCreator();

    return () => {
      mounted = false;
      if (creator) {
        creator.dispose();
      }
    };
  }, [versionId]);

  const saveToServer = async (json: any) => {
    if (!creator || !versionId) return;

    const updatedSurvey: SurveyData = {
      title: creator.JSON.title || "Formulaire Modifié",
      json: creator.JSON,
    };

    try {
      await axios.put(`https://swbackstg.onrender.com/update_survey_version/version/edit/${versionId}`,

        updatedSurvey
      );

      // 🎊 Active les confettis et la pop-up
      // 🎊 Lancer l'animation de fête
      setShowConfetti(true);
      setShowSuccessPopup(true);

      // 🔥 Confettis pendant 5 secondes au lieu de 3
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      // ⏳ Pop-up visible pendant 5.5 secondes
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/forms"); // Redirige sans rechargement
      }, 5500);
    } catch (error) {
      console.error("❌ Erreur mise à jour :", error);
    }
  };

  const handleSave = async (asNewVersion = false) => {
    if (!creator) return;

    try {
      const surveyJson = creator.JSON;
      const themeJson = creator.theme;

      if (asNewVersion) {
        const newVersion: Version = {
          id: Date.now().toString(),
          number: (versions.length || 0) + 1,
          createdAt: new Date(),
          createdBy: {
            name: "John Doe",
            avatar: "https://ui-avatars.com/api/?name=John+Doe",
          },
          surveyJson,
          themeJson,
        };

        setVersions([...versions, newVersion]);
        setCurrentVersion(newVersion);
      }

      await saveToServer(surveyJson);
      /*  toast.success(
        asNewVersion
          ? "New version saved successfully!"
          : "Form saved successfully!"
      );*/
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save form. Please try again.");
    }
  };

  const handleLoadVersion = (version: Version) => {
    if (!creator) return;

    try {
      creator.JSON = version.surveyJson;
      if (version.themeJson) {
        creator.theme = version.themeJson;
      }
      setCurrentVersion(version);
      toast.success(`Loaded version ${version.number}`);

    } catch (error) {
      console.error("Error loading version:", error);
      toast.error("Failed to load version");
    }
  };

  const handlePreview = () => {
    if (!creator) return;

    try {
      const surveyJson = creator.JSON;
      const newSurvey = new Model(surveyJson);
      setSurvey(newSurvey);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating preview:", error);
      toast.error("Failed to generate preview");
    }
  };

  const handleThemeChange = (theme: any) => {
    if (!creator || !survey) return;

    try {
      const surveyJson = creator.JSON;
      const newSurvey = new Model(surveyJson);
      newSurvey.applyTheme(theme);
      setSurvey(newSurvey);

      const updatedJson = {
        ...surveyJson,
        themeData: theme,
      };
      creator.JSON = updatedJson;
    } catch (error) {
      console.error("Error applying theme:", error);
      toast.error("Failed to apply theme");
    }
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Laptop className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h2 className="mb-4 text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">
            Desktop Experience Required
          </h2>
          <p className="mb-6 text-gray-600">
            Our form builder is optimized for desktop devices to provide the
            best possible experience. Please visit us on your computer to create
            and edit forms.
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center font-almarai text-indigo-600 hover:text-indigo-500"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FormBuilderHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSave={handleSave}
        onPreview={handlePreview}
        currentVersion={currentVersion}
        versions={versions}
        onLoadVersion={handleLoadVersion}
      />

      <div className="h-[calc(100vh-4rem)]">
        {(() => {
          switch (activeTab) {
            case "editor":
              return (
                <div
                  className="flex items-center justify-center h-full"
                  ref={containerRef}
                >
                  {isLoading ? (
                    // 🌀 *Loader pendant le chargement de SurveyJS*
                    <div className="flex flex-col items-center">
                      <Spinner className="w-20 h-20 text-blue-600 animate-spin" />
                      <p className="mt-2 text-gray-600 font-almarai">
                        Loading Form Builder...
                      </p>
                    </div>
                  ) : isCreatorReady && creator ? (
                    <SurveyCreatorComponent creator={creator} />
                  ) : null}
                </div>
              );

            case "theme":
              return (
                <ThemeEditor
                  survey={survey}
                  onThemeChange={handleThemeChange}
                />
              );

            case "share":
              return (
                <ShareTab formId="xyz123" survey={survey} formId="xyz123" />
              );

            case "comments":
              return <CommentsTab formId="xyz123" survey={survey} />;

            case "results":
              return <FormResults formId="xyz123" survey={survey} />;

            case "settings":
              return <SettingsTab formId="xyz123" survey={survey} />;

            default:
              return null;
          }
        })()}

        {showPreview && (
          <FormPreview survey={survey} onClose={() => setShowPreview(false)} />
        )}
      </div>
      {/* 🎊 Confettis en pleine page */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      {/* 🎉 Pop-up de succès */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // 🔥 Animation plus fluide
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-96"
          >
            {/* 🔥 Icône animée */}
            <motion.svg
              className="w-16 h-16 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2l2 5h5l-4 4 1 6-5-3-5 3 1-6-4-4h5z"
              />
            </motion.svg>

            {/* 🎉 Texte avec effet de vibration */}
            <motion.h3
              className="mt-3 text-lg   font-bold font-almarai font-almarai  font-almarai text-gray-900"
              initial={{ x: -5 }}
              animate={{ x: [5, -5, 5, -5, 0] }}
              transition={{ duration: 0.6, repeat: 3 }}
            >
              🎉 Congratulations !
            </motion.h3>

            <p className="mt-2 text-center text-gray-600">
              Your version has been successfully updated! 🚀
            </p>

            {/* 🏆 Barre de progression pour indiquer la fermeture automatique */}
            <motion.div
              className="w-full h-1 mt-4 bg-green-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
