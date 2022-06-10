import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../context/AuthContext';
import {
  ROUTE_ACCOUNT,
  ROUTE_AUTHORS,
  ROUTE_CITATIONS,
  ROUTE_HOME,
  ROUTE_PAPERS,
  ROUTE_VENUES,
  STORAGE_TOKEN,
} from '../consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AccountCircle,
  Article,
  Bookmarks,
  Group,
  Logout,
  Place,
  Settings,
} from '@mui/icons-material';

const pages = [
  { label: 'Papers', route: ROUTE_PAPERS, icon: Article },
  { label: 'Authors', route: ROUTE_AUTHORS, icon: Group },
  { label: 'Venues', route: ROUTE_VENUES, icon: Place },
  // { label: 'Paper Types', route: ROUTE_PAPER_TYPE, icon: QuestionMark },
  // { label: 'Fields of Study', route: ROUTE_FIELDS_OF_STUDY, icon: QuestionMark },
  { label: 'Citations', route: ROUTE_CITATIONS, icon: Bookmarks },
  // { label: 'Topics', route: ROUTE_TOPICS, icon: QuestionMark },
];
const settings = [
  { label: 'Account', id: 'account', icon: AccountCircle },
  { label: 'Logout', id: 'logout', icon: Logout },
];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu(id: string) {
    setAnchorElUser(null);
    switch (id) {
      case 'logout':
        localStorage.removeItem(STORAGE_TOKEN);
        auth.setToken('');
        break;
      case 'account':
        navigate(ROUTE_ACCOUNT);
        break;
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          component={Link}
          to={ROUTE_HOME}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            textDecoration: 'none',
            color: 'white',
          }}
        >
          <b>D4</b>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              component={Link}
              to={page.route}
              key={page.route}
              startIcon={<page.icon />}
              sx={{
                my: 2,
                color: 'white',
                border:
                  location.pathname === page.route ? '1px solid white' : '1px solid transparent',
              }}
            >
              {page.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} size="large" edge="end" color="inherit">
              <Settings />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.id)}>
                <setting.icon />
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
