import React from 'react';
import {
  Users, Target, Award, Globe,
  Shield, Zap, Heart
} from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Forms Created', value: '1M+', icon: Shield },
    { label: 'Countries', value: '150+', icon: Globe },
    { label: 'Team Members', value: '45+', icon: Award }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To empower organizations with intuitive form-building tools that transform data collection and analysis.'
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'We believe in transparency, innovation, and putting our users first in everything we do.'
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'Helping businesses worldwide streamline their workflows and make data-driven decisions.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Leading our mission to transform data collection and analysis.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Driving innovation in form technology and AI integration.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Creating beautiful and intuitive user experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-t from-indigo-600/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
            About Votly
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-indigo-100 leading-relaxed">
            We're revolutionizing how organizations collect, analyze, and act on data
            through intelligent form solutions.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-6">
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <p className="text-3xl   font-bold font-almarai font-almarai  font-almarai bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {stat.value}
              </p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl   font-bold font-almarai font-almarai  font-almarai bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Our Mission & Values
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Guided by strong principles and a clear vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-xl p-8 shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-6">
                <value.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-almarai text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl   font-bold font-almarai font-almarai  font-almarai bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Meet Our Team
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              The people behind Votly's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-8 shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl transform rotate-6 scale-105 opacity-20" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-xl mx-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-almarai text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-almarai mt-1">{member.role}</p>
                  <p className="mt-4 text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-white mb-4">
            Ready to Transform Your Data Collection?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already using Votly to create beautiful forms and surveys.
          </p>
          <button className="inline-flex items-center px-8 py-4 border-2 border-white rounded-lg text-white font-almarai hover:bg-white hover:text-indigo-600 transition-all duration-200">
            <Zap className="h-5 w-5 mr-2" />
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
}