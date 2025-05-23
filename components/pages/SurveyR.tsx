import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SurveyStatsCharts from "@/components/pages/SurveyStatsCharts";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart2,
  Users,
  TrendingUp,
  FileText,
  Search,
  RefreshCcw,
  Download,
  Brain,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import ReactPaginate from "react-paginate";
import { ResponseDetailsSlideOver } from "../forms/responses/ResponseDetailsSlideOver";
import { ResponseDetails } from "@/types";
interface Response {
  surveyId: string;
  responses: Record<string, string | boolean | string[] | object>;
  userEmail: string;
  progress: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const tabs: Tab[] = [
  { id: "responses", label: "Results", icon: FileText },
  { id: "completion", label: "In Progress", icon: TrendingUp },
  { id: "drop-off", label: "Drop-off", icon: TrendingUp },
  { id: "summary", label: "Summary", icon: BarChart2 },
  { id: "engagement", label: "Engagement", icon: Clock },
  { id: "demographics", label: "Demographics", icon: Users },
  { id: "aianalytics", label: "AI Analysis", icon: Brain },
];

const SurveyR: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<string[]>([]);
  const [surveyId, setSurveyId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("responses");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [filteredResponses, setFilteredResponses] = useState<Response[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingRetarget, setLoadingRetarget] = useState<string | null>(null);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredResponses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredResponses.length / itemsPerPage);
  const [responseCount, setResponseCount] = useState(null);
  const [stats, setStats] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );
  const [description, setDescription] = useState([]);
  const tableColumn = [
    "#",
    "Date",
    "Email",
    "Progress",
    "Duration",
    ...columns.filter(
      (col) => !["Date", "userEmail", "progress", "duration"].includes(col)
    ),
  ];
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`https://swbackstg.onrender.com/survey/${id}/stats`);
        setStats(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Failed to load survey stats");
      }
    };

    if (id) {
      fetchStats();
    }
  }, [id]);
  const transformedResponses = responses.map((item) => ({
    responses: item.responses,
  }));

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
            body: JSON.stringify({ transformedResponses }),
          }
        );

        const data = await res.json();
        console.log("Sentiment Analysis test sans descri:", data);
        setDescription(data.descriptions);
        console.log("Sentiment Analysis test sans descri:", data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'analyse de sentiment:",
          error
        );
      }
    };

    fetchSentiment();
  }, [responses]);

  console.log(stats, "statsstatsstatstique");
  console.log("Sentiment Analysis Finale:", description);
  //console.log("Sentiment Analysis:", description);

  useEffect(() => {
    const fetchResponseCount = async () => {
      try {
        const res = await axios.get(
          `https://swbackstg.onrender.com/survey/${id}/response-count`
        );
        setResponseCount(res.data.responseCount);
      } catch (err) {
        setError("Failed to load response count");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResponseCount();
    }
  }, [id]);
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get<Response[]>(
          `https://swbackstg.onrender.com/submit_survey/responses/${id}`
        );
        const data = res.data;
        console.log(data, "dataaaaglobal");

        if (data.length > 0) {
          setSurveyId(data[0].surveyId);

          const responseKeys = new Set<string>();

          // Récupérer les colonnes des réponses
          data.forEach((response) => {
            Object.keys(response.responses).forEach((key) =>
              responseKeys.add(key)
            );
          });

          // Ajouter "userEmail" et "progress" comme colonnes fixes
          setColumns([
            // "Date",
            "userEmail",

            "Status",
            // "duration",
            ...Array.from(responseKeys),
          ]);
        }

        setResponses(data);
        console.log("Columns:", columns);
        console.log("Responses:", responses);
        console.log("surveyId:", surveyId);
      } catch (error) {
        console.error("Error fetching responses:", error);
        setError("Failed to fetch survey responses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);
  useEffect(() => {
    if (!searchTerm) {
      setFilteredResponses(responses);
      return;
    }

    // 🔍 Filtrer les réponses en fonction de l'email ou des valeurs des réponses
    const filtered = responses.filter(
      (response) =>
        Object.values(response.responses).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        ) || response.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResponses(filtered);
  }, [searchTerm, responses]);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  // Fonction pour formater les valeurs des réponses
  const formatResponseValue = (value: any) => {
    if (value === null || value === undefined)
      return <span className="italic text-gray-400 ">N/A</span>;

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return (
          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap">
            {value.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-almarai text-white bg-blue-500 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        );
      }

      // 🎨 Palette de 3 couleurs fixes (utilisation cyclique)
      const colors = ["bg-[#FBE7E9]", "bg-[#D4F8D3]", "bg-[#EDE7FB]"];

      return (
        <div className="flex items-center gap-2 overflow-x-auto flex-nowrap">
          {Object.entries(value).map(([key, subValue], index) => {
            let displayValue =
              typeof subValue === "object" &&
                subValue !== null &&
                "text" in subValue
                ? subValue.text
                : subValue;

            // ✅ Alterner les couleurs selon l'index
            const bgColor = colors[index % colors.length];

            return (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-almarai text-[#111851] ${bgColor} rounded-md`}
              >
                {key}: {displayValue}
              </span>
            );
          })}
        </div>
      );
    }

    return <span className="text-gray-800">{value}</span>;
  };
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
  const handleRetarget = async (
    email: string,
    surveyID: string,
    progress: number
  ) => {
    setLoadingRetarget(email); // 🟡 Active l'animation pour ce bouton

    try {
      await axios.post("https://swbackstg.onrender.com/retarget_survey", {
        email,
        surveyID,
        progress,
      });

      setLoadingRetarget("sent"); // ✅ Change en mode succès
      setTimeout(() => setLoadingRetarget(null), 3000); // 🔄 Réinitialisation après 3 sec
    } catch (error) {
      console.error("❌ Error sending retarget email:", error);
      alert("❌ Failed to send retarget email.");
      setLoadingRetarget(null); // ❌ Stop l'animation
    }
  };
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape", // 📌 Met en mode paysage pour plus d'espace
      unit: "mm",
      format: "a4",
    });

    doc.text("Survey Responses", 14, 10); // 🔹 Titre du PDF

    const tableColumn = [
      "#",
      "Date",
      "Email",
      "Progress",
      "Duration",
      ...columns.filter(
        (col) => !["Date", "userEmail", "progress", "duration"].includes(col)
      ),
    ];
    const tableRows: any[] = [];

    filteredResponses.forEach((response, index) => {
      const rowData = [
        index + 1,
        formatDate(response.createdAt),
        response.userEmail,
        `${response.progress}%`,
        `${response.duration}s`,
        ...columns
          .filter(
            (col) =>
              !["Date", "userEmail", "progress", "duration"].includes(col)
          )
          .map((col) => {
            const value = response.responses?.[col];

            // 🔹 Si c'est un objet, on l'affiche proprement
            return typeof value === "object"
              ? Object.entries(value)
                .map(([key, subValue]) =>
                  typeof subValue === "object" &&
                    subValue !== null &&
                    "text" in subValue
                    ? `${key}: ${(subValue as any).text}`
                    : `${key}: ${subValue}`
                )
                .join(" | ")
              : value || "N/A";
          }),
      ];

      tableRows.push(rowData);
    });

    // 📌 Utilisation de autoTable avec des styles optimisés
    (autoTable as any)(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: "#2d5e8f", textColor: "#fff" },
      alternateRowStyles: { fillColor: "#f8f9fa" },
      columnStyles: {
        0: { cellWidth: 10 }, // 🔹 Numéro de ligne (plus petit)
        1: { cellWidth: 45 }, // 🔹 Email (plus large)
        2: { cellWidth: 25 }, // 🔹 Progress (adapté)
        3: { cellWidth: 25 }, // 🔹 Duration
        // 📌 On ajuste les colonnes dynamiques
        ...columns
          .filter((col) => !["userEmail", "progress", "duration"].includes(col))
          .reduce((acc, _, i) => ({ ...acc, [i + 4]: { cellWidth: 35 } }), {}),
      },
      didDrawCell: (data) => {
        if (data.column.index >= 4 && data.cell.text.length > 50) {
          doc.setFontSize(8); // 📌 Réduit la taille de la police si le texte est long
        }
      },
    });

    doc.save("survey_responses.pdf"); // 📥 Télécharge le fichier
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    // setSelectedResponse(null);
  };
  if (loading) return <p className="text-center">⏳ Loading...</p>;
  if (error) return <p className="text-center text-red-500">⚠ {error}</p>;

  return (
    <div className="flex items-center justify-center h-auto mt-6">
      <div className="w-full max-w-7xl font-almarai">
        {/* Search & Controls */}
        <div className="flex items-center justify-between">
          <div className="relative w-1/3">
            <Search className="absolute text-gray-500 left-3 top-2" size={16} />
            <input
              type="text"
              placeholder="Search responses..."
              className="w-full py-2 pl-10 pr-4 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-1">
            <span className="flex items-center px-2 py-1 text-[#292D32]">
              {responseCount} Results
            </span>
            <button
              className="flex items-center px-2 py-1 transition"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  window.location.reload(); // 🔄 Rafraîchir la page
                }, 100); // Petit délai pour l'effet
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center px-1 py-1 "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9991 21.2501C11.8091 21.2501 11.6191 21.1801 11.4691 21.0301L5.39914 14.9601C5.10914 14.6701 5.10914 14.1901 5.39914 13.9001C5.68914 13.6101 6.16914 13.6101 6.45914 13.9001L11.9991 19.4401L17.5391 13.9001C17.8291 13.6101 18.3091 13.6101 18.5991 13.9001C18.8891 14.1901 18.8891 14.6701 18.5991 14.9601L12.5291 21.0301C12.3791 21.1801 12.1891 21.2501 11.9991 21.2501Z"
                  fill="#292D32"
                />
                <path
                  d="M12 21.08C11.59 21.08 11.25 20.74 11.25 20.33V3.5C11.25 3.09 11.59 2.75 12 2.75C12.41 2.75 12.75 3.09 12.75 3.5V20.33C12.75 20.74 12.41 21.08 12 21.08Z"
                  fill="#292D32"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Responses Table */}
        <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            {/* En-tête */}
            <thead className="text-sm text-gray-500 bg-gray-100 select-none">
              <tr>
                <th className="px-4 py-3 ">#</th>
                <th className="px-4 py-3 ">Action</th>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 tracking-wide text-left uppercase"
                  >
                    {col === "userEmail"
                      ? "Email"
                      : // : col === "progress"
                      // ? "Progress"
                      col}
                  </th>
                ))}
                {/* <th className="px-4 py-3 text-left">Status</th>{" "} */}
              </tr>
            </thead>

            {/* Corps */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((response, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  {/* Numéro de ligne */}
                  <td className="px-4 py-3 text-left font-almarai text-[#565758]">
                    {offset + rowIndex + 1}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        // onClick={onView}
                        // onClick={handleViewDetails}
                        onClick={() => {
                          setIsDetailsOpen(true), setSelectedResponse(response);
                        }}
                        className="inline-flex items-center px-3 py-1 duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </button>
                    </div>
                  </td>
                  {columns.map((col, colIndex) => {
                    let responseValue = response.responses?.[col] ?? "N/A";

                    if (col === "userEmail") {
                      responseValue = (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-[#2d5e8f]" />
                          <span>{response.userEmail || "N/A"}</span>
                        </div>
                      );
                    } else if (col === "Status") {
                      const progressValue = response.progress || 0;
                      const isComplete = progressValue === 100;

                      responseValue = (
                        <div className="flex flex-col items-start space-y-1">
                          {/* Barre de progression */}
                          {/* <div className="flex items-center space-x-2">
                         
                            {isComplete ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-500" />
                            )}
                          </div> */}

                          {/* Badge de statut */}
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-almarai ${isComplete
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {isComplete ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                                Complete
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                                Partial
                              </>
                            )}
                          </span>
                        </div>
                      );
                    } else if (col === "duration") {
                      responseValue = (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{response.duration || "N/A"}s</span>
                        </div>
                      );
                    } else if (col === "Date") {
                      responseValue = (
                        <div className="flex items-center space-x-2">
                          <span> {formatDate(response?.createdAt)}</span>
                        </div>
                      );
                    } else {
                      responseValue = formatResponseValue(responseValue);
                    }

                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-left text-[#2d5e8f] whitespace-nowrap"
                      >
                        {responseValue}
                      </td>
                    );
                  })}

                  {/* <td className="px-4 py-3 text-left">
                    {response.progress < 100 ? (
                      <div className="flex items-center space-x-3">
                      
                        <span className="text-sm   font-bold font-almarai font-almarai  font-almarai text-blue-600">
                          {response.progress}%
                        </span>
                        <button
                          onClick={() =>
                            handleRetarget(
                              response.userEmail,
                              response.surveyId,
                              response.progress
                            )
                          }
                          className="flex items-center px-4 py-2 space-x-2 text-xs font-almarai text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-100"
                          disabled={loadingRetarget === response.userEmail} 
                        >
                          {loadingRetarget === response.userEmail ? (
                          
                            <svg
                              className="w-4 h-4 text-gray-600 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                strokeWidth="2"
                                stroke="gray"
                                fill="none"
                              />
                              <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                          ) : loadingRetarget === "sent" ? (
                           
                            <span className="flex items-center space-x-1 text-green-600">
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="green"
                                  fill="none"
                                />
                                <path
                                  d="M7 12l3 3 6-6"
                                  stroke="green"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Sent</span>
                            </span>
                          ) : (
                            <>
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.75 15.9375H5.25C4.9425 15.9375 4.6875 15.6825 4.6875 15.375C4.6875 15.0675 4.9425 14.8125 5.25 14.8125H12.75C14.895 14.8125 15.9375 13.77 15.9375 11.625V6.375C15.9375 4.23 14.895 3.1875 12.75 3.1875H5.25C3.105 3.1875 2.0625 4.23 2.0625 6.375C2.0625 6.6825 1.8075 6.9375 1.5 6.9375C1.1925 6.9375 0.9375 6.6825 0.9375 6.375C0.9375 3.6375 2.5125 2.0625 5.25 2.0625H12.75C15.4875 2.0625 17.0625 3.6375 17.0625 6.375V11.625C17.0625 14.3625 15.4875 15.9375 12.75 15.9375Z"
                                  fill="#6B7280"
                                />
                                <path
                                  d="M9.00008 9.65296C8.37008 9.65296 7.73258 9.45797 7.24508 9.06047L4.89758 7.18547C4.65758 6.99047 4.61258 6.63796 4.80758 6.39796C5.00258 6.15796 5.35507 6.11297 5.59507 6.30797L7.94257 8.18297C8.51257 8.64047 9.48007 8.64047 10.0501 8.18297L12.3976 6.30797C12.6376 6.11297 12.9976 6.15046 13.1851 6.39796C13.3801 6.63796 13.3426 6.99797 13.0951 7.18547L10.7476 9.06047C10.2676 9.45797 9.63008 9.65296 9.00008 9.65296Z"
                                  fill="#6B7280"
                                />
                                <path
                                  d="M6 12.9375H1.5C1.1925 12.9375 0.9375 12.6825 0.9375 12.375C0.9375 12.0675 1.1925 11.8125 1.5 11.8125H6C6.3075 11.8125 6.5625 12.0675 6.5625 12.375C6.5625 12.6825 6.3075 12.9375 6 12.9375Z"
                                  fill="#6B7280"
                                />
                                <path
                                  d="M3.75 9.9375H1.5C1.1925 9.9375 0.9375 9.6825 0.9375 9.375C0.9375 9.0675 1.1925 8.8125 1.5 8.8125H3.75C4.0575 8.8125 4.3125 9.0675 4.3125 9.375C4.3125 9.6825 4.0575 9.9375 3.75 9.9375Z"
                                  fill="#6B7280"
                                />
                              </svg>

                              <span className="text-[#6B7280]">Retarget</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="flex items-center text-sm   font-bold font-almarai font-almarai  font-almarai text-green-600">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#16A34A"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M7 12l3 3 6-6"
                            stroke="#16A34A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-2">
                          {response.progress}% Completed
                        </span>{" "}
                   
                      </span>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ResponseDetailsSlideOver
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          response={selectedResponse}
        />

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-2 mt-6"}
          pageClassName={"px-4 py-2 border rounded-md cursor-pointer"}
          activeClassName={"bg-[#6B7284] text-white"}
          previousClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          nextClassName={"px-3 py-2 border rounded-md cursor-pointer"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}> = ({ title, value, change, icon: Icon }) => (
  <div className="flex flex-col items-center p-6 text-center bg-white shadow-md rounded-xl">
    {/* Icône en haut avec fond stylé */}
    <div className="p-3 bg-indigo-100 rounded-lg">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>

    {/* Valeur en gras */}
    <p className="mt-3 text-2xl   font-bold font-almarai font-almarai  font-almarai">{value}</p>

    {/* Titre en texte plus clair */}
    <p className="text-sm text-gray-500">{title}</p>

    {/* Variation colorée */}
    <p
      className={`mt-2 text-sm font-almarai ${change.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
    >
      {change}
    </p>
  </div>
);

export default SurveyR;
