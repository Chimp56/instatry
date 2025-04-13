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

export const fetchCart = async (username) => {
  try {
    console.log("Fetching cart for user:", username);
    const response = await fetch(`${api}cart/?username=${username}`);
    if (!response.ok) {
      console.error("Failed to fetch cart:", response.statusText);
      throw new Error("Failed to fetch cart");
    }
    const data = await response.json();
    console.log("Cart data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchCart:", error);
    throw error;
  }
};

export const addToCartAPI = async (username, productId, quantity) => {

    console.log("Adding to cart:", { username, productId, quantity });
    //   print the request body
    console.log("Request body:", { username, product_id: productId, quantity });

  const response = await fetch(`${api}cart/add/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, product_id: productId, quantity }),
  });

  if (!response.ok) throw new Error("Failed to add to cart");
  const data = await response.json();
  console.log("Cart data:", data);
  return data;
};

export const removeFromCartAPI = async (username, productId) => {
  const response = await fetch(`${api}cart/remove/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, product_id: productId }),
  });
  if (!response.ok) throw new Error("Failed to remove from cart");
  const data = await response.json();
  console.log("Cart data:", data);
  return data;
};

export const clearCartAPI = async (username) => {
  const response = await fetch(`${api}cart/clear/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) throw new Error("Failed to clear cart");
  const data = await response.json();
  console.log("Cart data:", data);
  return data;
};
