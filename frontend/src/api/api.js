const domain = "http://localhost:8000/";
const api = domain + "api/";
export const mediaURL = domain + "media/";

// This function fetches the list of products from the API.
// It handles errors and logs them to the console.

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
