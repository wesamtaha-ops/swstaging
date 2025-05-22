

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DEFAULT_ROLES, Role } from "@/types/permissions";
import { useAuth } from "@/components/providers/AuthProvider";
import Swal from "sweetalert2";
import { UPDATEROLE } from "@/src/features/users/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import toast from "react-hot-toast";

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string;
  entityType: string;
  memberUpdated: { _id: string; email: string; role: string };
  teamMembers: Array<{ _id: string; email: string; role: string }>;

}

export default function UpdateRole({
  isOpen,
  onClose,
  entityId,
  entityType,
  memberUpdated,
  teamMembers,

}: UpdateRoleModalProps) {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [previousOwner, setPreviousOwner] = useState<{
    _id: string;
    email: string;
    role: string;
  } | null>(null);
  const [newRoleForOwner, setNewRoleForOwner] = useState<string | null>(null);

  const ROLE_OPTIONS: Record<string, string[]> = {
    accountOwner: ["companyOwner", "workspaceOwner", "editor", "viewer"],
    companyOwner: ["workspaceOwner", "editor", "viewer"],
    workspaceOwner: ["editor", "viewer"],
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(
        DEFAULT_ROLES.find((role) => role.id === memberUpdated.role) || null
      );
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, memberUpdated.role]);

  const ownerRole =
    user?.role === "accountOwner" ? "companyOwner" : "workspaceOwner";

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = DEFAULT_ROLES.find((r) => r.id === e.target.value);
    setSelectedRole(role || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (memberUpdated.role === ownerRole) {
      Swal.fire({
        title: "Permission Denied",
        text: `You cannot update this member without first assigning the role to another member. Invite a new member first.`,
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          popup: "custom-swal",
        },
      }).then(() => onClose());
      return;
    }

    if (!selectedRole) {
      setErrorMessage("Veuillez sélectionner un rôle.");
      return;
    }

    if (selectedRole.id === ownerRole) {
      const existingOwner = teamMembers.find(
        (member) => member.role === ownerRole
      );

      if (existingOwner && existingOwner._id !== memberUpdated._id) {
        setPreviousOwner(existingOwner);
        setErrorMessage(
          `There is already a member with this role (${existingOwner.email}). Would you like to reassign it?`
        );
        setIsConfirmationModalOpen(true);
        return;
      }
    }

    if (memberUpdated.role === ownerRole && selectedRole.id !== ownerRole) {
      const existingOwner = teamMembers.find(
        (member) => member.role === ownerRole
      );

      // Si aucun autre utilisateur n'a le rôle workspaceOwner
      if (!existingOwner || existingOwner._id === memberUpdated._id) {
        Swal.fire({
          title: "Permission Denied",
          text: `Unable to change the role of the sole owner. Select another member first to assigning the role ${entityType}`,
          icon: "warning",
          confirmButtonText: "Okay",
          customClass: {
            popup: "custom-swal",
          },
        });
        return;
      } else {
        // Si un autre propriétaire existe, on réattribue le rôle à un autre utilisateur
        setPreviousOwner(existingOwner);
        setIsConfirmationModalOpen(true);
        return;
      }
    }

    updateRole();
  };



  const updateRole = async (confirmReassign?: string) => {
    if (!selectedRole) return;

    dispatch(
      UPDATEROLE({
        entityId:
          user?.role === "accountOwner" || user?.role === "companyOwner"
            ? entityId
            : user?.isPermission
              ? user.workspaceId.id
              : "",
        entityType,
        userId: memberUpdated._id,
        newRole: selectedRole.id,
        confirmReassign,
      })
    )
      .then(() => {
        toast.success("role updated successfuly");
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const confirmUpdate = async () => {
    if (!previousOwner || !newRoleForOwner) return;

    try {
      await dispatch(
        UPDATEROLE({
          entityId,
          entityType,
          userId: previousOwner._id,
          newRole: newRoleForOwner,
          confirmReassign: memberUpdated._id,
        })
      );

      await updateRole();

      Swal.fire({
        icon: "success",
        text: "The role of the former workspace owner has been successfully assigned to this member, and the previous owner's role has been changed successfully.",
        timer: 2000,
      });
      setIsConfirmationModalOpen(false);
    } catch (error: any) {
      setErrorMessage("server error");
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="my-3">
              <h3 className="text-lg font-almarai text-gray-900">
                Update Role
              </h3>

              <div className="mt-4">
                <label className="block text-sm font-almarai text-gray-600">
                  Email
                </label>
                <span className="p-3 block w-full border rounded-md">
                  {memberUpdated.email}
                </span>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-almarai text-gray-600">
                  Current role
                </label>
                <span className="p-3 block w-full border rounded-md">
                  {memberUpdated.role}
                </span>
              </div>

              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-almarai text-gray-600">
                    New role
                  </label>
                  <select
                    className="block w-full p-3 border rounded-md"
                    value={selectedRole ? selectedRole.id : ""}
                    onChange={handleRoleChange}
                  >
                    <option value="" disabled hidden>
                      Select a role
                    </option>
                    {DEFAULT_ROLES.filter(
                      (role) =>
                        user && ROLE_OPTIONS[user.role]?.includes(role.id)
                    ).map((role) => (
                      <option
                        key={role.id}
                        value={role.id}
                        className="text-sm text-gray-800"
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                {successMessage && (
                  <p className="text-green-600">{successMessage}</p>
                )} */}

                <div className="mt-6 flex justify-end gap-2">
                  {/* <button
                onClick={() => setIsConfirmationModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button> */}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  >
                    confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full">
            <p className="text-lg text-red-500">{errorMessage}</p>
            <div className="mt-4">
              <label className="block text-sm font-almarai text-gray-600">
                {`  New role for the current ${entityType} owner `}
              </label>
              <select
                className="block w-full p-3  my-5 border rounded-md"
                value={newRoleForOwner || ""}
                onChange={(e) => setNewRoleForOwner(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select a role
                </option>
                {DEFAULT_ROLES.filter(
                  (role) => user && ROLE_OPTIONS[user.role]?.includes(role.id)
                ).map((role) => (
                  <option
                    key={role.id}
                    value={role.id}
                    className="text-sm text-gray-800"
                  >
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mt-4 gap-2 justify-end">
              <button
                onClick={() => setIsConfirmationModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
