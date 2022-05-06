import { useSnack } from './SnackbarContext';
import { useAuth } from './AuthContext';

//TODO split up
export function useRequestHelper() {
  const setSnack = useSnack();
  const auth = useAuth();

  return { token: auth.token, setSnack };
}
