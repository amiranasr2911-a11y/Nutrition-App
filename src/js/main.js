// /**
//  * NutriPlan - Main Entry Point
//  *
//  * This is the main entry point for the application.
//  * Import your modules and initialize the app here.
//  */
// class Overlay {
//   static show(overlayEle) {
//     if (!overlayEle) return;
//     overlayEle.classList.remove("loading");
//   }
//   static hide(overlayEle) {
//     if (!overlayEle) return;
//     overlayEle.classList.add("loading");
//   }
// }
// const CATEGORY_ICON_MAP = {
//   beef: "drumstick-bite",
//   chicken: "drumstick",
//   dessert: "ice-cream",
//   lamb: "drumstick-bite",
//   pork: "bacon",
//   goat: "drumstick-bite",

//   seafood: "fish",
//   pasta: "bowl-food",
//   vegetarian: "leaf",
//   vegan: "seedling",
//   breakfast: "mug-hot",

//   side: "utensils",
//   starter: "plate-wheat",
//   miscellaneous: "utensils",
// };
// const home_page_elements = {
//   app_loading_overlay: document.getElementById("app-loading-overlay"),
//   categories_grid: document.getElementById("categories-grid"),
//   recipes_grid: document.getElementById("recipes-grid"),
//   search_filters_tabs: document.getElementById("search-filters-section")
//     .children[0].children[1],
// };

// console.log(home_page_elements.search_filters_tabs);
// const $hub = {
//   $vars: {
//     categories: [],
//     areas: [],
//     recipes: [],
//   },
// };

// const $Datasources = {
//   ds_get_all_meals_categories: get_all_meals_categories,
//   ds_get_all_areas: get_all_areas,
//   ds_get_all_meals: get_all_meals,
// };

// const UI = {
//   ui_init: on_init,
//   ui_render: (items, gridContainer, renderItem) => {
//     items.forEach((item) => {
//       const card = renderItem(item);
//       gridContainer.insertAdjacentHTML("beforeend", card);
//     });
//   },
//   ui_add_event_listeners: "",
// };

// UI.ui_init().then(() => {
//   UI.ui_render(
//     $hub.$vars.areas,
//     home_page_elements.search_filters_tabs,
//     create_area_tab
//   );
//   UI.ui_render(
//     $hub.$vars.categories,
//     home_page_elements.categories_grid,
//     create_category_card
//   );
//   UI.ui_render(
//     $hub.$vars.recipes,
//     home_page_elements.recipes_grid,
//     create_recipe_card
//   );
// });
// // helper functions
// // 1 ==> UI functions
// async function on_init() {
//   Overlay.show(home_page_elements.app_loading_overlay);
//   $hub.$vars.categories = (
//     await $Datasources.ds_get_all_meals_categories()
//   ).results;
//   $hub.$vars.recipes = (await $Datasources.ds_get_all_meals()).results;
//   $hub.$vars.areas = (await $Datasources.ds_get_all_areas()).results;
//   Overlay.hide(home_page_elements.app_loading_overlay);
//   //   UI.ui_render(categories);
// }

// function create_category_card(category) {
//   return `
//   <div
//     class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
//     data-category="Beef"
//   >
//     <div class="flex items-center gap-2.5">
//       <div class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
//         <i data-fa-i2svg="">
//           <svg
//             class="svg-inline--fa fa-drumstick-bite"
//             data-prefix="fas"
//             data-icon="drumstick-bite"
//             role="img"
//             viewBox="0 0 512 512"
//             aria-hidden="true"
//             data-fa-i2svg=""
//           >
//             <path
//               fill="currentColor"
//               d="M160 265.2c0 8.5-3.4 16.6-9.4 22.6l-26.8 26.8c-12.3 12.3-32.5 11.4-49.4 7.2-4.6-1.1-9.5-1.8-14.5-1.8-33.1 0-60 26.9-60 60s26.9 60 60 60c6.3 0 12 5.7 12 12 0 33.1 26.9 60 60 60s60-26.9 60-60c0-5-.6-9.8-1.8-14.5-4.2-16.9-5.2-37.1 7.2-49.4l26.8-26.8c6-6 14.1-9.4 22.6-9.4l89.2 0c6.3 0 12.4-.3 18.5-1 11.9-1.2 16.4-15.5 10.8-26-8.5-15.8-13.3-33.8-13.3-53 0-61.9 50.1-112 112-112 8 0 15.7 .8 23.2 2.4 11.7 2.5 24.1-5.9 22-17.6-14.7-82.3-86.7-144.8-173.2-144.8-97.2 0-176 78.8-176 176l0 89.2z"
//             ></path>
//           </svg>
//         </i>
//       </div>
//       <div>
//         <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
//       </div>
//     </div>
//   </div>
//   `;
// }

