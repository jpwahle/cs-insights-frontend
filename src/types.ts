import { GridColumns } from '@mui/x-data-grid';
import { SvgIconComponent } from '@mui/icons-material';

export interface BarChartProps {
  yDimension: string;
  route: string;
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
  authors: AuthorFilter[];
  venues: VenueFilter[];
};

export type FilterCategoricalProps<T> = {
  label: string;
  route: string;
  value: T[];
  setValue(value: T[]): void;
};

export interface FilterYear {
  label: string;
  value: string;
  setValue(value: string): void;
}

export interface GridProps {
  route: string;
  columns: GridColumns;
}

export interface IconLabelProps {
  label: string;
  icon: SvgIconComponent;
}

export type StatsData = { years: string[]; counts: number[] };
export type GridData<T> = { rowCount: number; rows: T[] };

export type PagedParameters = {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: string;
};

export type QueryParameters = {
  yearStart?: string;
  yearEnd?: string;
  authors?: AuthorFilter[];
  venues?: VenueFilter[];
} & PagedParameters;
