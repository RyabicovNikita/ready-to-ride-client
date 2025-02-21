export const request = (url, method, data) =>
  fetch(window.location.origin + `/api/${url}`, {
    headers: {
      "content-type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  })
    .catch((e) => ({ error: e }))
    .then((res) => res.json());
