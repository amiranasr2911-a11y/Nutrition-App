export function displayProductScannerSection({
  content,
  productsSection,
  foodlogSection,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
  topicName,
}) {
  productsSection.classList.remove("hidden");
  foodlogSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  topicName.innerHTML = content;
}

export function displayFoodSection({
  content,
  productsSection,
  foodlogSection,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
  topicName,
}) {
  productsSection.classList.add("hidden");
  foodlogSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  topicName.innerHTML = content;
}

export function createAreaTab(area) {
  return `<button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
           ${area.name}
            </button> 
    
    `;
}

export function createCategoryTab(category) {
  return ` <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${category.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                </div>
              </div>
            </div> 
  
  `;
}

export function createRecipeCard(recipe) {
  return `
    <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="52772">
              <div class="relative h-48 overflow-hidden">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${
                  recipe.thumbnail
                }" alt="${recipe.name}" loading="lazy">
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                    ${recipe.category}
                  </span>
                  <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                    ${recipe.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${recipe.instructions.join(" ")}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="mr-1 text-blue-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"></path></svg></i>
                    ${recipe.area}
                  </span>
                </div>
              </div>
            </div>
  `;
}

export function createLoadingSpinner() {
  return `
 

<div class="spinner">
  <div></div>   
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
  <div></div>    
</div>

  `;
}
export function updateRecipeTitle(recipeSection, size, area = "") {
  recipeSection.querySelector(
    "div > div > div > p"
  ).textContent = `Showing ${size} ${area} Recipes`;
}
