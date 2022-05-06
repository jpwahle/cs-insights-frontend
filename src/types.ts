import { GridColumns } from '@mui/x-data-grid';
import { SvgIconComponent } from '@mui/icons-material';

interface PaperOverTime {
  years: string[];
  papers: number[];
}

interface CiteOverTime {
  years: string[];
  cites: number[];
}

export type DatapointOverTime = PaperOverTime | CiteOverTime;

export interface BarChartProps {
  yLabel: string;
  route: string;
  refetch: number;
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

export type AuthorFilter = {
  _id: string;
  fullname: string;
};

export type VenueFilter = {
  _id: string;
  name: string;
};

export type Filter = {
  yearStart: string;
  yearEnd: string;
  author: AuthorFilter | null;
  venue: VenueFilter | null;
};

export type FilterCategoricalProps<T> = {
  label: string;
  route: string;
  value: T | null;
  setValue(value: T | null): void;
};

export interface FilterYear {
  label: string;
  value: string;
  setValue(value: string): void;
}

export interface GridProps {
  route: string;
  columns: GridColumns;
  // refresh: number;
}

// export interface CategoriesProps {
//   fetchData(): void;
// }

export interface IconLabelProps {
  label: string;
  icon: SvgIconComponent;
}

export type Network = {
  token: string;
  setSnack: (message: string) => void;
};

export type StatsData = { years: string[]; cites: number[] };
export type GridData<T> = { rowCount: number; rows: T[] };

export type QueryParameters = {
  page?: number;
  pageSize?: number;
  yearStart?: string;
  yearEnd?: string;
  author?: AuthorFilter | null;
  venue?: VenueFilter | null;
};
