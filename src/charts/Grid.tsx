import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridData, GridProps } from '../types';
import { useNetwork } from '../network';
import { PAGE_SIZE } from '../consts';
import { useRefresh } from '../context/RefreshContext';

export default function Grid<T>(props: GridProps) {
  console.log('grid');
  const [gridData, setGridData] = useState<GridData<T>>({ rowCount: 0, rows: [] });
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE);
  const refresh = useRefresh();

  const refetch = useNetwork(
    `fe/${props.route}/paged`,
    'gridData',
    (data: GridData<T>) => {
      setGridData(data);
    },
    // [props.refresh, page, pageSize],
    { page: page, pageSize: pageSize }
  );
  useEffect(() => {
    console.log('grid useEffect');
    refresh.addRefetch(refetch);
  }, []);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={gridData.rows}
        rowCount={gridData.rowCount}
        columns={props.columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columnVisibilityModel={{
          _id: false,
        }}
        rowHeight={40}
        density="compact"
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
}
