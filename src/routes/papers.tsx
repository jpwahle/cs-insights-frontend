import Categories from '../components/Categories';
import React, { useState } from 'react';
import { Paper, PaperStats } from '../types';
import { useSnack } from '../context/SnackbarContext';
import { useFilter } from '../context/FilterContext';
import { getData } from '../network';
import BarChart from '../charts/BarChart';
import Grid from '../charts/Grid';
import Frame from '../components/Frame';

export default function Papers() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Paper[]>([]);
  const setSnack = useSnack();
  const filter = useFilter();

  const columns = [
    { field: '_id' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'year', headerName: 'Year' },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'venues', headerName: 'Venue', width: 200 },
    { field: 'cites', headerName: 'Citations' },
  ];

  function handleFetchClick() {
    // TODO parallelize
    let filterParameter = '';
    if (filter.filter.yearStart) {
      filterParameter += `yearStart=${filter.filter.yearStart}&`;
    }
    if (filter.filter.yearEnd) {
      filterParameter += `yearEnd=${filter.filter.yearEnd}&`;
    }
    if (filter.filter.author) {
      filterParameter += `author=${filter.filter.author._id}&`;
    }
    if (filter.filter.venue) {
      filterParameter += `venue=${filter.filter.venue._id}&`;
    }
    getData('fe/papers/stats?' + filterParameter, setSnack).then((data: PaperStats) => {
      if (data) {
        setLabels(data.timeData.years);
        if ('cites' in data.timeData) {
          setValues(data.timeData.cites);
        }
      }
    });
    //todo flexible page/pageSize
    getData('fe/papers/paged?page=0&pageSize=100&' + filterParameter, setSnack).then((data) => {
      if (data) {
        setRows(data.rows);
        setRowCount(data.rowCount);
      }
    });
  }

  return (
    <Frame>
      <Categories fetchData={handleFetchClick} />
      <div className="graphs">
        <BarChart labels={labels} values={values} />
        <Grid
          columns={columns}
          view={'papers'}
          rowCount={rowCount}
          setRowCount={setRowCount}
          rows={rows}
          setRows={setRows}
        />
      </div>
    </Frame>
  );
}
