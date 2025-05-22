import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  AtSign,
  Monitor,
  Cpu,
  Wifi,
  Hash,
  Globe,
  ArrowRight,
  X,
  MessageSquare,
  Calendar,
  Mail,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import type { ResponseDetails } from "@/types";
import { ResponseComments } from "./ResponseComments";
import * as Tabs from "@radix-ui/react-tabs";
interface Response {
  surveyId: string;
  responses: Record<string, string | boolean | string[] | object>;
  userEmail: string;
  progress: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
interface ResponseDetailsSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  response: Response | null;
}
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  // Format de la date : Jour/Mois/Année
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Format de l'heure : HH:MM
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Format 24h (mettre true pour AM/PM)
  });

  return `${formattedDate} at ${formattedTime}`;
};
const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#10B981", "#F59E0B"];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "partial":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "invalid":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const SubmissionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "web":
      return <Globe className="h-5 w-5 text-blue-500" />;
    case "mobile":
      return <Smartphone className="h-5 w-5 text-purple-500" />;
    case "api":
      return <Cpu className="h-5 w-5 text-indigo-500" />;
    default:
      return null;
  }
};

export function ResponseDetailsSlideOver({
  isOpen,
  onClose,
  response,
}: ResponseDetailsSlideOverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Slide Over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-almarai text-gray-900">
                    Response Details
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs.Root defaultValue="details" className="flex-1">
                <Tabs.List className="flex border-b border-gray-200 bg-white px-6">
                  <Tabs.Trigger
                    value="details"
                    className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 focus:outline-none"
                  >
                    Details
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="comments"
                    className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 focus:outline-none ml-8"
                  >
                    {/* <div className="flex items-center">
                      Comments
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {response.comments?.length || 0}
                      </span>
                    </div> */}
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="details" className="flex-1 p-6">
                  {/* Status Banner */}
                  <div
                    className={`mb-6 p-4 rounded-lg ${response?.progress === 100
                      ? "bg-green-50"
                      : "bg-yellow-50"
                      // : "bg-red-50"
                      }`}
                  >
                    <div className="flex items-center">
                      {/* <StatusIcon status={response?.progress} /> */}
                      {response?.progress === 100 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}

                      <div className="ml-3">
                        <h3
                          className={`text-sm font-almarai ${response?.progress === 100
                            ? "text-green-800"
                            : "text-yellow-800"
                            // : "text-red-800"
                            }`}
                        >
                          {response?.progress === 100 ? "Complete" : "Partial"}
                          Response
                        </h3>
                        <p className="text-sm text-gray-600">
                          Completion Rate: {response?.progress}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Response Data */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-almarai text-gray-900 mb-4">
                        Answers
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(response?.responses ?? {}).map(
                          ([question, answer], index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <p className="text-sm font-almarai text-gray-700 mb-2">
                                {question}
                              </p>

                              {/* Cas 1 : answer est un objet avec des sous-champs */}
                              {typeof answer === "object" && answer !== null ? (
                                <div className="space-y-1 ml-4">
                                  {Object.entries(answer).map(
                                    ([subKey, subValue], subIndex) => (
                                      <p
                                        key={subIndex}
                                        className="text-sm text-gray-900"
                                      >
                                        {subKey}:{" "}
                                        {typeof subValue === "object" &&
                                          subValue !== null &&
                                          "text" in subValue
                                          ? subValue.text
                                          : String(subValue)}
                                      </p>
                                    )
                                  )}
                                </div>
                              ) : (
                                // Cas 2 : réponse simple
                                <p className="text-sm text-gray-900">
                                  {String(answer)}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>

                      {/* <div className="space-y-4">
                        {Object.entries(response?.responses ?? {}).map(
                          ([question, answer], index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <p className="text-sm font-almarai text-gray-700 mb-2">
                                {question}
                              </p>
                              <p className="text-sm text-gray-900">
                                {typeof answer === "object" && answer !== null
                                  ? // Si l'objet a des sous-champs avec "text"
                                    Object.values(answer)
                                      .map((item: any) =>
                                        typeof item === "object" &&
                                        "text" in item
                                          ? item.text
                                          : ""
                                      )
                                      .filter(Boolean)
                                      .join(", ")
                                  : String(answer)}
                              </p>
                            </div>
                          )
                        )}
                      </div> */}
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              User Email
                            </p>
                            <p className="text-sm text-gray-900">
                              {response?.userEmail ?? "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              Submission Started
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(
                                response?.createdAt?.toString() ?? "N/A"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              Last Updated
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(
                                response?.updatedAt?.toString() ?? "N/A"
                              )}
                            </p>
                          </div>
                        </div>
                        {/* <div className="flex items-center">
                          <SubmissionTypeIcon type={response.submissionType} />
                          <div className="ml-2">
                            <p className="text-sm font-almarai text-gray-500">
                              Submission Type
                            </p>
                            <p className="text-sm text-gray-900">
                              {response.submissionType.charAt(0).toUpperCase() +
                                response.submissionType.slice(1)}
                            </p>
                          </div>
                        </div> */}
                      </div>
                      {/* <div className="space-y-4">
                        <div className="flex items-center">
                          <Monitor className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              Browser & OS
                            </p>
                            <p className="text-sm text-gray-900">
                              {response.browser} on {response.os}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Wifi className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              Network
                            </p>
                            <p className="text-sm text-gray-900">
                              {response.network}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-almarai text-gray-500">
                              IP Address
                            </p>
                            <p className="text-sm text-gray-900">
                              {response.ipAddress}
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div>
                      <h3 className="text-lg font-almarai text-gray-900 mb-4">
                        Response Metadata
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-almarai text-gray-500">
                            Time Spent
                          </p>
                          <p className="text-lg font-almarai text-gray-900">
                            {response?.duration ?? 0} s
                          </p>
                        </div>
                        {/* <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-almarai text-gray-500">
                            Pages Visited
                          </p>
                          <p className="text-lg font-almarai text-gray-900">
                            {response.metadata.pagesVisited}
                          </p>
                        </div> */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-almarai text-gray-500">
                            Completion Rate
                          </p>
                          <p className="text-lg font-almarai text-gray-900">
                            {response?.progress}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                {/* <Tabs.Content value="comments" className="flex-1 p-6">
                  <ResponseComments
                    responseId={response.id}
                    collaborators={[
                      {
                        id: "1",
                        name: "John Doe",
                        avatar: "https://ui-avatars.com/api/?name=John+Doe",
                      },
                      {
                        id: "2",
                        name: "Jane Smith",
                        avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
                      },
                    ]}
                  />
                </Tabs.Content> */}
              </Tabs.Root>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
