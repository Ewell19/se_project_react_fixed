const BASE_URL = "http://127.0.0.1:3001";

const checkResponse = (res) => {
  if (!res.ok) {
    return res
      .json()
      .catch(() => {
        const error = new Error(`HTTP ${res.status}`);
        error.status = res.status;
        return Promise.reject(error);
      })
      .then((data) => {
        const message = data?.message || `HTTP ${res.status}`;
        const error = new Error(message);
        error.status = res.status;
        return Promise.reject(error);
      });
  }

  return res.json();
};

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(checkResponse);
  }

  _normalizeItem(item) {
    return {
      ...item,
      link: item.link || item.imageUrl,
      likes: item.likes || [],
    };
  }

  getItems() {
    return this._request("/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((items) => items.map((item) => this._normalizeItem(item)));
  }

  addItem({ name, link, weather }, token) {
    return this._request("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, imageUrl: link, weather }),
    }).then((item) => this._normalizeItem(item));
  }

  deleteItem(id, token) {
    return this._request(`/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserProfile({ name, avatar }, token) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    });
  }

  addCardLike(id, token) {
    return this._request(`/items/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((item) => this._normalizeItem(item));
  }

  removeCardLike(id, token) {
    return this._request(`/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((item) => this._normalizeItem(item));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
export { BASE_URL, checkResponse };
