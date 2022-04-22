import { GridColumns } from '@mui/x-data-grid';

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

export type AuthorFilter = {
  _id: string;
  fullname: string;
};

export type VenueFilter = {
  _id: string;
  name: string;
};

export interface SidebarProps {
  yearStart: string;
  setYearStart(yearStart: string): void;
  yearEnd: string;
  setYearEnd(yearEnd: string): void;
  author: AuthorFilter | null;
  setAuthor(author: AuthorFilter | null): void;
  venue: VenueFilter | null;
  setVenue(venue: VenueFilter | null): void;
  labels: string[];
  setLabels(labels: string[]): void;
  values: number[];
  setValues(values: number[]): void;
  rowCount: number;
  setRowCount(rowCount: number): void;
  rows: Paper[];
  setRows(rows: Paper[]): void;
}

export interface GraphsProps {
  labels: string[];
  setLabels(labels: string[]): void;
  values: number[];
  setValues(values: number[]): void;
  rowCount: number;
  setRowCount(rowCount: number): void;
  rows: Paper[];
  setRows(rows: Paper[]): void;
  columns: GridColumns;
}

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
