import React, { useState } from "react";
import { MoreVertical, FileStack, XCircle } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

interface FormOptionsDropdownProps {
  idForm: string;
  onCloseForm?: () => void;
}

export function FormOptionsDropdown({
  idForm,
  onCloseForm,
}: FormOptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isRolePermission } = useAuth();
  const { t } = useTranslation();


  const handleCloseForm = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://backend.votly.app/close_survey/${idForm}/close`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Form closed successfully:", data);
        setIsOpen(false);
        if (onCloseForm) onCloseForm(); // 🔁 synchroniser avec AccessPanel
      } else {
        console.error("❌ Error closing form:", data.message);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="p-2 text-gray-400 transition duration-200 rounded-full hover:text-gray-500 hover:bg-gray-100"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[150px] bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
            sideOffset={5}
            align="end"
          >
            <DropdownMenu.Item className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600">
              <FileStack className="w-4 h-4 mr-2" />
              <Link
                to={`/update_survey/${idForm}`}
                className="block w-full py-2 text-left"
              >
                {t("formOptions.edit")}
              </Link>
            </DropdownMenu.Item>

            {isRolePermission("btn_syrvey") && (
              <DropdownMenu.Item
                className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-red-50 hover:text-red-600"
                onClick={() => setIsOpen(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                {t("formOptions.closeForm")}
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[420px] p-6 bg-white rounded-xl shadow-xl transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center">
              <XCircle
                size={48}
                className="p-2 text-red-600 border-red-600 rounded-full"
              />
            </div>
            <Dialog.Title className="text-xl   font-bold font-almarai font-almarai  font-almarai text-center text-gray-900">
              {t("formOptions.confirmTitle")}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-center text-gray-600">
              {t("formOptions.confirmMessage")}
              <br />
              <span className="text-sm text-gray-500">
                {t("formOptions.confirmNote")}
              </span>
            </Dialog.Description>

            <div className="flex justify-center mt-3 space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                {t("formOptions.cancel")}
              </button>
              <button
                onClick={handleCloseForm}
                className={`px-5 py-2 text-white rounded-md ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                  }`}
                disabled={loading}
              >
                {loading ? t("formOptions.closing") : t("formOptions.confirmClose")}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
