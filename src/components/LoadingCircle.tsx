import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function LoadingCircle(props: {
  isFetching: boolean;
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Box sx={{ position: 'relative' }}>
      {props.children}
      {props.isFetching ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
}