// function create_recipe_card(recipe) {
//   return `
//   <div
//     class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
//     data-meal-id="52772"
//   >
//     <div class="relative h-48 overflow-hidden">
//       <img
//         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         src=${recipe.thumbnail}
//         alt="Teriyaki Chicken Casserole"
//         loading="lazy"
//       />
//       <div class="absolute bottom-3 left-3 flex gap-2">
//         <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
//           ${recipe.category}
//         </span>
//         <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
//           ${recipe.area}
//         </span>
//       </div>
//     </div>
//     <div class="p-4">
//       <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
//         ${recipe.name}
//       </h3>
//       <p class="text-xs text-gray-600 mb-3 line-clamp-2">
//         ${recipe.instructions.join(" ")}
//       </p>
//       <div class="flex items-center justify-between text-xs">
//         <span class="font-semibold text-gray-900">
//           <i class="mr-1 text-emerald-600" data-fa-i2svg="">
//             <svg
//               class="svg-inline--fa fa-utensils"
//               data-prefix="fas"
//               data-icon="utensils"
//               role="img"
//               viewBox="0 0 512 512"
//               aria-hidden="true"
//               data-fa-i2svg=""
//             >
//               <path
//                 fill="currentColor"
//                 d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"
//               ></path>
//             </svg>
//           </i>
//           ${recipe.category}
//         </span>
//         <span class="font-semibold text-gray-500">
//           <i class="mr-1 text-blue-500" data-fa-i2svg="">
//             <svg
//               class="svg-inline--fa fa-globe"
//               data-prefix="fas"
//               data-icon="globe"
//               role="img"
//               viewBox="0 0 512 512"
//               aria-hidden="true"
//               data-fa-i2svg=""
//             >
//               <path
//                 fill="currentColor"
//                 d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"
//               ></path>
//             </svg>
//           </i>
//           ${recipe.area}
//         </span>
//       </div>
//     </div>
//   </div>
//   `;
// }
// function create_area_tab(area) {
//   return `
//   <button onclick="filter_by_area('${area.name}')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
//     ${area.name}
// </button>
//   `;
// }
// // 2 ==> Datasources declarations

// async function get_all_meals_categories() {
//   const API_ENDPOINT = "https://nutriplan-api.vercel.app/api/meals/categories";
//   try {
//     const response = await fetch(API_ENDPOINT);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async function get_all_areas() {
//   const API_ENDPOINT = "https://nutriplan-api.vercel.app/api/meals/areas";
//   try {
//     const response = await fetch(API_ENDPOINT);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async function get_all_meals() {
//   const API_ENDPOINT =
//     "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25";
//   try {
//     const response = await fetch(API_ENDPOINT);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // ==> business logic

// function filter_by_area(area) {
//   const all_areas_tabs = document.querySelectorAll(
//     "#search-filters-section > div > div > button"
//   );
//   all_areas_tabs.forEach((tab) => {
//     tab.classList.remove(
//       "bg-emerald-600",
//       "text-white",
//       "hover:bg-emerald-700"
//     );
//     if (tab.textContent.toLowerCase().trim() === area.toLowerCase()) {
//       tab.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
//       tab.classList.add("bg-emerald-600", "text-white");
//     }
//   });
// }
// window.filter_by_area = filter_by_area;
// //    bg-emerald-600 text-white
// //   hover:bg-emerald-700

