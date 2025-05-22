import React from 'react';
import { DocContent } from '../DocContent';
import { CodeBlock } from '../CodeBlock';

export function AIFormGeneration() {
  const content = (
    <>
      <p>
        Formify's AI form generation feature allows you to create professional forms in seconds using natural language descriptions. Simply describe what you need, and our AI will generate a complete form with appropriate fields, validation, and logic.
      </p>

      <h2>How It Works</h2>
      <p>
        Our AI form generation process follows these steps:
      </p>
      <ol>
        <li>Analyze your requirements using natural language processing</li>
        <li>Identify relevant question types and field structures</li>
        <li>Generate appropriate validation rules and logic</li>
        <li>Create a complete form structure</li>
        <li>Allow customization and refinement</li>
      </ol>

      <h2>Using AI Generation</h2>
      <CodeBlock
        code={`// Example: Creating a form using AI
const response = await formify.ai.generateForm({
  description: "Create a customer feedback survey for a restaurant that includes rating questions for food quality, service, and ambiance, plus an open-ended comment section",
  industry: "hospitality",
  language: "en"
});`}
        language="typescript"
        title="AI Form Generation Example"
      />

      <h2>Best Practices</h2>
      <ul>
        <li>Be specific about your requirements</li>
        <li>Include context about your target audience</li>
        <li>Specify any required fields or validation rules</li>
        <li>Mention industry-specific needs</li>
        <li>Include language and localization preferences</li>
      </ul>

      <h2>Customization Options</h2>
      <p>
        After AI generation, you can:
      </p>
      <ul>
        <li>Modify question wording and order</li>
        <li>Add or remove fields</li>
        <li>Adjust validation rules</li>
        <li>Customize the design and layout</li>
        <li>Add conditional logic</li>
      </ul>

      <h2>Example Prompts</h2>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-almarai mb-2">Job Application Form</h3>
        <p className="text-gray-600">
          "Create a job application form for a software developer position that includes sections for personal information, work experience, education, skills assessment, and a coding challenge submission"
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-almarai mb-2">Event Registration</h3>
        <p className="text-gray-600">
          "Generate a conference registration form with ticket selection, workshop preferences, dietary requirements, and payment information collection"
        </p>
      </div>

      <h2>Limitations</h2>
      <p>
        While our AI is powerful, be aware of these limitations:
      </p>
      <ul>
        <li>Complex conditional logic may need manual refinement</li>
        <li>Industry-specific compliance rules should be reviewed</li>
        <li>Custom calculations may need manual setup</li>
        <li>Highly specialized forms may require additional customization</li>
      </ul>

      <h2>Tips for Better Results</h2>
      <ul>
        <li>Include specific field types needed</li>
        <li>Mention any required validations</li>
        <li>Specify the target audience</li>
        <li>Include any branding requirements</li>
        <li>Mention mobile responsiveness needs</li>
      </ul>
    </>
  );

  return (
    <DocContent
      title="AI Form Generation"
      description="Learn how to create forms instantly using AI"
      lastUpdated="2024-02-20"
      content={content}
      nextPage={{
        title: "AI Response Analysis",
        href: "/docs/ai-analysis"
      }}
      relatedDocs={[
        {
          title: "Form Templates",
          href: "/docs/templates"
        },
        {
          title: "Form Building Basics",
          href: "/docs/form-basics"
        }
      ]}
    />
  );
}