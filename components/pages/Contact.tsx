import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, MessageCircle,
  Send, Clock, Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-t from-indigo-600/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl   font-bold font-almarai font-almarai  font-almarai mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
            {t('contact.heroTitle')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-indigo-100 leading-relaxed">
            {t('contact.heroSubtitle')}
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-6">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-almarai text-gray-900 mb-2">{t('contact.emailTitle')}</h3>
            <p className="text-gray-600">support@votly.com</p>
            <p className="mt-2 text-sm text-gray-500">{t('contact.emailSubtitle')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-6">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-almarai text-gray-900 mb-2">{t('contact.callTitle')}</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="mt-2 text-sm text-gray-500">{t('contact.callSubtitle')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-6">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-almarai text-gray-900 mb-2">{t('contact.chatTitle')}</h3>
            <p className="text-gray-600">{t('contact.available247')}</p>
            <p className="mt-2 text-sm text-gray-500">{t('contact.chatSubtitle')}</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 mb-8">{t('contact.formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-almarai text-gray-700">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-almarai text-gray-700">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-almarai text-gray-700">
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-almarai text-gray-700">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-almarai rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                {t('contact.sendMessage')}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl   font-bold font-almarai font-almarai  font-almarai bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
              {t('contact.visitTitle')}
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-almarai text-gray-900">{t('contact.locationTitle')}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                    {t('contact.locationDetails')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-almarai text-gray-900">{t('contact.hoursTitle')}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                    {t('contact.hoursDetails')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-almarai text-gray-900">{t('contact.supportTitle')}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{t('contact.supportDetails')}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 h-64 rounded-lg bg-white shadow-inner overflow-hidden">
              <iframe
                title="Office Location"
                className="w-full h-full"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673758256813!2d-122.39633708439398!3d37.78779997975772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c31%3A0x3f10598e2a3c99f2!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1645654732455!5m2!1sen!2sus"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