// //   bg-gray-100 text-gray-700
// //   hover:bg-gray-200

import {
  displayFoodSection,
  displayProductScannerSection,
  createAreaTab,
  createCategoryTab,
  createRecipeCard,
  updateRecipeTitle,
  createLoadingSpinner,
  controlSectionsVisibility,
  createRecipeDetailsCard,
} from "./utils/ui.helpers.js";

import { ds_get_all_areas } from "./datasources/ds_get_all_areas.js";
import { ds_get_all_categories } from "./datasources/ds_get_all_categories.js";
import { ds_get_all_recipes } from "./datasources/ds_get_all_recipes.js";
import { ds_get_recipe_by_area } from "./datasources/ds_get_recipe_by_area.js";
import { ds_get_recipe_by_category } from "./datasources/ds_get_recipe_by_category.js";
import { ds_get_recipe_by_categoryId } from "./datasources/ds_get_recipe_details_by_categoryId.js";
import { ds_search_recipe } from "./datasources/ds_search_recipe.js";
let btnList = document.querySelectorAll("ul li .nav-link ");
let btnText = document.querySelectorAll("ul li .nav-link span");
let productsSection = document.getElementById("products-section");
let foodlogSection = document.getElementById("foodlog-section");
let mealDetails = document.getElementById("meal-details");
let allRecipesSection = document.getElementById("all-recipes-section");
let mealCategoriesSection = document.getElementById("meal-categories-section");
let topicName = document.getElementById("topicName");
let searchFiltersSection = document.getElementById("search-filters-section");
let appLoadingOverlay = document.getElementById("app-loading-overlay");
let searchFiltersTabs = searchFiltersSection.children[0].children[1];
let categoriesGrid = document.getElementById("categories-grid");
let recipesGrid = document.getElementById("recipes-grid");
let sections = [
  productsSection,
  foodlogSection,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
  mealDetails,
];
let searchInput = document.getElementById("search-input");

function displaySections() {
  productsSection.classList.add("hidden");
  foodlogSection.classList.add("hidden");
  mealDetails.classList.add("hidden");
  allRecipesSection.classList.remove("hidden");
  mealCategoriesSection.classList.remove("hidden");
  searchFiltersSection.classList.remove("hidden");
}
displaySections();

btnList.forEach((element) => {
  const activeClassList = ["bg-emerald-50", "text-emerald-700"];
  const inactiveClassList = ["text-gray-600", "hover:bg-gray-50"];
  element.addEventListener("click", function (e) {
    btnList.forEach((btn) => {
      btn.classList.remove(...activeClassList);
    });
    e.currentTarget.classList.add(...activeClassList);
    e.currentTarget.classList.remove(...inactiveClassList);
    e.currentTarget.childNodes[3].classList.add("font-semibold");
    let content = e.currentTarget.querySelector("span").textContent;

    switch (content) {
      case "Meals & Recipes":
        displaySections();
        topicName.innerHTML = content;
        break;
      case "Product Scanner":
        displayProductScannerSection({
          content,
          productsSection,
          foodlogSection,
          allRecipesSection,
          mealCategoriesSection,
          searchFiltersSection,
          topicName,
        });
        break;
      case "Food Log":
        displayFoodSection({
          content,
          productsSection,
          allRecipesSection,
          mealCategoriesSection,
          foodlogSection,
          searchFiltersSection,
          topicName,
        });
    }
  });
});

// async function on_init() {
//   appLoadingOverlay.classList.remove("loading");
//   await ds_get_all_areas();
//   await ds_get_all_categories();
//   await ds_get_all_recipes();
//   appLoadingOverlay.classList.add("loading");
// }
// on_init();

// console.log("App initialized");

