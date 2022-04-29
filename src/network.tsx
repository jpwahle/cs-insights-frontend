import { Network } from './types';

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
