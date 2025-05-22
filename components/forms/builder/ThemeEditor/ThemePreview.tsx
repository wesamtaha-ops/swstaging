import React from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';

interface ThemePreviewProps {
  survey: Model | null;
  theme: any;
}

export function ThemePreview({ survey, theme }: ThemePreviewProps) {
  // Create a clone of the survey for preview
  const previewSurvey = survey ? new Model(survey.toJSON()) : null;

  // Apply theme to preview survey only
  if (previewSurvey) {
    // Create a scoped theme that won't affect the creator
    const scopedTheme = {
      ...theme,
      cssVariables: {
        ...theme.cssVariables
      }
    };

    previewSurvey.applyTheme(scopedTheme);
  }

  return (
    <div className="theme-preview-container">
      {previewSurvey && (
        <div className="survey-preview">
          <Survey model={previewSurvey} />
        </div>
      )}
    </div>
  );
}