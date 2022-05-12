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
import SettingsIcon from '@mui/icons-material/Settings';
import { ROUTE_ACCOUNT, ROUTE_AUTHORS, ROUTE_PAPERS, ROUTE_VENUES, STORAGE_TOKEN } from '../consts';
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import PlaceIcon from '@mui/icons-material/Place';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
  { label: 'Papers', route: ROUTE_PAPERS, icon: ArticleIcon },
  { label: 'Authors', route: ROUTE_AUTHORS, icon: GroupIcon },
  { label: 'Venues', route: ROUTE_VENUES, icon: PlaceIcon },
];
const settings = [
  { label: 'Account', id: 'account', icon: AccountCircleIcon },
  { label: 'Logout', id: 'logout', icon: LogoutIcon },
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
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          <b>D4</b>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              href={page.route}
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
              <SettingsIcon />
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
