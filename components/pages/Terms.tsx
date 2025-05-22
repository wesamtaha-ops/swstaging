import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-lg mb-4">
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-indigo max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Formify's services, you agree to be bound by these Terms of Service
              and all applicable laws and regulations. If you do not agree with any of these terms, you
              are prohibited from using or accessing our service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access and use Formify's services for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>

            <h2>3. Account Terms</h2>
            <p>
              You are responsible for maintaining the security of your account and password. Formify
              cannot and will not be liable for any loss or damage from your failure to comply with
              this security obligation.
            </p>

            <h2>4. Service Modifications</h2>
            <p>
              Formify reserves the right to modify or discontinue, temporarily or permanently, the
              service with or without notice. We shall not be liable to you or to any third party for
              any modification, suspension, or discontinuance of the service.
            </p>

            <h2>5. Data Protection</h2>
            <p>
              Your use of Formify's services is also governed by our Privacy Policy. Please review our
              Privacy Policy, which also governs the Site and informs users of our data collection
              practices.
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span className="text-sm text-gray-500">Protected by industry-standard security</span>
              </div>
              <Link
                to="/legal/privacy"
                className="text-sm font-almarai text-indigo-600 hover:text-indigo-500"
              >
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}