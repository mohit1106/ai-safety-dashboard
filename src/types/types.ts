// src/types/types.ts
export interface Incident {
    id: number;
    title: string;
    description: string;
    severity: "Low" | "Medium" | "High";
    reported_at: string;
  }
  
  export type SortDirection = "newest" | "oldest";
  export type SeverityFilter = "All" | "Low" | "Medium" | "High";