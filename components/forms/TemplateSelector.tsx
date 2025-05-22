import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, ArrowRight } from 'lucide-react';

interface TemplateSelectorProps {
  onBack: () => void;
  onClose: () => void;
}

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  questions: number;
}

interface Category {
  name: string;
  count: number;
  slug: string;
}

const categories: Category[] = [
  { name: 'Customer Feedback', count: 24, slug: 'feedback' },
  { name: 'Job Applications', count: 18, slug: 'jobs' },
  { name: 'Event Registration', count: 15, slug: 'events' },
  { name: 'Contact Forms', count: 12, slug: 'contact' },
  { name: 'Surveys', count: 20, slug: 'surveys' },
];

const templates: Template[] = [
  {
    id: 'customer-feedback',
    title: 'Customer Feedback Survey',
    description: 'Gather valuable insights from your customers',
    category: 'Feedback',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    questions: 10
  },
  {
    id: 'job-application',
    title: 'Job Application Form',
    description: 'Streamline your hiring process',
    category: 'Jobs',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    questions: 15
  },
  {
    id: 'event-registration',
    title: 'Event Registration',
    description: 'Collect event registrations easily',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    questions: 8
  }
];

export function TemplateSelector({ onBack, onClose }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/forms/new?template=${templateId}`);
    onClose();
  };

  return (
    <div>
      <div className="flex items-center mb-6 font-almarai ">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Choose a Template</h2>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${selectedCategory === category.name
                  ? "bg-indigo-50 text-indigo-700 font-almarai"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="group text-left bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-video relative">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-almarai text-gray-900 group-hover:text-indigo-600">
                      {template.title}
                    </h3>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-almarai">
                      {template.questions} questions
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-almarai bg-indigo-100 text-indigo-800">
                      {template.category}
                    </span>
                    <span className="text-indigo-600 group-hover:text-indigo-700 flex items-center text-sm font-almarai">
                      Use template
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}