import { BASE_URL, API_TOKEN } from "./const";

class Api {
  constructor(options) {
    this._options = options;
  }

  _getResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.BASE_URL}/cards`, {
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  getUserData() {
    return fetch(`${this._options.BASE_URL}/users/me`, {
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  editUserData(data) {
    return fetch(`${this._options.BASE_URL}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  editUserAvatar(link) {
    return fetch(`${this._options.BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: link }),
    }).then(this._getResponse);
  }

  postCard(card) {
    return fetch(`${this._options.BASE_URL}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify(card),
    }).then(this._getResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._options.BASE_URL}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._options.headers,
    }).then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._options.BASE_URL}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._getResponse);
  }
}

const api = new Api({
  BASE_URL,
  headers: {
    authorization: API_TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
