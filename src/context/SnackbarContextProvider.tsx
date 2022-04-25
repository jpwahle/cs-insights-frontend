import React, { createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export const SnackbarContext = createContext({} as any); // TODO

export function SnackbarContextProvider({ children }: { children: React.ReactElement }) {
  const [snack, setSnack] = useState('');

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
