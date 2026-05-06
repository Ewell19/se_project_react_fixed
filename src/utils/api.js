const BASE_URL =
  import.meta.env.PROD
    ? "https://api.wtwr.barabesta.is"
    : "http://localhost:3001";

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

  _request(url, options = {}) {
    return fetch(`${this._baseUrl}${url}`, options)
      .then(checkResponse)
      .catch((err) => {
        console.error(`API Error: ${err.message}`, err);
        throw err;
      });
  }

  signup({ name, avatar, email, password }) {
    return this._request("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatar, email, password }),
    });
  }

  signin({ email, password }) {
    return this._request("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }

  getUser(token) {
    return this._request("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateUser(token, { name, avatar }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar }),
    });
  }

  getItems() {
    return this._request("/items");
  }

  createItem(token, { name, weather, imageUrl }) {
    return this._request("/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, weather, imageUrl }),
    });
  }

  deleteItem(token, itemId) {
    return this._request(`/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  likeItem(token, itemId) {
    return this._request(`/items/${itemId}/likes`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  unlikeItem(token, itemId) {
    return this._request(`/items/${itemId}/likes`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
export { BASE_URL, checkResponse };
