import React, { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Response } from "./types";
import { useTranslation } from "react-i18next";

interface AIAnalysisProps {
  responses: Response[];
  showAIAnalysis: boolean;
  setShowAIAnalysis: (show: boolean) => void;
}

export function AIAnalysis({
  responses,
  showAIAnalysis,
  setShowAIAnalysis,
}: AIAnalysisProps) {
  // Calculate sentiment distribution
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const calculateSentimentDistribution = () => {
    const distribution = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    responses.forEach((response) => {
      if (response.sentiment) {
        distribution[
          response.sentiment.toLowerCase() as keyof typeof distribution
        ]++;
      }
    });

    const total = responses.length || 1; // Avoid division by zero
    return {
      positive: ((distribution.positive / total) * 100).toFixed(1),
      neutral: ((distribution.neutral / total) * 100).toFixed(1),
      negative: ((distribution.negative / total) * 100).toFixed(1),
    };
  };

  // Mock language distribution data
  const languageData = [
    { language: t("aiAnalysis.langs.english"), count: 75 },
    { language: t("aiAnalysis.langs.spanish"), count: 15 },
    { language: t("aiAnalysis.langs.french"), count: 10 },
  ];
  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const res = await fetch(
          "http://localhost:4001/api/generate-description",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ responses }),
          }
        );

        const data = await res.json();
        setDescription(data.description);
        console.log("Sentiment Analysis:", data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'analyse de sentiment:",
          error
        );
      }
    };

    fetchSentiment();
  }, [responses]);
  const sentimentDistribution = calculateSentimentDistribution();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-almarai text-gray-900">
            {t("aiAnalysis.title")}
          </h3>
        </div>
        <button
          onClick={() => setShowAIAnalysis(!showAIAnalysis)}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {showAIAnalysis ? t("aiAnalysis.hide") : t("aiAnalysis.show")}
        </button>
      </div>

      {showAIAnalysis && (
        <div className="space-y-6">
          {/* Sentiment Analysis */}
          <div>
            <h4 className="mb-2 text-sm font-almarai text-gray-900">
              {t("aiAnalysis.sentiment")}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <p>{description}</p>
            </div>
          </div>

          {/* Language Distribution */}
          <div>
            <h4 className="mb-2 text-sm font-almarai text-gray-900">
              {t("aiAnalysis.language")}
            </h4>
            <div className="p-4 rounded-lg bg-gray-50">
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={languageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="p-6 text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
            <h4 className="mb-4 text-lg font-almarai">
              {t("aiAnalysis.keyInsights")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-white rounded-full"></div>
                {t("aiAnalysis.insight1")}
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-white rounded-full"></div>
                {t("aiAnalysis.insight1")}
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-white rounded-full"></div>
                {t("aiAnalysis.insight3")}
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
