import { useEffect, useState } from 'react';
import '../../App.css';
import { DataGrid, GridEnrichedColDef, GridSortModel } from '@mui/x-data-grid';
import { GridData, GridProps } from '../../types';
import { useNetworkGet } from '../../network';
import { PAGE_SIZE } from '../../consts';
import { useRefresh } from '../../context/RefreshContext';
import { Button, Tooltip } from '@mui/material';
import { Download } from '@mui/icons-material';
import { useGridExport } from '../../tools';

export default function Grid<T extends { [key: string]: string }>(props: GridProps) {
  const [gridData, setGridData] = useState<GridData<T>>({ rowCount: 0, rows: [] });
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'inCitationsCount',
      sort: 'desc',
    },
  ]);
  const refresh = useRefresh();
  const queryKey = props.route + 'Grid';
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

  const queryParameters = {
    page: page,
    pageSize: pageSize,
    sortField: sortModel[0] ? sortModel[0].field : '',
    sortDirection: sortModel[0] && sortModel[0].sort ? sortModel[0].sort : '',
  };

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/info`,
    queryKey,
    (data: GridData<T>) => {
      setGridData(data);
    },
    queryParameters
  );

  useEffect(() => {
    refresh.addRefetch(queryKey, refetch);
    return () => {
      refresh.removeRefetch(queryKey);
    };
  }, []);

  useEffect(() => {
    if (gridData.rowCount > 0) {
      refetch();
    }
  }, [page, pageSize, sortModel]);

  const filename = useGridExport(props.route, queryParameters);

  function handleClick() {
    if (gridData.rows.length > 0) {
      const dataToExport = gridData.rows;
      let csv = '';
      const keys = Object.keys(dataToExport[0]).filter((key) => key != '_id');
      csv += keys.join(',') + '\n';
      for (const line of dataToExport) {
        csv +=
          keys
            .map((key) => {
              if (key != '_id') {
                const curr = line[key as string];
                if (Array.isArray(curr)) {
                  return '"[' + curr.map((value) => `""${value}""`).join(',') + ']"';
                } else {
                  return JSON.stringify(curr);
                }
              }
            })
            .join(',') + '\n';
      }
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', filename);
      a.click();
    }
  }

  return (
    <div style={{ height: 300, position: 'relative' }} className={'grid'}>
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
        disableColumnMenu
        disableVirtualization
      />
      {gridData.rows.length > 0 ? (
        <Button
          onClick={handleClick}
          startIcon={<Download />}
          sx={{ position: 'absolute', bottom: '0px', left: '5px' }}
        >
          Export
        </Button>
      ) : null}
      <div
        style={{
          position: 'absolute',
          top: '-18px',
          left: '10px',
        }}
        className={'title'}
      >
        C2: Grid
      </div>
    </div>
  );
}
