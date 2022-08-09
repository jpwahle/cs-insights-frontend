import { createContext, ReactElement, useContext, useState } from 'react';

const RefreshContext = createContext<
  | {
      refresh: () => void;
      addRefetch: (key: string, refetch: () => Promise<any>) => void;
      removeRefetch: (key: string) => void;
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

export type State = {
  key: string;
  refetch: () => Promise<any>;
};

export function RefreshProvider(props: { children: ReactElement | ReactElement[] }) {
  const [refetchFunctions, setRefetchFunctions] = useState<Array<State>>([]);

  function addRefetch(key: string, refetch: () => Promise<any>) {
    setRefetchFunctions((oldArray) => [...oldArray, { key: key, refetch: refetch }]);
  }

  function removeRefetch(key: string) {
    setRefetchFunctions((oldArray) => oldArray.filter((func) => func.key != key));
  }

  function refresh() {
    for (const refetch of refetchFunctions) {
      refetch.refetch();
    }
  }

  return (
    <RefreshContext.Provider
      value={{ refresh: refresh, addRefetch: addRefetch, removeRefetch: removeRefetch }}
    >
      {props.children}
    </RefreshContext.Provider>
  );
}
