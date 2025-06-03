const BASE_URL = "http://localhost:3000/todos";

export async function getRequest() {
  try {
    const res = await fetch(BASE_URL, { credentials: "include" });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function postRequest(payload) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function removeRequest(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function updateRequest(id, payload) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}
