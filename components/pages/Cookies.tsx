import React from 'react';
import { Cookie, Shield, Bell } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-lg mb-4">
            <Cookie className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Cookie Policy</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-indigo max-w-none">
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you
              visit our website. They are widely used to make websites work more efficiently and
              provide a better user experience.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul>
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
              <li>Marketing and advertising</li>
              <li>Third-party integrations</li>
            </ul>

            <h2>3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-almarai text-gray-900">Essential Cookies</h3>
                <p className="text-sm text-gray-600">
                  Required for basic site functionality. Cannot be disabled.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-almarai text-gray-900">Functional Cookies</h3>
                <p className="text-sm text-gray-600">
                  Enable advanced features and personalization.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-almarai text-gray-900">Analytics Cookies</h3>
                <p className="text-sm text-gray-600">
                  Help us understand how visitors interact with our website.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-almarai text-gray-900">Marketing Cookies</h3>
                <p className="text-sm text-gray-600">
                  Used to deliver relevant advertisements and track their effectiveness.
                </p>
              </div>
            </div>

            <h2>4. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences.
              However, limiting cookies may impact your experience using our website.
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span className="text-sm text-gray-500">Your privacy is important to us</span>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                <Bell className="h-4 w-4 mr-2" />
                Manage Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}