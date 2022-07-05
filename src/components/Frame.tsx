import ResponsiveAppBar from './ResponsiveAppBar';
import Sidebar from './Sidebar';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../consts';
import { RefreshProvider } from '../context/RefreshContext';
import { useAuth } from '../context/AuthContext';
import { useSnack } from '../context/SnackbarContext';
import Tools from './Tools';

export default function Frame(props: {
  route: string;
  children: React.ReactElement | React.ReactElement[];
}) {
  const auth = useAuth();
  const setSnack = useSnack();

  if (auth.token) {
    return (
      <RefreshProvider>
        <div className={'frame'}>
          <ResponsiveAppBar />
          {/* To counteract the height of the AppBar*/}
          <div style={{ paddingTop: '70.5px' }} className={'appbar'} />
          <Sidebar />
          <Tools route={props.route}></Tools>
          {props.children}
        </div>
      </RefreshProvider>
    );
  } else {
    useEffect(() => {
      setSnack('You need to login to access this page.');
    });
    return <Navigate to={ROUTE_LOGIN} />;
  }
}
