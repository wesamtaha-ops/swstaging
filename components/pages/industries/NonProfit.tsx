import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  ClipboardList,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calendar,
  BarChart2,
  Globe,
  Mail,
  HandHeart,
  UserCheck,
} from 'lucide-react';

export default function NonProfit() {
  const features = [
    {
      title: 'Donation Forms',
      description: 'Create secure and optimized donation collection forms',
      icon: DollarSign,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Volunteer Registration',
      description: 'Streamline volunteer signup and management',
      icon: UserCheck,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Event Management',
      description: 'Organize and track fundraising events',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Impact Tracking',
      description: 'Measure and report on program outcomes',
      icon: BarChart2,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const useCases = [
    {
      title: 'Fundraising',
      description: 'Optimize donation collection and donor management',
      icon: HandHeart,
      stats: '40% increase in donations',
    },
    {
      title: 'Volunteer Programs',
      description: 'Efficiently manage volunteer programs',
      icon: Users,
      stats: '50% less admin time',
    },
    {
      title: 'Global Outreach',
      description: 'Expand your reach with multilingual forms',
      icon: Globe,
      stats: '3x wider reach',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden'>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgxMnYxMkgzNnpNMTIgMzRoMTJ2MTJIMTIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative'>
          <div className='text-center max-w-3xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className='inline-flex items-center px-4 py-1 rounded-full text-sm font-almarai bg-purple-500/20 text-white mb-6'>
                <Heart className='h-4 w-4 mr-2' />
                Non-Profit Solutions
              </div>
              <h1 className='text-4xl md:text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6'>
                Forms That Make a Difference
              </h1>
              <p className='text-xl mb-8 text-purple-100'>
                Empower your non-profit organization with digital forms that
                streamline operations, engage donors, and maximize your impact.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link
                  to='/signup'
                  className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-purple-600 bg-white hover:bg-purple-50 transition duration-150'>
                  Start Free Trial
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
                <Link
                  to='/templates/non-profit'
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
              Built for Non-Profits
            </h2>
            <p className='text-xl text-gray-600'>
              Tools designed to help you focus on what matters most - your
              mission
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

      {/* Donor Engagement Section */}
      <div className='py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-6'>
                Engage Donors and Volunteers
              </h2>
              <div className='space-y-6'>
                {[
                  {
                    title: 'Smart Donation Forms',
                    description:
                      'Optimize donation forms for maximum conversion',
                    icon: DollarSign,
                  },
                  {
                    title: 'Email Integration',
                    description: 'Automated donor communication and receipts',
                    icon: Mail,
                  },
                  {
                    title: 'Impact Reporting',
                    description: 'Share your success with stakeholders',
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
                      <div className='p-3 bg-purple-100 rounded-lg'>
                        <item.icon className='h-6 w-6 text-purple-600' />
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
                src='https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                alt='Donor Engagement'
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
              Non-Profit Use Cases
            </h2>
            <p className='text-xl text-gray-600'>
              See how non-profits use our platform to increase their impact
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
                <div className='bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                  <useCase.icon className='h-6 w-6 text-purple-600' />
                </div>
                <h3 className='text-xl font-almarai text-gray-900 mb-2'>
                  {useCase.title}
                </h3>
                <p className='text-gray-600 mb-4'>{useCase.description}</p>
                <div className='text-sm font-almarai text-purple-600'>
                  {useCase.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-purple-600 py-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4'>
              Ready to Amplify Your Impact?
            </h2>
            <p className='text-xl text-purple-100 mb-8'>
              Join non-profits worldwide using our platform to make a
              difference.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link
                to='/signup'
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-almarai rounded-md shadow-sm text-purple-600 bg-white hover:bg-purple-50 transition duration-150'>
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
