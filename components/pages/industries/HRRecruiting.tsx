import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  ClipboardList,
  LineChart,
  Settings,
  UserPlus,
  Star,
  MessageSquare,
  BarChart2
} from 'lucide-react';

export default function HRRecruiting() {
  const features = [
    {
      title: 'Job Applications',
      description: 'Customizable application forms with screening questions',
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Employee Onboarding',
      description: 'Digital onboarding forms and documentation',
      icon: UserPlus,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Performance Reviews',
      description: '360-degree feedback and evaluation forms',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Employee Surveys',
      description: 'Engagement and satisfaction surveys',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const useCases = [
    {
      title: 'Talent Acquisition',
      description: 'Streamline your hiring process with smart application forms',
      icon: Users,
      stats: '45% faster hiring'
    },
    {
      title: 'Employee Experience',
      description: 'Measure and improve employee satisfaction',
      icon: Star,
      stats: '32% higher retention'
    },
    {
      title: 'HR Analytics',
      description: 'Data-driven insights for better HR decisions',
      icon: BarChart2,
      stats: '3x better insights'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgxMnYxMkgzNnpNMTIgMzRoMTJ2MTJIMTIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-almarai bg-blue-500/20 text-white mb-6">
                <Briefcase className="h-4 w-4 mr-2" />
                HR & Recruiting Solutions
              </div>
              <h1 className="text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6">
                Transform Your HR & Recruiting Process
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Streamline hiring, onboarding, and employee management with powerful digital forms
                and automated workflows.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition duration-150"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/templates/hr"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150"
                >
                  View Templates
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">
              HR & Recruiting Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your HR processes efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`${feature.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-almarai text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6">
                Streamlined HR Processes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Automated Workflows',
                    description: 'Reduce manual tasks and paperwork with digital workflows',
                    icon: Settings,
                  },
                  {
                    title: 'Data Analytics',
                    description: 'Make data-driven HR decisions with powerful analytics',
                    icon: LineChart,
                  },
                  {
                    title: 'Collaboration Tools',
                    description: 'Enable seamless teamwork in the hiring process',
                    icon: Users,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-almarai text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="HR Process"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4">
              HR & Recruiting Use Cases
            </h2>
            <p className="text-xl text-gray-600">
              See how organizations use our platform to improve their HR processes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-almarai text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="text-sm font-almarai text-blue-600">
                  {useCase.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4">
              Ready to Transform Your HR Process?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of organizations using our platform to streamline their HR operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition duration-150"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
