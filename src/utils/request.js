export const request = (url, method, data) =>
  fetch(window.location.origin + `/api/${url}`, {
    headers: {
      "content-type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch((e) => ({ code: e.code, error: e.message }));
