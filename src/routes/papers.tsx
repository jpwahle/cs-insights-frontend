import Tools from '../components/Tools';
import React from 'react';
import { Paper } from '../types';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';
// import BarChart from '../charts/BarChart';

export default function Papers() {
  console.log('papers');
  // const [refresh, setRefresh] = useState<number>(0);
  // const refresh = useRefresh();
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  // function getChartData() {
  //   refresh.refresh();
  // }

  return (
    <Frame>
      <Tools /*fetchData={getChartData}*/ />
      <div className="graphs">
        {/*<BarChart route="papers" yLabel="citations" refetch={refetch} />*/}
        <Grid<Paper> columns={columns} route={'papers'} /* refresh={refresh.refreshCounter}*/ />
      </div>
    </Frame>
  );
}
