import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./swal.css";
import "../../../styles/globals.css";
import axios from "@/src/config/axios";
import { AppDispatch } from "@/src/app/store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  GetTeamByIdComapny,
  selectGetTeamByIdComapny,
  UpdateCompanyById,
} from "@/src/features/company/companySlice";
import {
  GetTeamByIdworkspace,
  selectWorkspaceError,
  selectWorkspaceTeam,
} from "@/src/features/workspace/workspaceSlice";
import {
  DeleteById,
  selectdeleteUserStatus,
  selectSuccessStatus,
  UpdatePermission,
} from "@/src/features/users/userSlice";
import {
  ChevronLeft,
  ClipboardPenLine,
  UserRoundMinus,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import UpdateRole from "./UpdateRole";

import { useAuth } from "@/components/providers/AuthProvider";
import LoaderL from "./LoaderL";
import ReactPaginate from "react-paginate";

interface TeamMemberListProps {
  context: "companies" | "workspaces";
  companyId: string;
  companyName: string;
  setDisplayTeamMember: (value: boolean) => void;
  setActiveTab: (tab: any) => void;
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function TeamMemberList({
  context,
  companyId,
  companyName,
  setDisplayTeamMember,
  setActiveTab,
  currentPage,
  setTotalPages,
  setCurrentPage,
}: TeamMemberListProps) {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isUpdateRoleOpen, setIsUpdateRoleOpen] = useState(false);
  const [isMember, setIsMember] = useState<{
    _id: string;
    email: string;
    role: string;
  }>({ _id: "", email: "", role: "" });

  const dispatch = useDispatch<AppDispatch>();
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case `${ownerRole}`:
        return "bg-red-100 text-red-800 py-2 !px-0 border border-red-900 rounded-lg w-auto text-center";
    }
  };

  const deleteUserStatus = useSelector(selectdeleteUserStatus);
  const companies = useSelector(selectGetTeamByIdComapny);
  const workspaces = useSelector(selectWorkspaceTeam);
  const { user, isRolePermission } = useAuth();
  const WorkspaceId = user?.workspaceId?.id || "";
  const teamCompany = companies[companyId] || [];
  const teamWorkspace = workspaces[companyId] || [];
  const Team3RolesMin = workspaces[WorkspaceId] || [];

  const team =
    user?.role === "accountOwner"
      ? teamCompany
      : user?.role === "companyOwner"
        ? teamWorkspace
        : Team3RolesMin;
  useEffect(() => {
    setCurrentPage(0);
  }, [team]);
  const activTabb = user?.role === "accountOwner" ? "companies" : "workspaces";
  const successUpdateRole = useSelector(selectSuccessStatus);

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (user?.role === "accountOwner") {
        response = await dispatch(GetTeamByIdComapny(companyId)).unwrap();
      } else if (user?.role === "companyOwner") {
        response = await dispatch(GetTeamByIdworkspace(companyId)).unwrap();
      } else {
        response = await dispatch(GetTeamByIdworkspace(WorkspaceId)).unwrap();
      }

      setIsDataFetched(true);
    };

    fetchData();
  }, [
    companyId,
    dispatch,
    context,
    successUpdateRole,
    deleteUserStatus,
    WorkspaceId,
  ]);

  const ownerRole =
    user?.role === "accountOwner" ? "companyOwner" : "workspaceOwner";
  const EntityType = user?.role === "accountOwner" ? "Company" : "Workspace";

  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

  const handleDeleteMember = (member: any) => {
    const isOnlyAccountOwner = team.length === 1 && member.role === ownerRole;
    const isCompanyOwner = member.role === ownerRole && team.length > 1;
    const isRegularMember = member.role !== ownerRole;

    if (isOnlyAccountOwner) {
      Swal.fire({
        title: "Permission Denied",
        text: `You cannot delete this member without first assigning the ${ownerRole} role to another member. Invite a new member first.`,
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          popup: "custom-swal",
        },
      });
      setIsTransferDialogOpen(false);
      return;
    }

    if (isCompanyOwner) {
      setIsTransferDialogOpen(false);
      Swal.fire({
        title: `Transfer ${EntityType}Owner Role?`,
        text: "You must transfer the role before deleting this member.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Transfer",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setAdminToDelete(member._id);
          setTimeout(() => setIsTransferDialogOpen(true), 100);
        } else {
          setIsTransferDialogOpen(false);
        }
      });
      return;
    }

    if (isRegularMember) {
      setIsTransferDialogOpen(false);
      Swal.fire({
        title: "Are you sure?",
        text: "This action is irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        customClass: {
          popup: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setIsTransferDialogOpen(false);
          dispatch(DeleteById(member._id));
        }
      });
    }
  };

  const handleTransferAdmin = async () => {
    if (!selectedAdminId || !adminToDelete) return;
    try {
      await axios.put(`/user/update-role`, {
        userId: selectedAdminId,
        role: ownerRole,
      });
      await dispatch(DeleteById(adminToDelete));
      setIsTransferDialogOpen(false);
      setAdminToDelete(null);
      setSelectedAdminId(null);
      Swal.fire({
        icon: "success",
        title: "Role transferred and user deleted.",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire("Error", "Role transfer failed.", "error");
    }
  };
  const handleUpdatePermission = (member: any) => {
    if (user) {
      dispatch(UpdatePermission(member._id));
    }
  };

  const formsPerPage = 6;

  const offset = currentPage * formsPerPage;
  const currentList = team.slice(offset, offset + formsPerPage);
  const totalPages = Math.ceil(team.length / formsPerPage);

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages, currentList]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  const fullList = React.useMemo(() => {
    if (!user) return currentList;

    const alreadyIncluded = currentList.some(
      (member) => member.email === user.email
    );
    if (!alreadyIncluded) {
      return [...currentList, user];
    }
    return currentList;
  }, [currentList, user]);
  return (
    <>
      <div className="font-almarai h-full w-full">
        {!isDataFetched ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : fullList.length > 0 ? (
          <>
            <div className="overflow-hidden rounded-lg border border-gray-300   my-8 ">
              <table className="w-full text-left table-auto min-w-max  ">
                <thead>
                  <tr className="text-left ">
                    <th className="p-4 text-md border-b border-slate-300 bg-gray-100">
                      Name
                    </th>
                    <th className="p-4 text-md border-b border-slate-300 bg-gray-100">
                      Email
                    </th>
                    <th className="p-4 text-md border-b border-slate-300 bg-gray-100">
                      Access
                    </th>

                    <th className="p-4 text-sm border-b border-slate-300  bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody className="  text-md font-normal font-almarai">
                  {fullList?.map((member, index) => (
                    <tr key={index} className=" bg-white hover:bg-gray-100">
                      <td className="p-4 border-b border-slate-200">
                        <p className=" text-md   font-bold font-almarai font-almarai  font-almarai flex flex-row items-center text-gray-700 font-almarai">
                          {member?.username}
                          {member.email === user?.email && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600 font-almarai">
                              Me
                            </span>
                          )}
                          {member.isPermission && (
                            <label>
                              <input
                                type="checkbox"
                                defaultChecked
                                className="peer hidden"
                              />
                              <div className="group flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-amber-500 fill-none ml-2 px-3 font-extrabold text-amber-500 transition-all peer-checked:fill-amber-500 peer-checked:hover:text-white active:scale-90">
                                <div className="z-10 text-sm transition group-hover:translate-x-4">
                                  W.Owner
                                </div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6 transition duration-500 group-hover:scale-[1500%] group-hover:-translate-x-10"
                                >
                                  <path
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            </label>
                          )}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className=" text-md   flex flex-row items-center text-gray-500  ">
                          {member?.email}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        {/* <p className={`block text-md  ${getRoleBadgeColor( member.role )}`}   > */}
                        <p className=" flex flex-row items-center text-gray-500 ">
                          {member?.role}
                        </p>

                        {user?.role === "companyOwner" &&
                          // member.isPermission &&
                          member.role === "workspaceOwner" && (
                            <button
                              onClick={() => handleUpdatePermission(member)}
                              className={`flex-shrink-0 text-sm text-white p-1 flex items-center justify-center rounded-lg ${member.isPermission
                                ? "bg-gradient-to-br from-red-100 to-red-600"
                                : "bg-gradient-to-br from-blue-100 to-blue-600"
                                }`}
                            >
                              {member.isPermission
                                ? "Revoke Permission"
                                : "Grant Permission"}
                            </button>
                          )}
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        {member.email !== user?.email &&
                          ((isRolePermission("btn_manage") &&
                            ["editor", "viewer"].includes(member?.role)) ||
                            ["companyOwner", "accountOwner"].includes(
                              user?.role ?? ""
                            )) && (
                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <button className="flex items-center text-gray-500 gap-2 p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                  Manage
                                </button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Portal>
                                <DropdownMenu.Content className="min-w-[160px] bg-white rounded-md p-1 shadow-lg border border-gray-200">
                                  <DropdownMenu.Item
                                    onClick={() => {
                                      setIsUpdateRoleOpen(true),
                                        setIsMember(member);
                                    }}
                                    className=" cursor-pointer text-sm rounded-sm px-2 py-1.5 hover:bg-gray-100"
                                  >
                                    Edit Role
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() => {
                                      setIsTransferDialogOpen(true);
                                      handleDeleteMember(member);
                                    }}
                                    className=" cursor-pointer     text-sm rounded-sm px-2 py-1.5 text-red-600 hover:bg-red-50"
                                  >
                                    Delete member
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <label className="text-gray-400 cursor-pointer w-full ">
            <div className=" flex flex-col items-center justify-center  w-full h-full mt-8  p-10  transition-all duration-300 ease-in-out  peer-checked:border-indigo-500 peer-checked:from-indigo-900/50 peer-checked:to-gray-900 peer-checked:translate-y-[-0.5rem]">
              <LoaderL />
              <p className="text-md text-red-500 mt-5  transition-opacity duration-300">
                {EntityType} not yet have a team members
              </p>
              <div className="h-1 w-0 bg-indigo-500 rounded-full mx-auto group-hover:w-[500px] peer-checked:w-full transition-all duration-300"></div>
            </div>
          </label>
        )}
        {/* <InviteMemberDialog
          isOpen={isInviteDialogOpen}
          type={
            user?.isPermission
              ? "workspace"
              : user?.role === "accountOwner"
              ? "companie"
              : "workspace"
          }
          nameCompany={companyName}
          companyId={companyId}
          onClose={() => setIsInviteDialogOpen(false)}
        /> */}
        <UpdateRole
          isOpen={isUpdateRoleOpen}
          onClose={() => setIsUpdateRoleOpen(false)}
          memberUpdated={isMember}
          teamMembers={team}
          entityId={companyId}
          entityType={EntityType}
        />
        {isTransferDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white md:w-[500px] p-6 rounded-lg shadow-lg">
              <h2 className="text-md font-almarai mb-4">
                Select a New {EntityType} Owner
              </h2>
              <select
                className="my-5 block w-full pl-3 p-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => setSelectedAdminId(e.target.value)}
              >
                <option value="">
                  Select user who will receive the {EntityType}Owner role
                </option>
                {currentList
                  .filter((m) => m?.role !== ownerRole)
                  .map((m) => (
                    <option key={m?._id} value={m?._id}>
                      {m?.username} - {m?.role}
                    </option>
                  ))}
              </select>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsTransferDialogOpen(false)}
                >
                  Annuler
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                  onClick={handleTransferAdmin}
                  disabled={!selectedAdminId}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
