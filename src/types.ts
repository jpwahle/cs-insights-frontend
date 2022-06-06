import { GridColumns } from '@mui/x-data-grid';
import { SvgIconComponent } from '@mui/icons-material';

export interface BarChartProps {
  yDimension: string;
  route: string;
}

export interface Paper {
  yearPublished: number;
  inCitationsCount: number;
  title: string;
  venue: string;
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
  accessType: string | null;
  typesOfPaper: string[];
  fieldsOfStudy: string[];
  publishers: string[];
};

export type FilterCategoricalProps<T> = {
  label: string;
  route: string;
  tooltip: string;
  value: T;
  setValue(value: T): void;
};

export interface FilterYear {
  label: string;
  value: string;
  setValue(value: string): void;
}

export interface GridProps {
  route: string;
  columns: GridColumns & { tooltip?: string };
}

export interface IconLabelProps {
  label: string;
  icon: SvgIconComponent;
}

export type YearsData = { years: string[]; counts: number[] };
export type GridData<T> = { rowCount: number; rows: T[] };

export type NonFilterParameters = {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: string;
  column?: string;
  pattern?: string;
};

export type StringArrayParameters = {
  typesOfPaper?: string[];
  fieldsOfStudy?: string[];
  publishers?: string[];
};

export type QueryParameters = {
  yearStart?: string;
  yearEnd?: string;
  authors?: AuthorFilter[];
  venues?: VenueFilter[];
  accessType?: string | null;
} & StringArrayParameters &
  NonFilterParameters;
