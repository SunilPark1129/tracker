const BASE_URL = "http://localhost:3000";

export async function loginRequest(payload) {
  try {
    const res = await fetch(BASE_URL + "/auth/login", {
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

export async function logoutRequest() {
  try {
    const res = await fetch(BASE_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
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

export async function userRequest() {
  try {
    const res = await fetch(BASE_URL + "/user", { credentials: "include" });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function registerRequest(payload) {
  try {
    const res = await fetch(BASE_URL + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
