import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Sparkles,
  PenLine,
  ArrowRight,
  ClipboardList,
  Brain,
  Lightbulb,
  Wand2,
  CheckCircle,
} from 'lucide-react';

const creationOptions = [
  {
    id: 'templates',
    title: 'Use a Template',
    description: 'Start with a pre-built template and customize it to your needs',
    icon: ClipboardList,
    color: 'bg-blue-50 text-blue-600',
    action: () => '/templates',
    features: [
      'Ready-to-use form layouts',
      'Industry-specific templates',
      'Best practices built-in',
    ],
    cta: 'Browse Templates',
  },
  {
    id: 'ai',
    title: 'AI Form Generator',
    description: 'Describe your form in plain text and let AI create it for you',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600',
    action: () => '/forms/ai-create',
    features: [
      'Natural language form creation',
      'Smart field suggestions',
      'Automated validation rules',
    ],
    cta: 'Try AI Generator',
  },
  {
    id: 'manual',
    title: 'Create from Scratch',
    description: 'Build your form manually using our drag-and-drop builder',
    icon: PenLine,
    color: 'bg-green-50 text-green-600',
    action: () => '/forms/new',
    features: [
      'Full creative control',
      'Advanced customization',
      'Custom validation rules',
    ],
    cta: 'Start from Scratch',
  },
];

export default function CreateForm() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-lg mb-4">
              <FileText className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Create New Form</h1>
            <p className="mt-2 text-lg text-gray-600">
              Choose the perfect way to create your form
            </p>
          </motion.div>
        </div>

        {/* Creation Options */}
        <div className="space-y-6">
          {creationOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group relative"
            >
              <div className="relative flex items-start space-x-5">
                {/* Icon */}
                <div
                  className={`${option.color} p-4 rounded-xl transform transition-transform duration-300 group-hover:scale-110`}
                >
                  <option.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-almarai text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-gray-500">{option.description}</p>

                  {/* Features List */}
                  <div className="mt-4 space-y-2">
                    {option.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="self-center">
                  <ArrowRight className="h-6 w-6 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-indigo-600" />
                </div>
              </div>

              {/* Call-to-Action Button */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => navigate(option.action())}
                  className={`inline-flex items-center px-4 py-2 text-sm font-almarai text-white rounded-lg ${option.color.includes('blue')
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : option.color.includes('purple')
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-green-600 hover:bg-green-700'
                    } transition-colors duration-300`}
                >
                  {option.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <Lightbulb className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-almarai text-indigo-900">Pro Tips</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <Brain className="h-4 w-4 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-indigo-800">
                AI form generation works best with detailed descriptions of your form's purpose and required fields.
              </p>
            </div>
            <div className="flex items-start">
              <Wand2 className="h-4 w-4 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-indigo-800">
                Templates can save you time and ensure you follow form design best practices.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-indigo-800">
                Consider your audience when choosing the form design method that suits your needs best.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
