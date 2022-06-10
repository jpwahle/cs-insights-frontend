import * as React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import { DataGrid, GridEnrichedColDef, GridSortModel } from '@mui/x-data-grid';
import { GridData, GridProps } from '../types';
import { useNetworkGet } from '../network';
import { PAGE_SIZE } from '../consts';
import { useRefresh } from '../context/RefreshContext';
import { Tooltip } from '@mui/material';

export default function Grid<T>(props: GridProps) {
  const [gridData, setGridData] = useState<GridData<T>>({ rowCount: 0, rows: [] });
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'inCitationsCount',
      sort: 'desc',
    },
  ]);
  const refresh = useRefresh();
  const columns = props.columns.map((column: GridEnrichedColDef & { tooltip?: string }) => {
    if (column.tooltip) {
      column.renderCell = (params: any) => (
        <Tooltip title={params.value} placement="top">
          <div className="MuiDataGrid-cellContent">{params.value}</div>
        </Tooltip>
      );
    }
    return column;
  });

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/paged`,
    'gridData',
    (data: GridData<T>) => {
      setGridData(data);
    },
    {
      page: page,
      pageSize: pageSize,
      sortField: sortModel[0] ? sortModel[0].field : '',
      sortDirection: sortModel[0] && sortModel[0].sort ? sortModel[0].sort : '',
    }
  );

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  useEffect(() => {
    if (gridData.rowCount > 0) {
      refetch();
    }
  }, [page, pageSize, sortModel]);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={gridData.rows}
        rowCount={gridData.rowCount}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columnVisibilityModel={{
          _id: false,
        }}
        rowHeight={40}
        density="compact"
        loading={isFetching}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        disableVirtualization
      />
    </div>
  );
}
