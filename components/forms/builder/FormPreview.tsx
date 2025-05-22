import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Survey } from "survey-react-ui";
import { Model, surveyLocalization } from "survey-core";
import "survey-core/defaultV2.min.css";

interface FormPreviewProps {
  survey: any | null;
  onClose: () => void;
}

// ✅ Arabic Translations
surveyLocalization.locales["ar"] = {
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
};

export function FormPreview({ survey, onClose }: FormPreviewProps) {
  // ✅ Prevent initializing with an empty object
  //const [surveyModel, setSurveyModel] = useState<Model | null>(null);
  const [language, setLanguage] = useState("en");



  // ✅ Change Language
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    if (survey) {
      survey.locale = selectedLang;
      setLanguage(selectedLang);
    }
  };
  /* const customSurveyCss = {
      root: "font-almarai text-gray-800",
      title: "font-almarai text-2xl text-center text-blue-700 mb-6  pb-2",
      question: "font-almarai text-lg text-gray-900 mt-4",
      navigationButton:
        "bg-green-600 hover:bg-green-700 text-white   font-bold font-almarai font-almarai  font-almarai py-3 px-6 rounded-lg transition duration-300",
      description: "text-gray-500 text-sm italic mb-4 px-4",
      label: "text-gray-700 text-md font-almarai flex items-center space-x-3",
    };*/

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-75">
      <div className="flex flex-col h-full">
        {/* ✅ Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-almarai text-gray-900">Form Preview</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center px-3 py-2 text-sm font-almarai text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </button>
        </div>

        {/* ✅ Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* Language Switcher */}
          <div className="mb-4">
            <label className="text-lg font-almarai">Select Language:</label>
            <select
              onChange={changeLanguage}
              value={language}
              className="p-2 ml-2 border border-gray-300 rounded-md"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          {/* ✅ Survey Display */}
          <div
            className="max-w-4xl mx-auto "
            style={{
              direction: language === "ar" ? "rtl" : "ltr",
              textAlign: language === "ar" ? "right" : "left",
            }}
          >
            {survey ? (
              <Survey model={survey} />
            ) : (
              <p className="text-center text-gray-500">
                No survey data available.
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
