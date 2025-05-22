import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-t-lg">
          {title}
        </div>
      )}
      <div className={`relative ${title ? 'mt-10' : ''}`}>
        <pre className={`language-${language} rounded-lg bg-gray-900 p-4 overflow-x-auto`}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}