import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridProps } from '../types';

export default function Grid(props: GridProps) {
  useEffect(() => {
    props.refetchGrid();
  }, [props.page, props.pageSize]);

  //TODO rework together with network calls

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        rowCount={props.rowCount}
        columns={props.columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columnVisibilityModel={{
          _id: false,
        }}
        rowHeight={40}
        density="compact"
        pagination
        page={props.page}
        pageSize={props.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => props.setPage(newPage)}
        onPageSizeChange={(newPageSize) => props.setPageSize(newPageSize)}
      />
    </div>
  );
}
