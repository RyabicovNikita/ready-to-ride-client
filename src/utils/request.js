export const request = (url, method, data, headers = {"content-type": "application/json"}) =>
  fetch(window.location.origin + `/api/${url}`, {
    headers: {
      ...headers
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch((e) => ({ code: e.code, error: e.message }));
