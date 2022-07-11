import { useFilter } from './context/FilterContext';
import { Filter, NonFilterParameters } from './types';

export const metrics = [
  { label: '#Papers', value: 'papersCount' },
  { label: '#Citations', value: 'inCitationsCount' },
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
  return `d4_${chart}_${route}_${Object.values({ ...filter, ...parameters }).join('_')}`;
}

export function useExport(chart: string, route: string, parameters?: NonFilterParameters) {
  const { filter } = useFilter();
  return {
    export: {
      csv: {
        filename: useExportFilename(chart, route, filter, parameters),
      },
      png: {
        filename: useExportFilename(chart, route, filter, parameters),
      },
      svg: {
        filename: useExportFilename(chart, route, filter, parameters),
      },
    },
  };
}

export function useGridExport(route: string, parameters?: NonFilterParameters) {
  const { filter } = useFilter();
  return `${useExportFilename('grid', route, filter, parameters)}.csv`;
}
