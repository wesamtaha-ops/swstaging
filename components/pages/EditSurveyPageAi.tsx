import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { Model } from "survey-core";
import { Laptop } from "lucide-react";
import toast from "react-hot-toast";
import { setLicenseKey } from "survey-core";
import { surveyLocalization } from "survey-core";

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

// Import custom theme styles
import "@/styles/survey.css";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { useAuth } from "../providers/AuthProvider";

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
  title: string;
  pages: any[];
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
/*surveyLocalization.locales["ar"] = {
  pagePrevText: "السابق",
  pageNextText: "التالي",
  completeText: "إكمال",
  requiredError: "هذا الحقل مطلوب",
  otherItemText: "أخرى",
  progressText: "صفحة {0} من {1}",
  emptySurvey: "لا توجد أسئلة في هذا الاستبيان.",
  completingSurvey: "شكرًا لك على إكمال الاستبيان!",
  loadingSurvey: "جاري التحميل...",
  choices_Item: "عنصر",
};*/
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
  // const user?._id = useSelector((state: any) => state.survey.user._id);
  const { user } = useAuth()
  const location = useLocation();
  const workspaceId = localStorage.getItem("workspaceId");

  const surveyData: SurveyData | undefined = location.state?.surveyData;
  if (!surveyData) {
    return (
      <div>
        <h2>Aucun questionnaire trouvé</h2>
        <button onClick={() => navigate("/forms/ai-create")}>Retour</button>
      </div>
    );
  }

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

        // Set initial survey JSON
        newCreator.text = JSON.stringify(surveyData);

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
  }, []);

  const saveToServer = async (json: any) => {
    if (!user?._id) {
      console.error("Erreur: L'ID de l'utilisateur est manquant.");
      return;
    }
    if (!creator || !creator.JSON) {
      console.error("Erreur: Les données du survey sont manquantes.");
      return;
    }
    const surveyData = {
      title: creator?.JSON.title || "Survey Data",
      json: creator.JSON,
      createdBy: user?._id,
      workspaceId: workspaceId,
    };
    try {
      const response = await fetch("https://swbackstg.vercel.app/create_survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();

    } catch (error) {
      console.error("Erreur lors de l'enregistrement du formulaire:", error);
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
      navigate("/forms");
      toast.success(
        asNewVersion
          ? "New form saved successfully!"
          : "Form saved successfully!"
      );
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
                <div className="h-full" ref={containerRef}>
                  {isCreatorReady && creator && (
                    <SurveyCreatorComponent creator={creator} />
                  )}
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
    </div>
  );
}
