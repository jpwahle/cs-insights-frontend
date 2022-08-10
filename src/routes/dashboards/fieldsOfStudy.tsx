import FrameWithGraphs from '../../components/FrameWithGraphs';
import { GridCellParams } from '@mui/x-data-grid';
import { GRID_DECIMAL_PLACES } from '../../consts';

export default function FieldsOfStudy() {
  const columns = [
    { field: '_id' },
    { field: 'fieldsOfStudy', headerName: 'Field of Study', width: 200 },
    { field: 'yearPublishedFirst', headerName: 'First', width: 80 },
    { field: 'yearPublishedLast', headerName: 'Last', width: 80 },
    { field: 'papersCount', headerName: 'Papers', type: 'number' },
    { field: 'inCitationsCount', headerName: 'Citations', width: 110, type: 'number' },
    {
      field: 'inCitationsPerPaper',
      headerName: 'Citations/Paper',
      width: 150,
      type: 'number',
      valueGetter: (params: GridCellParams) => {
        return params.value.toFixed(GRID_DECIMAL_PLACES);
      },
    },
  ];

  return <FrameWithGraphs route={'fields'} columns={columns} xDimension={'fields of study'} />;
}
