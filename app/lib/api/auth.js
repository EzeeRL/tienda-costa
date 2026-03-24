const API_URL = "https://tienda-ramos.vercel.app/";

// 🔐 LOGIN
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return data;
}

// 🆕 REGISTER
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_URL}api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      photo: "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al registrarse");
  }

  return data;
}