import { useAuth } from "@/components/providers/AuthProvider";
import { AppDispatch } from "@/src/app/store";
import { Plus, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddNewCompanyDialog from "./AddNewCompanyDialog";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { useTranslation } from "react-i18next";
interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const [showDialog, setShowDialog] = useState(false);
  const { user, isRolePermission } = useAuth();
  const [AddCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [selectedEntity, setselectedEntity] = useState<
    { _id: string; name: string } | undefined
  >(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const companyId = localStorage.getItem("companyIdSelected") ?? "";
  const companyName = localStorage.getItem("companyName") ?? "";
  const { t } = useTranslation();

  return (
    <div>
      <nav
        className="flex space-x-3 flex-row  justify-between  items-center "
        aria-label="Tabs"
      >
        <span className="flex flex-row">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`w-auto flex text-md items-center p-4 font-almarai 

              ${activeTab === tab.id
                  ? "  p-4 rounded-md border-transparent bg-blue-50 text-blue-500 !  font-bold font-almarai font-almarai  font-almarai"
                  : "rounded-md space-x-5 hover:text-blue-500 text-gray-500   hover:bg-blue-50 hover:  font-bold font-almarai font-almarai  font-almarai"
                }
            `}
            >
              {tab.label}
            </button>
          ))}
        </span>



        {activeTab === "members" && isRolePermission("btn_invite_member") && (
          <button
            style={{ background: "#3068FF", fontSize: "15px" }}
            onClick={() => setIsInviteDialogOpen(true)}
            className="inline-flex items-center p-4 border border-transparent rounded-xl shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <UserRoundPlus className="h-5 w-5 mr-2" />
            {t("tabs.inviteMember")}
          </button>
        )}
      </nav>
      <InviteMemberDialog
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
      />
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
    </div>
  );
}
