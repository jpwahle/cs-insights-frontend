import React, { createContext, useState } from 'react';
import { Filter } from '../types';

const FilterContext = createContext<
  | {
      filter: Filter;
      setFilter: (filter: Filter) => void;
      oldFilter: Filter;
      setOldFilter: (oldFilter: Filter) => void;
    }
  | undefined
>(undefined);

export function useFilter() {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

export function FilterProvider({ children }: { children: React.ReactElement }) {
  const [filter, setFilter] = useState<Filter>({
    yearStart: '1960',
    yearEnd: '',
    citationsMin: '',
    citationsMax: '',
    authors: [],
    venues: [],
    accessType: null,
    typesOfPaper: [],
    fieldsOfStudy: [],
    publishers: [],
  });

  const [oldFilter, setOldFilter] = useState<Filter>(filter);

  return (
    <FilterContext.Provider
      value={{
        filter: filter,
        setFilter: setFilter,
        oldFilter: oldFilter,
        setOldFilter: setOldFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
