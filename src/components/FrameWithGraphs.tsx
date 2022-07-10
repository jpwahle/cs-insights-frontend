import Frame from './Frame';
import BarChart from './charts/BarChart';
import { GraphsProps } from '../types';
import BoxPlot from './charts/BoxPlot';
import { useFilter } from '../context/FilterContext';
import TreeMap from './charts/TreeMap';
import Grid from './charts/Grid';
import { mapMetric } from '../tools';

export default function FrameWithGraphs(props: GraphsProps) {
  const filter = useFilter();
  const metric = mapMetric(filter.filter.metric);
  return (
    <Frame route={props.route}>
      <div className="frame-with-graphs">
        <BarChart yDimension={props.barChartYDimension} route={props.route} />
        <Grid columns={props.columns} route={props.route} />
        <BoxPlot xLabel={metric} route={props.route} />
        <TreeMap yDimension={metric} route={props.route} />
      </div>
    </Frame>
  );
}
