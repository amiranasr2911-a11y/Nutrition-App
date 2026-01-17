export async function ds_get_recipe_by_category(category) {
  const API_ENDPOINT = `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`;
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
