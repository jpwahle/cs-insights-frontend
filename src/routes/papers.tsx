import Tools from '../components/Tools';
import React, { useState } from 'react';
import { PagedData, StatsData } from '../types';
import { useNetworkGet } from '../network';
import BarChart from '../charts/BarChart';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';
import { PAGE_SIZE } from '../consts';

export default function Papers() {
  console.log('papers');
  const [stats, setStats] = useState<StatsData>({ years: [], cites: [] });
  const [paged, setPaged] = useState<PagedData>({ rowCount: 0, rows: [] });
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE);

  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  const refetchStats = useNetworkGet('fe/papers/stats', 'stats', (data: any) => {
    if ('cites' in data.timeData) {
      setStats(data.timeData);
    }
  });

  const refetchGrid = useNetworkGet(
    `fe/papers/paged?page=0&pageSize=${PAGE_SIZE}`,
    'paged',
    (data: any) => {
      console.log('setPaged');
      setPaged(data);
    }
  );

  function getChartData() {
    refetchStats();
    refetchGrid();
  }

  return (
    <Frame>
      <Tools fetchData={getChartData} />
      <div className="graphs">
        <BarChart labels={stats.years} values={stats.cites} yLabel="papers" />
        <Grid
          columns={columns}
          view={'papers'}
          rowCount={paged.rowCount}
          rows={paged.rows}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          refetchGrid={refetchGrid}
        />
      </div>
    </Frame>
  );
}
