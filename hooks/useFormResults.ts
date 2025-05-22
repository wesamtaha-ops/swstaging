import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { Response } from '@/components/pages/FormResults/types';

export function useFormResults(formId: string) {
  const [responses, setResponses] = useState<Response[]>([]);
  const [view, setView] = useState<'individual' | 'aggregate'>('aggregate');
  const [dateRange, setDateRange] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'spss'>('excel');

  useEffect(() => {
    // In real app, fetch from API
    const mockResponses: Response[] = [
      {
        id: '1',
        submittedAt: '2024-02-20T10:30:00',
        respondent: {
          age: '25-34',
          gender: 'Female',
          location: 'United States'
        },
        sentiment: 'positive',
        completionTime: '2m 34s',
        answers: {
          satisfaction: 4.5,
          recommendation: 9,
          comments: 'Great experience overall!'
        }
      }
    ];
    setResponses(mockResponses);
  }, [formId]);

  const exportData = async (format: 'excel' | 'csv' | 'spss') => {
    switch (format) {
      case 'excel':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(responses);
        XLSX.utils.book_append_sheet(wb, ws, 'Responses');
        XLSX.writeFile(wb, 'form_responses.xlsx');
        break;
      case 'csv':
        const csv = Papa.unparse(responses);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form_responses.csv';
        a.click();
        break;
      case 'spss':
        // Implement SPSS export format
        break;
    }
  };

  return {
    responses,
    view,
    setView,
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
    selectedLanguage,
    setSelectedLanguage,
    showAIAnalysis,
    setShowAIAnalysis,
    exportFormat,
    setExportFormat,
    exportData
  };
}