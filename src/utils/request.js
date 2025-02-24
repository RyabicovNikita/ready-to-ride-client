export const request = (url, method, data) =>
  fetch(window.location.origin + `/api/${url}`, {
    headers: {
      "content-type": "application/json",
    },
    method: method || "GET",
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => {
      if (res.ok) return res.json();
      switch (res.status) {
        case 401:
          return { code: res.status, error: "Ваша сессия истекла. Пожалуйста, войдите снова." };
        default:
          return { error: "Произошла неизвестная ошибка. Пожалуйста, попробуйте позднее." };
      }
    })
    .catch((e) => ({ error: e.status }));
