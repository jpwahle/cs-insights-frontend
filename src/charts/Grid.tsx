import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../network';
import { GridProps } from '../types';
import { useSnack } from '../context/SnackbarContext';

export default function Grid(props: GridProps) {
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(100);

  const setSnack = useSnack();

  function updateGrid(newPage: number | null, newPageSize: number | null) {
    if (newPage) {
      setPage(newPage);
      getData(`fe/${props.view}/paged?page=${newPage}&pageSize=${pageSize}`, setSnack).then(
        (data) => {
          if (data) {
            props.setRowCount(data.rowCount);
            props.setRows(data.rows);
          }
        }
      );
    }
    if (newPageSize) {
      setPageSize(newPageSize);
      getData(`fe/${props.view}/paged?page=${page}&pageSize=${newPageSize}`, setSnack).then(
        (data) => {
          if (data) {
            props.setRowCount(data.rowCount);
            props.setRows(data.rows);
          }
        }
      );
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
        onPageChange={(newPage) => updateGrid(newPage, null)}
        onPageSizeChange={(newPageSize) => updateGrid(null, newPageSize)}
      />
    </div>
  );
}
