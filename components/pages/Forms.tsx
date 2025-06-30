import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CreateFormButton } from "@/components/common/CreateFormButton";
import { ViewToggle } from "../forms/ViewToggle";
import { FilterPanel } from "../forms/filters/FilterPanel";
import { FormGrid } from "../forms/FormGrid";
import { FormList } from "../forms/FormList";
import { BatchActions } from "../forms/BatchActions";
import { FormShareDialog } from "../forms/FormShareDialog";
import { ClosingOptionsModal } from "../forms/ClosingOptionsModal";
import { SearchAndFilters } from "./forms/SearchAndFilters";
import { StatsBanner } from "../pages/StatsBanner";
import {
  Filter,
  FolderOpen,
  Menu,
  PlusCircle,
  Search,
  Settings,
  Users,
  X,
  Zap,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import { Form, TeamMember } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { WorkspaceSettingsModal } from "../forms/WorkspaceSettingsModal";
import { useAuth } from "../providers/AuthProvider";
import { AvatarDropdown } from "../navigation/AvatarDropdown";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import {
  createWorkspace,
  fetchWorkspaces,
  selectAddWorkspaceStatus,
  selectDeleteWorkspaceStatus,
  selectUpdateWorkspaceStatus,
  selectWorkspaceError,
  selectWorkspaces,
} from "@/src/features/workspace/workspaceSlice";
import { useSelector } from "react-redux";
import axios from "@/src/config/axios";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import {
  CreateCompany,
  selectCompanyError,
  selectCompanySelected,
  selectGetCompanyByOwner,
  setLoadingCompany,
} from "@/src/features/company/companySlice";

export default function Forms() {
  const { t } = useTranslation();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCollaborators, setShowCollaborators] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("all");
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null
  );
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [workspaceSearchTerm, setWorkspaceSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, isRolePermission } = useAuth();
  const [surveys, setSurveys] = useState<Form[]>([]);
  const [name, setName] = useState("");
  const [responsesCount, setResponsesCount] = useState<{
    [key: string]: number;
  }>({});

  type CompletionDataType = {
    _id: string;
    averageCompletion: number;
    totalResponses: number;
  };

  // 1. Sélection des données et statuts depuis Redux
  const workspaces = useSelector(selectWorkspaces);
  const dispatch = useDispatch<AppDispatch>();

  const [completionData, setCompletionData] = useState<CompletionDataType[]>(
    []
  );

  const [averageTimes, setAverageTimes] = useState<{ [key: string]: number }>(
    {}
  );

  const fetchSurveys = async () => {
    try {
      let workspaceId = user?.workspaceId?.id || null;
      let userId = user?._id;

      if (!userId) {
        return;
      }

      if (user?.role === "companyOwner" || user?.role === "accountOwner") {
        workspaceId = selectedWorkspace;
      }

      if (
        !workspaceId &&
        (user?.role === "companyOwner" || user?.role === "accountOwner")
      ) {
        return;
      }

      let apiUrl = "";
      // if (user?.role === "editor" || user?.role === "viewer") {
      //   apiUrl = `https://backend.votly.app/getsurveyByUserId/${userId}`;
      // } else {
      apiUrl = `https://backend.votly.app/user/survey/${workspaceId}`;
      // }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Erreur de récupération des surveys");
      }

      const data = await response.json();
      setSurveys(data);

      const completionPromises = data.map(async (survey: Form) => {
        try {
          const res = await axios.get(
            `https://backend.votly.app/surveys/completion/${survey._id}`
          );
          return {
            id: survey._id,
            completion: res.data.averageCompletion || 0,
          };
        } catch (error) {
          return { id: survey._id, completion: 0 };
        }
      });

      const avgTimesPromises = data.map(async (survey: Form) => {
        try {
          const res = await axios.get(
            `https://backend.votly.app/survey/average_time/${survey._id}`
          );
          return { id: survey._id, averageTime: res.data.averageTime || 0 };
        } catch (error) {
          return { id: survey._id, averageTime: 0 };
        }
      });

      const completionDataArray = await Promise.all(completionPromises);
      const avgTimesArray = await Promise.all(avgTimesPromises);

      // Créer un tableau de CompletionDataType
      const completionDataObject = completionDataArray.map((item) => ({
        _id: item.id, // Assurez-vous que l'ID est fourni
        averageCompletion: item.completion, // C'est ce qui était calculé dans completion
        totalResponses: 0,
        //averageTimes :item.a
      }));

      const avgTimesObject = avgTimesArray.reduce((acc, item) => {
        acc[item.id] = item.averageTime;
        return acc;
      }, {} as { [key: string]: number });

      setCompletionData(completionDataObject); // Mise à jour avec un tableau
      setAverageTimes(avgTimesObject);
      console.log(avgTimesObject);
    } catch (error) {
      console.error("Erreur lors du chargement des formulaires :", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const surveysPerPage = 4;
  const offset = currentPage * surveysPerPage;
  // const currentSurveys = surveys.slice(offset, offset + surveysPerPage);

  const currentSurveys = useMemo(
    () => surveys.slice(offset, offset + surveysPerPage),
    [surveys, currentPage]
  );

  const pageCount = Math.ceil(surveys.length / surveysPerPage);

  useEffect(() => {
    const fetchResponsesCount = async () => {
      const counts: { [key: string]: number } = {};
      for (const survey of currentSurveys) {
        try {
          const res = await axios.get(
            `https://backend.votly.app/submit_survey/responses/${survey._id} `
          );
          counts[survey._id] = res.data.length;
          setResponsesCount(counts);
        } catch (error) {
          console.error("Erreur lors de la récupération des réponses :", error);
          counts[survey._id] = 0;
        }
      }
    };

    if (currentSurveys.length > 0) {
      fetchResponsesCount();
    }
  }, [currentSurveys, setResponsesCount]);

  const handleShareForm = (formId: string) => {
    setShowCollaborators(formId === showCollaborators ? null : formId);
  };

  const handleEditForm = (formId: string) => { };

  const handleClosingOptions = (formId: string) => {
    setSelectedFormId(formId);
    setIsClosingModalOpen(true);
  };

  const handleStatusChange = (
    formId: string,
    newStatus: "live" | "draft" | "closed"
  ) => {
    setForms(
      forms.map((form) =>
        form._id === formId ? { ...form, status: newStatus } : form
      )
    );
    toast.success(`Form status updated to ${newStatus}`);
  };

  const handleBatchStatusChange = (status: string) => {
    setForms(
      forms.map((form) =>
        selectedForms.includes(form._id)
          ? { ...form, status: status as "live" | "draft" | "closed" }
          : form
      )
    );
    toast.success(`Updated status for ${selectedForms.length} forms`);
    setSelectedForms([]);
  };

  const handleBatchDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedForms.length} forms?`
      )
    ) {
      setForms(forms.filter((form) => !selectedForms.includes(form._id)));
      toast.success(`Deleted ${selectedForms.length} forms`);
      setSelectedForms([]);
    }
  };

  const handleBatchArchive = () => {
    setForms(
      forms.map((form) =>
        selectedForms.includes(form._id) ? { ...form, status: "closed" } : form
      )
    );
    toast.success(`Archived ${selectedForms.length} forms`);
    setSelectedForms([]);
  };
  const handleWorkspaceSettings = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    setShowWorkspaceSettings(true);
  };
  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    setIsSidebarOpen(false);
  };

  //wj
  const matchesTitle = (rawTitle: any, searchTerm: string): boolean => {
    if (typeof rawTitle === "string") {
      return rawTitle.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (typeof rawTitle === "object" && rawTitle !== null) {
      return (
        (typeof rawTitle.default === "string" &&
          rawTitle.default.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof rawTitle.ar === "string" &&
          rawTitle.ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
        Object.values(rawTitle as Record<string, string>).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return false;
  };

  const filteredForms = currentSurveys
    .filter((form) => {
      const rawTitle = form?.json?.title ?? form?.title;
      return matchesTitle(rawTitle, searchTerm);
    })
    .filter((survey) => {
      if (selectedStatus === "live") return !survey.isClosed;
      if (selectedStatus === "closed") return survey.isClosed;
      return true;
    })

    .sort((a, b) => {
      if (sortBy === "lastUpdated") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      if (sortBy === "responses") {
        return responsesCount[b._id] - responsesCount[a._id];
      }
      if (sortBy === "completionRate") {
        const completionA =
          completionData?.find((item) => item._id === a._id)
            ?.averageCompletion || 0;
        const completionB =
          completionData?.find((item) => item._id === b._id)
            ?.averageCompletion || 0;
        return completionB - completionA;
      }

      return 0;
    });

  // Filter workspaces based on search
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace?.name.toLowerCase().includes(workspaceSearchTerm.toLowerCase())
  );

  //wjjjjjjjjjjj//
  /*const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return;

    await dispatch(
      createWorkspace({
        name: newWorkspaceName,
        companyOwner: user?.companyId.id ?? "",
      })
    );
    setNewWorkspaceName("");
    setShowNewWorkspaceModal(false);
  };*/

  /*useEffect(() => {
    if (user?.companyId?.id && user?.role === "companyOwner") {
      dispatch(fetchWorkspaces(user.companyId.id));
    }
  }, [dispatch, user?.companyId?.id, user?.role]);*/
  const companies = useSelector(selectGetCompanyByOwner);
  let addModal =
    (user?.role === "accountOwner" && companies.length === 0) ||
      user?.role === "user"
      ? "company"
      : "workspace";
  const selectedCompany = useSelector(selectCompanySelected);

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return;

    try {
      if (
        (user?.role === "accountOwner" && companies.length === 0) ||
        user?.role === "user"
      ) {
        await dispatch(
          CreateCompany({
            name: newWorkspaceName,
            Owner: user?._id ?? "",
          })
        ).unwrap();
      } else {
        await dispatch(
          createWorkspace({
            name: newWorkspaceName,
            companyOwner:
              user?.role === "accountOwner" && companies.length > 0
                ? selectedCompany?._id ?? ""
                : user?.companyId?.id ?? "",
          })
        ).unwrap();
      }

      setNewWorkspaceName("");
      setShowNewWorkspaceModal(false);
    } catch (error) {
      setShowNewWorkspaceModal(true);
    }
  };

  const error =
    (user?.role === "accountOwner" && companies.length == 0) ||
      user?.role === "user"
      ? useSelector(selectCompanyError)
      : useSelector(selectWorkspaceError);

  useEffect(() => {
    const loadWorkspaces = async () => {
      if (user?.role === "companyOwner" && user?.companyId?.id) {
        const companyId = user.companyId.id;
        dispatch(setLoadingCompany(companyId));
        await dispatch(fetchWorkspaces(companyId));
        dispatch(setLoadingCompany(null));
      } else if (
        user?.role === "accountOwner" &&
        selectedCompany &&
        typeof selectedCompany._id === "string"
      ) {
        const companyId = selectedCompany._id;
        dispatch(setLoadingCompany(companyId));
        await dispatch(fetchWorkspaces(companyId));
        dispatch(setLoadingCompany(null));
      }
    };

    loadWorkspaces();
  }, [dispatch, selectedCompany, user?.companyId?.id, user?.role]);
  useEffect(() => {
    if (selectedWorkspace || user?.workspaceId?.id) {
      fetchSurveys();
    }
  }, [selectedWorkspace, user?.workspaceId?.id]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const avgTimeInSeconds = Object.values(averageTimes).filter(
    (time) => typeof time === "number" && !isNaN(time) && time > 0
  );

  const avgTime =
    avgTimeInSeconds.length > 0
      ? Math.round(
        avgTimeInSeconds.reduce((sum, time) => sum + time, 0) /
        avgTimeInSeconds.length
      )
      : 0;

  const minutes = Math.floor(avgTime / 60);
  const seconds = avgTime % 60;
  const avgTimeFormatted = `${minutes}m ${seconds}s`;
  const [newCompanyName, setNewCompanyName] = useState("");
  const [showNewCompanyModal, setShowNewCompanyodal] = useState(false);

  const handleCreateCompany = async () => {
    try {
      if (!newCompanyName.trim()) return;

      await dispatch(
        CreateCompany({
          name: newCompanyName,
          Owner: user?._id ?? "",
        })
      ).unwrap();
      setNewCompanyName("");
      setShowNewCompanyodal(false);
    } catch (error: any) {
      console.log("Error creating company:", error?.message);
      setShowNewCompanyodal(true);
    }
  };
  const companyError = useSelector(selectCompanyError);
  const error2 =
    (user?.role === "accountOwner" || user?.role === "user") && companyError;
  let displayName = "";

  if (user?.role === "accountOwner" && selectedCompany?.name) {
    displayName = `${selectedCompany.name}'s company`;
  } else if (user?.role === "companyOwner" || user?.isPermission) {
    displayName = `${user.companyId?.name || "Your"}'s company`;
  } else if (
    ["workspaceOwner", "editor", "viewer"].includes(user?.role ?? "")
  ) {
    displayName = `${user?.workspaceId?.name || "Workspace"}'s workspace`;
  } else {
    displayName = user?.email ? `${user.email.slice(0, 20)}...` : "";
  }
  return (
    <div className="font-almarai">
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex w-full h-screen">
          {/* Mobile Sidebar Toggle */}
          <div className="fixed top-0 left-0 right-0 z-20 px-4 py-2 bg-white border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-500 rounded-md hover:text-gray-600 hover:bg-gray-100"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <h1 className="text-lg font-almarai text-gray-900">
                {t("forms.formsTitle")}
              </h1>
              {isRolePermission("btn_syrvey") && (
                <CreateFormButton className="sm:hidden" />
              )}
            </div>
          </div>
          {/* Workspace Sidebar */}

          <div
            className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0  flex flex-col  fixed lg:relative h-full  w-80 bg-white border-r border-gray-200  transition-transform duration-300 ease-in-out `}
          >
            {user?.role === "companyOwner" || user?.role === "accountOwner" ? (
              <div className="p-6">
                <div className="relative mb-6">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder={t("forms.search")}
                    value={workspaceSearchTerm}
                    onChange={(e) => setWorkspaceSearchTerm(e.target.value)}
                    className="w-full py-2 pr-3 text-sm border border-gray-300 rounded-md bg-gray-50 pl-9 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/*<h2 className="text-lg font-almarai text-gray-500 font-almarai">
                    {t("forms.workspaces")}
                  </h2>*/}
                {/*<div className="flex items-center justify-center w-8 h-8 text-sm font-almarai text-blue-600 bg-gray-100 rounded-md">
                    {workspaces.length}
                  </div>*/}

                <div className="flex items-center justify-between mb-6">
                  {(selectedCompany ||
                    user.role === "companyOwner" ||
                    user.isPermission) && (
                      <h2 className="text-lg font-almarai font-almarai text-gray-500">
                        Workspaces
                      </h2>
                    )}
                  {(selectedCompany ||
                    user.role === "companyOwner" ||
                    user.isPermission) && (
                      <button
                        onClick={() => setShowNewWorkspaceModal(true)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <PlusCircle className="h-7 w-7 text-gray-300 " />
                      </button>
                    )}

                </div>
                {/* <button
                  onClick={() => setShowNewWorkspaceModal(true)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <PlusCircle className="text-gray-300 h-7 w-7 " />
                </button> */}

                <div className="space-y-2 h-[300px]  overflow-y-auto ">
                  {filteredWorkspaces.map((workspace) => (
                    <span
                      key={workspace._id}
                      className={`w-full flex items-center cursor-pointer  justify-between p-4 rounded-lg text-left transition-colors ${selectedWorkspace === workspace._id
                        ? "bg-indigo-50 text-indigo-600"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <div
                        className="flex items-center"
                        onClick={() => {
                          handleWorkspaceSelect(workspace?._id ?? ""),
                            setName(workspace.name);
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg border border-indigo-100 text-gray-400 flex items-center justify-center font-almarai">
                          {workspace.name.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-700 font-almarai">
                            {workspace.name.toUpperCase()}
                          </div>
                          {/* //wjjjjjjjjjjj */}
                          <div className="text-xs text-gray-500">
                            {workspace?.surveyCount ?? 0} forms •{" "}
                            {workspace?.team?.length ?? 0} members
                          </div>

                          {/* //wjjjjjjjjjjj */}
                        </div>
                      </div>

                      {(user.role === "accountOwner" ||
                        user.role === "companyOwner" ||
                        user.isPermission) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWorkspaceSettings(workspace?._id ?? "");
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                          >
                            <Settings className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                      {/* //wjjjjjjjjjjj */}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-10 font-almarai">
                <h2 className="text-lg font-almarai text-gray-500 font-almarai">
                  {`${user?.workspaceId.name}`}'s Workspaces
                </h2>
              </div>
            )}
            {/* Bas de la sidebar */}

            <div className="flex flex-col items-center p-4 mt-auto space-y-4">
              <button
                type="submit"
                className="flex items-center justify-center w-full p-2 space-x-2 font-almarai text-yellow-500 border border-yellow-300 rounded-md bg-orange-50 text-md hover:bg-yellow-100"
              >
                <Link
                  to={"/pricing"}
                  className="flex justify-center w-full p-2 space-x-2 "
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xlinkHref="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.5"
                      width="20"
                      height="20"
                      fill="url(#pattern0_607_6005)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_607_6005"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_607_6005"
                          transform="scale(0.0078125)"
                        />
                      </pattern>
                      <image
                        id="image0_607_6005"
                        width="128"
                        height="128"
                        preserveAspectRatio="none"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFs0lEQVR4Ae1d0VXjMBBUCZRACZRACZRACSmBEiiBEiiBf2JCCZSQDnSYUyCR48SSdrXr3bn3eIeJLUszK2k0Xish4B8QAAJAAAgAASAABIAAEAACQAAIAAEgAASAwC8CcRdu4hAe4xCe0s8m7sLt7wn4xS4CcRse4hD2cQjxzM+z3ZajZSH1+nPEH//tDVAZRCDuwt2Fnn8cAOPvjwYh8NukNOd/nRnyc+IPx19+0TLY8jiEzwLyf4LAIAw+mxQ/wksp+eP5PtEy1urvOX9TQz4CwEAgpOXeYU4v/f/TAAR+m1Co+KfB8RFe/KK38pYnxV8s+rKpYrNyGPxWPw7hLSNz2sPPu4B/572He78IrrjltYp/EjC7cLNiGHxWfaHN+9fL50cBmEBrC6H4Hu4nvXie4GtBgGcBawqA8TFugcd/jfzx86c1td91XYkU/2lQbMODa1DX1Pi4Da+EQ///QNiFuzVh4LaucQjP5OTjGcA64olQ8Z8O/0OAANQeAsnmzYmjOYYFrJv+JPrm8vkoggAWsNYQYFH8uVcAC1gr/SGQ2bw56UfHelvvvGYpd59iiL9UBixgjXHWmNhxifDTz7bhVWP7XdepObHjaHhf4BnAAtYUbUn0laRyn/boMvLjONJoar/7utSkci/o5fNBgncD9cRcD8WfB4ue1juvSUsqd05qwTEsYA1xR5zYMT/cT/UB3gqWDoDOij8PDrwMKhkAXWzeaa//CwJYwJL0h/G9/fZU7ksEX/lMtvXO7y6h+DNxiNfApGKQMbHjb3i/0vvHtDKp9ru+L2tixzXSTz+HBdw7EhlSuZf3+FPy47j07N1+1/cTV/x5AMAC7huPLKncOanLj/d9W+/8blyp3JmqL5kOYAH3ikkVin86MsAC7hEAwjZvyYjAce64WYVfqzmJPs5Ubg7SOMp8G7Ho0eHU3EOd4p9OARxEXyrT15SjwOa9RIbMZ16WnUKJHTKklo0s9p3HbqncZcBrCQ7bAeBc8S8JMrsBkERfv1TudY4AdpeE3VO51xcAe7NLQSj+s19Bk08JNnu/Ups3B1/62KYHIJjKLU1oyf1tPnSC4l807H+anPdh8y4ifxR9Nredk07lbsgBKBm62861mm6mMLGjjSie5SQU/yp6KQf5VrebS/M+nu1fDhq7L5pgvX9V+H2ZVPyHDJNOu3VpnM+X1Mmu4kcAXO35PvYYwggwGwg+tphNr3QtGQ79nGNV8R+G/fx/eAAno4BNmzcn/fg4LQVFN3RQ4i/YfbZ/TPjc72lJ2PoNnWudKuwr/jnie/9d6ZRj0+btTe6S+yl86GQ3qXMJIb3PIf5OwLYpB9vJ9KVf2bLTn+LvS/f0borSzUbRdzutIf7CioAa59FqVg8rewSFK9lOBoqfgMuqIsRfNPFm81axxHiRsONnM5WbkS/SooUFIBQ/KZsVhQnuLwCbt4Iv8kvELGCrqdzkDDEXKGQB+0jsYOaOpPjuAhCKn4Q3kkIELGC7qdwkjHQupPMeQ7ZTuTtzR3K7jhYwFD8JY8SFdLOA8XWxxMwRFfedbtZjoykkdhDxRV4M+woAip+cM7ICO1jAsHnJ2GIoiNkCHkWfrx27GThiLZJxuzkoflbmiApntICR2EHEEWsxTALQ5h59rEwIFJ62nWtL3c5370AqtwCTlbdksICh+Cu5ELmM2AIeRR9SuUWYrLwpqQBEYkclC4KXEVrAUPyCPFbdOu070C4AYfNW4S9+EZEFjFRucSYrK0BgAUPxV2Kv4rJGCxg2rwoWGyrR9BoYEjsakFdyaYMFjFRuJRw2VaMqAKD4mzBXdXFFACCVWxWDjZUpNIGQyt2It7rLC5aBUPzq2COq0MJnAbB5ifBWWcyFt4L34+NilZVGpWgRSO8GbtLj4aefbWmRzEkLMkoDAkAACAABIAAEgAAQAAJAAAgAASAABFaPwD+6jYq05y+gQAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                  <p>{t("forms.upgrade")}</p>{" "}
                </Link>
              </button>
              {user && (
                <div className="flex items-center w-full p-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-300 ">
                  <img
                    src="https://img.freepik.com/vecteurs-premium/avatar-icon0002_750950-43.jpg?semt=ais_hybrid"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-almarai text-gray-900">
                      {user.username.length > 10
                        ? user.username.slice(0, 10) + "..."
                        : user.username}
                    </div>
                    <div className="text-sm font-almarai text-gray-500">
                      {displayName}
                    </div>
                  </div>
                  <AvatarDropdown onLogout={logout} />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pt-16 lg:pt-0 flex-column ">
            <div>
              {isRolePermission("reports") ? (
                selectedWorkspace ? (
                  surveys.length > 0 ? (
                    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                        <h2 className="hidden text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-500 lg:block"></h2>

                        <div
                          onClick={() =>
                            localStorage.setItem(
                              "workspaceId",
                              selectedWorkspace
                            )
                          }
                          className="flex items-center w-full space-x-4 sm:w-auto"
                        >
                          {isRolePermission("btn_syrvey") && (
                            <CreateFormButton className="hidden sm:inline-flex" />
                          )}
                        </div>
                      </div>
                      <StatsBanner
                        totalForms={surveys.length}
                        totalResponses={Object.values(responsesCount).reduce(
                          (a, b) => a + b,
                          0
                        )}
                        avgCompletionRate={
                          completionData.length > 0
                            ? Math.round(
                              completionData.reduce(
                                (sum, item) => sum + item.averageCompletion,
                                0
                              ) / completionData.length
                            )
                            : 0
                        }
                        avgTime={avgTimeFormatted}
                        activeCollaborators={1} // Vous pouvez ajuster cette valeur en fonction de vos besoins
                      />
                      <div className="flex flex-col gap-4 mt-10 mb-6 sm:flex-row sm:justify-between">
                        <SearchAndFilters
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          selectedStatus={selectedStatus}
                          setSelectedStatus={setSelectedStatus}
                          sortBy={sortBy}
                          setSortBy={setSortBy}
                        />
                        <ViewToggle view={view} onViewChange={setView} />
                      </div>

                      <div
                        className={`grid ${view === "grid"
                          ? "md:grid-cols-2 lg:grid-cols-2"
                          : "grid-cols-1"
                          } gap-6`}
                      >
                        <FormGrid
                          forms={filteredForms}
                          averageTime={averageTimes || {}}
                          completionData={completionData}
                          responsesCount={responsesCount}
                          onShare={handleShareForm}
                          onOptionsClick={handleEditForm}
                          onClosingOptions={handleClosingOptions}
                          onStatusChange={handleStatusChange}
                        />
                      </div>

                      <BatchActions
                        selectedForms={selectedForms}
                        onStatusChange={handleBatchStatusChange}
                        onDelete={handleBatchDelete}
                        onArchive={handleBatchArchive}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                          <h2 className="hidden text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-500 lg:block font-almarai"></h2>
                        </div>
                        <div className="text-gray-500 text-lg flex flex-col mt-[300px] ">
                          <div
                            onClick={() =>
                              localStorage.setItem(
                                "workspaceId",
                                selectedWorkspace
                              )
                            }
                            className="flex items-center justify-center w-full space-x-4 sm:w-auto"
                          >
                            {isRolePermission("btn_syrvey") && (
                              <CreateFormButton className="hidden sm:inline-flex" />
                            )}
                          </div>

                          <p className="flex items-center justify-center mt-5">
                            {t("forms.createSurvey")}
                          </p>
                        </div>
                      </div>
                    </>
                  )
                ) : /*) : (
                  <p className="text-gray-500 text-lg flex mt-[300px] ml-[400px]">
                    {t("forms.selectWorkspace")}
                  </p>
                ) */

                  (user?.role === "accountOwner" && companies.length === 0) ||
                    user?.role === "user" ? (
                    <p className="text-gray-500 text-lg flex mt-[300px] ml-[400px]">
                      <div className="flex justify-center items-center flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-building2 w-12 h-12 text-gray-500"
                        >
                          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                          <path d="M10 6h4"></path>
                          <path d="M10 10h4"></path>
                          <path d="M10 14h4"></path>
                          <path d="M10 18h4"></path>
                        </svg>
                        <h3 className="mt-2 text-sm font-almarai text-gray-900">
                          No companies yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-400 max-w-lg text-center">
                          Create one now to get started!
                        </p>

                        <button
                          style={{ background: "#3068FF", fontSize: "15px" }}
                          onClick={() => {
                            setShowNewCompanyodal(true);
                          }}
                          className=" mt-3 inline-flex justify-end items-center p-3 border border-transparent rounded-xl shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Plus className="h-5 w-5 mr-2" />

                          <span> Create new company</span>
                        </button>
                      </div>
                    </p>
                  ) : user?.role === "accountOwner" && !selectedCompany ? (
                    <p className="text-gray-500 text-lg flex mt-[300px] ml-[400px]">
                      Select a company to view its content.
                    </p>
                  ) : (
                    <p className="text-gray-500 text-lg flex mt-[300px] ml-[400px]">
                      Select a workspace to view its content.
                    </p>
                  )
              ) : surveys.length > 0 ? (
                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center font-almarai">
                    <h2 className="hidden text-xl   font-bold font-almarai font-almarai  font-almarai text-gray-500 lg:block font-almarai">
                      {user?.workspaceId?.name} 's WORKSPACE
                    </h2>
                    <div className="flex items-center w-full space-x-4 sm:w-auto">
                      <span
                        onClick={() =>
                          localStorage.setItem(
                            "workspaceId",
                            user?.workspaceId?.id || ""
                          )
                        }
                        className="flex items-center justify-center w-full space-x-4 sm:w-auto"
                      >
                        {isRolePermission("btn_syrvey") && (
                          <CreateFormButton className="hidden sm:inline-flex" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-10 mb-6 sm:flex-row sm:justify-between">
                    <SearchAndFilters
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedStatus={selectedStatus}
                      setSelectedStatus={setSelectedStatus}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                    />
                    <ViewToggle view={view} onViewChange={setView} />
                  </div>

                  <div
                    className={`grid ${view === "grid"
                      ? "md:grid-cols-2 lg:grid-cols-2"
                      : "grid-cols-1"
                      } gap-6`}
                  >
                    <FormGrid
                      forms={filteredForms}
                      completionData={completionData}
                      responsesCount={responsesCount}
                      onShare={handleShareForm}
                      onOptionsClick={handleEditForm}
                      onClosingOptions={handleClosingOptions}
                      onStatusChange={handleStatusChange}
                    />
                  </div>

                  <BatchActions
                    selectedForms={selectedForms}
                    onStatusChange={handleBatchStatusChange}
                    onDelete={handleBatchDelete}
                    onArchive={handleBatchArchive}
                  />
                </div>
              ) : (
                <div className="text-gray-500 text-lg flex   flex-col mt-[300px] ">
                  <div className="flex items-center justify-center w-full space-x-4 text-gray-400 sm:w-auto">
                    <FolderOpen />
                  </div>
                  <p className="flex items-center justify-center mt-5">
                    {t("forms.emptyForm")}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  nextLabel={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"flex justify-center space-x-2 mt-4"}
                  pageClassName={"px-3 py-1 border rounded-lg"}
                  activeClassName={"bg-blue-500 text-white"}
                  previousClassName={
                    "px-3 py-1 border rounded-lg flex items-center"
                  }
                  nextClassName={
                    "px-3 py-1 border rounded-lg flex items-center"
                  }
                />
              )}
            </div>
          </div>
        </div>
        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {/* Modals */}
        <FilterPanel
          isOpen={showFilterPanel}
          onClose={() => setShowFilterPanel(false)}
          onApplyFilters={() => { }}
        />
        {showCollaborators && (
          <FormShareDialog
            // form={filteredForms.find((f) => f.id === showCollaborators)!}
            // teamMembers={teamMembers}
            onClose={() => setShowCollaborators(null)}
          />
        )}
        <ClosingOptionsModal
          isOpen={isClosingModalOpen}
          onClose={() => setIsClosingModalOpen(false)}
          onSave={(options) => {
            setIsClosingModalOpen(false);
          }}
        />
        {/* New Workspace Modal */}
        {/*<Dialog.Root
          open={showNewWorkspaceModal}
          onOpenChange={setShowNewWorkspaceModal}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
              <Dialog.Title className="mb-4 text-lg font-almarai text-gray-900">
                {t("forms.createWorkspaceTitle")}
              </Dialog.Title>
              <Dialog.Description className="mb-4 text-sm text-gray-500">
                {t("forms.createWorkspaceDescription")}
              </Dialog.Description>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="workspace-name"
                    className="block text-sm font-almarai text-gray-700"
                  >
                    {t("forms.workspaceName")}
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    // className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    className="block w-full p-3 mt-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    placeholder="e.g. Marketing Team"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{t("forms.inviteMembersInfo")}</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                <button
                  onClick={() => setShowNewWorkspaceModal(false)}
                  className="w-full px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 sm:w-auto"
                >
                  {t("forms.cancel")}
                </button>
                <button
                  onClick={handleCreateWorkspace}
                  className="w-full px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 sm:w-auto"
                >
                  {t("forms.create")}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>*/}

        <Dialog.Root
          open={showNewWorkspaceModal}
          onOpenChange={setShowNewWorkspaceModal}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
              <Dialog.Title className="text-lg font-almarai text-gray-900 mb-4">
                {`Create New ${addModal}`}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mb-4">
                {`Create a ${addModal} to organize your forms and collaborate with
                  team members.`}
              </Dialog.Description>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="workspace-name"
                    className="block text-sm font-almarai text-gray-700"
                  >
                    {` ${addModal}  Name`}
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                    placeholder="e.g. Marketing Team"
                  />
                </div>

                {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>
                    {`You'll be able to invite team members after creating the
                      ${addModal}`}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setShowNewWorkspaceModal(false), setNewWorkspaceName("");
                  }}
                  className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkspace}
                  className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                >
                  {`Create ${addModal}  `}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root
          open={showNewCompanyModal}
          onOpenChange={setShowNewCompanyodal}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
              <Dialog.Title className="text-lg font-almarai text-gray-900 mb-4">
                Create New Company
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mb-4">
                Create a company to organize your workspaces and collaborate
                with team members.
              </Dialog.Description>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="workspace-name"
                    className="block text-sm font-almarai text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                    placeholder="e.g. Marketing Team"
                  />
                </div>

                {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>
                    You'll be able to invite team members after creating the
                    company
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setShowNewCompanyodal(false)}
                  className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCompany}
                  className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                >
                  Create company
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Workspace Settings Modal */}
        {selectedWorkspace && showWorkspaceSettings && (
          <WorkspaceSettingsModal
            isOpen={showWorkspaceSettings}
            onClose={() => setShowWorkspaceSettings(false)}
            onOpen={() => setShowWorkspaceSettings(true)}
            workspace={workspaces.find((w) => w._id === selectedWorkspace)!}
          />
        )}
      </div>
    </div>
  );
}
