import React from 'react';
import '../App.css';
// import { CategoriesProps } from '../types';
import { Button, Stack } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import IconLabel from './IconLabel';
import { useRefresh } from '../context/RefreshContext';

export default function Tools(/*props: CategoriesProps*/) {
  console.log('tools');
  const refresh = useRefresh();
  return (
    <Stack direction="row" className="categories">
      <IconLabel label="Tools" icon={ConstructionIcon} />
      <Button variant="contained" onClick={() => /*props.fetchData()*/ refresh.refresh()}>
        Fetch Data/Apply Filters
      </Button>
    </Stack>
  );
}
