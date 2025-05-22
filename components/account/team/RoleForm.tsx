import React, { useState } from "react";
import { Role, Permission, DEFAULT_PERMISSIONS } from "@/types/permissions";
import { PermissionRow } from "./PermissionRow";
import toast from "react-hot-toast";

interface RoleFormProps {
  role?: Role;
  onSave: (role: Role) => void;
  onCancel: () => void;
}

export function RoleForm({ role, onSave, onCancel }: RoleFormProps) {
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [permissions, setPermissions] = useState<Permission[]>(
    role?.permissions || DEFAULT_PERMISSIONS
  );

  const handlePermissionChange = (
    permissionId: string,
    action: keyof Permission["actions"],
    value: boolean
  ) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === permissionId
          ? {
            ...permission,
            actions: {
              ...permission.actions,
              [action]: value,
            },
          }
          : permission
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Role name is required");
      return;
    }

    const newRole: Role = {
      id: role?.id || Date.now().toString(),
      name,
      description,
      permissions,
    };

    onSave(newRole);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div>
        <label
          htmlFor="Name"
          className="block text-sm font-almarai text-gray-700"
        >
          Role Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-3 p-3 block w-full rounded-md border border-gray-300  shadow-sm sm:text-sm"
          placeholder="e.g. Content Editor"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-almarai text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-3 p-3 block w-full rounded-md border border-gray-300  shadow-sm sm:text-sm"
          placeholder="Describe the role's responsibilities..."
        />
      </div>

      <div>
        <h3 className="text-md font-almarai text-gray-700 mb-4">Permissions</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            {permissions.map((permission) => (
              <PermissionRow
                key={permission.id}
                permission={permission}
                onPermissionChange={handlePermissionChange}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {role ? "Update Role" : "Create Role"}
        </button>
      </div>
    </form>
  );
}
