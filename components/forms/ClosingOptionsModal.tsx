import React, { useState } from 'react';
import { X, Calendar, Hash, Clock } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

interface ClosingOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (options: {
    type: 'immediate' | 'responses' | 'datetime';
    responseLimit?: number;
    closeDate?: string;
  }) => void;
}

export function ClosingOptionsModal({ isOpen, onClose, onSave }: ClosingOptionsModalProps) {
  const [closingType, setClosingType] = useState<'immediate' | 'responses' | 'datetime'>('immediate');
  const [responseLimit, setResponseLimit] = useState('');
  const [closeDate, setCloseDate] = useState('');

  const handleSave = () => {
    onSave({
      type: closingType,
      ...(closingType === 'responses' && { responseLimit: parseInt(responseLimit) }),
      ...(closingType === 'datetime' && { closeDate }),
    });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-almarai text-gray-900">
              Form Closing Options
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <RadioGroup.Root
            value={closingType}
            onValueChange={(value: 'immediate' | 'responses' | 'datetime') => setClosingType(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroup.Item
                value="immediate"
                className="w-4 h-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-indigo-600" />
              </RadioGroup.Item>
              <label className="text-sm font-almarai text-gray-700">
                Close survey immediately
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroup.Item
                  value="responses"
                  className="w-4 h-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-indigo-600" />
                </RadioGroup.Item>
                <label className="text-sm font-almarai text-gray-700">
                  Close after reaching response limit
                </label>
              </div>
              {closingType === 'responses' && (
                <div className="ml-7">
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={responseLimit}
                      onChange={(e) => setResponseLimit(e.target.value)}
                      placeholder="Number of responses"
                      className="pl-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroup.Item
                  value="datetime"
                  className="w-4 h-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-indigo-600" />
                </RadioGroup.Item>
                <label className="text-sm font-almarai text-gray-700">
                  Close at specific date/time
                </label>
              </div>
              {closingType === 'datetime' && (
                <div className="ml-7">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={closeDate}
                      onChange={(e) => setCloseDate(e.target.value)}
                      className="pl-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </RadioGroup.Root>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}