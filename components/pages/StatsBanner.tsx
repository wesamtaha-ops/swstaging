import React from "react";
import {
  ClipboardList,
  MessageSquare,
  Clock,
  Users,
  Timer,
} from "lucide-react";
//import { Timer } from "lucide-react";
interface KPICardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ icon, title, value, color }) => {
  return (
    <div className="flex items-start flex-shrink-0 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className={`${color} p-3 rounded-lg`}>{icon}</div>
      <div>
        <h3 className="text-sm font-almarai text-gray-500">{title}</h3>
        <p className="mt-1 text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export const StatsBanner: React.FC<{
  totalForms: number;
  totalResponses: number;
  avgCompletionRate: number;
  activeCollaborators: number;
  avgTime: string;
}> = ({
  totalForms,
  totalResponses,
  avgCompletionRate,
  activeCollaborators,
  avgTime,
}) => {
    const kpiData = [
      {
        icon: <ClipboardList size={24} className="text-blue-600" />,
        title: "Total Forms",
        value: totalForms,
        color: "bg-blue-100",
      },
      {
        icon: <MessageSquare size={24} className="text-green-600" />,
        title: "Total Responses",
        value: totalResponses,
        color: "bg-green-100",
      },
      {
        icon: <Clock size={24} className="text-purple-600" />,
        title: "Avg. Completion Rate",
        value: `${avgCompletionRate}%`,
        color: "bg-purple-100",
      },
      {
        icon: <Users size={24} className="text-blue-600" />,
        title: "Active Collaborators",
        value: activeCollaborators,
        color: "bg-blue-100",
      },
      {
        icon: <Timer size={24} className="text-orange-600" />,
        title: "Avg. Time",
        value: avgTime,
        color: "bg-orange-100",
      },
    ];

    return (
      <div className="mb-6">
        <div className="flex flex-row gap-8 overflow-x-auto font-almarai">
          {kpiData.map((card, index) => (
            <KPICard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              color={card.color}
            />
          ))}
        </div>
      </div>
    );
  };
