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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "@/components/pages/Spinner";
// Import custom theme styles
import "@/styles/survey.css";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { useAuth } from "../providers/AuthProvider";
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

interface SurveyData {
  json: any; // 👈 Peut être amélioré en ajoutant une interface plus stricte
  title?: string;
  updatedBy?: string;
  workspaceId?: string;
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
  // const id_user = useSelector((state: any) => state.survey.user._id);
  const workspaceId = localStorage.getItem("workspaceId");


  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>(); // 🔹 Récupère l'ID du formulaire depuis l'URL
  const location = useLocation();
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
          showThemeTab: true,
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
        if (!id) return;

        // const fetchSurvey = async () => {
        //   try {
        //     const { data } = await axios.get<SurveyData>(
        //       `https://backend.votly.co/getsurvey/${id}`
        //     );

        //     if (!data || !data.json) {
        //       console.error("Aucune donnée trouvée !");
        //       return;
        //     }

        //     const newCreator = new SurveyCreator();
        //     newCreator.JSON = data.json; // 🔹 Charge le formulaire existant dans SurveyJS Creator
        //     setCreator(newCreator);
        //   } catch (error) {
        //     console.error("❌ Erreur chargement formulaire :", error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };

        //fetchSurvey();
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
        // const mockVersion: Version = {
        //   id: "1",
        //   number: 1,
        //   createdAt: new Date(),
        //   createdBy: {
        //     name: "John Doe",
        //     avatar: "https://ui-avatars.com/api/?name=John+Doe",
        //   },
        //   surveyJson: newCreator.JSON,
        //   themeJson: {},
        // };

        const { data } = await axios.get(
          `https://backend.votly.co/survey_versions/versions/${id}`
        );

        setVersions(data);
        //  setCurrentVersion(data[data.length - 1]);
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
  }, [id]);

  const saveToServer = async (json: any) => {
    if (!creator || !id) return;

    const updatedSurvey: SurveyData = {
      title: creator.JSON.title || "Formulaire Modifié",
      json: creator.JSON,
      updatedBy: user?._id,

    };

    try {
      await axios.put(
        ` https://backend.votly.co/update_survey/${id}`,
        updatedSurvey
      );

      alert("✅ Formulaire mis à jour !");
      navigate("/forms"); // 🔹 Redirige vers la liste des formulaires
    } catch (error) {
      console.error("❌ Erreur mise à jour :", error);
    }

  };

  const handleSave = async (asNewVersion = false) => {
    if (!creator) return;
    const surveyData = {
      title: creator?.JSON.title || "Survey Data",
      json: creator.JSON,
      createdBy: user?._id,
      workspaceId: workspaceId,
    };


    try {

      const response = await fetch("https://backend.votly.co/create_survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      //   await saveToServer(surveyJson);
      toast.success(
        asNewVersion
          ? "New version saved successfully!"
          : "Form saved successfully!"
      );

    } catch (error) {
      console.error("Erreur lors de l'enregistrement du formulaire:", error);
    }
  };

  const handleLoadVersion = (version: Version) => {
    if (!creator) return;

    try {
      creator.JSON = version.json;
      // if (version.themeJson) {
      //   creator.theme = version.json;
      // }
      setCurrentVersion(version);
      toast.success(`Loaded version ${version.version}`);
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
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 font-almarai">
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
                      <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>

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
              return <ShareTab formId="xyz123" survey={survey} />;

            case "comments":
              return <CommentsTab formId="xyz123" survey={survey} />;

            case "results":
              return <SurveyR formId="xyz123" survey={survey} />;

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
