import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sparkles, ClipboardList, PenLine, ArrowRight } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFormModal({
  isOpen,
  onClose,

}: CreateFormModalProps) {
  const [showTemplates, setShowTemplates] = React.useState(false);
  const navigate = useNavigate();

  const options = [
    {
      id: "ai",
      title: "Create Using AI",
      description:
        "Describe your form in plain text and let AI create it for you",
      icon: Sparkles,
      color: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
      borderColor: "hover:border-emerald-300",
      action: () => {
        navigate("/forms/ai-create");
        onClose();
      },
    },
    {
      id: "templates",
      title: "Choose from Templates",
      description:
        "Start with a pre-built template and customize it to your needs",
      icon: ClipboardList,
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      borderColor: "hover:border-blue-300",
      action: () => setShowTemplates(true),
    },
    {
      id: "scratch",
      title: "Create from Scratch",
      description: "Build your form manually using our drag-and-drop builder",
      icon: PenLine,
      color: "from-indigo-50 to-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "hover:border-indigo-300",
      action: () => {
        navigate("/forms/new");

        onClose();
      },
    },
  ];



  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[999] font-almarai " />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[90vh] w-[95vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-8 shadow-2xl focus:outline-none overflow-y-auto z-[1000]">
          <Dialog.Title className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 text-center mb-2">
            Create New Form
          </Dialog.Title>

          <Dialog.Description className="text-center text-gray-600 mb-8 font-almarai ">
            Choose how you'd like to create your form
          </Dialog.Description>

          <div className="absolute top-4 right-4">
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </Dialog.Close>
          </div>

          {!showTemplates ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-almarai ">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={option.action}
                  className={`group relative bg-white rounded-xl border-2 border-gray-100 p-6 hover:shadow-lg transition-all duration-300 ${option.borderColor} transform hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 rounded-xl opacity-50" />
                  <div className="relative">
                    <div
                      className={`${option.color} p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <option.icon className={`h-8 w-8 ${option.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-almarai text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4 min-h-[3rem]">
                      {option.description}
                    </p>

                  </div>
                </button>
              ))}
            </div>
          ) : (
            <TemplateSelector
              onBack={() => setShowTemplates(false)}
              onClose={onClose}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}