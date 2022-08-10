import { useFilter } from './context/FilterContext';
import { Filter, NonFilterParameters } from './types';

export const metrics = [
  { label: '#Citations', value: 'inCitationsCount' },
  { label: '#Papers', value: 'papersCount' },
];

export function mapMetric(metricValue: string): string {
  const metricsFiltered = metrics.filter((metric) => metric.value === metricValue);
  return metricsFiltered ? metricsFiltered[0].label : '';
}

function useExportFilename(
  chart: string,
  route: string,
  filter: Filter,
  parameters?: NonFilterParameters
) {
  return `csi_${chart}_${route}_${Object.values({
    ...filter,
    authors: filter.authors.map((author) => author.fullname),
    venues: filter.venues.map((venue) => venue.names),
    ...parameters,
  }).join('_')}`;
}

export function useApexChartExport(chart: string, route: string, parameters?: NonFilterParameters) {
  const { oldFilter } = useFilter();
  return {
    export: {
      csv: {
        filename: useExportFilename(chart, route, oldFilter, parameters),
      },
      png: {
        filename: useExportFilename(chart, route, oldFilter, parameters),
      },
      svg: {
        filename: useExportFilename(chart, route, oldFilter, parameters),
      },
    },
  };
}

export function useGridExport(route: string, parameters?: NonFilterParameters) {
  const { oldFilter } = useFilter();
  return `${useExportFilename('grid', route, oldFilter, parameters)}.csv`;
}

export function useLdaExport(parameters?: NonFilterParameters) {
  const { oldFilter } = useFilter();
  return `${useExportFilename('ldavis', 'topics', oldFilter, parameters)}.html`;
}
