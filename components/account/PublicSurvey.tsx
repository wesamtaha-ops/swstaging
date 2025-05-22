import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import { surveyLocalization } from "survey-core";
import toast, { Toaster } from "react-hot-toast"; // Importer react-hot-toast
import { useSearchParams } from "react-router-dom";
import React from "react";

// 🔹 Changer le message de fin du formulaire
surveyLocalization.locales["en"].completingSurvey =
  "🎉 Thank you for your participation 🎉";

interface SurveyData {
  json: any;
  rtlSupport?: boolean;
}

const PublicSurvey: React.FC = () => {
  //const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [userProgress, setUserProgress] = useState<number | null>(null);
  const [completionRate, setCompletionRate] = useState(0);


  const [rtl, setRtl] = useState(false);

  const id = searchParams.get("id");
  const userEmail = searchParams.get("email"); // 🔹 Extraction de l'ID avec typage
  console.log(userEmail, "userEmailuserEmailuserEmail");

  const [surveyModel, setSurveyModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const startTimeRef = useRef<number | null>(null);


  useEffect(() => {
    const checkProgress = async () => {
      if (!id || !userEmail) return;

      try {
        const res = await axios.get(
          `http://localhost:5050/survey/get_progress/${id}/${userEmail}`
        );
        if (res.data && res.data.progress !== undefined) {
          setUserProgress(res.data.progress);
          console.log(
            "�� Progression du sondage pour",
            userEmail,
            ":",
            res.data.progress
          );
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération du progrès:", error);
      }
    };

    checkProgress();
  }, [id, userEmail]);


  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/getsurvey/${id} `);
        const data: SurveyData = res.data;
        console.log("🔹 JSON du formulaire reçu :", data);
        if (!data?.json?.pages?.length) {
          console.error(" No questions found in this survey!");
          return;
        }

        // ✅ Appliquer RTL si activé
        if (data.rtlSupport) {
          document.documentElement.dir = "rtl";
          setRtl(true);
        } else {
          document.documentElement.dir = "ltr";
          setRtl(false);
        }


        const survey = new Model(data.json);
        survey.completeText = "Save";
        survey.onValueChanged.add(() => {
          updateCompletionRate(survey, userEmail);
        });
        survey.onComplete.add(() => {
          console.log("✅ Formulaire terminé !");
          setCompletionRate(100);
          handleSurveyComplete(survey);
        });

        setSurveyModel(survey);

        startTimeRef.current = Date.now();
        console.log("🕒 Start Time initialisé :", startTimeRef.current);

        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération du sondage:", error);
      }
    };

    if (id) fetchSurvey();
    return () => {
      document.documentElement.dir = "ltr";
    };


  }, [id, userEmail]);

  const updateCompletionRate = async (
    survey: any,
    userEmail: string | null
  ) => {
    const totalQuestions = survey.getAllQuestions().length;
    const responses = survey.data;
    const endTime = Date.now();
    console.log(startTimeRef.current + ": " + endTime);
    // console.log(endTime);
    const duration = startTimeRef.current
      ? Math.round((endTime - startTimeRef.current) / 1000)
      : 0;
    const answeredQuestions = survey
      .getAllQuestions()
      .filter((q: any) => q.isAnswered).length;
    const progress = Math.round((answeredQuestions / totalQuestions) * 100);

    setCompletionRate(progress);

    try {
      await axios.post(
        "http://localhost:5050/survey/update_progress",
        {
          surveyId: id,
          responses,
          duration: Number(duration),
          userEmail,
          progress,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("❌ Erreur lors de l'enregistrement du progrès:", error);
    }
  };

  // 🔹 Fonction pour enregistrer les réponses et afficher le toast
  const handleSurveyComplete = async (survey: Model) => {
    const responses = survey.data;
    const endTime = Date.now();
    console.log(startTimeRef.current + ": " + endTime);
    // console.log(endTime);
    const duration = startTimeRef.current
      ? Math.round((endTime - startTimeRef.current) / 1000)
      : 0;
    console.log(duration);
    setCompletionRate(100); // Time in seconds
    try {
      await axios.post(
        "http://localhost:5050/survey/update_progress",

        {
          surveyId: id,
          responses,
          duration: Number(duration),
          userEmail,
          progress: 100, // ✅ Ensure backend records 100% completion
        }
      );
      const res = await fetch(
        ` http://localhost:5050/submit_survey/${id}/response`,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            surveyId: id,
            responses,
            duration: Number(duration),
            userEmail,
            progress: 100,
          }),
        }
      );

      const data = await res.json();
      toast.success("Your response has been saved successfully!", {
        duration: 3000, // 3s avant de disparaître
        position: "top-center", // Toast centré
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          padding: "16px",
          borderRadius: "8px",
          background: "#ffffff",
          color: "#333",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      });
    } catch (error) {
      console.error("❌ Error saving responses:", error);
      toast.error("❌ Failed to save responses. Please try again.");
    }
  };

  // 🔹 Personnalisation des styles du formulaire
  const customSurveyCss = {
    root: "font-almarai text-gray-800",
    title: "font-almarai text-2xl text-center text-blue-700 mb-6  pb-2",
    question: "font-almarai text-lg text-gray-900 mt-4",
    navigationButton:
      "bg-green-600 hover:bg-green-700 text-white   font-bold font-almarai font-almarai  font-almarai py-3 px-6 rounded-lg transition duration-300",
    description: "text-gray-500 text-sm italic mb-4 px-4",
    label: "text-gray-700 text-md font-almarai flex items-center space-x-3",
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50 font-almarai">
      <Toaster />

      <div className="w-full max-w-3xl p-6 mt-6 bg-white border border-gray-300 rounded-lg shadow-lg font-almarai">
        {isLoading ? (
          <p className="text-center text-gray-600">⏳ Loading...</p>
        ) : userProgress === 100 ? ( // ✅ Vérifie si le progrès est à 100%
          <p className="text-xl   font-bold font-almarai font-almarai  font-almarai text-center text-green-600">
            You have already submitted this survey. Thank you for your
            participation!
          </p>
        ) : (
          <Survey model={surveyModel} css={customSurveyCss} />
        )}
      </div>
    </div>
  );
};

export default PublicSurvey;
