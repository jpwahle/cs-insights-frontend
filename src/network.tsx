import { Network } from './types';
import { useRequestHelper } from './context/NetworkHook';
import { useFilter } from './context/FilterContext';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

//TODO rework network calls
async function promise(response: Response, setSnack: (message: string) => void): Promise<any> {
  if (!response.ok || response.status >= 400) {
    setSnack(`${response.status} ${response.statusText}: ${(await response.json()).message}`);
    return new Promise((resolve) => resolve(''));
  } else {
    return response.json();
  }
}

export async function postData(route: string, data: Object, network: Network) {
  const url = process.env.REACT_APP_BACKEND + route;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${network.token}`,
    },
    body: JSON.stringify(data),
  });

  return promise(response, network.setSnack);
}

export async function getData(route: string, network: Network): Promise<any> {
  const url = process.env.REACT_APP_BACKEND + route;
  let response;
  response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${network.token}`,
    },
  });

  return promise(response, network.setSnack);
}

export function useNetworkGet(route: string, queryKey: string, fn: (data: Object) => void) {
  console.log('useNetwork');
  const requestHelper = useRequestHelper();
  const filter = useFilter();

  if (route.includes('?')) {
    route += '&';
  } else {
    route += '?';
  }
  if (filter.filter.yearStart) {
    route += `yearStart=${filter.filter.yearStart}&`;
  }
  if (filter.filter.yearEnd) {
    route += `yearEnd=${filter.filter.yearEnd}&`;
  }
  if (filter.filter.author) {
    route += `author=${filter.filter.author._id}&`;
  }
  if (filter.filter.venue) {
    route += `venue=${filter.filter.venue._id}&`;
  }
  console.log(route);
  const { data, refetch } = useQuery(queryKey, () => getData(route, requestHelper), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });

  useEffect(() => {
    console.log('useEffect');
    if (data) {
      fn(data);
    }
  }, [data]);

  return refetch;
}
