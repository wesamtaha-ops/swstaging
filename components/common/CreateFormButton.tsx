import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateFormModal } from '../forms/CreateFormModal';

interface CreateFormButtonProps {
  className?: string;
  workspaceId?: string;
}

export function CreateFormButton({
  className = "",
  workspaceId,
}: CreateFormButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700 ${className}`}
      >
        <Plus className="h-5 w-5 mr-2" />
        New Survey
      </button>

      <CreateFormModal
        isOpen={isModalOpen}

        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}