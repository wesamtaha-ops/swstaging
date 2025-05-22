import React, { useEffect, useState } from "react";
import { Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/components/providers/AuthProvider";
import Swal from "sweetalert2";
import { AppDispatch } from "@/src/app/store";
import { useTranslation } from "react-i18next";

// Import des actions Redux
import {
  CreateCompany,
  UpdateCompanyById,
  selectAddCompanyStatus,
  selectUpdateComapy,
  selectCompanyError,
} from "@/src/features/company/companySlice";

import {
  createWorkspace,
  selectAddWorkspaceStatus,
  selectUpdateWorkspaceStatus,
  selectWorkspaceError,
  updateWorkspace,
} from "@/src/features/workspace/workspaceSlice";

export default function AddNewEntityDialog({
  isOpen,
  onClose,
  entity,
  activeTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  entity?: { _id: string; name: string };
  activeTab: "companies" | "workspaces";
}) {

  const { t } = useTranslation();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const addStatus =
    user?.role === "accountOwner" || user?.role === "user"
      ? useSelector(selectAddCompanyStatus)
      : useSelector(selectAddWorkspaceStatus);
  const updateStatus =
    user?.role === "accountOwner" || user?.role === "user"
      ? useSelector(selectUpdateComapy)
      : useSelector(selectUpdateWorkspaceStatus);
  const error =
    user?.role === "accountOwner" || user?.role === "user"
      ? useSelector(selectCompanyError)
      : useSelector(selectWorkspaceError);

  const [name, setName] = useState(entity?.name || "");



  useEffect(() => {
    if (entity) {
      setName(entity.name || "");
    } else {
      setName("");
    }
  }, [entity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return;

    try {
      let response;

      if (entity?._id) {

        response =
          (user?.role === "accountOwner" || user?.role === "user")
            ? await dispatch(
              UpdateCompanyById({ id: entity._id, name })
            ).unwrap()
            : await dispatch(
              updateWorkspace({ id: entity._id, name })
            ).unwrap();
      } else {
        response =
          user?.role === "accountOwner" || user?.role === "user"
            ? await dispatch(CreateCompany({ name, Owner: user._id })).unwrap()
            : await dispatch(
              createWorkspace({ name, companyOwner: user.companyId.id })
            ).unwrap();
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    if (addStatus === "success" || updateStatus === "success") {
      setName("");
      onClose();
    }
  }, [addStatus, updateStatus]);

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (addStatus === "failure") {
      setFormError(error);
    } else {
      setFormError(null);
    }
  }, [addStatus]);

  if (!isOpen) return null;
  const labelKey = user?.role === "accountOwner" || user?.role === "user" ? "company" : "workspace";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => {
                onClose(), setFormError(null);
              }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <h3 className="text-lg font-almarai text-gray-900">
            {entity
              ? t("entity.edit", { type: t(`entity.${labelKey}`) })
              : t("entity.add", { type: t(`entity.${labelKey}`) })}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5 mt-5">
            <div>
              <label
                htmlFor="entity-name"
                className="block text-sm font-almarai text-gray-600"
              >
                {t("entity.nameLabel", { type: t(`entity.${labelKey}`) })}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                placeholder={t("entity.namePlaceholder", { type: t(`entity.${labelKey}`) })}
                required
              />

              {formError && (
                <p className="text-red-600 mt-1 text-sm">{formError}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>
                {t("entity.inviteNote", { type: t(`entity.${labelKey}`) })}

              </span>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                onClick={onClose}
              >
                {t("entity.cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                {addStatus === "loading" || updateStatus === "loading"
                  ? t("entity.processing")
                  : entity
                    ? t("entity.update", { type: t(`entity.${labelKey}`) })
                    : t("entity.add", { type: t(`entity.${labelKey}`) })}
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}
