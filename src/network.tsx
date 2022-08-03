import {
  AuthContextType,
  NonFilterParameters,
  QueryParameters,
  StringArrayParameters,
} from './types';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useSnack } from './context/SnackbarContext';
import { useFilter } from './context/FilterContext';
import { ACCESS_TYPE_OPEN, ACCESS_TYPE_OTHER } from './consts';

async function sendRequest(
  route: string,
  auth: AuthContextType,
  setSnack: (message: string) => void,
  data: Object | null = null
) {
  const url = process.env.REACT_APP_BACKEND + route;
  // This is needed for debugging
  console.debug(url);
  let init: RequestInit;
  if (data) {
    // POST
    init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(data),
    };
  } else {
    // GET
    init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
  }
  const response = await fetch(url, init);
  if (!response.ok || response.status >= 400) {
    if (response.status === 401 && auth.token) {
      auth.logout();
      setSnack('Your stored token was invalid. Please log in again.');
    } else {
      const contentType = response.headers.get('content-type');
      const snackMessage = `${response.status} ${response.statusText}`;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        setSnack(`${snackMessage}: ${(await response.json()).message}`);
      } else {
        setSnack(snackMessage);
      }
    }
    return new Promise((resolve) => resolve(''));
  } else {
    return response.json();
  }
}

function buildRoute(route: string, queryParameters: QueryParameters): string {
  if (queryParameters) {
    route += '?';
    for (const key of Object.keys(queryParameters)) {
      if (key === 'authors') {
        if (queryParameters.authors && queryParameters.authors.length > 0) {
          route += `authorIds=${JSON.stringify(
            queryParameters.authors.map((author) => author._id)
          )}&`;
        }
      } else if (key === 'venues') {
        if (queryParameters.venues && queryParameters.venues.length > 0) {
          route += `venueIds=${JSON.stringify(queryParameters.venues.map((venue) => venue._id))}&`;
        }
      } else if (['publishers', 'typesOfPaper', 'fieldsOfStudy'].includes(key)) {
        const value: String[] | undefined = queryParameters[key as keyof StringArrayParameters];
        if (value && value.length > 0) {
          route += `${key}=${JSON.stringify(value)}&`;
        }
      } else if (key === 'accessType') {
        if (queryParameters.accessType) {
          if (queryParameters.accessType === ACCESS_TYPE_OPEN) {
            route += `openAccess=true&`;
          } else if (queryParameters.accessType === ACCESS_TYPE_OTHER) {
            route += `openAccess=false&`;
          }
        }
      } else {
        const value = queryParameters[key as keyof QueryParameters];
        if (value || (['page', 'k'].includes(key) && value === 0)) {
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
  queryParameters: NonFilterParameters = {}
) {
  const auth = useAuth();
  const setSnack = useSnack();
  const filter = useFilter();

  route = buildRoute(route, { ...filter.filter, ...queryParameters });

  const { data, dataUpdatedAt, refetch, isFetching } = useQuery(
    [queryKey, queryParameters, filter.filter],
    () => {
      return sendRequest(route, auth, setSnack);
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
  }, [data, dataUpdatedAt]);

  return { refetch, isFetching };
}

export function useNetworkPost(
  route: string,
  process: (data: any) => void = () => {} // can be passed here or manually later on in .mutate() via the onSuccess option
) {
  const auth = useAuth();
  const setSnack = useSnack();

  return useMutation(
    (data: Object) => {
      return sendRequest(route, auth, setSnack, data);
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
