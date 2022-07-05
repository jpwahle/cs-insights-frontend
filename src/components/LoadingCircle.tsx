import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export default function LoadingCircle(props: {
  isFetching: boolean;
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Box sx={{ position: 'relative' }} className={props.className}>
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
