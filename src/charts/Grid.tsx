import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../network';
import { Paper } from '../types';

export default function Grid(props: { view: string }) {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venue', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(100);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Paper[]>([]);

  React.useEffect(() => {
    getData(`fe/${props.view}/paged?page=${page}&pageSize=${pageSize}`).then((data) => {
      setRowCount(data.rowCount);
      setRows(data.rows);
    });
  }, [page, pageSize]);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        rowCount={rowCount}
        columns={columns}
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
