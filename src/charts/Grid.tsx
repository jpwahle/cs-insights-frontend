// @ts-nocheck
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Grid(props) {
  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venue', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columnVisibilityModel={{
          _id: false,
        }}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
        rowHeight={40}
        density="compact"
      />
    </div>
  );
}
