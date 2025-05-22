import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-lg mb-4">
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-indigo max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Profile information</li>
              <li>Form responses and submissions</li>
              <li>Payment information</li>
              <li>Communications with us</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraud and abuse</li>
            </ul>

            <h2>3. GDPR Compliance</h2>
            <p>
              For users in the European Union, we comply with GDPR requirements:
            </p>
            <ul>
              <li>Right to access your data</li>
              <li>Right to rectification</li>
              <li>Right to erasure</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span className="text-sm text-gray-500">Your data is protected and encrypted</span>
              </div>
              <Link
                to="/legal/cookies"
                className="text-sm font-almarai text-indigo-600 hover:text-indigo-500"
              >
                View Cookie Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}