async function postData(route: string, data: Object) {
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
  return response.json();
}
async function getData(route: string) {
  const url = process.env.REACT_APP_BACKEND + route;
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok || response.status !== 200) {
    console.log(await response.json());
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export { postData, getData };