// helpers

class App {
  constructor() {
    // this.showLoadingOverlay = showLoadingOverlay;
    this.state = {
      areas: [],
      categories: [],
      recipes: [],
    };

    console.log("App constructor", this.state);
  }
  async on_init() {
    console.log("App initialized");
    this.state.areas = (await ds_get_all_areas()).results;
    this.state.categories = (await ds_get_all_categories()).results;
    this.state.recipes = (await ds_get_all_recipes()).results;
    appLoadingOverlay.classList.add("loading");
    console.log("Data loaded", this.state);
    this.renderUi();

    this.bindEventListeners();
  }

  showLoadingOverlay() {
    appLoadingOverlay.classList.remove("loading");
  }
  hideLoadingOverlay() {
    appLoadingOverlay.classList.add("loading");
  }

  renderUi() {
    searchFiltersTabs.insertAdjacentHTML(
      "beforeend",
      this.state.areas.map((area) => createAreaTab(area)).join("")
    );
    categoriesGrid.insertAdjacentHTML(
      "beforeend",
      this.state.categories
        .slice(0, 12)
        .map((category) => createCategoryTab(category))
        .join("")
    );
    recipesGrid.insertAdjacentHTML(
      "beforeend",
      this.state.recipes
        .slice(0, 25)
        .map((recipe) => createRecipeCard(recipe))
        .join("")
    );
    updateRecipeTitle(allRecipesSection, this.state.recipes.length);
  }

