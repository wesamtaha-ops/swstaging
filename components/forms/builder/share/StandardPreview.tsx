import React from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';

interface StandardPreviewProps {
  width: string;
  height: string;
  survey: Model | null;
}

export function StandardPreview({ width, height, survey }: StandardPreviewProps) {
  if (!survey) return null;

  return (
    <div
      style={{
        width,
        height,
      }}
      className="bg-white border border-gray-200 rounded-md"
    >
      <Survey model={survey} />
    </div>
  );
}