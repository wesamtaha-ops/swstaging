import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CheckCircle, AlertTriangle, UserX, RefreshCw, ArrowRight, Clock } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CompletionTabProps {
  responses: any[];
  stats: {
    avgResponseTime: number;
    completedResponses: number;
    incompleteResponses: number;
  };
}

export function CompletionTab({ responses, stats }: CompletionTabProps) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [loadingRetarget, setLoadingRetarget] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString("en-GB")} at ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  useEffect(() => {
    const fetchAcceptedInvitations = async () => {
      try {
        const response = await axios.get(`https://backend.votly.co//survey/invitationsurvey/${id}`);
        setCount(response.data.acceptedInvitations);
      } catch (error) {
        console.error("Error fetching invitation count:", error);
      }
    };
    fetchAcceptedInvitations();
  }, [id]);

  const incompleteResponses = responses.filter(r => r.progress !== 100);
  const completionStats = {
    total: responses.length,
    completed: responses.filter(r => r.progress === 100).length,
    partial: responses.filter(r => r.progress !== 100).length,
    abandoned: count,
  };

  const statusData = [
    { name: t("completion.completed"), value: completionStats.completed, color: "#10B981" },
    { name: t("completion.partial"), value: completionStats.partial, color: "#F59E0B" },
    { name: t("completion.incompleteResponses"), value: count, color: "#EF4444" }
  ];

  const completionRateData = ((stats.completedResponses / (stats.completedResponses + stats.incompleteResponses)) * 100).toFixed(1);

  const handleRetarget = async (email: string, surveyID: string, progress: number) => {
    setLoadingRetarget(email);
    try {
      await axios.post("https://backend.votly.co//retarget_survey", { email, surveyID, progress });
      setLoadingRetarget("sent");
      setTimeout(() => setLoadingRetarget(null), 3000);
    } catch (error) {
      console.error("Failed to retarget:", error);
      setLoadingRetarget(null);
    }
  };

  const handleSelectAll = (e: any) => {
    const checked = e.target.checked;
    setAllSelected(checked);
    if (checked) {
      const allIds = incompleteResponses.map((r: any) => r._id);
      setSelectedResponses(allIds);
    } else {
      setSelectedResponses([]);
    }
  };

  const handleRetargetSelected = async () => {
    for (const id of selectedResponses) {
      const resp = incompleteResponses.find((r: any) => r._id === id);
      if (!resp) continue;
      await handleRetarget(resp.userEmail, resp.surveyId, resp.progress);
    }
    setSelectedResponses([]);
    setAllSelected(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">{t("completion.completed")}</p>
              <p className="text-2xl font-almarai text-gray-900">{completionStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">{t("completion.partial")}</p>
              <p className="text-2xl font-almarai text-gray-900">{completionStats.partial}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <UserX className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-almarai text-gray-900">{t("completion.incompleteResponses")}</h3>
            </div>
            <button
              onClick={handleRetargetSelected}
              disabled={selectedResponses.length === 0}
              className="inline-flex items-center px-4 py-2 text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("completion.retargetSelected")} ({selectedResponses.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">
                    <input type="checkbox" checked={allSelected} onChange={handleSelectAll} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">{t("completion.email")}</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">{t("completion.lastActive")}</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">{t("completion.progress")}</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">{t("completion.lastPage")}</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">{t("completion.actions")}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {incompleteResponses.map((response, i) => (
                  <tr key={response.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{response.userEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" /> {formatDate(response.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${response.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">{response.progress}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{response.lastPage}</td>
                    <td className="px-4 py-3 text-left">
                      {response.progress < 100 ? (
                        <button
                          onClick={() => handleRetarget(response.userEmail, response.surveyId, response.progress)}
                          className="px-4 py-2 text-xs border rounded-md text-gray-700 border-blue-600 hover:bg-gray-100"
                          disabled={loadingRetarget === response.userEmail}
                        >
                          {loadingRetarget === "sent" ? t("completion.sent") : t("completion.retarget")}
                        </button>
                      ) : (
                        <span className="text-sm   font-bold font-almarai font-almarai  font-almarai text-green-600">
                          {t("completionTab.completedLabel", { progress: response.progress })}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-almarai text-gray-900 mb-6">{t("completion.statusDistribution")}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white">
        <h3 className="text-lg font-almarai mb-4">{t("completion.insightsTitle")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">{t("completion.keyFindings")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("completion.completionRate", { rate: completionRateData })}
              </li>
              <li className="flex items-center text-sm">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("completion.avgTime", { minutes: stats.avgResponseTime })}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">{t("completion.recommendations")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <ArrowRight className="h-4 w-4 mr-2" /> {t("completion.recommendation.progressIndicator")}
              </li>
              <li className="flex items-center text-sm">
                <ArrowRight className="h-4 w-4 mr-2" /> {t("completion.recommendation.emailReminder")}
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
