import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface PermissionCheckboxProps {
  checked: boolean;
  // onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export function PermissionCheckbox({
  checked,
  // onCheckedChange,
  label,
}: PermissionCheckboxProps) {
  return (
    <div className="flex  items-center space-y-1">
      <Checkbox.Root
        checked={checked}
        // onCheckedChange={onCheckedChange}
        //       className={`flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer transition-all duration-300
        // shadow-[inset_-4px_-4px_8px_#ffffff,inset_4px_4px_8px_#b0b0b0]
        // bg-gray-300 border-gray-200 hover:border-gray-400
        // focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
        //     >
        className={`flex h-5 w-5 items-center justify-center rounded-full p-3 transition-all duration-200 ${checked
            ? "border-2 bg-black shadow-sm"
            : "border-2 border-black-500 bg-white hover:border-indigo-400"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <Checkbox.Indicator>
          <Check className="h-5 w-5 stroke-[3] text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      {/* <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`flex h-5 w-5 items-center justify-center rounded-md transition-all duration-200 ${
          checked
            ? "border-2 border-indigo-600 bg-indigo-600 shadow-sm"
            : "border-2 border-gray-200 bg-white hover:border-indigo-400"
        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <Checkbox.Indicator className="text-white">
          <Check className="h-3.5 w-3.5 stroke-[3]" />
        </Checkbox.Indicator>
      </Checkbox.Root> */}
      {label && (
        <label className="text-xs font-almarai text-gray-600 ml-2">
          {label}
        </label>
      )}
    </div>
  );
}
