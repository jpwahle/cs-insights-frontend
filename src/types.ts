interface PapersOverTime {
  year: number;
  papers: number;
}

interface CitesOverTime {
  year: number;
  cites: number;
}

export type DataOverTime = PapersOverTime[] | CitesOverTime[];

export interface ChartOverTimeProps {
  labels: string;
  values: string;
}

export interface PaperStats {
  time: DataOverTime;
  total: number;
  top: Paper[];
}

export interface Paper {
  year: number;
  cites: number;
  title: string;
  venues: string;
  authors: string[];
}
