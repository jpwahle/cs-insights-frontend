import { Network, QueryParameters } from './types';

import { useRequestHelper } from './context/NetworkHook';
import { useFilter } from './context/FilterContext';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';

//TODO combine 3 functions to one
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
  console.log(url);
  let response;
  response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${network.token}`,
    },
  });

  return promise(response, network.setSnack);
}

function buildRoute(route: string, queryParameters: QueryParameters): string {
  if (queryParameters) {
    route += '?';

    const keys = ['page', 'pageSize', 'yearStart', 'yearEnd'];
    for (const key of keys) {
      const value = queryParameters[key as keyof QueryParameters];
      if (value || (key === 'page' && value === 0)) {
        route += `${key}=${value}&`;
      }
    }
    if (queryParameters.author) {
      route += `author=${queryParameters.author._id}&`;
    }
    if (queryParameters.venue) {
      route += `venue=${queryParameters.venue._id}&`;
    }
  }

  return route;
}

export function useNetwork(
  route: string,
  queryKey: string,
  process: (data: any) => void,
  // dependencies: Array<any>, // refresh should be at position 0
  queryParameters: Object = {} // except filter
  // dataForPost: Object | null = null
) {
  const requestHelper = useRequestHelper();
  const filter = useFilter();

  route = buildRoute(route, { ...filter.filter, ...queryParameters });
  console.log(route);

  // let { data, refetch }: { data: any; refetch: (() => Promise<any>) | undefined } = {
  //   data: undefined,
  //   refetch: undefined,
  // };

  const { data, refetch } = useQuery(
    queryKey,
    () => {
      return getData(route, requestHelper); //TODO order
    },
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    }
  );

  useEffect(() => {
    console.log('useNetwork useEffect');
    if (data) {
      process(data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (dependencies[0] !== 0) {
  //     refetch();
  //   }
  // }, dependencies);
  return refetch;
}

export function useNetworkPost(
  route: string,
  process: (data: any) => void
  // dependencies: Array<any>, // refresh should be at position 0
  // queryParameters: Object = {}, // except filter
  // dataForPost: Object
) {
  const requestHelper = useRequestHelper();

  // route = buildRoute(route, { ...filter.filter, ...queryParameters });
  console.log(route);
  const mutation = useMutation(
    (dataForPost: Object) => {
      return postData(route, dataForPost, requestHelper); //TODO order
    },
    {
      onSuccess: (data) => {
        if (data) {
          process(data);
        }
      },
    }
  );
  return mutation;
}
