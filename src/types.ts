interface PaperOverTime {
  years: string[];
  papers: number[];
}

interface CiteOverTime {
  years: string[];
  cites: number[];
}

export type DatapointOverTime = PaperOverTime | CiteOverTime;

export interface ChartOverTimeProps {
  labels: string[];
  values: number[];
}

export interface PaperStats {
  timeData: DatapointOverTime;
}

export interface Paper {
  year: number;
  cites: number;
  title: string;
  venues: string;
  authors: string[];
}
