import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeTabProps {
  formUrl: string;
}

export function QRCodeTab({ formUrl }: QRCodeTabProps) {
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'form-qr-code.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h3 className="text-lg font-almarai text-gray-900 mb-4">QR Code</h3>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <QRCodeSVG
              value={formUrl}
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "https://votly.app/public/web/wp-content/themes/Votly-logo-colored.png",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={downloadQRCode}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}