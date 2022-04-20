import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../network';
import { GridProps } from '../types';

export default function Grid(props: GridProps) {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(100);

  function test(newPage: number | null, newPageSize: number | null) {
    if (newPage) {
      setPage(newPage);
      getData(`fe/${props.view}/paged?page=${newPage}&pageSize=${pageSize}`).then((data) => {
        props.setRowCount(data.rowCount);
        props.setRows(data.rows);
      });
    }
    if (newPageSize) {
      setPageSize(newPageSize);
      getData(`fe/${props.view}/paged?page=${page}&pageSize=${newPageSize}`).then((data) => {
        props.setRowCount(data.rowCount);
        props.setRows(data.rows);
      });
    }
  }
  // React.useEffect(() => {
  //   getData(`fe/${props.view}/paged?page=${page}&pageSize=${pageSize}`).then((data) => {
  //     props.setRowCount(data.rowCount);
  //     props.setRows(data.rows);
  //   });
  // }, [page, pageSize]);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        rowCount={props.rowCount}
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
        onPageChange={(newPage) => test(newPage, null)}
        onPageSizeChange={(newPageSize) => test(null, newPageSize)}
      />
    </div>
  );
}
