import React from 'react';
import { QrCode, Copy, Share2, Facebook, Twitter, Linkedin, X } from 'lucide-react';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import { QRCodeSVG } from 'qrcode.react';

interface ShareHeaderProps {
  formUrl: string;
}

export function ShareHeader({ formUrl }: ShareHeaderProps) {
  const [isQRModalOpen, setIsQRModalOpen] = React.useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = async (platform: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(formUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(formUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(formUrl)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-almarai text-gray-900">Share Your Form</h3>
          </div>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <QrCode className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={formUrl}
              readOnly
              className="w-full pr-24 pl-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCopyLink}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-almarai text-gray-600 hover:bg-gray-50"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Dialog.Root open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none">
            <div className="flex flex-col items-center">
              <Dialog.Title className="text-xl font-almarai text-gray-900 mb-6">
                QR Code
              </Dialog.Title>

              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
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

              <button
                onClick={downloadQRCode}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Download QR Code
              </button>
            </div>

            <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
