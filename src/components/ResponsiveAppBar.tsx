import { MouseEvent, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import {
  ROUTE_ACCOUNT,
  ROUTE_AUTHORS,
  ROUTE_CITATIONS,
  ROUTE_FIELDS_OF_STUDY,
  ROUTE_HOME,
  ROUTE_PAPERS,
  ROUTE_PUBLISHERS,
  ROUTE_TOPICS,
  ROUTE_TYPES_OF_PAPER,
  ROUTE_VENUES,
} from '../consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AccountCircle,
  Article,
  Book,
  Bookmarks,
  BubbleChart,
  Group,
  LibraryBooks,
  Logout,
  Place,
  Science,
  Settings,
} from '@mui/icons-material';

const pages = [
  { label: 'Papers', route: ROUTE_PAPERS, icon: Article },
  { label: 'Authors', route: ROUTE_AUTHORS, icon: Group },
  { label: 'Venues', route: ROUTE_VENUES, icon: Place },
  { label: 'Types of Paper', route: ROUTE_TYPES_OF_PAPER, icon: LibraryBooks },
  { label: 'Fields of Study', route: ROUTE_FIELDS_OF_STUDY, icon: Science },
  { label: 'Publishers', route: ROUTE_PUBLISHERS, icon: Book },
  { label: 'Citations', route: ROUTE_CITATIONS, icon: Bookmarks },
  { label: 'LDA Topics', route: ROUTE_TOPICS, icon: BubbleChart },
];
const settings = [
  { label: 'Account', id: 'account', icon: AccountCircle },
  { label: 'Logout', id: 'logout', icon: Logout },
];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu(id: string) {
    setAnchorElUser(null);
    switch (id) {
      case 'logout':
        auth.logout();
        break;
      case 'account':
        navigate(ROUTE_ACCOUNT);
        break;
    }
  }

  return (
    // position is not 'absolute', so AppBar has full width when there is horizontal scrolling
    <AppBar style={{ boxShadow: 'none', position: 'fixed' }} className={'appbar'}>
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
          <img src="/logo.jpg" width="150px" style={{ marginLeft: '-10px' }}></img>
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
