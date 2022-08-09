import { GridColumns } from '@mui/x-data-grid';
import { SvgIconComponent } from '@mui/icons-material';

export interface BarChartProps {
  yDimension: string;
  route: string;
}

export interface GridProps {
  route: string;
  columns: GridColumns & { tooltip?: string };
}

export interface BoxPlotProps {
  xLabel: string;
  route: string;
}

export interface TreeMapProps {
  yDimension: string;
  route: string;
}

export interface GraphsProps {
  barChartYDimension: string;
  route: string;
  columns: GridColumns;
}

export type Paper = {
  yearPublished: string;
  inCitationsCount: string;
  title: string;
  venue: string;
  authors: string;
};

export type Venue = {
  yearStart: string;
  yearEnd: string;
  inCitationsCount: string;
  venue: string;
};

export type AuthorFilter = {
  _id: string;
  fullname: string;
};

export type VenueFilter = {
  _id: string;
  names: string;
};

export type Filter = {
  yearStart: string;
  yearEnd: string;
  citationsMin: string;
  citationsMax: string;
  authors: AuthorFilter[];
  venues: VenueFilter[];
  accessType: string | null;
  typesOfPaper: string[];
  fieldsOfStudy: string[];
  publishers: string[];
  metric: string;
};

export type FilterAutocompleteProps<T> = {
  label: string;
  labelName: string;
  route: string;
  helpTooltip: string;
  value: T;
  setValue(value: T): void;
};

export type FilterRangeProps = {
  label: string;
  labelStart: string;
  labelEnd: string;
  helpTooltip: string;
  valueStart: string;
  valueEnd: string;
  setValueStart(valueStart: string): void;
  setValueEnd(valueEnd: string): void;
};

export interface FilterTextFieldProps {
  label: string;
  value: string;
  setValue(value: string): void;
}

export interface IconLabelProps {
  label: string;
  icon: SvgIconComponent;
}

export type YearsData = { years: string[]; counts: number[] };
export type GridData<T> = { rowCount: number; rows: T[] };
export type QuartilesData = number[];
export type TreeMapData = { x: string[]; y: number }[];
export type TreeMapDataBackend = { x: string; y: number }[];

export type NonFilterParameters = {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: string;
  column?: string;
  pattern?: string;
  k?: number;
  modelId?: string;
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
  citationsMin: string;
  citationsMax: string;
} & StringArrayParameters &
  NonFilterParameters;

export type Status = {
  status: string;
  version: string;
};
export type LdaVisData = {
  mdsDat: { x: number[]; y: number[]; topics: number[]; cluster: number[]; Freq: number[] };
  tinfo: {
    Term: string[];
    Freq: number[];
    Total: number[];
    Category: string[];
    logprob: number[];
    loglift: number[];
  };
  'token.table': {
    Topic: number[];
    Freq: number[];
    Term: string[];
  };
  R: string;
  'lambda.step': number;
  'plot.opts': { xlab: string; ylab: string };
  'topic.order': number[];
};

export type AuthContextType = {
  token: string;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
};
