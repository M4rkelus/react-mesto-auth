import { AUTH_BASE_URL } from "./const";

export const getResponse = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(`Ошибка: ${response.status}`);
};

export const register = (email, password) => {
  return fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(getResponse);
};

export const login = (email, password) => {
  return fetch(`${AUTH_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then(getResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${AUTH_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};
