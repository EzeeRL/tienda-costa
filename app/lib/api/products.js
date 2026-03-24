const API_URL = "https://tienda-ramos.vercel.app/api/products";

// Obtener todos
export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

// Crear producto
export const createProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Actualizar producto
export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

// Eliminar producto
export const deleteProductApi = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
};