import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Home,
  ClipboardList,
  Users,
  ArrowRight,
  CheckCircle,
  Key,
  FileText,
  Calendar,
  Search,
  BarChart2,
  Building,
} from 'lucide-react';

export default function RealEstate() {
  const features = [
    {
      title: 'Property Listings',
      description: 'Create detailed property listing forms with photo uploads',
      icon: Home,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Tenant Applications',
      description: 'Streamline tenant screening and application process',
      icon: ClipboardList,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Property Inspections',
      description: 'Mobile-friendly inspection and condition reports',
      icon: Search,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Maintenance Requests',
      description: 'Efficient maintenance and repair request tracking',
      icon: Building,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const useCases = [
    {
      title: 'Property Management',
      description: 'Streamline property management workflows',
      icon: Key,
      stats: '45% faster processing',
    },
    {
      title: 'Tenant Screening',
      description: 'Automated tenant application processing',
      icon: Users,
      stats: '60% less paperwork',
    },
    {
      title: 'Property Analytics',
      description: 'Data-driven property insights',
      icon: BarChart2,
      stats: '3x better insights',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden'>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgxMnYxMkgzNnpNMTIgMzRoMTJ2MTJIMTIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative'>
          <div className='text-center max-w-3xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className='inline-flex items-center px-4 py-1 rounded-full text-sm font-almarai bg-blue-500/20 text-white mb-6'>
                <Home className='h-4 w-4 mr-2' />
                Real Estate Solutions
              </div>
              <h1 className='text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6'>
                Digital Forms for Modern Real Estate
              </h1>
              <p className='text-xl mb-8 text-blue-100'>
                Streamline property management, tenant applications, and
                maintenance requests with powerful digital forms and automation.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link
                  to='/signup'
                  className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition duration-150'>
                  Start Free Trial
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
                <Link
                  to='/templates/real-estate'
                  className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150'>
                  View Templates
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className='py-24 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>
              Built for Real Estate Professionals
            </h2>
            <p className='text-xl text-gray-600'>
              Everything you need to manage properties and tenants efficiently
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
                <div
                  className={`${feature.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-almarai text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6'>
                Streamlined Property Management
              </h2>
              <div className='space-y-6'>
                {[
                  {
                    title: 'Digital Applications',
                    description: 'Process tenant applications online with ease',
                    icon: FileText,
                  },
                  {
                    title: 'Scheduling',
                    description: 'Manage property viewings and inspections',
                    icon: Calendar,
                  },
                  {
                    title: 'Analytics',
                    description: 'Track property performance and tenant data',
                    icon: BarChart2,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='p-3 bg-blue-100 rounded-lg'>
                        <item.icon className='h-6 w-6 text-blue-600' />
                      </div>
                    </div>
                    <div>
                      <h3 className='text-xl font-almarai text-gray-900 mb-1'>
                        {item.title}
                      </h3>
                      <p className='text-gray-600'>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='relative'>
              <img
                src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                alt='Property Management'
                className='rounded-lg shadow-xl'
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className='bg-gray-50 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-4'>
              Real Estate Use Cases
            </h2>
            <p className='text-xl text-gray-600'>
              See how real estate professionals use our platform
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='bg-white p-8 rounded-xl shadow-sm'>
                <div className='bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                  <useCase.icon className='h-6 w-6 text-blue-600' />
                </div>
                <h3 className='text-xl font-almarai text-gray-900 mb-2'>
                  {useCase.title}
                </h3>
                <p className='text-gray-600 mb-4'>{useCase.description}</p>
                <div className='text-sm font-almarai text-blue-600'>
                  {useCase.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-blue-600 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4'>
              Ready to Transform Your Real Estate Forms?
            </h2>
            <p className='text-xl text-blue-100 mb-8'>
              Join thousands of real estate professionals using our platform.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link
                to='/signup'
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition duration-150'>
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
              <Link
                to='/contact'
                className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-almarai rounded-md text-white hover:bg-white/10 transition duration-150'>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
