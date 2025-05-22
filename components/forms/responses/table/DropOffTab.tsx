import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AlertTriangle, TrendingDown, Users, Clock } from "lucide-react";
import type { ResponseDetails } from "@/types";
import axios from "axios";
import { useParams } from "react-router-dom";

interface StatItem {
  question: string;
  totalViews: number;
  dropOffs: number;
  dropOffRate: number;
  avgTimeSpent: string;
}

export function DropOffTab() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get<StatItem[]>(`https://swbackstg.vercel.app/survey/${id}/dropoff-questions`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible loading data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("statswoujoud", stats);


  if (loading) {
    return <div className="p-6">Loading Stats…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }


  if (stats.length === 0) {
    return <div className="p-6"> No Data</div>;
  }

  const overallMetrics = {
    highestDropOff: stats.reduce(
      (prev, curr) => (curr.dropOffRate > prev.dropOffRate ? curr : prev),
      {
        question: "N/A",
        totalViews: 0,
        dropOffs: 0,
        dropOffRate: -1,
        avgTimeSpent: "N/A",
      }
    ).question,
    avgDropOffRate:
      stats.reduce((sum, item) => sum + item.dropOffRate, 0) / stats.length,
  };

  const trendData = stats.map((item) => ({
    name: item.question,
    completion: 100 - item.dropOffRate,
  }));


  // // Calculate drop-off metrics for each question
  // const calculateDropOffs = (): QuestionDropOff[] => {
  //   const questions = Object.keys(responses[0]?.answers || {});

  //   return questions.map((question, index) => {
  //     const totalViews = responses.length;
  //     const answeredCount = responses.filter(r => r.answers[question] !== undefined && r.answers[question] !== null).length;
  //     const dropOffs = totalViews - answeredCount;
  //     const dropOffRate = (dropOffs / totalViews) * 100;

  //     // Mock average time spent - in a real app this would come from actual timing data
  //     const avgTimeSpent = `${Math.round(Math.random() * 2 + 1)}m ${Math.round(Math.random() * 60)}s`;

  //     return {
  //       question,
  //       totalViews,
  //       dropOffs,
  //       dropOffRate,
  //       avgTimeSpent
  //     };
  //   });
  // };

  // const dropOffData = calculateDropOffs();

  // // Sort questions by drop-off rate
  // const sortedDropOffs = [...dropOffData].sort((a, b) => b.dropOffRate - a.dropOffRate);

  // // Calculate overall metrics
  // const overallMetrics = {
  //   totalDropOffs: dropOffData.reduce((acc, curr) => acc + curr.dropOffs, 0),
  //   avgDropOffRate: dropOffData.reduce((acc, curr) => acc + curr.dropOffRate, 0) / dropOffData.length,
  //   highestDropOff: sortedDropOffs[0]?.question || '',
  //   highestDropOffRate: sortedDropOffs[0]?.dropOffRate || 0
  // };


  // // Prepare data for trend chart
  // const trendData = dropOffData.map((item, index) => ({
  //   name: `Q${index + 1}`,
  //   completion: 100 - item.dropOffRate
  // }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Total Drop-offs</p>
              <p className="text-2xl font-almarai text-gray-900">{overallMetrics.totalDropOffs}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Avg. Drop-off Rate</p>
              <p className="text-2xl font-almarai text-gray-900">
                {overallMetrics.avgDropOffRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">Highest Drop-off</p>
              <p className="text-2xl font-almarai text-gray-900">
                {overallMetrics.highestDropOffRate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                at {overallMetrics.highestDropOff}
              </p>
            </div>
          </div>
        </motion.div>
      </div> */}

      {/* Detailed Drop-off Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-almarai text-gray-900">
            Question-by-Question Drop-off
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider"
                >
                  Question
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider"
                >
                  Total Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider"
                >
                  Drop-offs
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider"
                >
                  Drop-off Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase tracking-wider"
                >
                  Avg. Time Spent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-almarai text-gray-900">
                      {item.question}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.totalViews}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.dropOffs}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${item.dropOffRate}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-2 text-sm text-gray-900">
                        {item.dropOffRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {item.avgTimeSpent}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Drop-off Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-almarai text-gray-900 mb-6">
          Completion Rate Trend
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completion"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: "#6366F1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
      >
        <h3 className="text-lg font-almarai mb-4">Drop-off Analysis Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">
              Key Findings
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Highest drop-off at {overallMetrics.highestDropOff}
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                {overallMetrics.avgDropOffRate.toFixed(1)}% average drop-off
                rate
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Most users drop off within first 2 minutes
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-almarai text-white/90 mb-2">
              Recommendations
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Simplify questions with high drop-off rates
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Add progress indicators
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Implement save and resume functionality
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
