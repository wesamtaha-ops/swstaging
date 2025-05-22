import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Users, Clock, TrendingUp, TrendingDown, Users2 } from "lucide-react";
import icon1 from "../../images/Group.png"
import icon2 from "../../images/icon (3).png"
import icon3 from "../../images/icon (2).png";
import icon4 from "../../images/icon (1).png";




interface StatsBannerProps {
  stats: {
    totalForms: number;
    totalResponses: number;
    avgCompletionRate: number;
    activeCollaborators: number;
  };
}

export function StatsBanner({ stats }: StatsBannerProps) {
  const statItems = [
    {
      name: "Total Forms",
      value: stats.totalForms,
      icon: TrendingDown,
      color: "text-red-600",
      text: "text-red-600",
      bgColor: "bg-violet-100",

      image: icon1,
    },
    {
      name: "Total Responses",
      value: stats.totalResponses,
      icon: TrendingUp,
      color: "text-green-600",
      text: "text-green-600",
      bgColor: " bg-orange-100",

      image: icon4,
    },
    {
      name: "Avg. Completion Rate",
      value: `${stats.avgCompletionRate}%`,
      icon: TrendingDown,
      bgColor: " bg-green-100",

      image: icon3,
    },
    {
      name: "Active Collaborators",
      value: stats.activeCollaborators,
      icon: TrendingUp,
      color: "text-green-600",
      text: "text-green-600",
      bgColor: "bg-red-100",
      image: icon2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        // className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500 font-almarai">
                  {item.name}
                </div>
                <div className="text-2xl   font-bold font-almarai font-almarai  font-almarai mt-1"> {item.value}</div>

                <div className="flex items-center text-green-500 text-xs mt-2">
                  <item.icon className={`h-6 w-6 mr-2 ${item.color}`} />
                  <p className="text-xs text-gray-500 font-almarai">
                    <span className={`${item.text}`}> 8.5% </span>Up from
                    yesterday
                  </p>
                </div>
              </div>
              <div
                className={`${item.bgColor} h-10 w-10 rounded-2xl flex items-center justify-center`}
              >
                <img src={item.image} alt={item.name} className="h-5 w-5" />
              </div>


            </div>
          </div>

          {/* <div className="flex items-center">
            <div className={`${item.bgColor} rounded-lg p-3`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-almarai text-gray-500">{item.name}</p>
              <p className="mt-1 text-xl font-almarai text-gray-900">
                {item.value}
              </p>
            </div>
          </div> */}
        </motion.div>
      ))}
    </div>
  );
}