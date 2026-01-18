import { ds_get_product_by_barcode } from "../datasources/ds_get_product_by_barcode.js";
import { ds_get_products_by_category } from "../datasources/ds_get_products_by_category.js";
import { ds_get_recipe_by_categoryId } from "../datasources/ds_get_recipe_details_by_categoryId.js";

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
              class="category-card ${getRandomBgColor()}  rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
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
    <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id=${
      recipe.id
    }>
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
  recipeSection.querySelector("div > div > div > p").textContent =
    `Showing ${size} ${area} Recipes`;
}

export function controlSectionsVisibility(sections, targetSection) {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
  targetSection.forEach((section) => {
    section.classList.remove("hidden");
  });
}

export function createRecipeDetailsCard(recipe) {
  return `
      <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${recipe.thumbnail}"
                alt="${recipe.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${recipe.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${recipe.area}</span
                  >
                    ${
                      recipe.tags.length > 0
                        ? `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                          ${recipe.tags[0] || recipe.tags[1]}
                        </span>`
                        : ""
                    }
                  
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${recipe.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="52772"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${recipe.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${createIngredientItem(recipe.ingredients)}
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                    ${createInstructionItem(recipe.instructions)}
                </div>
              </div>

              <!-- Video Section -->
                ${
                  recipe.youtube
                    ? `<div class="bg-white rounded-2xl shadow-lg p-6">
                      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-video text-red-500"></i>
                        Video Tutorial
                      </h2>
                      <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <iframe
                          src="${recipe.youtube}"
                          class="absolute inset-0 w-full h-full"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>`
                    : ""
                }
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">485</p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">42g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: 84%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">52g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 17%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">8g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: 12%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">4g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: 14%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">12g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: 24%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Vitamins & Minerals (% Daily Value)
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin A</span>
                        <span class="font-medium">15%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin C</span>
                        <span class="font-medium">25%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Calcium</span>
                        <span class="font-medium">4%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Iron</span>
                        <span class="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;
}

function createIngredientItem(ingredients) {
  const box = ingredients
    .map((ingredient) => {
      return `
               <div
                 class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${ingredient.measure} ${ingredient.ingredient}</span> 
                    </span>
                  </div>          
  `;
    })
    .join("");

  return box;
}

function createInstructionItem(instructions) {
  const box = instructions
    .map((instruction) => {
      return `
                <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      1
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${instruction}
                    </p>
                  </div>
  `;
    })
    .join("");

  return box;
}

export function attachEventToRecipeCard(
  recipesGrid,
  mealDetails,
  sections,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
) {
  Array.from(recipesGrid.children).forEach((recipe) => {
    recipe.addEventListener("click", async (e) => {
      console.log("Recipe card clicked", e.currentTarget);
      console.log("Meal ID:", e.currentTarget.dataset.mealId);
      const data = (
        await ds_get_recipe_by_categoryId(e.currentTarget.dataset.mealId)
      ).result;

      const mealName = data.name;
      console.log("amariam", data);
      controlSectionsVisibility(sections, [mealDetails]);
      mealDetails.innerHTML = "";
      mealDetails.insertAdjacentHTML(
        "beforeend",
        createRecipeDetailsCard(data),
      );

      const nutritionData = (await ds_get_products_by_category(data.category))
        .results[0];
      let backToMealsBtn = document.getElementById("back-to-meals-btn");
      const logMealBtn = document.getElementById("log-meal-btn");
      console.log("data recieved", nutritionData);
      attachEventToLogMealBtn(logMealBtn, { mealName, ...nutritionData });
      backToMealsBtn.addEventListener("click", () => {
        console.log("Back to Meals button clicked");
        controlSectionsVisibility(sections, [
          allRecipesSection,
          mealCategoriesSection,
          searchFiltersSection,
        ]);
      });
    });
  });
}

export function attachEventToLogMealBtn(logMealBtn, data) {
  logMealBtn.addEventListener("click", (e) => {
    console.log("Log Meal button clicked", e.currentTarget);
    document.body.insertAdjacentHTML("beforeend", createLogMealModal(data));
    const cancelLogMealModal = document.getElementById("cancel-log-meal");
    cancelLogMealModal.addEventListener("click", () => {
      document.getElementById("log-meal-modal").remove();
    });
    const increaseServings = document.getElementById("increase-servings");
    const decreaseServings = document.getElementById("decrease-servings");
    const mealServingInput = document.getElementById("meal-servings");
    increaseServings.addEventListener("click", () => {
      mealServingInput.value = Number(mealServingInput.value) + 1;
    });
    decreaseServings.addEventListener("click", () => {
      if (mealServingInput.value <= 1) return;
      mealServingInput.value = Number(mealServingInput.value) - 1;
    });
  });
}
export function createProductCard(product) {
  return `
   <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div 
                    class="nutri-score-badge absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${product.novaGroup}"
                  >
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>${product.nutrients.sodium}g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>

  `;
}
export function createProductCardByBarcode(product) {
  return `
   <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div 
                    class="nutri-score-badge absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                   ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>${product.nutrients.sodium}g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>

  `;
}

export function clearProductsGrid(productsEmpty, productsGrid) {
  productsEmpty.classList.add("hidden");
  productsGrid.innerHTML = "";
}
export function displayNotFoundCard(productsEmpty, productsCount) {
  productsEmpty.classList.remove("hidden");
  productsCount.innerHTML = `Search for products to see results`;
}

function getRandomBgColor() {
  const tailwindBg100Colors = [
    "bg-gray-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-emerald-100",
  ];
  const colorIndex = Math.floor(Math.random() * tailwindBg100Colors.length);
  return tailwindBg100Colors[colorIndex];
}

export function createProductCategoryButton(category) {
  const randomBgColor = getRandomBgColor();
  return `
   <button
                class="product-category-btn px-4 py-4 ${randomBgColor} text-emerald-700 rounded-xl text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
              >
                <i class="fa-solid fa-cookie mr-1.5"></i>${category.name}
              </button>
  `;
}

export function handleProductsGrid(
  data,
  productsEmpty,
  productsGrid,
  productsCount,
) {
  if (data?.length > 0) {
    clearProductsGrid(productsEmpty, productsGrid);
    productsCount.innerHTML = `Found ${data?.length} products`;
    productsGrid.insertAdjacentHTML(
      "beforeend",
      data
        .map((product) => {
          return createProductCard(product);
        })
        .join(""),
    );
  } else displayNotFoundCard(productsEmpty, productsCount);
}

export function attachEventToProductCard(productCards, productsSection) {
  console.log(productCards[0]);
  console.log("Attach event to product card function called");
  productCards.forEach((productCard) => {
    productCard.addEventListener("click", async (e) => {
      const barcode = e.currentTarget.dataset.barcode;
      const data = (await ds_get_product_by_barcode(barcode)).result;
      console.log("Product card clicked", e.currentTarget);

      productsSection.insertAdjacentHTML(
        "beforeend",
        createProductDetailModal(data),
      );

      const closeProductModalBtns = document.querySelectorAll(
        ".close-product-modal",
      );
      const productDetailModal = document.querySelector(
        "#product-detail-modal",
      );
      console.log(closeProductModalBtns);

      closeProductModalBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
          productDetailModal.remove();

          console.log("hii");
        }),
      );
    });
  });
}

export function createProductDetailModal(data) {
  console.log(data);

  return `
       <div
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          id="product-detail-modal"
        >
          <div
            class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div class="p-6">
              <!-- Header -->
              <div class="flex items-start gap-6 mb-6">
                <div
                  class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                >
                  <img
                    src="${data.image}"
                    alt="${data.name}"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-emerald-600 font-semibold mb-1">
                    ${data.name}                                                    
                  </p>
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    ${data.name}
                  </h2>
                  <p class="text-sm text-gray-500 mb-3">33 cl</p>

                  <div class="flex items-center gap-3">
                    <div
                      class="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                      style="background-color: #03814120"
                    >
                      <span
                        class="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                        style="background-color: #038141"
                      >
                        A
                      </span>
                      <div>
                        <p class="text-xs font-bold" style="color: #038141">
                          Nutri-Score
                        </p>
                        <p class="text-[10px] text-gray-600">${data.nutritionGrade}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="close-product-modal text-gray-400 hover:text-gray-600"
                >
                  <i class="text-2xl" data-fa-i2svg=""
                    ><svg
                      class="svg-inline--fa fa-xmark"
                      data-prefix="fas"
                      data-icon="xmark"
                      role="img"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
                      ></path></svg
                  ></i>
                </button>
              </div>

              <!-- Nutrition Facts -->
              <div
                class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200"
              >
                <h3
                  class="font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="text-emerald-600" data-fa-i2svg=""
                    ><svg
                      class="svg-inline--fa fa-chart-pie"
                      data-prefix="fas"
                      data-icon="chart-pie"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"
                      ></path></svg
                  ></i>
                  Nutrition Facts
                  <span class="text-sm font-normal text-gray-500"
                    >(per 100g)</span
                  >
                </h3>

                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                  <p class="text-4xl font-bold text-gray-900">${data.nutrients.calories}</p>
                  <p class="text-sm text-gray-500">Calories</p>
                </div>

                <div class="grid grid-cols-4 gap-4">
                  <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: 0%"
                      ></div>
                    </div>
                    <p class="text-lg font-bold text-emerald-600">${data.nutrients.protein}g</p>
                    <p class="text-xs text-gray-500">Protein</p>
                  </div>
                  <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 4.2%"
                      ></div>
                    </div>
                    <p class="text-lg font-bold text-blue-600">${data.nutrients.carbs}g</p>
                    <p class="text-xs text-gray-500">Carbs</p>
                  </div>
                  <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: 0%"
                      ></div>
                    </div>
                    <p class="text-lg font-bold text-purple-600">${data.nutrients.fat}g</p>
                    <p class="text-xs text-gray-500">Fat</p>
                  </div>
                  <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: 2.8%"
                      ></div>
                    </div>
                    <p class="text-lg font-bold text-orange-600">${data.nutrients.sugar}g</p>
                    <p class="text-xs text-gray-500">Sugar</p>
                  </div>
                </div>

                <div
                  class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200"
                >
                  <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">${data.nutrients.fat}g</p>
                    <p class="text-xs text-gray-500">Saturated Fat</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">${data.nutrients.fiber}g</p>
                    <p class="text-xs text-gray-500">Fiber</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">${data.nutrients.sodium}g</p>
                    <p class="text-xs text-gray-500">Salt</p>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->

              <div class="bg-gray-50 rounded-xl p-5 mb-6">
                <h3
                  class="font-bold text-gray-900 mb-3 flex items-center gap-2"
                >
                  <i class="text-gray-600" data-fa-i2svg=""
                    ><svg
                      class="svg-inline--fa fa-list"
                      data-prefix="fas"
                      data-icon="list"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"
                      ></path></svg
                  ></i>
                  Ingredients
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  OBD1 999 999 1112606 266963207 mb
                </p>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
                  data-barcode="6111035000430"
                >
                  <i class="mr-2" data-fa-i2svg=""
                    ><svg
                      class="svg-inline--fa fa-plus"
                      data-prefix="fas"
                      data-icon="plus"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"
                      ></path></svg></i
                  >Log This Food
                </button>
                <button
                  class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
  `;
}

function createLogMealModal(data) {
  console.log(data);
  return `
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="log-meal-modal">
            <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${data.image}" alt="Chicken Handi" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${data.mealName}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${data.nutrients.calories}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${data.nutrients.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${data.nutrients.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${data.nutrients.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>
        </div>
  `;
}
