export async function ds_get_all_areas() {
  const API_ENDPOINT = "https://nutriplan-api.vercel.app/api/meals/areas";
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
