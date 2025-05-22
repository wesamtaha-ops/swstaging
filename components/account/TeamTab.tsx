import { TeamMemberList } from "./team/TeamMemberList";
import { RoleManagement } from "./team/RoleManagement";

import { Company } from "./team/Company";
import { Tabs } from "./team/Tabs";
import { useTeam } from "@/hooks/useTeam";
import { useAuth } from "../providers/AuthProvider";
import { useState, useEffect } from "react";
import { Invite } from "./team/Invite";
import { InviteMemberDialog } from "./team/InviteMemberDialog";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

type TabType = "members" | "roles" | "workspaces" | "companies" | "invites";
interface TeamTabProps {
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function TeamTab({
  currentPage,
  setTotalPages,
  setCurrentPage,
}: TeamTabProps) {
  const { t } = useTranslation();
  const { user, isRolePermission } = useAuth();
  const userRole = user?.role;
  const defaultTab: TabType =
    userRole === "companyOwner" ? "workspaces" : "companies";
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [displayTeamMember, setDisplayTeamMember] = useState(false);
  const [idCompanySelected, setIdCompanySelected] = useState("");
  const [nameCompany, setNameCompany] = useState("");

  const { companies, roles, loading, error } = useTeam();

  useEffect(() => {
    if (
      userRole === "workspaceOwner" ||
      userRole === "editor" ||
      userRole === "viewer"
    ) {
      setActiveTab("members");
    } else {
      setActiveTab(userRole === "companyOwner" ? "workspaces" : "companies");
    }
  }, [userRole]);

  const tabs = ["workspaceOwner", "editor", "viewer"].includes(userRole ?? "")
    ? user?.isPermission
      ? [
        { id: "members", label: t("team.members") },
        { id: "roles", label: t("team.roles") },
        { id: "invites", label: t("team.invites") },
      ]
      : [
        { id: "members", label: t("team.members") },
        { id: "roles", label: t("team.roles") },
      ]
    : [
      userRole === "accountOwner" || userRole === "user"
        ? { id: "companies", label: t("team.companies") }
        : { id: "workspaces", label: t("team.workspaces") },

      ...(displayTeamMember && activeTab === "members"
        ? [{ id: "members", label: t("team.members") }]
        : []),

      { id: "roles", label: t("team.roles") },
      { id: "invites", label: t("team.invites") },
    ];

  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case "companies":
  //       return (
  //         <Company
  //           setDisplayTeamMember={setDisplayTeamMember}
  //           setIdCompanySelected={setIdCompanySelected}
  //           setActiveTab={setActiveTab}
  //           setNameCompany={setNameCompany}
  //           // type="companies"
  //         />
  //       );

  //     case "workspaces":
  //       return (
  //         <Company
  //           setDisplayTeamMember={setDisplayTeamMember}
  //           setIdCompanySelected={setIdCompanySelected}
  //           setActiveTab={setActiveTab}
  //           setNameCompany={setNameCompany}
  //           type="workspaces"
  //         />
  //       );

  //     case "members":
  //       return (
  //         displayTeamMember && (
  //           <TeamMemberList
  //             key={idCompanySelected}
  //             companyId={idCompanySelected}
  //             companyName={nameCompany}
  //             setDisplayTeamMember={setDisplayTeamMember}
  //             setActiveTab={setActiveTab}
  //           />
  //         )
  //       );

  //     case "roles":
  //       return <RoleManagement roles={roles} />;
  //     case "invites":
  //       return <Invite />;
  //     default:
  //       return null;
  //   }
  // };
  const renderTabContent = () => {
    if (
      (userRole === "workspaceOwner" && !user?.isPermission) ||
      userRole === "editor" ||
      userRole === "viewer"
    ) {
      switch (activeTab) {
        case "members":
          return (
            <TeamMemberList
              context="workspaces"
              key={idCompanySelected}
              companyId={idCompanySelected}
              companyName={nameCompany}
              setDisplayTeamMember={setDisplayTeamMember}
              setActiveTab={setActiveTab}
              currentPage={currentPage}
              setTotalPages={setTotalPages}
              setCurrentPage={setCurrentPage}
            />
          );
        case "roles":
          return <RoleManagement />;
        default:
          return null;
      }
    }

    switch (activeTab) {
      case "companies":
        return userRole === "accountOwner" || userRole === "user" ? (
          <Company
            setDisplayTeamMember={setDisplayTeamMember}
            setIdCompanySelected={setIdCompanySelected}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            setNameCompany={setNameCompany}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        ) : null;

      case "workspaces":
        return userRole !== "user" ? (
          <Company
            setDisplayTeamMember={setDisplayTeamMember}
            setIdCompanySelected={setIdCompanySelected}
            setActiveTab={setActiveTab}
            setNameCompany={setNameCompany}
            activeTab={activeTab}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        ) : null;

      case "members":
        return displayTeamMember || userRole === "workspaceOwner" ? (
          <TeamMemberList
            context={userRole === "workspaceOwner" ? "workspaces" : "companies"}
            key={idCompanySelected}
            companyId={idCompanySelected}
            companyName={nameCompany}
            setDisplayTeamMember={setDisplayTeamMember}
            setActiveTab={setActiveTab}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        ) : null;

      case "roles":
        return <RoleManagement />;
      case "invites":
        return isRolePermission("btn_invite_member") ? (
          <Invite
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        ) : null;

      default:
        return null;
    }
  };

  const companyName = localStorage.getItem("companyName") ?? "";

  const EntityType = activeTab === "companies" ? "Company" : "Workspace";
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-row items-center mb-4">
        <div className="flex flex-row items-center mb-4">
          {user?.role === "companyOwner" || user?.role === "accountOwner" ? (
            activeTab === "members" ? (
              <>
                <ChevronLeft className="w-12 h-12   font-bold font-almarai font-almarai  font-almarai cursor-pointer" />
                <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai">{`${companyName}'s ${EntityType}`}</h1>
              </>
            ) : (
              <h1 className="mt-3 text-3xl   font-bold font-almarai font-almarai  font-almarai">{t("team.title")}</h1>
            )
          ) : null}

          {user?.workspaceId?.name && (
            <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai ">
              {user?.workspaceId?.name}'s {EntityType}
            </h1>
          )}
        </div>
        {user?.workspaceId?.name && (
          <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai ">
            {user?.workspaceId?.name}'s {EntityType}
          </h1>
        )}
      </div>

      {/* </h1> */}
      {/* 
      {activeTab === "members" && <p> {companyName}</p>} */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as TabType)}
      />

      <div>{renderTabContent()}</div>
    </>
  );
}
