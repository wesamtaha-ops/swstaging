import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Clock, Sparkles, Brain, Star, BarChart2, MessageSquare, ThumbsUp,
  Calendar, Wand2, PenLine, Send, LineChart, Settings, Layout, Share2,
  PieChart, Code, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';

export const FormPreview = () => {
  const [activeUXStep, setActiveUXStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { t } = useTranslation();

  const uxSteps = [
    {
      title: t('formPreview.design_ai'),
      description: t('formPreview.design_ai_desc'),
      icon: Brain,
      color: 'bg-indigo-100 text-indigo-600',
      preview: (
        <div className="h-[385px] flex flex-col justify-between p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100">
              <Wand2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <span className="text-sm font-almarai text-indigo-600">{t('formPreview.ai_form_generator')}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{t('formPreview.generated_seconds')}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-gray-700">{t('formPreview.describe_form')}</span>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">{t('formPreview.sample_description')}</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-indigo-100 rounded-full w-3/4 animate-pulse" />
              <div className="h-2 bg-indigo-100 rounded-full w-1/2 animate-pulse delay-75" />
              <div className="h-2 bg-indigo-100 rounded-full w-2/3 animate-pulse delay-150" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('formPreview.customize'),
      description: t('formPreview.customize_desc'),
      icon: PenLine,
      color: 'bg-purple-100 text-purple-600',
      preview: (
        <div className="h-[385px] flex flex-col justify-between p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-almarai">{t('formPreview.form_builder')}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-white rounded-lg border-2 border-purple-200 border-dashed">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-almarai">{t('formPreview.rating_question')}</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center">
                      {rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 p-2 bg-purple-50 rounded-lg text-sm text-purple-600 hover:bg-purple-100">
                {t('formPreview.add_question')}
              </button>
              <button className="flex-1 p-2 bg-purple-50 rounded-lg text-sm text-purple-600 hover:bg-purple-100">
                {t('formPreview.theme_settings')}
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('formPreview.share_collect'),
      description: t('formPreview.share_collect_desc'),
      icon: Send,
      color: 'bg-blue-100 text-blue-600',
      preview: (
        <div className="h-[385px] flex flex-col justify-between p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-sm font-almarai text-blue-600">{t('formPreview.share_form')}</span>
              <div className="text-xs text-gray-500">{t('formPreview.multiple_sharing')}</div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Send className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-almarai">{t('formPreview.direct_link')}</span>
              </div>
              <p className="text-xs text-gray-500">{t('formPreview.share_via_url')}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-almarai">{t('formPreview.embed')}</span>
              </div>
              <p className="text-xs text-gray-500">{t('formPreview.add_to_website')}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('formPreview.analytics'),
      description: t('formPreview.analytics_desc'),
      icon: LineChart,
      color: 'bg-green-100 text-green-600',
      preview: (
        <div className="h-[385px] flex flex-col justify-between p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <PieChart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <span className="text-sm font-almarai text-green-600">{t('formPreview.ai_analytics')}</span>
              <div className="text-xs text-gray-500">{t('formPreview.real_time_insights')}</div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-almarai">{t('formPreview.response_overview')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600">+12.3%</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-green-100 rounded-full w-3/4" />
                <div className="h-2 bg-green-100 rounded-full w-1/2" />
                <div className="h-2 bg-green-100 rounded-full w-2/3" />
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-green-600" />
                <span className="text-sm font-almarai text-green-700">{t('formPreview.ai_insights')}</span>
              </div>
              <p className="text-xs text-green-600">{t('formPreview.sample_insight')}</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveUXStep((prev) => (prev + 1) % uxSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, uxSteps.length]);

  return (
    <div className="relative max-w-17xl mx-auto z-10">
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-gray-100 w-full max-w-[1000px]">
          {uxSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveUXStep(index);
                setIsAutoPlay(false);
              }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 flex-1 justify-center ${activeUXStep === index
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <div className={`${step.color} p-2 rounded-lg`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-almarai hidden sm:block">{step.title}</span>
              {activeUXStep === index && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeUXStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl mx-auto relative overflow-hidden w-full max-w-[1000px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="relative z-10">
          {uxSteps[activeUXStep].preview}
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-green-100/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="mt-8 flex justify-center gap-2">
        {uxSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveUXStep(index);
              setIsAutoPlay(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeUXStep === index
              ? 'w-8 bg-indigo-600'
              : 'bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
