
import { useAuth } from "@/components/providers/AuthProvider";
import { AppDispatch } from "@/src/app/store";
import {
  ReSendInvit,
  resetInvitationState,
  selectInvitError,
  selectSendInvitStatus,
  SendInvit,
} from "@/src/features/invitations/invitationSlice";
import { UpdatePermission } from "@/src/features/users/userSlice";
import { DEFAULT_ROLES, Role } from "@/types/permissions";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface InviteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "companie" | "workspace";
  companyId: string;
  nameCompany: string;
  emailProp?: string;
  resent?: boolean;
  invitationId?: string;
}

export function InviteMemberDialog({
  isOpen,
  onClose,
  type,
  companyId,
  nameCompany,
  emailProp = "",
  resent,
  invitationId,
}: InviteMemberDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const InvitError = useSelector(selectInvitError);
  const sendInvitt = useSelector(selectSendInvitStatus);

  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(emailProp ?? "");

  useEffect(() => {
    setEmail(emailProp);
  }, [emailProp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let invitData = {
      email,
      role: selectedRole?.id ?? "",
      sender: user && user._id,
      ...(type === "companie"
        ? { company: { _id: companyId } }
        : {
          workspace: { _id: user?.isPermission ? user?.workspaceId.id : companyId },
        }),
    };


    let ResendData = {
      email,
      role: selectedRole?.id ?? "",
      sender: user && user._id,
      ...(type === "companie"
        ? { company: { _id: companyId } }
        : { workspace: { _id: companyId } }),
      invitationId: invitationId,
    };

    if (resent) {
      dispatch(ReSendInvit(ResendData));
    } else {
      dispatch(SendInvit(invitData));
    }
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (sendInvitt === "success") {
      setEmail("");
      setSelectedRole(null);
      setIsSubmitting(false);
      onClose();

      dispatch(resetInvitationState());
    } else if (sendInvitt === "failure" && InvitError) {
      setSelectedRole(null);
      setIsSubmitting(false);
      dispatch(resetInvitationState());
    }
  }, [sendInvitt, InvitError, onClose, dispatch]);

  const ROLE_OPTIONS: Record<string, string[]> = {
    accountOwner: ["companyOwner"],
    companyOwner: ["workspaceOwner", "editor", "viewer"],
    workspaceOwner: ["editor", "viewer"],
  };



  if (!isOpen) return null;

  return (
    <div className="font-almarai  fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start my-3">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full space-y-5">
              <div className="flex flex-row items-center space-x-2">
                <h3 className="text-md leading-6 font-almarai text-gray-900">
                  Manage {type}
                </h3>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 border-blue-600">
                  <p className="text-sm">
                    {user?.isPermission ? user.workspaceId.name : nameCompany}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-almarai text-gray-600"
                >
                  {/* {context.charAt(0).toUpperCase() + context.slice(1)} */}
                  Name
                </label>
                <span className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm">
                  {user?.isPermission ? user.workspaceId.name : nameCompany}
                </span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-almarai text-gray-600"
                  >
                    Invite new members to the {type}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-almarai text-gray-600"
                  >
                    Select new member role
                  </label>

                  <select
                    className="mt-3 block w-full pl-3 pr-10 p-3 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedRole ? selectedRole.id : ""}
                    required
                    onChange={(e) => {
                      const role = DEFAULT_ROLES.find(
                        (r) => r.id === e.target.value
                      );
                      setSelectedRole(role || null);
                    }}
                  >
                    <option value="" disabled hidden>
                      Invite as
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

                <div className="!mt-8 sm:mt-4 flex flex-col sm:flex-row-reverse gap-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-almarai text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    {sendInvitt === "loading"
                      ? "Sending..."
                      : "Send Invitation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
