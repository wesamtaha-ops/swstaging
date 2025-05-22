import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ClipboardList, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
  {
    title: 'Customer Feedback',
    description: 'Gather valuable insights from your customers with our comprehensive feedback form template.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    questions: 12
  },
  {
    title: 'Job Application',
    description: 'Streamline your hiring process with our professional job application form template.',
    icon: ClipboardList,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'HR',
    questions: 15
  },
  {
    title: 'Event Registration',
    description: 'Manage event registrations efficiently with our customizable registration form template.',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Events',
    questions: 8
  }
];

export function TemplatesSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-xl font-almarai leading-7 text-indigo-400">
          Ready-to-Use Templates
        </h2>
        <p className="mt-2 text-3xl   font-bold font-almarai font-almarai  font-almarai tracking-tight text-white sm:text-4xl">
          Start with proven templates
        </p>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          Choose from our collection of professionally designed templates and customize them to your needs.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-16 lg:max-w-none">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={template.image}
                  alt={template.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai bg-indigo-500/10 text-indigo-400">
                    {template.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai bg-gray-500/10 text-gray-400">
                    {template.questions} questions
                  </span>
                </div>
                <h3 className="text-xl   font-bold font-almarai font-almarai  font-almarai text-white mb-2">{template.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{template.description}</p>
                <Link
                  to={`/templates/${template.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center bg-indigo-400 px-2 py-1  rounded-md text-xs font-small text-white hover:bg-indigo-400 text-white border-indigo-400 transition-colors duration-200"
                >
                  Use template
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center px-4 py-2 border border-indigo-400 rounded-md text-sm font-almarai text-indigo-400 hover:bg-indigo-400 hover:text-white transition-colors duration-200"
          >
            View all templates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}