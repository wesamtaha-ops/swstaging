import React, { useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SliderPreviewProps {
  buttonText: string;
  buttonStyle: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonWidth: string;
  buttonHeight: string;
  sliderSide: 'left' | 'right';
  floating: boolean;
  animation: string;
  transparency: number;
  offset: number;
  survey: Model | null;
}

export function SliderPreview({
  buttonText,
  buttonStyle,
  buttonBgColor,
  buttonTextColor,
  buttonWidth,
  buttonHeight,
  sliderSide,
  floating,
  animation,
  transparency,
  offset,
  survey
}: SliderPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getButtonStyles = () => {
    const baseStyles = {
      backgroundColor: buttonBgColor,
      color: buttonTextColor,
      padding: '0.75rem 1.5rem',
      fontWeight: 500,
      cursor: 'pointer',
      position: 'absolute' as const,
      [sliderSide]: 0,
      top: floating ? '4rem' : 0,
      writingMode: sliderSide === 'left' ? 'vertical-rl' : 'vertical-lr',
      transform: sliderSide === 'left' ? 'rotate(180deg)' : 'none',
      width: buttonWidth ? `${buttonWidth}px` : 'auto',
      height: buttonHeight ? `${buttonHeight}px` : 'auto'
    };

    const borderStyles = {
      rounded: {
        borderRadius: '0.375rem',
      },
      square: {
        borderRadius: '0px',
      },
      pill: {
        borderRadius: '9999px',
      },
      outline: {
        border: `2px solid ${buttonBgColor}`,
        backgroundColor: 'transparent',
        color: buttonBgColor
      },
      minimal: {
        backgroundColor: 'transparent',
        color: buttonBgColor,
        border: 'none'
      }
    };

    return {
      ...baseStyles,
      ...borderStyles[buttonStyle as keyof typeof borderStyles],
    };
  };

  const sliderVariants = {
    hidden: {
      x: sliderSide === 'left' ? '-100%' : '100%',
    },
    visible: {
      x: 0,
      transition: {
        type: animation === 'spring' ? 'spring' : 'tween',
        stiffness: animation === 'spring' ? 300 : undefined,
        damping: animation === 'spring' ? 30 : undefined,
        duration: animation !== 'spring' ? 0.3 : undefined,
      },
    },
    exit: {
      x: sliderSide === 'left' ? '-100%' : '100%',
      transition: {
        type: animation === 'spring' ? 'spring' : 'tween',
        stiffness: animation === 'spring' ? 300 : undefined,
        damping: animation === 'spring' ? 30 : undefined,
        duration: animation !== 'spring' ? 0.3 : undefined,
      },
    },
  };

  return (
    <div className="relative h-[750px] bg-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={getButtonStyles()}
        className="transition-transform hover:-translate-y-0.5"
      >
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slider Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sliderVariants}
              className={`absolute top-0 ${sliderSide}-0 h-full w-[400px] bg-white shadow-xl`}
              style={{
                opacity: transparency / 100,
                transform: `translateY(${offset}px)`,
              }}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-almarai text-gray-900">Form Preview</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                {survey ? (
                  <Survey model={survey} />
                ) : (
                  <div className="h-full w-full bg-gray-50 rounded-lg p-4">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}