import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import * as Dialog from "@radix-ui/react-dialog";
import {
  Settings,
  HelpCircle,
  Phone,
  Home,
  Gift,
  LogOut,
  LayoutDashboard,
  FileText,
  ChevronsUpDown,
  Check,
  Users,
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import {
  CreateCompany,
  GetCompanysByOwner,
  loadingCompanySelected,
  selectCompanyError,
  selectCompanySelected,
  selectGetCompanyByOwner,
  setSelectedCompany,
} from "@/src/features/company/companySlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
//import { Check } from "../forms/responses/table/icons/Check";

interface AvatarDropdownProps {
  onLogout: () => void;
}

export function AvatarDropdown({ onLogout }: AvatarDropdownProps) {
  const { t } = useTranslation();

  const { user, isAuthenticated } = useAuth();
  const companies = useSelector(selectGetCompanyByOwner);
  const dispatch = useDispatch<AppDispatch>();

  const [showNewCompanyModal, setShowNewCompanyodal] = useState(false);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      if (isAuthenticated && user?._id) {
        setIsLoading(true);
        try {
          dispatch(GetCompanysByOwner(user._id));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated, user]);

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
  const error =
    (user?.role === "accountOwner" || user?.role === "user") && companyError;

  const selectedCompany = useSelector(selectCompanySelected);
  const loadingCompany = useSelector(loadingCompanySelected);
  console.log("selectedCompany", selectedCompany);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenu.Trigger asChild>
          {window.location.pathname == "/account" ? (
            <ChevronsUpDown className="cursor-pointer flex items-center ml-auto text-gray-400 " />
          ) : (
            <button className="flex items-center ml-auto font-almarai">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-almarai text-lg">
                {user?.username[0]}
              </div>
            </button>
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            // className="fixed top-2 right-4 w-72 bg-white shadow-lg rounded-lg z-50 border border-gray-200 py-2 overflow-visible"
            className=" bg-white rounded-lg shadow-lg border border-gray-200 py-2 font-almarai"
            // sideOffset={5}
            sideOffset={30}
            align="end"
          >
            {/* User Info */}
            {window.location.pathname !== "/account" && (
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-almarai text-xl">
                    {user?.username.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-almarai text-gray-900 truncate">
                      <p className="text-sm text-gray-500 truncate">
                        {user?.username}
                      </p>
                      {["companyOwner"].includes(user?.role ?? "")
                        ? `${user?.companyId?.name}'s company`
                        : ["workspaceOwner", "viewer", "editor"].includes(
                          user?.role ?? ""
                        )
                          ? `${user?.workspaceId?.name}'s workspace`
                          : `${user?.email}'s Owner`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Account Section */}
            <button className=" my-5 mx-auto flex justify-center relative h-12">
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-500 px-7 text-sm font-almarai text-white backdrop-blur-3xl gap-10 undefined">
                {user?.role}
              </span>
            </button>
            <div className="px-2 py-2">
              {user?.role === "accountOwner" &&
                window.location.pathname == "/forms" && (
                  <>
                    <DropdownMenu.Item asChild>
                      <>
                        <div className="h-[150px] overflow-y-auto">
                          <h6 className="px-2 py-1.5 text-xs text-gray-600 font-[450]">
                            Companies
                          </h6>

                          {companies?.map((company) => (
                            <div
                              key={company._id}
                              onClick={() => {
                                if (company._id) {
                                  dispatch(setSelectedCompany(company));
                                }
                                setMenuOpen(false);
                              }}
                              className="relative flex cursor-pointer select-none items-center
                    rounded-md px-2 py-1.5 text-xs outline-none data-[disabled]:pointer-events-none
                    data-[disabled]:opacity-50 gap-2 [&>svg]:w-4 [&>svg]:h-4 text-black hover:text-black 
                    focus:bg-gray-100 [&>svg]:hover:text-black  [&>svg]:text-gray-600"
                              data-cy="organization-switch-row"
                              tabIndex={-1}
                              data-orientation="vertical"
                              data-radix-collection-item
                            >
                              <div className="rounded-full h-7 w-7 text-blue-50 flex items-center justify-center bg-gray-300">
                                {company.name.slice(0, 1)}
                              </div>
                              <span className="flex min-w-0 flex-1 flex-col">
                                <span className="flex items-center">
                                  <span className="text-gray-600 text-sm ">
                                    {company.name}
                                  </span>
                                </span>
                              </span>

                              {/* /wjjjjjjjjjjj */}
                              {loadingCompany === company._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                              ) : selectedCompany === company ? (
                                <Check />
                              ) : null}
                              {/* /wjjjjjjjjjjj */}
                            </div>
                          ))}
                        </div>

                        <div
                          onClick={() => setShowNewCompanyodal(true)}
                          className="relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-xs outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 [&>svg]:w-4 [&>svg]:h-4 text-black hover:text-black focus:bg-gray-100 [&>svg]:hover:text-black  [&>svg]:text-gray-600"
                          tabIndex={-1}
                          data-orientation="vertical"
                          data-radix-collection-item
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Create company
                        </div>
                      </>
                    </DropdownMenu.Item>
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="-mx-1 my-1 h-px bg-gray-200"
                    />
                  </>
                )}
              <DropdownMenu.Item asChild>
                {/* <span className="flex justify-center px-3 py-2 text-md text-black-900 hover:bg-gray-100 rounded-md border border-red-500">
                {user?.role}
              </span> */}
              </DropdownMenu.Item>
              {window.location.pathname !== "/account" && (
                <DropdownMenu.Item asChild>
                  <Link
                    to="/account"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    {t("dropdown.account_settings")}
                  </Link>
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Item asChild>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  {t("dropdown.my_dashboard")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  to="/forms"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  {t("dropdown.my_forms")}
                </Link>
              </DropdownMenu.Item>
            </div>

            {/* Resources Section */}
            <div className="border-t border-gray-200 px-2 py-2">
              <DropdownMenu.Item asChild>
                <Link
                  to="/help"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <HelpCircle className="w-4 h-4 mr-3" />
                  {t("dropdown.help")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  to="/contact"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  {t("dropdown.contact_us")}
                </Link>
              </DropdownMenu.Item>
            </div>

            {/* Additional Links */}
            <div className="border-t border-gray-200 px-2 py-2">
              <DropdownMenu.Item asChild>
                <Link
                  to="/refer"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Gift className="w-4 h-4 mr-3 text-indigo-600" />
                  <span> {t("dropdown.refer")}</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Home className="w-4 h-4 mr-3 text-indigo-600" />
                  {t("dropdown.homepage")}
                </Link>
              </DropdownMenu.Item>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 px-2 py-2">
              <DropdownMenu.Item asChild>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {t("dropdown.logout")}
                </button>
              </DropdownMenu.Item>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
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
              Create a company to organize your workspaces and collaborate with
              team members.
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
    </>
  );
}
