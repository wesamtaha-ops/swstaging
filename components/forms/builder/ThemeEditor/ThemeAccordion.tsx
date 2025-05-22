import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette, Layout, Type, Image } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import * as Switch from '@radix-ui/react-switch';

interface ThemeAccordionProps {
  theme: any;
  onThemeChange: (updates: any) => void;
  expandAll?: boolean;
}

interface AccordionItemProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const fontFamilies = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'system-ui, sans-serif', label: 'System UI' },
];

function AccordionItem({ title, icon: Icon, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-gray-400" />
          <span className="font-almarai text-gray-900">{title}</span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
            }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ThemeAccordion({ theme, onThemeChange, expandAll = false }: ThemeAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (expandAll) {
      setOpenSections(new Set(['appearance', 'typography', 'layout', 'background']));
    }
  }, [expandAll]);

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const updateThemeVariable = (variable: string, value: string) => {
    onThemeChange({
      ...theme,
      cssVariables: {
        ...theme.cssVariables,
        [variable]: value,
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* General Appearance */}
      <AccordionItem
        title="General Appearance"
        icon={Palette}
        isOpen={openSections.has('appearance')}
        onToggle={() => toggleSection('appearance')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Primary Color
            </label>
            <ColorPicker
              color={theme.cssVariables['--sjs-primary-backcolor']}
              onChange={(color) => updateThemeVariable('--sjs-primary-backcolor', color)}
            />
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Background Color
            </label>
            <ColorPicker
              color={theme.cssVariables['--sjs-general-backcolor']}
              onChange={(color) => updateThemeVariable('--sjs-general-backcolor', color)}
            />
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Text Color
            </label>
            <ColorPicker
              color={theme.cssVariables['--sjs-general-forecolor']}
              onChange={(color) => updateThemeVariable('--sjs-general-forecolor', color)}
            />
          </div>
        </div>
      </AccordionItem>

      {/* Typography */}
      <AccordionItem
        title="Typography"
        icon={Type}
        isOpen={openSections.has('typography')}
        onToggle={() => toggleSection('typography')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={theme.cssVariables['--sjs-font-family']}
              onChange={(e) => updateThemeVariable('--sjs-font-family', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {fontFamilies.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Font Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="12"
                max="24"
                value={parseInt(theme.cssVariables['--sjs-font-size'] || '16')}
                onChange={(e) => updateThemeVariable('--sjs-font-size', `${e.target.value}px`)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {theme.cssVariables['--sjs-font-size'] || '16px'}
              </span>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* Layout */}
      <AccordionItem
        title="Layout"
        icon={Layout}
        isOpen={openSections.has('layout')}
        onToggle={() => toggleSection('layout')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Corner Radius
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="16"
                value={parseInt(theme.cssVariables['--sjs-corner-radius'])}
                onChange={(e) => updateThemeVariable('--sjs-corner-radius', `${e.target.value}px`)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {theme.cssVariables['--sjs-corner-radius']}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Base Spacing
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="4"
                max="24"
                value={parseInt(theme.cssVariables['--sjs-base-unit'])}
                onChange={(e) => updateThemeVariable('--sjs-base-unit', `${e.target.value}px`)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {theme.cssVariables['--sjs-base-unit']}
              </span>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* Background */}
      <AccordionItem
        title="Background"
        icon={Image}
        isOpen={openSections.has('background')}
        onToggle={() => toggleSection('background')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Background Image URL
            </label>
            <input
              type="text"
              value={theme.backgroundImage}
              onChange={(e) => onThemeChange({ ...theme, backgroundImage: e.target.value })}
              placeholder="Enter image URL"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-almarai text-gray-700 mb-1">
              Background Opacity
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={theme.backgroundOpacity}
                onChange={(e) => onThemeChange({ ...theme, backgroundOpacity: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-16">
                {theme.backgroundOpacity}
              </span>
            </div>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}