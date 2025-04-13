import { request } from "../utils";

export const getUser = (id) => request(`account/${id}`);
export const updateUser = (id, form) => {
  return fetch(window.location.origin + `/api/account/${id}`, {
    method: "PATCH",
    body: form,
  })
    .then((res) => res.json())
    .catch((e) => ({ code: e.code, error: e.message }));
};
