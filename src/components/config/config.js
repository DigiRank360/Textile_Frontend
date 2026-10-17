const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const getImageUrl = (image) =>
  image?.startsWith("http://") || image?.startsWith("https://")
    ? image
    : `${API_URL}${image}`;

export default API_URL;
