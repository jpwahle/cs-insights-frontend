import { useSnack } from './SnackbarContext';
import { useAuth } from './AuthContext';

export function useRequestHelper() {
  const setSnack = useSnack();
  const auth = useAuth();

  return { token: auth.token, setSnack };
}
