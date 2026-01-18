export async function ds_get_products_by_category(category) {
  const API_ENDPOINT = `https://nutriplan-api.vercel.app/api/products/category/${category}`;
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error("HTTP ERROR " + response.status);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