  bindEventListeners() {
    // Bind event listeners here

    // Add search input event listener
    searchInput.addEventListener("input", (e) => {
      console.log(e.target.value);
      const searchValue = e.target.value.trim();
      recipesGrid.innerHTML = createLoadingSpinner();
      ds_search_recipe(searchValue).then((data) => {
        recipesGrid.innerHTML = "";
        recipesGrid.insertAdjacentHTML(
          "beforeend",
          data.results.map((recipe) => createRecipeCard(recipe)).join("")
        );

        Array.from(recipesGrid.children).forEach((recipe) => {
          recipe.addEventListener("click", (e) => {
            console.log("Recipe card clicked", e.currentTarget);
            console.log("Meal ID:", e.currentTarget.dataset.mealId);
            ds_get_recipe_by_categoryId(e.currentTarget.dataset.mealId).then(
              (data) => {
                console.log("Recipe details:", data.result);
                controlSectionsVisibility(sections, [mealDetails]);
                mealDetails.innerHTML = "";
                mealDetails.insertAdjacentHTML(
                  "beforeend",
                  createRecipeDetailsCard(data.result)
                );
                let backToMealsBtn =
                  document.getElementById("back-to-meals-btn");
                backToMealsBtn.addEventListener("click", () => {
                  console.log("Back to Meals button clicked");
                  controlSectionsVisibility(sections, [
                    allRecipesSection,
                    mealCategoriesSection,
                    searchFiltersSection,
                  ]);
                });
              }
            );
          });
        });
      });
    });
    // searchFiltersTabs.children
    Array.from(searchFiltersTabs.children).forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const activeClasses = [
          "hover:bg-emerald-700",
          "hover:text-white",
          "bg-emerald-600",
          "text-white",
        ];
        const inactiveClasses = [
          "hover:bg-gray-200",
          "bg-gray-100",
          "text-gray-700",
        ];
        Array.from(searchFiltersTabs.children).forEach((btn) => {
          btn.classList.remove(...activeClasses);
          if (!btn.classList.contains("text-gray-700")) {
            btn.classList.add(...inactiveClasses);
          }
        });

        e.currentTarget.classList.add(...activeClasses);
        e.currentTarget.classList.remove(...inactiveClasses);
        const area = e.currentTarget.textContent.trim();
        recipesGrid.innerHTML = "";
        recipesGrid.insertAdjacentHTML("beforeend", createLoadingSpinner());

        if (area.toLowerCase() === "all recipes") {
          console.log(area);
          console.log("All Recipes selected");
          ds_get_all_recipes().then((data) => {
            recipesGrid.innerHTML = "";
            recipesGrid.insertAdjacentHTML(
              "beforeend",
              data.results.map((recipe) => createRecipeCard(recipe)).join("")
            );
            updateRecipeTitle(allRecipesSection, data.results.length);
          });
        }
        ds_get_recipe_by_area(area).then((data) => {
          recipesGrid.innerHTML = "";
          recipesGrid.insertAdjacentHTML(
            "beforeend",
            data.results.map((recipe) => createRecipeCard(recipe)).join("")
          );
          updateRecipeTitle(allRecipesSection, data.results.length, area);
        });
      });
    });

    //  add event listener for the Categories cards

    Array.from(categoriesGrid.children).forEach((cat) => {
      cat.addEventListener("click", (e) => {
        recipesGrid.innerHTML = "";
        recipesGrid.insertAdjacentHTML("beforeend", createLoadingSpinner());
        const category = e.currentTarget.dataset.category;
        ds_get_recipe_by_category(e.currentTarget.dataset.category).then(
          (data) => {
            const recipeList = data.results;
            recipesGrid.innerHTML = "";
            recipesGrid.insertAdjacentHTML(
              "beforeend",
              recipeList.map((recipe) => createRecipeCard(recipe)).join("")
            );
            updateRecipeTitle(allRecipesSection, recipeList.length, category);
            Array.from(recipesGrid.children).forEach((recipe) => {
              recipe.addEventListener("click", (e) => {
                console.log("Recipe card clicked", e.currentTarget);
                console.log("Meal ID:", e.currentTarget.dataset.mealId);
                ds_get_recipe_by_categoryId(
                  e.currentTarget.dataset.mealId
                ).then((data) => {
                  console.log("Recipe details:", data.result);
                  controlSectionsVisibility(sections, [mealDetails]);
                  mealDetails.innerHTML = "";
                  mealDetails.insertAdjacentHTML(
                    "beforeend",
                    createRecipeDetailsCard(data.result)
                  );
                  let backToMealsBtn =
                    document.getElementById("back-to-meals-btn");
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
            });
          }
        );
      });
    });

    //  add event listener for the recipe cards
    Array.from(recipesGrid.children).forEach((recipe) => {
      recipe.addEventListener("click", (e) => {
        console.log("Recipe card clicked", e.currentTarget);
        console.log("Meal ID:", e.currentTarget.dataset.mealId);
        ds_get_recipe_by_categoryId(e.currentTarget.dataset.mealId).then(
          (data) => {
            console.log("Recipe details:", data.result);
            controlSectionsVisibility(sections, [mealDetails]);
            mealDetails.innerHTML = "";
            mealDetails.insertAdjacentHTML(
              "beforeend",
              createRecipeDetailsCard(data.result)
            );
            let backToMealsBtn = document.getElementById("back-to-meals-btn");
            backToMealsBtn.addEventListener("click", () => {
              console.log("Back to Meals button clicked");
              controlSectionsVisibility(sections, [
                allRecipesSection,
                mealCategoriesSection,
                searchFiltersSection,
              ]);
            });
          }
        );
      });
    });
    // backToMealsBtn.addEventListener("click", () => {
    //   console.log("Back to Meals button clicked");
    //   controlSectionsVisibility(sections, productsSection);
    // });
  }
}

function initializeApp() {
  const app = new App();
  console.log("Starting app...", app);
  app.showLoadingOverlay();
  app.on_init();
}

initializeApp();

/*. active

hover:bg-emerald-700 hover:text-white  bg-emerald-600 text-white
*/

/*inactive
 "hover:bg-gray-200"  "bg-gray-100" "text-gray-700"

*/

// function makeFunc() {
//   const name = "Mozilla";
//   function displayName() {
//     console.log(name);
//   }
//   return displayName;
// }

// const myFunc = makeFunc();
// myFunc();
