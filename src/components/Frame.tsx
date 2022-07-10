import ResponsiveAppBar from './ResponsiveAppBar';
import Sidebar from './Sidebar';
import { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../consts';
import { useAuth } from '../context/AuthContext';
import { useSnack } from '../context/SnackbarContext';
import Tools from './Tools';

export default function Frame(props: { route: string; children: ReactElement | ReactElement[] }) {
  const auth = useAuth();
  const setSnack = useSnack();

  if (auth.token) {
    return (
      <div className={'frame'}>
        <ResponsiveAppBar />
        {/* To counteract the height of the AppBar*/}
        <div style={{ paddingTop: '70.5px' }} className={'appbar'} />
        <Sidebar />
        <Tools route={props.route} />
        {props.children}
      </div>
    );
  } else {
    useEffect(() => {
      setSnack('You need to login to access this page.');
    });
    return <Navigate to={ROUTE_LOGIN} />;
  }
}
