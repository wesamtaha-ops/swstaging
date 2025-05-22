import React from 'react';
import { DocContent } from '../DocContent';
import { APIEndpoint } from '../APIEndpoint';

export function APIReference() {
  const content = (
    <>
      <p>
        The Formify API provides comprehensive access to all platform features. Use our RESTful API to create forms, collect responses, and analyze data programmatically.
      </p>

      <h2>Authentication</h2>
      <p>
        All API requests require authentication using an API key. Include your API key in the Authorization header:
      </p>
      <CodeBlock
        code={`Authorization: Bearer your-api-key-here`}
        language="bash"
        title="Authentication Header"
      />

      <h2>Forms API</h2>
      <APIEndpoint
        method="POST"
        endpoint="/api/v1/forms"
        description="Create a new form"
        requestBody={{
          type: "application/json",
          example: {
            title: "Customer Feedback",
            description: "Annual customer satisfaction survey",
            fields: [
              {
                type: "rating",
                label: "How satisfied are you with our service?",
                required: true,
                scale: 5
              }
            ]
          }
        }}
        responseBody={{
          type: "application/json",
          example: {
            id: "form_123",
            title: "Customer Feedback",
            status: "draft",
            created_at: "2024-02-20T10:30:00Z"
          }
        }}
      />

      <APIEndpoint
        method="GET"
        endpoint="/api/v1/forms/{formId}/responses"
        description="Get form responses"
        parameters={[
          {
            name: "formId",
            type: "string",
            required: true,
            description: "The ID of the form"
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number for pagination"
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of responses per page"
          }
        ]}
      />

      <h2>Rate Limits</h2>
      <p>
        API requests are limited based on your subscription plan:
      </p>
      <ul>
        <li>Free: 100 requests per hour</li>
        <li>Pro: 1,000 requests per hour</li>
        <li>Enterprise: Custom limits</li>
      </ul>

      <h2>Error Handling</h2>
      <p>
        The API uses standard HTTP response codes:
      </p>
      <ul>
        <li>200: Success</li>
        <li>400: Bad Request</li>
        <li>401: Unauthorized</li>
        <li>403: Forbidden</li>
        <li>404: Not Found</li>
        <li>429: Too Many Requests</li>
        <li>500: Internal Server Error</li>
      </ul>

      <h2>Webhooks</h2>
      <p>
        Set up webhooks to receive real-time notifications:
      </p>
      <APIEndpoint
        method="POST"
        endpoint="/api/v1/webhooks"
        description="Create a webhook subscription"
        requestBody={{
          type: "application/json",
          example: {
            url: "https://your-domain.com/webhook",
            events: ["form.response.created", "form.response.updated"],
            secret: "your-webhook-secret"
          }
        }}
      />
    </>
  );

  return (
    <DocContent
      title="API Reference"
      description="Complete reference for the Formify API"
      lastUpdated="2024-02-20"
      content={content}
      nextPage={{
        title: "Webhooks",
        href: "/docs/webhooks"
      }}
      relatedDocs={[
        {
          title: "Authentication",
          href: "/docs/api/auth"
        },
        {
          title: "Rate Limits",
          href: "/docs/api/rate-limits"
        }
      ]}
    />
  );
}