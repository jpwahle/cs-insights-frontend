import React, { createContext, useState } from 'react';

const RefreshContext = createContext<
  | {
      refresh: () => void;
      addRefetch: (refetch: () => Promise<any>) => void;
    }
  | undefined
>(undefined);

export function useRefresh() {
  const context = React.useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within an RefreshProvider');
  }
  return context;
}

export function RefreshProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [refetchFunctions, setRefetchFunctions] = useState<Array<() => Promise<any>>>([]);

  function addRefetch(refetch: () => Promise<any>) {
    setRefetchFunctions((oldArray) => [...oldArray, refetch]);
  }

  function refresh() {
    for (const refetch of refetchFunctions) {
      refetch();
    }
  }

  return (
    <RefreshContext.Provider value={{ refresh: refresh, addRefetch: addRefetch }}>
      {children}
    </RefreshContext.Provider>
  );
}

// export function useRefresh() {
//   const [refreshCounter, setRefreshCounter] = useState<number>(0);
//
//   function refresh() {
//     setRefreshCounter(() => refreshCounter + 1);
//   }
//   return { refreshCounter, refresh };
// }

// export function useRefresh() {
//   const [refreshFunctions, setRefreshFunctions] = useState<Array<(refetch: Promise<any>) => void>>(
//     []
//   );
//
//   function addRefetch(fn: () => Promise<any>) {
//     refreshFunctions.push(fn);
//   }
//   function refresh() {}
//   return { refresh, addRefetch };
// }

// const RefreshContext = createContext<
//   | {
//       refreshCounter: number;
//       refresh: () => void;
//     }
//   | undefined
// >(undefined);
//
// export function useRefresh() {
//   const context = React.useContext(RefreshContext);
//   if (context === undefined) {
//     throw new Error('useRefresh must be used within an RefreshProvider');
//   }
//   return context;
// }
//
// export function RefreshProvider({
//   children,
// }: {
//   children: React.ReactElement | React.ReactElement[];
// }) {
//   const [refreshCounter, setRefreshCounter] = useState<number>(0);
//
//   function refresh() {
//     setRefreshCounter(() => refreshCounter + 1);
//   }
//
//   return (
//     <RefreshContext.Provider value={{ refreshCounter: refreshCounter, refresh: refresh }}>
//       {children}
//     </RefreshContext.Provider>
//   );
// }
