export async function ds_get_all_products_by_name(product) {
  const API_ENDPOINT = `https://nutriplan-api.vercel.app/api/products/search?q=${product}&page=1&limit=24`;
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error("HTTP ERROR " + response.status);
    }
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
