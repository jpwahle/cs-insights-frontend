import { createContext, ReactElement, useContext, useState } from 'react';

const RefreshContext = createContext<
  | {
      refresh: () => void;
      addRefetch: (refetch: () => Promise<any>) => void;
    }
  | undefined
>(undefined);

export function useRefresh() {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within an RefreshProvider');
  }
  return context;
}

export function RefreshProvider(props: { children: ReactElement | ReactElement[] }) {
  const [refetchFunctions, setRefetchFunctions] = useState<Array<() => Promise<any>>>([]);

  function addRefetch(refetch: () => Promise<any>) {
    setRefetchFunctions((oldArray) => [...oldArray, refetch]);
  }

  function refresh() {
    // queryClient.cancelQueries();
    for (const refetch of refetchFunctions) {
      refetch();
    }
  }

  return (
    <RefreshContext.Provider value={{ refresh: refresh, addRefetch: addRefetch }}>
      {props.children}
    </RefreshContext.Provider>
  );
}
