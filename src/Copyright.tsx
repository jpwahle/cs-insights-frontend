import { Link, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        mt: 3,
        color: '#ffffff',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="http://cs-insights.uni-goettingen.de/">
        cs-insights.uni-goettingen.de
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
