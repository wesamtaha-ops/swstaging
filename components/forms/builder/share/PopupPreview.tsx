import React, { useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, FileText, MessageCircle } from 'lucide-react';

interface PopupPreviewProps {
  buttonText: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonSize: string;
  buttonWidth: string;
  buttonHeight: string;
  buttonPosition: string;
  buttonStyle: string;
  buttonAnimation: string;
  buttonIcon: string;
  buttonShadow: string;
  popupWidth: string;
  survey: Model | null;
}

export function PopupPreview({
  buttonText,
  buttonBgColor,
  buttonTextColor,
  buttonSize,
  buttonWidth,
  buttonHeight,
  buttonPosition,
  buttonStyle,
  buttonAnimation,
  buttonIcon,
  buttonShadow,
  popupWidth,
  survey
}: PopupPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getButtonIcon = () => {
    switch (buttonIcon) {
      case 'message':
        return <MessageSquare className="h-4 w-4 mr-2" />;
      case 'form':
        return <FileText className="h-4 w-4 mr-2" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getButtonStyles = () => {
    const baseStyles = {
      backgroundColor: buttonStyle === 'outline' ? 'transparent' : buttonBgColor,
      color: buttonStyle === 'outline' ? buttonBgColor : buttonTextColor,
      border: buttonStyle === 'outline' ? `2px solid ${buttonBgColor}` : 'none',
      width: buttonWidth ? `${buttonWidth}px` : 'auto',
      height: buttonHeight ? `${buttonHeight}px` : 'auto',
      transition: 'all 0.2s ease-in-out'
    };

    const sizeStyles = {
      xs: 'px-2.5 py-1.5 text-xs',
      small: 'px-3 py-2 text-sm',
      medium: 'px-4 py-2.5 text-base',
      large: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    };

    const positionStyles = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto'
    };

    const shadowStyles = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl'
    };

    const styleVariants = {
      default: '',
      outline: 'border-2',
      soft: `bg-opacity-10 text-${buttonBgColor}`,
      ghost: 'bg-transparent hover:bg-opacity-10',
      link: 'bg-transparent underline hover:no-underline'
    };

    const animationStyles = {
      none: '',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce',
      shake: 'animate-shake'
    };

    return `
      ${sizeStyles[buttonSize as keyof typeof sizeStyles]}
      ${positionStyles[buttonPosition as keyof typeof positionStyles]}
      ${shadowStyles[buttonShadow as keyof typeof shadowStyles]}
      ${styleVariants[buttonStyle as keyof typeof styleVariants]}
      ${animationStyles[buttonAnimation as keyof typeof animationStyles]}
      rounded-md font-almarai transition-all duration-200
    `;
  };

  const getPopupWidth = () => {
    const widths = {
      small: 'max-w-md',
      medium: 'max-w-2xl',
      large: 'max-w-4xl',
      full: 'max-w-full mx-4'
    };
    return widths[popupWidth as keyof typeof widths];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
        className={getButtonStyles()}
      >
        {getButtonIcon()}
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`fixed top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 ${getPopupWidth()} w-full bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-auto`}

            >
              <div className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="p-6">
                  {survey && <Survey model={survey} />}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}