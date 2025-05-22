import React from 'react';
import { DocContent } from '../DocContent';
import { Shield, Lock, Key } from 'lucide-react';

export function Security() {
  const content = (
    <>
      <p>
        Security is at the core of everything we do at Formify. We implement industry-leading security measures to protect your data and ensure compliance with global privacy regulations.
      </p>

      <h2>Data Protection</h2>
      <ul>
        <li>End-to-end encryption for all data in transit and at rest</li>
        <li>Regular security audits and penetration testing</li>
        <li>Multi-factor authentication support</li>
        <li>Role-based access control (RBAC)</li>
        <li>Regular backups with point-in-time recovery</li>
      </ul>

      <h2>Infrastructure Security</h2>
      <p>
        Our infrastructure is hosted on enterprise-grade cloud providers with:
      </p>
      <ul>
        <li>SOC 2 Type II certification</li>
        <li>ISO 27001 compliance</li>
        <li>24/7 monitoring and alerting</li>
        <li>DDoS protection</li>
        <li>Regular vulnerability scanning</li>
      </ul>

      <h2>Data Privacy</h2>
      <p>
        We maintain strict data privacy controls:
      </p>
      <ul>
        <li>GDPR compliance for EU data subjects</li>
        <li>CCPA compliance for California residents</li>
        <li>Data residency options for enterprise customers</li>
        <li>Configurable data retention policies</li>
        <li>Data anonymization options</li>
      </ul>

      <h2>Access Controls</h2>
      <p>
        Protect your forms and data with:
      </p>
      <ul>
        <li>Fine-grained user permissions</li>
        <li>IP address restrictions</li>
        <li>Single Sign-On (SSO) integration</li>
        <li>Session management</li>
        <li>Audit logging</li>
      </ul>

      <h2>Compliance</h2>
      <p>
        Our platform helps you maintain compliance with:
      </p>
      <ul>
        <li>GDPR</li>
        <li>CCPA</li>
        <li>HIPAA (with Business Associate Agreement)</li>
        <li>SOC 2</li>
        <li>ISO 27001</li>
      </ul>

      <h2>Security Best Practices</h2>
      <p>
        Recommended security measures for your forms:
      </p>
      <ul>
        <li>Enable CAPTCHA for public forms</li>
        <li>Set up IP address restrictions</li>
        <li>Use secure file upload settings</li>
        <li>Implement response encryption</li>
        <li>Regular access reviews</li>
      </ul>

      <h2>Incident Response</h2>
      <p>
        Our incident response process includes:
      </p>
      <ul>
        <li>24/7 security monitoring</li>
        <li>Automated threat detection</li>
        <li>Incident response team</li>
        <li>Customer notification procedures</li>
        <li>Post-incident analysis</li>
      </ul>

      <h2>Security Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Shield className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-almarai mb-2">SOC 2 Type II</h3>
          <p className="text-sm text-gray-600">
            Certified secure operations and controls
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Lock className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-almarai mb-2">ISO 27001</h3>
          <p className="text-sm text-gray-600">
            Information security management
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Key className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-almarai mb-2">GDPR Compliant</h3>
          <p className="text-sm text-gray-600">
            EU data protection standards
          </p>
        </div>
      </div>
    </>
  );

  return (
    <DocContent
      title="Security Overview"
      description="Learn about Formify's enterprise-grade security measures"
      lastUpdated="2024-02-20"
      content={content}
      nextPage={{
        title: "Privacy Controls",
        href: "/docs/privacy"
      }}
      relatedDocs={[
        {
          title: "Compliance",
          href: "/docs/compliance"
        },
        {
          title: "Access Controls",
          href: "/docs/access-controls"
        }
      ]}
    />
  );
}