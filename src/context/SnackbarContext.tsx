import { createContext, ReactElement, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext<((message: string) => void) | undefined>(undefined);

export function useSnack() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnack must be used within a SnackbarProvider');
  }
  return context;
}

export function SnackbarProvider({ children }: { children: ReactElement | ReactElement[] }) {
  const [snack, setSnack] = useState<string>('');

  const handleClose = () => {
    setSnack('');
  };

  return (
    <SnackbarContext.Provider value={setSnack}>
      <Snackbar open={!!snack} onClose={handleClose} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="error">
          {snack}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}
