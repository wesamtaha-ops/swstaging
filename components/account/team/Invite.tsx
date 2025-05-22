import {
  RefreshCw,
  Send,
  ShieldAlert,
  TimerOff,
  Trash2,
  UserRoundPlus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  DeleteById,
  GetInvitationBySenderId,
  selectdeleteStatus,
  selectInvitError,
  selectInvitStatus,
  selectSendInvitStatus,
  selectStatus,
} from "@/src/features/invitations/invitationSlice";
import "./swal.css";
import { useAuth } from "@/components/providers/AuthProvider";
import { AppDispatch } from "@/src/app/store";
import moment from "moment";
import { useTranslation } from "react-i18next";


interface InviteProps {

  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export function Invite({ currentPage, setTotalPages, setCurrentPage }: InviteProps) {
  const { t } = useTranslation();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const invitations = useSelector(selectInvitStatus);

  const sendInvit = useSelector(selectSendInvitStatus);
  const status = useSelector(selectStatus);
  const error = useSelector(selectInvitError);
  const deleteInv = useSelector(selectdeleteStatus);
  const [selectedCompany, setSelectedCompany] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [invitationId, setInvitationId] = useState<string | null>(null);

  const [resent, setResent] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const { user } = useAuth();

  const sendInvitSuccess = sendInvit === "success";
  const deleteInvSuccess = deleteInv === "success";

  useEffect(() => {
    if (user?._id) {
      dispatch(GetInvitationBySenderId(user?._id));
    }
  }, [user, dispatch, deleteInvSuccess, sendInvitSuccess]);

  const handleResend = (invitation: any) => {
    setInvitationId(invitation._id);
  };
  // Filtrer les invitations en fonction du statut sélectionné
  const filteredInvitations = invitations.filter((inv) =>
    filterStatus === "all" ? true : inv.status === filterStatus
  );

  const statusInvit = invitations?.filter((a) => a.status === "expired");
  const pendingInvit = invitations?.filter((a) => a.status === "Pending");
  const acceptedInvit = invitations?.filter((a) => a.status === "accepted");
  const isAccountOwner = user?.role === "accountOwner";
  const isCompanyOwner = user?.role === "companyOwner";


  //  const offset = currentPage * formsPerPage;
  //  const currentForms = filteredInvitations.slice(offset, offset + formsPerPage);
  //  const totalPages = Math.ceil(filteredInvitations.length / formsPerPage);

  //  const handlePageClick = ({ selected }: { selected: number }) => {
  //    setCurrentPage(selected);
  //  };

  // const formsPerPage = 5;
  // const [currentPage, setCurrentPage] = useState(0);

  // const offset = currentPage * formsPerPage;
  // const currentForms = invitations.slice(offset, offset + formsPerPage);
  // const totalPages = Math.ceil(invitations.length / formsPerPage);

  // const handlePageClick = (event: { selected: number }) => {
  //   setCurrentPage(event.selected);
  // };

  const formsPerPage = 6;

  const offset = currentPage * formsPerPage;
  const currentForms = filteredInvitations.slice(offset, offset + formsPerPage);
  const totalPages = Math.ceil(filteredInvitations.length / formsPerPage);

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (!user) {
    return <p>{t("invite.loading")}</p>;
  }
  return (
    <>
      <div className="font-almarai py-6  ">
        {status === "loading" && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        <div className="flex md:flex-row  justify-between    items-center ">
          <div className="flex gap-5">
            <div className="flex flex-row gap-1 items-center justify-center  border border-blue-400 px-2 py-2  rounded-lg">
              <p className="font-almarai text-md text-gray-500 ">{t("invite.pending")}</p>
              <p className=" text-lg   font-bold font-almarai font-almarai  font-almarai  text-center">
                {pendingInvit.length}
              </p>
            </div>

            <div className="flex flex-row gap-1 items-center justify-center  border border-green-400 px-2 py-2  rounded-lg">
              <p className="font-almarai text-md text-gray-500 ">{t("invite.accepted")}</p>
              <p className=" text-lg   font-bold font-almarai font-almarai  font-almarai  text-center">
                {acceptedInvit.length}
              </p>
            </div>

            <div className="flex flex-row gap-1 items-center justify-center   border border-red-400 px-2 py-2  rounded-lg">
              <p className="font-almarai text-md text-gray-500 ">{t("invite.expired")}</p>
              <p className=" text-lg   font-bold font-almarai font-almarai  font-almarai  text-center">
                {statusInvit.length}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="statusFilter"
              className="mr-2 font-almarai text-gray-700"
            >
              {t("invite.filterByStatus")}
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">{t("invite.all")}</option>
              <option value="Pending">{t("invite.pending")}</option>
              <option value="accepted">{t("invite.accepted")}</option>
              <option value="expired">{t("invite.expired")}</option>
            </select>
          </div>
        </div>

        {currentForms.length > 0 ? (
          <>
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg my-8">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr className="text-left">
                    {isAccountOwner && (
                      <th className="p-4 text-sm border-b border-slate-300 bg-gray-100">
                        {t("invite.company")}
                      </th>
                    )}
                    {isCompanyOwner && (
                      <th className="p-4 text-sm border-b border-slate-300 bg-gray-100">
                        {t("invite.workspace")}
                      </th>
                    )}
                    <th className="p-4 text-sm border-b border-slate-300 bg-gray-100">
                      {t("invite.receiver")}
                    </th>
                    <th className="p-4 text-sm  border-b border-slate-300 bg-gray-100">
                      {t("invite.access")}
                    </th>
                    <th className="p-4 text-sm  border-b border-slate-300 bg-gray-100">
                      {t("invite.sendedAt")}
                    </th>

                    <th className="p-4 text-sm  border-b border-slate-300 bg-gray-100">
                      {t("invite.status")}
                    </th>
                    {statusInvit.length > 0 && (
                      <th className="p-4 text-sm  border-b border-slate-300 bg-gray-100">
                        {t("invite.actions")}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-md font-normal">
                  {currentForms.map((invitation) => (
                    <tr
                      key={invitation._id}
                      className="bg-white hover:bg-gray-100"
                    >
                      {isAccountOwner && (
                        <td className="p-4 border-b">
                          {invitation.company?.name}
                        </td>
                      )}
                      {isCompanyOwner && (
                        <td className="p-4 border-b">
                          {invitation.workspace?.name}
                        </td>
                      )}

                      <td className="p-4 border-b border-slate-200">
                        <p className="text-md flex flex-row items-center text-gray-700">
                          {invitation.email}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="text-md flex flex-row items-center text-gray-600">
                          {invitation.role}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="text-md flex flex-row items-center text-gray-600">
                          {moment(invitation.createdAt).format("DD/MM/YYYY")}
                        </p>
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        <p className="text-md flex flex-row text-gray-600">
                          {invitation.status === "Pending" ? (
                            <>
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.3s]" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]" />
                              </div>
                            </>
                          ) : invitation.status === "accepted" ? (
                            <span className=" underline underline-offset-2    hover:underline hover:underline-offset-4 inline-flex items-center px-4 py-2  hover:text-green-900 relative bg-green-400  border text-left px-4 py-2 text-white text-base font-almarai    rounded-lg">
                              {t("invite.accepted")}
                            </span>
                          ) : (
                            <>
                              <TimerOff className="h-5 w-5 text-red-500 mr-2" />

                              <button>{t("invite.expired")}</button>
                            </>
                          )}
                        </p>
                      </td>
                      {statusInvit.length > 0 && (
                        <td className="p-4 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            {invitation.status === "expired" && (
                              <button
                                onClick={() => {
                                  setResent(true);
                                  handleResend(invitation);
                                  setSelectedCompany({
                                    name:
                                      invitation.company?.name ??
                                      invitation.workspace?.name ??
                                      "Unknown",
                                    id:
                                      invitation.company?._id ??
                                      invitation.workspace?._id ??
                                      "Unknown",
                                  });

                                  setIsInviteDialogOpen(true);
                                  setSelectedEmail(invitation.email || "");
                                }}
                                className="inline-flex items-center px-4 py-2 bg-gray-200 text-blue-500 transition ease-in-out delay-75 hover:bg-blue-500 hover:text-white text-sm font-almarai rounded-md hover:-translate-y-1 hover:scale-110"
                              >
                                <RefreshCw className="h-5 w-5 mr-2" />
                                {t("invite.resend")}
                              </button>
                            )}

                            {invitation.status === "expired" && (
                              <button
                                onClick={() =>
                                  dispatch(DeleteById(invitation._id ?? ""))
                                }
                                className="inline-flex items-center px-4 py-2 bg-gray-200 text-red-500 transition ease-in-out delay-75 hover:bg-red-500 hover:text-white text-sm font-almarai rounded-md hover:-translate-y-1 hover:scale-110"
                              >
                                {t("invite.remove")}
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-center items-center mt-20">
            <div className="flex justify-center items-center flex-col ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-10 w-10 text-gray-500"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-almarai text-gray-900">
                {t("invite.noInvitations")}
              </h3>
              <p className="mt-1 text-sm text-gray-400 max-w-lg text-center">
                {t("invite.invitePrompt")}
              </p>
            </div>
          </div>
        )}
        {/* <InviteMemberDialog
          invitationId={invitationId || undefined}
          isOpen={isInviteDialogOpen}
          resent={resent}
          // type={user?.role === "accountOwner" ? "companies" : "workspaces"}
          type={user?.role === "accountOwner" ? "companie" : "workspace"}
          nameCompany={selectedCompany?.name || user.companyId?.name || ""}
          companyId={selectedCompany?.id || user.companyId?.id || ""}
          onClose={() => setIsInviteDialogOpen(false)}
          emailProp={selectedEmail || undefined}
        /> */}
      </div>
    </>
  );
}
