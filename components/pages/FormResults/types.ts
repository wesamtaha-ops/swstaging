export interface Response {
  id: string;
  submittedAt: string;
  respondent: {
    age: string;
    gender: string;
    location: string;
    device?: string;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  completionTime: string;
  answers: {
    satisfaction: number;
    recommendation: number;
    comments: string;
    [key: string]: any;
  };
}

export interface FormMetrics {
  totalResponses: number;
  completionRate: number;
  averageTime: string;
  responseRate: number;
}