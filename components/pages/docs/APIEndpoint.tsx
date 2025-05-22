import React from 'react';
import { CodeBlock } from './CodeBlock';

interface APIEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  requestBody?: {
    type: string;
    example: any;
  };
  responseBody?: {
    type: string;
    example: any;
  };
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

export function APIEndpoint({
  method,
  endpoint,
  description,
  requestBody,
  responseBody,
  parameters
}: APIEndpointProps) {
  const methodColors = {
    GET: 'bg-green-100 text-green-800',
    POST: 'bg-blue-100 text-blue-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800',
    PATCH: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-almarai ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm bg-gray-100 px-3 py-1 rounded-md">
          {endpoint}
        </code>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      {parameters && parameters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-almarai text-gray-900 mb-3">Parameters</h4>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">Required</th>
                  <th className="px-6 py-3 text-left text-xs font-almarai text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parameters.map((param) => (
                  <tr key={param.name}>
                    <td className="px-6 py-4 text-sm font-almarai text-gray-900">{param.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{param.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {param.required ? (
                        <span className="text-red-600">Required</span>
                      ) : (
                        <span className="text-gray-400">Optional</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {requestBody && (
        <div className="mb-6">
          <h4 className="text-sm font-almarai text-gray-900 mb-3">Request Body</h4>
          <p className="text-sm text-gray-500 mb-2">Type: {requestBody.type}</p>
          <CodeBlock
            code={JSON.stringify(requestBody.example, null, 2)}
            language="json"
            title="Request Example"
          />
        </div>
      )}

      {responseBody && (
        <div>
          <h4 className="text-sm font-almarai text-gray-900 mb-3">Response</h4>
          <p className="text-sm text-gray-500 mb-2">Type: {responseBody.type}</p>
          <CodeBlock
            code={JSON.stringify(responseBody.example, null, 2)}
            language="json"
            title="Response Example"
          />
        </div>
      )}
    </div>
  );
}