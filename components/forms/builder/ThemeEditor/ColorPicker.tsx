import React, { useState, useEffect, useRef } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { X } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-full h-10 rounded-md border border-gray-300 flex items-center justify-between px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <HexColorInput
            color={color}
            onChange={onChange}
            className="w-20 border-none focus:outline-none text-sm"
          />
        </div>
      </button>
      
      {showPicker && (
        <div className="absolute z-50 mt-2">
          <div className="relative">
            <HexColorPicker
              color={color}
              onChange={onChange}
              className="shadow-xl rounded-lg"
            />
            <button
              onClick={() => setShowPicker(false)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}