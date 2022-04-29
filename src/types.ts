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

export interface ChartOverTimeProps {
  labels: string[];
  values: number[];
  yLabel: string;
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

export interface GraphsProps {
  columns: GridColumns;
}

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
  view: string;
  columns: GridColumns;
  rowCount: number;
  setRowCount(rowCount: number): void;
  rows: Paper[];
  setRows(rows: Paper[]): void;
}

export interface CategoriesProps {
  fetchData(): void;
}

export interface IconLabelProps {
  label: string;
  icon: SvgIconComponent;
}

export type Network = {
  token: string;
  setSnack: (message: string) => void;
};
