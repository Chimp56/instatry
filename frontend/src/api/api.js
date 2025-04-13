const domain = "http://localhost:8000/";
const api = domain + "api/";
export const mediaURL = domain + "media/";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${api}products/`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchOverlayModel = async (modelPath) => {
  try {
    const response = await fetch(mediaURL + modelPath);
    if (!response.ok) {
      throw new Error("Failed to fetch overlay model");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching overlay model:", error);
    throw error;
  }
};

export const fetchCart = async () => {
  const response = await fetch(`${api}cart/`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return await response.json();
};

export const addToCartAPI = async (productId, quantity) => {
  const response = await fetch(`${api}cart/add/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return await response.json();
};

export const removeFromCartAPI = async (productId) => {
  const response = await fetch(`${api}cart/remove/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ product_id: productId }),
  });
  if (!response.ok) throw new Error("Failed to remove from cart");
  return await response.json();
};

export const clearCartAPI = async () => {
  const response = await fetch(`${api}cart/clear/`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to clear cart");
  return await response.json();
};
