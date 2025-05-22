import { useEffect, useState } from "react";
import { Building2, Plus } from "lucide-react";
import AddNewCompanyDialog from "./AddNewCompanyDialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/components/providers/AuthProvider";
import moment from "moment";
import {
  DeleteCompanyById,
  GetCompanysByOwner,
  selectAddCompanyStatus,
  selectDeleteComapy,
  selectGetCompanyByOwner,
  selectUpdateComapy,
} from "@/src/features/company/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import type { Company } from "@/types";
import Swal from "sweetalert2";
import {
  deleteWorkspace,
  fetchWorkspaces,
  selectAddWorkspaceStatus,
  selectDeleteWorkspaceStatus,
  selectUpdateWorkspaceStatus,
  selectWorkspaces,
} from "@/src/features/workspace/workspaceSlice";
import { useTranslation } from "react-i18next";

import ReactPaginate from "react-paginate";

interface CompanyProps {
  setDisplayTeamMember: (value: boolean) => void;
  setIdCompanySelected: (id: string) => void;
  setNameCompany: (name: string) => void;
  setActiveTab: (tab: "companies" | "workspaces") => void;
  activeTab: "companies" | "workspaces";
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Company({
  setDisplayTeamMember,
  setIdCompanySelected,
  setNameCompany,
  setActiveTab,
  activeTab,
  currentPage,
  setTotalPages,
  setCurrentPage,
}: CompanyProps) {
  const [AddCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [selectedEntity, setselectedEntity] = useState<
    { _id: string; name: string } | undefined
  >(undefined);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const companies = useSelector(selectGetCompanyByOwner);

  const workspaces = useSelector(selectWorkspaces);

  const data = user?.role === "accountOwner" ? companies : workspaces;

  const [isLoading, setIsLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  //wj
  const createCom =
    user?.role === "accountOwner"
      ? useSelector(selectAddCompanyStatus)
      : useSelector(selectAddWorkspaceStatus);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user?._id) {
        setIsLoading(true);
        try {
          if (user.role === "accountOwner") {
            await dispatch(GetCompanysByOwner(user._id));
          } else {
            await dispatch(fetchWorkspaces(user.companyId.id));
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, user?._id, createCom, activeTab]);

  //wj

  const handleDeleteCompany = (companyId: string) => {
    Swal.fire({
      title: t("company.alertTitle"),
      text: t("company.alertText"),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("company.confirmDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        if (user?.role === "accountOwner") {
          dispatch(DeleteCompanyById(companyId));
        } else {
          dispatch(deleteWorkspace(companyId));
        }
      }
    });
  };

  const sortedCompanies = [...data].sort((a, b) => {
    return (
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
    );
  });

  const formsPerPage = 6;

  const offset = currentPage * formsPerPage;
  const currentCompany = sortedCompanies.slice(offset, offset + formsPerPage);
  const totalPages = Math.ceil(sortedCompanies.length / formsPerPage);

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 font-almarai">
        {data.length > 0 ? (
          <>
            <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg ">
              <table className="w-full text-right table-auto min-w-max">
                <thead>
                  <tr className="text-right">
                    <th className="p-4 text-sm bg-gray-100 border-b border-slate-300">
                      {activeTab === "companies" ||
                        user?.role === "accountOwner"
                        ? t("company.name")
                        : t("company.workspaceName")}
                    </th>
                    {user?.role === "companyOwner" && (
                      <th className="p-4 text-sm bg-gray-100 border-b border-slate-300">
                        {t("company.forms")}
                      </th>
                    )}

                    <th className="p-4 text-sm bg-gray-100 border-b border-slate-300">
                      {t("company.members")}
                    </th>
                    <th className="p-4 text-sm bg-gray-100 border-b border-slate-300">
                      {t("company.createdAt")}
                    </th>

                    <th className="flex flex-row justify-center p-4 text-sm bg-gray-100 border-b border-slate-300">
                      {t("company.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="font-normal text-md">
                  {currentCompany?.map((selectedType, index) =>
                    selectedType ? (
                      <tr key={index} className="bg-white hover:bg-gray-100">
                        <td className="p-3 border-b border-slate-200">
                          <p className="flex flex-row items-center   font-bold font-almarai font-almarai  font-almarai text-gray-700 text-md">
                            {selectedType.name}
                          </p>
                        </td>

                        {activeTab !== "companies" &&
                          "forms" in selectedType && (
                            <td className="p-3 border-b border-slate-200">
                              <p className="flex flex-row items-center   font-bold font-almarai font-almarai  font-almarai text-gray-600 text-md">
                                {selectedType.surveyCount ?? 0}
                              </p>
                            </td>
                          )}

                        <td className="p-3 border-b border-slate-200">
                          <p className="flex flex-row items-center text-gray-600 text-md">
                            {selectedType?.team?.length ?? 0}
                          </p>
                        </td>

                        <td className="p-3 border-b border-slate-200">
                          <p className="flex flex-row items-center text-gray-600 text-md">
                            {selectedType.createdAt
                              ? moment(selectedType.createdAt).format(
                                "DD_MM_YYYY"
                              )
                              : "-"}
                          </p>
                        </td>
                        <td className="flex flex-row justify-center p-3 space-x-10 border-b border-slate-200">
                          <div className="flex items-center space-x-4 text-md">
                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <button className="flex items-center gap-2 p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                  {t("company.manage")}
                                </button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content className="min-w-[160px] bg-white rounded-md p-1 shadow-lg border border-gray-200">
                                  <DropdownMenu.Item
                                    onClick={() => {
                                      setAddCompanyDialogOpen(true);
                                      // setselectedEntity({
                                      //   _id: company._id || "",
                                      //   name: company.name,
                                      // });

                                      setselectedEntity(
                                        selectedType
                                          ? {
                                            _id: selectedType._id || "",
                                            name: selectedType.name,
                                          }
                                          : undefined
                                      );
                                    }}
                                    className=" cursor-pointer text-sm rounded-sm px-2 py-1.5 hover:bg-gray-100"
                                  >
                                    {t("company.edit")}
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() =>
                                      handleDeleteCompany(
                                        selectedType._id ?? ""
                                      )
                                    }
                                    className=" cursor-pointer     text-sm rounded-sm px-2 py-1.5 text-red-600 hover:bg-red-50"
                                  >
                                    {t("company.delete")}
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </div>
                          <button
                            className="p-2 rounded hover:bg-gray-300"
                            onClick={() => {
                              setDisplayTeamMember(true);
                              setIdCompanySelected(selectedType._id ?? "");
                              setActiveTab("members");
                              setNameCompany(selectedType.name);
                              localStorage.setItem(
                                "companyIdSelected",
                                selectedType._id ?? ""
                              );
                              localStorage.setItem(
                                "companyName",
                                selectedType.name ?? ""
                              );
                            }}
                          >
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.50018 12.9281C7.6081 12.9281 6.07227 11.3923 6.07227 9.50018C6.07227 7.6081 7.6081 6.07227 9.50018 6.07227C11.3923 6.07227 12.9281 7.6081 12.9281 9.50018C12.9281 11.3923 11.3923 12.9281 9.50018 12.9281ZM9.50018 7.25977C8.26518 7.25977 7.25977 8.26518 7.25977 9.50018C7.25977 10.7352 8.26518 11.7406 9.50018 11.7406C10.7352 11.7406 11.7406 10.7352 11.7406 9.50018C11.7406 8.26518 10.7352 7.25977 9.50018 7.25977Z"
                                fill="#6B7280"
                              />
                              <path
                                d="M9.50047 16.641C6.5238 16.641 3.71339 14.8994 1.78172 11.8752C0.942552 10.569 0.942552 8.43937 1.78172 7.12521C3.7213 4.10104 6.53172 2.35938 9.50047 2.35938C12.4692 2.35938 15.2796 4.10104 17.2113 7.12521C18.0505 8.43146 18.0505 10.561 17.2113 11.8752C15.2796 14.8994 12.4692 16.641 9.50047 16.641ZM9.50047 3.54688C6.94339 3.54688 4.49714 5.08271 2.78714 7.76646C2.19339 8.69271 2.19339 10.3077 2.78714 11.234C4.49714 13.9177 6.94339 15.4535 9.50047 15.4535C12.0576 15.4535 14.5038 13.9177 16.2138 11.234C16.8076 10.3077 16.8076 8.69271 16.2138 7.76646C14.5038 5.08271 12.0576 3.54688 9.50047 3.54688Z"
                                fill="#6B7280"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full mt-20">
            <div className="flex flex-col items-center justify-center">
              <Building2 className="w-12 h-12 text-gray-500" />
              <h3 className="mt-2 text-sm font-almarai text-gray-900">
                {t("company.noEntities", { entity: activeTab })}
              </h3>
              <p className="max-w-lg mt-1 text-sm text-center text-gray-400">
                {t("company.createPrompt")}
              </p>
            </div>
          </div>
        )}
        {/* {!showDialog && ( */}
        <AddNewCompanyDialog
          isOpen={AddCompanyDialogOpen}
          onClose={() => setAddCompanyDialogOpen(false)}
          entity={selectedEntity}
          activeTab={
            user?.role === "accountOwner" || user?.role === "user"
              ? "companies"
              : "workspaces"
          }
        />

        {/* 
        <div className="flex justify-center">
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
            pageCount={totalPages} // Le nombre total de pages
            marginPagesDisplayed={2} // Nombre de pages extrêmes affichées
            pageRangeDisplayed={3} // Nombre de pages affichées autour de la page active
            onPageChange={handlePageClick} // Fonction qui gère le changement de page
            containerClassName={"flex justify-center space-x-2 mt-4"} // Container pour le style
            pageClassName={"px-3 py-1 border rounded-lg"} // Style des pages
            activeClassName={"bg-blue-500 text-white"} // Style pour la page active
            previousClassName={"px-3 py-1 border rounded-lg flex items-center"} // Style pour le bouton précédent
            nextClassName={"px-3 py-1 border rounded-lg flex items-center"} // Style pour le bouton suivant
          />
        </div> */}
      </div>
    </>
  );
}
