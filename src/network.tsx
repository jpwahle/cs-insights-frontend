import { QueryParameters } from './types';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useSnack } from './context/SnackbarContext';
import { useFilter } from './context/FilterContext';

async function sendRequest(
  route: string,
  token: string,
  setSnack: (message: string) => void,
  data: Object | null = null
) {
  const url = process.env.REACT_APP_BACKEND + route;
  console.debug(url);
  let init: RequestInit;
  if (data) {
    // POST
    init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
  } else {
    // GET
    init = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  const response = await fetch(url, init);

  if (!response.ok || response.status >= 400) {
    setSnack(`${response.status} ${response.statusText}: ${(await response.json()).message}`);
    return new Promise((resolve) => resolve(''));
  } else {
    return response.json();
  }
}

function buildRoute(route: string, queryParameters: QueryParameters): string {
  if (queryParameters) {
    route += '?';

    for (const key of Object.keys(queryParameters)) {
      if (key === 'author' && queryParameters.author) {
        route += `author=${queryParameters.author._id}&`;
      } else if (key === 'venue' && queryParameters.venue) {
        route += `venue=${queryParameters.venue._id}&`;
      } else {
        const value = queryParameters[key as keyof QueryParameters];
        if (value || (key === 'page' && value === 0)) {
          route += `${key}=${value}&`;
        }
      }
    }
  }

  return route;
}

// Automatically applies filters to all GET queries
export function useNetworkGet(
  route: string,
  queryKey: string,
  process: (data: any) => void,
  queryParameters: Object = {} // except filter
) {
  const auth = useAuth();
  const setSnack = useSnack();
  const filter = useFilter();

  route = buildRoute(route, { ...filter.filter, ...queryParameters });

  const { data, refetch } = useQuery(
    queryKey,
    () => {
      return sendRequest(route, auth.token, setSnack);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    }
  );

  useEffect(() => {
    if (data) {
      process(data);
    }
  }, [data]);

  return refetch;
}

export function useNetworkPost(
  route: string,
  process: (data: any) => void = () => {} // can be passed here or manually later on in .mutate() via the onSuccess option
) {
  const auth = useAuth();
  const setSnack = useSnack();

  return useMutation(
    (data: Object) => {
      return sendRequest(route, auth.token, setSnack, data);
    },
    {
      onSuccess: (data) => {
        if (data) {
          process(data);
        }
      },
    }
  );
}
