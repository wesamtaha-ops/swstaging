export interface ResponseColumn {
  id: string;
  key: string;
  label: string;
  sortable?: boolean;
  width?: number;
  type?: 'text' | 'status' | 'date' | 'email';
}

export interface ResponseData {
  id: string;
  lastUpdated: string;
  status: 'complete' | 'partial' | 'invalid';
  answers: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    [key: string]: any;
  };
  metadata: {
    browser: string;
    os: string;
    completionRate: number;
  };
}

export interface SortConfig {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface TableFilters {
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: string[];
}