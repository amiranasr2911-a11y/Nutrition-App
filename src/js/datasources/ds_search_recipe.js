export async function ds_search_recipe(searchValue) {
  const API_ENDPOINT = `https://nutriplan-api.vercel.app/api/meals/search?q=${searchValue}&page=1&limit=25`;
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
