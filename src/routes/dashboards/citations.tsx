import Frame from '../../components/Frame';
import BarChart from '../../components/visualizations/BarChart';
import { ROUTE_CITATIONS } from '../../consts';
import BoxPlot from '../../components/visualizations/BoxPlot';
import { useFilter } from '../../context/FilterContext';
import { mapMetric } from '../../tools';

export default function Citations() {
  const filter = useFilter();
  let metric = mapMetric(filter.filter.metric);

  return (
    <Frame route={ROUTE_CITATIONS.slice(1)}>
      <div className={'citationsDashboard'}>
        <BarChart route="citationsIn" xDimension="incoming citations" />
        <BarChart route="citationsOut" xDimension="outgoing citations" className={'barchart2'} />
        <BoxPlot xDimension={'incoming citations'} yDimension={metric} route={'citationsIn'} />
        <BoxPlot
          xDimension={'outgoing citations'}
          yDimension={metric}
          route={'citationsOut'}
          className={'boxplot2'}
        />
      </div>
    </Frame>
  );
}
