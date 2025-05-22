import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmbedOptions } from './share/EmbedOptions';
import { ShareHeader } from './share/ShareHeader';
import { ShareStatusBanner } from './share/ShareStatusBanner';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Model } from 'survey-core';

interface ShareTabProps {
  formId: string;
  survey: Model | null;
}

export function ShareTab({ formId, survey }: ShareTabProps) {
  const [email, setEmail] = useState('');
  const formUrl = `https://votlysurveys.fillout.com/t/${formId}`;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement email invitation logic here
    toast.success('Invitation sent!');
    setEmail('');
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Share Status Banner */}
      <ShareStatusBanner formUrl={formUrl} />

      {/* Share Header with QR Code */}
      <ShareHeader formUrl={formUrl} />

      {/* Email Invite */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-almarai text-gray-900 mb-4">Invite by Email</h3>
        <form onSubmit={handleSendInvite} className="flex rounded-md shadow-sm">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-l-0 border-transparent rounded-r-md bg-indigo-600 text-sm font-almarai text-white hover:bg-indigo-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send
          </button>
        </form>
      </div>
      {/* Embed Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <EmbedOptions formUrl={formUrl} survey={survey} />
      </div>
    </div>
  );
}