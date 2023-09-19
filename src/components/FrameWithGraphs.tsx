import Frame from './Frame';
// import BarChart from './visualizations/BarChart';
import { GraphsProps } from '../types';
import BoxPlot from './visualizations/BoxPlot';
import { useFilter } from '../context/FilterContext';
import TreeMap from './visualizations/TreeMap';
import Grid from './visualizations/Grid';
import { mapMetric, metrics } from '../tools';
import { ROUTE_PAPERS } from '../consts';
import LineChart from '../routes/LineChart';

export default function FrameWithGraphs(props: GraphsProps) {
  const filter = useFilter();
  let metric: string;

  // This distinction is necessary, so it won't show #Citations on the papers dashboard.
  // The endpoints for papers in the backend ignore the metric for queries, so it does not matter what is set.
  if (props.route === ROUTE_PAPERS.slice(1)) {
    metric = metrics[0].label;
  } else {
    metric = mapMetric(filter.filter.metric);
  }
  return (
    <Frame route={props.route}>
      <div className="frame-with-graphs">
        {/* <BarChart xDimension={props.xDimension} route={props.route} /> */}
        <div style={{ height: '300px' }}>
          <LineChart />
        </div>
        <Grid columns={props.columns} route={props.route} />
        <BoxPlot xDimension={props.xDimension} yDimension={metric} route={props.route} />
        <TreeMap xDimension={props.xDimension} yDimension={metric} route={props.route} />
      </div>
    </Frame>
  );
}
