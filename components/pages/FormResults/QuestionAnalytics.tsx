
import { useEffect, useState } from "react";
// import { CheckCircle } from "react-icons/check";
// import { Switch } from "@headlessui/react";
import { Switch } from "@radix-ui/react-switch";
import { CheckCircle } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useParams } from "react-router-dom";

// Ajout de la structure des props pour ton composant
interface ResponseDetails {
  _id: string;
  surveyId: string;
  responses: Record<string, any>;
  progress: number;
  duration: number;
  createdAt: string;
  userEmail: string;
}

interface CompletionTabProps {
  responses: ResponseDetails[];
  stats: {
    avgResponseTime: number | string;
    completedResponses: number;
    incompleteResponses: number;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // couleurs pour les graphiques
function flattenResponses(obj: any, parentKey = "", result: any = {}) {
  for (let key in obj) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenResponses(obj[key], fullKey, result);
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

function getSkippedQuestionsStats(responses: ResponseDetails[]) {
  const questionCounts: Record<string, { answered: number; skipped: number }> =
    {};

  responses.forEach((r) => {
    const flat = flattenResponses(r.responses);

    Object.keys(flat).forEach((key) => {
      if (!(key in questionCounts)) {
        questionCounts[key] = { answered: 0, skipped: 0 };
      }
      questionCounts[key].answered += 1;
    });
  });

  const totalResponses = responses.length;
  Object.keys(questionCounts).forEach((key) => {
    questionCounts[key].skipped = totalResponses - questionCounts[key].answered;
  });

  return questionCounts;
}

interface AverageScoreItem {
  questionId: string;
  averageScore: any;
}
export function QuestionAnalytics({ responses, stats }: CompletionTabProps) {
  const [showPieChart, setShowPieChart] = useState<boolean[]>([]);

  const toggleChartType = (index: string) => {
    setShowPieChart((prev) => {
      const updated = [...prev];
      updated[parseInt(index)] = !updated[parseInt(index)];
      return updated;
    });
  };

  const skippedStats = getSkippedQuestionsStats(responses);

  // On prépare une structure pour regrouper les réponses par question
  const questionStats: Record<string, Record<string, number>> = {};

  responses.forEach((response) => {
    const answers = response.responses;

    Object.keys(answers).forEach((questionKey) => {
      const answer = answers[questionKey];

      // Si c’est un objet (ex: food_quality), on va plus en profondeur
      if (typeof answer === "object" && !Array.isArray(answer)) {
        Object.entries(answer).forEach(([subKey, subAnswer]) => {
          const value =
            typeof subAnswer === "object"
              ? subAnswer?.text || subAnswer?.name || JSON.stringify(subAnswer)
              : subAnswer;

          const fullKey = `${questionKey}.${subKey}`;

          if (!questionStats[fullKey]) questionStats[fullKey] = {};
          questionStats[fullKey][value] =
            (questionStats[fullKey][value] || 0) + 1;
        });
      } else {
        const value =
          typeof answer === "object"
            ? answer.text || answer.name || JSON.stringify(answer)
            : answer;

        if (!questionStats[questionKey]) questionStats[questionKey] = {};
        questionStats[questionKey][value] =
          (questionStats[questionKey][value] || 0) + 1;
      }
    });
  });
  function calculateResponseRates(responses: ResponseDetails[]) {
    const totalResponses = responses.length;

    const questionCounts: Record<
      string,
      { answeredCount: number; totalResponses: number }
    > = {};

    responses.forEach((response) => {
      const flatAnswers = flattenResponses(response.responses);

      Object.entries(flatAnswers).forEach(([key, value]) => {
        if (!questionCounts[key]) {
          questionCounts[key] = {
            answeredCount: 0,
            totalResponses: totalResponses,
          };
        }

        if (
          value !== undefined &&
          value !== null &&
          value.toString().trim() !== ""
        ) {
          questionCounts[key].answeredCount += 1;
        }
      });
    });

    return Object.entries(questionCounts).map(([id, stats]) => ({
      id,
      ...stats,
      responseRate:
        stats.totalResponses === 0
          ? "0"
          : ((stats.answeredCount / stats.totalResponses) * 100).toFixed(0),
    }));
  }


  const result = calculateResponseRates(responses);


  const [averageScores, setAverageScores] = useState<AverageScoreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams()
  useEffect(() => {
    // Appel API
    const fetchAverageScores = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/survey/${id}/average-scores`,

          { withCredentials: true }
        );

        setAverageScores(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des scores moyens",
          error
        );
        setLoading(false);
      }
    };

    fetchAverageScores();
  }, []);


  return (
    <div className="space-y-8">
      {Object.entries(questionStats).map(([question, answers], index) => {
        const matchingResults = result.filter((item) =>
          item.id.startsWith(question)
        );
        const averageResponseRate = matchingResults.length
          ? (
            matchingResults.reduce(
              (acc, item) => acc + Number(item.responseRate),
              0
            ) / matchingResults.length
          ).toFixed(0)
          : "0";

        const matchingAverage = averageScores.find(
          (item) => item.questionId === question
        );

        const totalQuestions = Object.entries(questionStats).length;



        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            {/* Question Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-almarai text-gray-900">
                {question}
              </h3>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-8 mb-1">
              <div>
                <h4 className="text-sm font-almarai text-gray-500">
                  Response Rate
                </h4>
                <p className="mt-2 text-xl text-gray-900">

                  {averageResponseRate ?? 0} %
                </p>
              </div>
              {/* <div>
                <h4 className="text-sm font-almarai text-gray-500">Score</h4>
                <p className="mt-2 text-xl text-gray-900">

                  {matchingAverage?.averageScore !== "N/A"
                    ? `${parseFloat(
                        matchingAverage?.averageScore.toString()
                      )} / ${totalQuestions}`
                    : 0}

          
                </p>
              </div> */}
              <div>
                <h4 className="text-sm font-almarai text-gray-500">Skipped</h4>
                <p className="mt-2 text-xl text-gray-900">
                  {skippedStats[question]?.skipped ?? 0}
                </p>
              </div>
            </div>

            {/* Chart Toggle */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Pie chart</span>
                <Switch
                  checked={showPieChart[index] || false}
                  onCheckedChange={() => toggleChartType(index.toString())}
                  className="w-11 h-6 bg-gray-200 rounded-full relative inline-flex items-center"
                >
                  <span
                    className={`${showPieChart[index] ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </div>

            {/* Response Visualization */}
            {Object.entries(answers).map(([value, count]) => (
              <div key={value} className="flex items-center space-x-4 mb-4">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm text-gray-600">{value}</span>
                </div>
                <div className="flex-1 flex items-center space-x-4">
                  <div className="flex-1 h-8 bg-gray-100 rounded-md overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 flex items-center"
                      style={{ width: `${(count / responses.length) * 100}%` }}
                    >
                      <span className="px-2 text-sm text-white">
                        {count} responses
                      </span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm text-gray-600">
                      {((count / responses.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Chart View */}
            {showPieChart[index] && responses.length > 0 && (
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(answers).map(([key, value]) => ({
                        name: key,
                        count: value,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {Object.entries(answers).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
