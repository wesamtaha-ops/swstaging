import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, AlertTriangle, CheckCircle, ChevronDown, Copy, Maximize, Code, Laptop, MessageSquare, PanelRight, Eye, EyeOff } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';
import { SliderPreview } from './SliderPreview';
import { PopupPreview } from './PopupPreview';
import { StandardPreview } from './StandardPreview';
import toast from 'react-hot-toast';
import { Model } from 'survey-core';

interface EmbedOptionsProps {
  formUrl?: string;
  survey: Model | null;
}

export function EmbedOptions({ formUrl = "https://votlysurveys.fillout.com/t/48m43H3fb2us", survey }: EmbedOptionsProps) {
  // State for embed type selection
  const [selectedEmbed, setSelectedEmbed] = useState<'standard' | 'popup' | 'slider' | 'fullscreen'>('standard');
  const [isCustomizing, setIsCustomizing] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Standard embed settings
  const [width, setWidth] = useState('100');
  const [widthUnit, setWidthUnit] = useState('%');
  const [height, setHeight] = useState('500');
  const [heightUnit, setHeightUnit] = useState('px');
  const [autoResize, setAutoResize] = useState(true);

  // Popup settings
  const [buttonText, setButtonText] = useState('Open form');
  const [buttonBgColor, setButtonBgColor] = useState('#4F46E5');
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');
  const [buttonSize, setButtonSize] = useState('medium');
  const [buttonWidth, setButtonWidth] = useState('200');
  const [buttonHeight, setButtonHeight] = useState('50');
  const [buttonPosition, setButtonPosition] = useState('center');
  const [popupWidth, setPopupWidth] = useState('medium');
  const [buttonStyle, setButtonStyle] = useState('default');
  const [buttonAnimation, setButtonAnimation] = useState('none');
  const [buttonIcon, setButtonIcon] = useState('none');
  const [buttonShadow, setButtonShadow] = useState('none');

  // Slider settings
  const [sliderSide, setSliderSide] = useState<'left' | 'right'>('right');
  const [sliderButtonText, setSliderButtonText] = useState('Feedback');
  const [sliderButtonStyle, setSliderButtonStyle] = useState('rounded');
  const [sliderButtonBgColor, setSliderButtonBgColor] = useState('#4F46E5');
  const [sliderButtonTextColor, setSliderButtonTextColor] = useState('#FFFFFF');
  const [sliderButtonWidth, setSliderButtonWidth] = useState('70');
  const [sliderButtonHeight, setSliderButtonHeight] = useState('150');
  const [sliderFloating, setSliderFloating] = useState(false);
  const [sliderAnimation, setSliderAnimation] = useState('slide');
  const [sliderTransparency, setSliderTransparency] = useState(100);
  const [sliderOffset, setSliderOffset] = useState(0);

  const generateEmbedCode = () => {
    let code = '';
    switch (selectedEmbed) {
      case 'standard':
        code = `<iframe
  src="${formUrl}"
  width="${width}${widthUnit}"
  height="${height}${heightUnit}"
  frameborder="0"
  ${autoResize ? 'style="min-height: 100vh;"' : ''}
></iframe>`;
        break;
      case 'popup':
        code = `<script>
  window.formifyPopup = {
    url: "${formUrl}",
    button: {
      text: "${buttonText}",
      backgroundColor: "${buttonBgColor}",
      textColor: "${buttonTextColor}",
      size: "${buttonSize}",
      width: "${buttonWidth}px",
      height: "${buttonHeight}px",
      position: "${buttonPosition}",
      style: "${buttonStyle}",
      animation: "${buttonAnimation}",
      icon: "${buttonIcon}",
      shadow: "${buttonShadow}"
    },
    popup: {
      width: "${popupWidth}"
    }
  };
</script>
<script src="https://formify.com/js/popup.js"></script>`;
        break;
      case 'slider':
        code = `<script>
  window.formifySlider = {
    url: "${formUrl}",
    button: {
      text: "${sliderButtonText}",
      style: "${sliderButtonStyle}",
      backgroundColor: "${sliderButtonBgColor}",
      textColor: "${sliderButtonTextColor}",
      width: "${sliderButtonWidth}px",
      height: "${sliderButtonHeight}px",
      floating: ${sliderFloating},
      animation: "${sliderAnimation}"
    },
    position: "${sliderSide}",
    transparency: ${sliderTransparency},
    offset: ${sliderOffset}
  };
</script>
<script src="https://formify.com/js/slider.js"></script>`;
        break;
      case 'fullscreen':
        code = `<script>
  window.formifyFullscreen = {
    url: "${formUrl}"
  };
</script>
<script src="https://formify.com/js/fullscreen.js"></script>`;
        break;
    }
    return code;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Options Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-almarai text-gray-900">Embed Settings</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md ${viewMode === 'desktop' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'
                }`}
            >
              <Laptop className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md ${viewMode === 'mobile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'
                }`}
            >
              Mobile
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-almarai text-gray-700">Embed Type</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {[
                { id: 'standard', icon: Code, label: 'Standard' },
                { id: 'popup', icon: MessageSquare, label: 'Popup' },
                { id: 'slider', icon: PanelRight, label: 'Slider' },
                { id: 'fullscreen', icon: Maximize, label: 'Full Screen' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedEmbed(type.id as typeof selectedEmbed)}
                  className={`flex items-center p-4 border-2 rounded-lg transition-all ${selectedEmbed === type.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                    }`}
                >
                  <type.icon className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="font-almarai">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedEmbed === 'standard' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-almarai text-gray-700">Width</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="flex-1 min-w-0 block rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <select
                    value={widthUnit}
                    onChange={(e) => setWidthUnit(e.target.value)}
                    className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                  >
                    <option value="%">%</option>
                    <option value="px">px</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Height</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="flex-1 min-w-0 block rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vh">vh</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch.Root
                  checked={autoResize}
                  onCheckedChange={setAutoResize}
                  className="w-10 h-5 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
                >
                  <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Root>
                <label className="text-sm text-gray-600">Auto-resize height</label>
              </div>
            </div>
          )}

          {selectedEmbed === 'popup' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Text</label>
                <div className="mt-1 flex items-center space-x-2">
                  <select
                    value={buttonIcon}
                    onChange={(e) => setButtonIcon(e.target.value)}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="none">None</option>
                    <option value="message">Message</option>
                    <option value="form">Form</option>
                    <option value="chat">Chat</option>
                  </select>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Style</label>
                <select
                  value={buttonStyle}
                  onChange={(e) => setButtonStyle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="default">Default</option>
                  <option value="outline">Outline</option>
                  <option value="soft">Soft</option>
                  <option value="ghost">Ghost</option>
                  <option value="link">Link</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Size</label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500">Width (px)</label>
                    <input
                      type="number"
                      value={buttonWidth}
                      onChange={(e) => setButtonWidth(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Height (px)</label>
                    <input
                      type="number"
                      value={buttonHeight}
                      onChange={(e) => setButtonHeight(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Animation</label>
                <select
                  value={buttonAnimation}
                  onChange={(e) => setButtonAnimation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="none">None</option>
                  <option value="pulse">Pulse</option>
                  <option value="bounce">Bounce</option>
                  <option value="shake">Shake</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Shadow</label>
                <select
                  value={buttonShadow}
                  onChange={(e) => setButtonShadow(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Color</label>
                <input
                  type="color"
                  value={buttonBgColor}
                  onChange={(e) => setButtonBgColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Text Color</label>
                <input
                  type="color"
                  value={buttonTextColor}
                  onChange={(e) => setButtonTextColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Position</label>
                <select
                  value={buttonPosition}
                  onChange={(e) => setButtonPosition(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Popup Width</label>
                <select
                  value={popupWidth}
                  onChange={(e) => setPopupWidth(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="full">Full Width</option>
                </select>
              </div>
            </div>
          )}

          {selectedEmbed === 'slider' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Text</label>
                <input
                  type="text"
                  value={sliderButtonText}
                  onChange={(e) => setSliderButtonText(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Size</label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500">Width (px)</label>
                    <input
                      type="number"
                      value={sliderButtonWidth}
                      onChange={(e) => setSliderButtonWidth(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Height (px)</label>
                    <input
                      type="number"
                      value={sliderButtonHeight}
                      onChange={(e) => setSliderButtonHeight(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Style</label>
                <select
                  value={sliderButtonStyle}
                  onChange={(e) => setSliderButtonStyle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                  <option value="pill">Pill</option>
                  <option value="outline">Outline</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Animation Style</label>
                <select
                  value={sliderAnimation}
                  onChange={(e) => setSliderAnimation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="slide">Slide</option>
                  <option value="fade">Fade</option>
                  <option value="scale">Scale</option>
                  <option value="spring">Spring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Transparency (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderTransparency}
                  onChange={(e) => setSliderTransparency(parseInt(e.target.value))}
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Offset (px)</label>
                <input
                  type="number"
                  value={sliderOffset}
                  onChange={(e) => setSliderOffset(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Slider Side</label>
                <select
                  value={sliderSide}
                  onChange={(e) => setSliderSide(e.target.value as 'left' | 'right')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Button Color</label>
                <input
                  type="color"
                  value={sliderButtonBgColor}
                  onChange={(e) => setSliderButtonBgColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-almarai text-gray-700">Text Color</label>
                <input
                  type="color"
                  value={sliderButtonTextColor}
                  onChange={(e) => setSliderButtonTextColor(e.target.value)}
                  className="mt-1 block w-full h-10 rounded-md border-gray-300"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch.Root
                  checked={sliderFloating}
                  onCheckedChange={setSliderFloating}
                  className="w-10 h-5 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
                >
                  <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-5" />
                </Switch.Root>
                <label className="text-sm text-gray-600">Floating button</label>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={handleCopyCode}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-almarai text-gray-900">Preview</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-gray-400 hover:text-gray-500"
          >
            {showPreview ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        </div>

        {showPreview && (
          <div className={`bg-gray-100 rounded-lg p-4 ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
            }`}>
            {selectedEmbed === 'standard' && (
              <StandardPreview
                width={`${width}${widthUnit}`}
                height={`${height}${heightUnit}`}
                survey={survey}
              />
            )}

            {selectedEmbed === 'popup' && (
              <PopupPreview
                buttonText={buttonText}
                buttonBgColor={buttonBgColor}
                buttonTextColor={buttonTextColor}
                buttonSize={buttonSize}
                buttonWidth={buttonWidth}
                buttonHeight={buttonHeight}
                buttonPosition={buttonPosition}
                buttonStyle={buttonStyle}
                buttonAnimation={buttonAnimation}
                buttonIcon={buttonIcon}
                buttonShadow={buttonShadow}
                popupWidth={popupWidth}
                survey={survey}
                Ï
              />
            )}

            {selectedEmbed === 'slider' && (
              <SliderPreview
                buttonText={sliderButtonText}
                buttonStyle={sliderButtonStyle}
                buttonBgColor={sliderButtonBgColor}
                buttonTextColor={sliderButtonTextColor}
                buttonWidth={sliderButtonWidth}
                buttonHeight={sliderButtonHeight}
                sliderSide={sliderSide}
                floating={sliderFloating}
                animation={sliderAnimation}
                transparency={sliderTransparency}
                offset={sliderOffset}
                survey={survey}
              />
            )}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-sm font-almarai text-gray-700 mb-2">
            <Code className="h-4 w-4 inline mr-2" />
            Embed Code
          </label>
          <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-800">{generateEmbedCode()}</code>
          </pre>
          <button
            onClick={handleCopyCode}
            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-almarai rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
}