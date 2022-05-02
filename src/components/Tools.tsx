import React from 'react';
import '../App.css';
import { CategoriesProps } from '../types';
import { Button, Stack } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import IconLabel from './IconLabel';

export default function Tools(props: CategoriesProps) {
  return (
    <Stack direction="row" className="categories">
      <IconLabel label="Tools" icon={ConstructionIcon} />
      <Button variant="contained" onClick={() => props.fetchData()}>
        Fetch Data/Apply Filters
      </Button>
    </Stack>
  );
}
