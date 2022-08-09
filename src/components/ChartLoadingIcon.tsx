import { Box, CircularProgress } from '@mui/material';
import { ReactElement } from 'react';

export default function ChartLoadingIcon(props: {
  isFetching: boolean;
  className?: string;
  children: ReactElement | ReactElement[];
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
