import React, { useState } from "react";
import { Role, DEFAULT_PERMISSIONS, DEFAULT_ROLES } from "@/types/permissions";
import { RoleForm } from "./RoleForm";
import { Plus, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { PermissionRow } from "./PermissionRow";

interface RoleManagementProps {
  initialRoles?: Role[];
}

export function RoleManagement({
  initialRoles = DEFAULT_ROLES,
}: RoleManagementProps) {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | undefined>();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const handleCreateRole = (role: Role) => {
    setRoles([...roles, role]);
    setIsFormOpen(false);
    toast.success("Role created successfully");
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(
      roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
    setIsFormOpen(false);
    setEditingRole(undefined);
    toast.success("Role updated successfully");
  };

  const handleDeleteRole = (roleId: string) => {
    // Prevent deletion of default roles
    if (["administrator", "moderator", "viewer"].includes(roleId)) {
      toast.error("Cannot delete default roles");
      return;
    }

    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== roleId));
      toast.success("Role deleted successfully");
    }
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsFormOpen(true);
  };

  return (
    <div className="font-almarai">
      {/* <div className="flex justify-between items-center mt-8 ">
        <h3 className="text-lg font-almarai ">NexuSphere Technologies </h3>

        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            setEditingRole(undefined);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Role
        </button>
      </div> */}

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg mt-8">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr className="text-left  bg-gray-100">
              <th className="p-4 text-sm border-b border-slate-300">Name</th>
              <th className="p-4 text-sm border-b border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-md font-normal">
            {roles.map((role) => (
              <React.Fragment key={role.id}>
                {/* Première ligne avec le rôle */}
                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-900 font-almarai">
                    {role.name} -{" "}
                    <span className="text-gray-500">{role.description}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="flex items-center text-gray-500 gap-2 p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Manage
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[160px] bg-white rounded-md p-1 shadow-lg border border-gray-200"
                            sideOffset={5}
                          >
                            <DropdownMenu.Item
                              className="text-sm rounded-sm px-2 py-1.5 outline-none cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                              onClick={() => handleEditRole(role)}
                            >
                              edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="text-sm rounded-sm px-2 py-1.5 outline-none cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
                              onClick={() => handleDeleteRole(role.id)}
                              disabled={[
                                "administrator",
                                "moderator",
                                "viewer",
                              ].includes(role.id)}
                            >
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                      <button
                        onClick={() =>
                          setOpenMenus((prev) => ({
                            ...prev,
                            [role.id]: !prev[role.id],
                          }))
                        }
                        className="group inline-flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-indigo-600"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 group-hover:text-indigo-600 ${openMenus[role.id] ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Deuxième ligne pour afficher les permissions si le menu est ouvert */}
                {openMenus[role.id] && (
                  <tr className="bg-gray-50">
                    <td colSpan={2} className="p-4">
                      <div className="space-y-4">
                        {role.permissions.map((permission) => (
                          <PermissionRow
                            key={permission.id}
                            permission={permission}

                          // onPermissionChange={(
                          //   permissionId,


                          //   action,
                          //   value
                          // ) => {
                          //   const updatedRole = {
                          //     ...role,
                          //     permissions: role.permissions.map((p) =>
                          //       p.id === permissionId
                          //         ? {
                          //             ...p,
                          //             actions: {
                          //               ...p.actions,
                          //               [action]: value,
                          //             },
                          //           }
                          //         : p
                          //     ),
                          //   };
                          //   handleUpdateRole(updatedRole);
                          // }}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog.Root open={isFormOpen} onOpenChange={setIsFormOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none overflow-y-auto">
            <Dialog.Title className="text-lg font-almarai text-gray-900 mb-4">
              <div className=" flex flex-row  items-center space-x-2">
                <h3 className="text-md leading-6 font-almarai text-gray-900">
                  {editingRole ? "Edit Role" : "Create New Role"}
                </h3>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 border-blue-600">
                  <p className="text-sm">NexuSphere Technologies</p>
                </div>
              </div>
            </Dialog.Title>
            <RoleForm
              role={editingRole}
              onSave={editingRole ? handleUpdateRole : handleCreateRole}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingRole(undefined);
              }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
