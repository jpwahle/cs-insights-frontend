async function promise(response: Response, setSnack: (message: string) => void): Promise<any> {
  if (!response.ok || response.status !== 200) {
    // const error = (await response.json()).message;
    // return `${response.status} ${error.name}: ${error.message}`;
    //TODO remove comment
    console.log('error');
    setSnack(`${response.status} ${response.statusText}: ${(await response.json()).message}`);
    return new Promise((resolve) => resolve(''));
  } else {
    return response.json();
  }
}

export async function postData(route: string, data: Object, setSnack: (message: string) => void) {
  const url = process.env.REACT_APP_BACKEND + route;
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return promise(response, setSnack);
}

export async function getData(route: string, setSnack: (message: string) => void): Promise<any> {
  const url = process.env.REACT_APP_BACKEND + route;
  const token = localStorage.getItem('token');
  let response;
  response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise(response, setSnack);
}
