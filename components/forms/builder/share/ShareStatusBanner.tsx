import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ShareStatusBannerProps {
  formUrl: string;
}

export function ShareStatusBanner({ formUrl }: ShareStatusBannerProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-almarai text-green-800">
            Your form is ready to share
          </h3>
          <div className="mt-1 text-sm text-green-700">
            Share the link directly or embed it on any site.
          </div>
        </div>
      </div>
    </div>
  );
}
