import React from "react";
import Permission from "@types/permission";
import { Check, X } from "lucide-react";

interface PermissionsListProps {
  permissions: Permission[];
  onToggle: (permissionId: string) => void;
}

export function PermissionsList({
  permissions,
  onToggle,
}: PermissionsListProps) {
  return (
    <></>
    // <div className="mt-4">
    //   <div className="space-y-4">
    //     {permissions.map((permission) => (
    //       <div
    //         key={permission.id}
    //         className="relative flex items-start py-4 border-b border-gray-200"
    //       >
    //         <div className="min-w-0 flex-1 text-sm">
    //           <label
    //             htmlFor={permission.id}
    //             className="font-almarai text-red-700 select-none"
    //           >
    //             {permission.name}
    //           </label>
    //           <p className="text-red-800">{permission.description}</p>
    //         </div>
    //         <div className="ml-3 flex items-center h-5">
    //           <button
    //             onClick={() => onToggle(permission.id)}
    //             className={`${
    //               permission.enabled
    //                 ? "bg-indigo-600 hover:bg-indigo-700"
    //                 : "bg-gray-200 hover:bg-gray-300"
    //             } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    //           >
    //             <span
    //               className={`${
    //                 permission.enabled ? "translate-x-5" : "translate-x-0"
    //               } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
    //             >
    //               <span
    //                 className={`${
    //                   permission.enabled
    //                     ? "opacity-0 ease-out duration-100"
    //                     : "opacity-100 ease-in duration-200"
    //                 } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
    //               >
    //                 <X className="h-3 w-3 text-gray-400" />
    //               </span>
    //               <span
    //                 className={`${
    //                   permission.enabled
    //                     ? "opacity-100 ease-in duration-200"
    //                     : "opacity-0 ease-out duration-100"
    //                 } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
    //               >
    //                 <Check className="h-3 w-3 text-indigo-600" />
    //               </span>
    //             </span>
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
