async function promise(response: Response): Promise<any> {
  if (!response.ok || response.status !== 200) {
    // const error = (await response.json()).message;
    // return `${response.status} ${error.name}: ${error.message}`;
    //TODO remove comment
    return `${response.status} ${response.statusText}: ${(await response.json()).message}`;
  } else {
    return response.json();
  }
}

export async function postData(route: string, data: Object) {
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

  return promise(response);
}

export async function getData(route: string): Promise<any> {
  const url = process.env.REACT_APP_BACKEND + route;
  const token = localStorage.getItem('token');
  let response;
  response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise(response);
}
