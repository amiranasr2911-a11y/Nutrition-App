// /**
//  * NutriPlan - Main Entry Point
//  *
//  * This is the main entry point for the application.
//  * Import your modules and initialize the app here.
//  */

import {
  createAreaTab,
  createCategoryTab,
  createRecipeCard,
  updateRecipeTitle,
  createLoadingSpinner,
  controlSectionsVisibility,
  createRecipeDetailsCard,
  attachEventToRecipeCard,
  createProductCard,
  createProductCardByBarcode,
  chickData,
  displayNotFoundCard,
} from "./utils/ui.helpers.js";

import { ds_get_all_areas } from "./datasources/ds_get_all_areas.js";
import { ds_get_all_categories } from "./datasources/ds_get_all_categories.js";
import { ds_get_all_recipes } from "./datasources/ds_get_all_recipes.js";
import { ds_get_recipe_by_area } from "./datasources/ds_get_recipe_by_area.js";
import { ds_get_recipe_by_category } from "./datasources/ds_get_recipe_by_category.js";
import { ds_search_recipe } from "./datasources/ds_search_recipe.js";
import { ds_get_all_products_by_name } from "./datasources/ds_get_all_product_by_name.js";
import { ds_get_product_by_barcode } from "./datasources/ds_get_product_by_barcode.js";
import { ds_get_recipe_by_categoryId } from "./datasources/ds_get_recipe_details_by_categoryId.js";
import { ds_get_all_products_category } from "./datasources/get_all_products_category.js";
import { ds_get_products_by_category } from "./datasources/ds_get_products_by_category.js";
import { analyze_recipe_nutrition } from "./datasources/analyze_recipe_nutrition.js";

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
let searchInput = document.getElementById("search-input");
let productSearchInput = document.getElementById("product-search-input");
let searchProductBtn = document.getElementById("search-product-btn");
let productsCount = document.getElementById("products-count");
let productsGrid = document.getElementById("products-grid");
let barcodeInput = document.getElementById("barcode-input");
let lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
let productsEmpty = document.getElementById("products-empty");
let productCategories = document.getElementById("product-categories");
let productScore = document.getElementById("product-score");
let productDetailModal = document.getElementById("product-detail-modal");
let gridViewBtn = document.getElementById("grid-view-btn");
let listViewBtn = document.getElementById("list-view-btn");
let recipesGridLayout = document.getElementById("recipes-grid-Layout");

let sections = [
  productsSection,
  foodlogSection,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
  mealDetails,
  productDetailModal,
];

function displaySections() {
  controlSectionsVisibility(sections, [
    allRecipesSection,
    mealCategoriesSection,
    searchFiltersSection,
  ]);
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
        controlSectionsVisibility(sections, [productsSection]);
        topicName.innerHTML = content;
        break;
      case "Food Log":
        controlSectionsVisibility(sections, [foodlogSection]);
        topicName.innerHTML = content;
    }
  });
});


class App {
  constructor() {
    // this.showLoadingOverlay = showLoadingOverlay;
    this.state = {
      areas: [],
      categories: [],
      recipes: [],
    };
  }
  async on_init() {
    this.state.areas = (await ds_get_all_areas()).results;
    this.state.categories = (await ds_get_all_categories()).results;
    this.state.recipes = (await ds_get_all_recipes()).results;
    appLoadingOverlay.classList.add("loading");
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
      this.state.areas.map((area) => createAreaTab(area)).join(""),
    );
    categoriesGrid.insertAdjacentHTML(
      "beforeend",
      this.state.categories
        .slice(0, 12)
        .map((category) => createCategoryTab(category))
        .join(""),
    );
    recipesGrid.insertAdjacentHTML(
      "beforeend",
      this.state.recipes
        .slice(0, 25)
        .map((recipe) => createRecipeCard(recipe))
        .join(""),
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
          data.results.map((recipe) => createRecipeCard(recipe)).join(""),
        );
        attachEventToRecipeCard(
          recipesGrid,
          mealDetails,
          sections,
          allRecipesSection,
          mealCategoriesSection,
          searchFiltersSection,
        );
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
              data.results.map((recipe) => createRecipeCard(recipe)).join(""),
            );
            updateRecipeTitle(allRecipesSection, data.results.length);
          });
          return;
        }

        ds_get_recipe_by_area(area).then((data) => {
          recipesGrid.innerHTML = "";
          recipesGrid.insertAdjacentHTML(
            "beforeend",
            data.results.map((recipe) => createRecipeCard(recipe)).join(""),
          );
          updateRecipeTitle(allRecipesSection, data.results.length, area);
          attachEventToRecipeCard(
            recipesGrid,
            mealDetails,
            sections,
            allRecipesSection,
            mealCategoriesSection,
            searchFiltersSection,
          );
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
              recipeList.map((recipe) => createRecipeCard(recipe)).join(""),
            );
            updateRecipeTitle(allRecipesSection, recipeList.length, category);
            attachEventToRecipeCard(
              recipesGrid,
              mealDetails,
              sections,
              allRecipesSection,
              mealCategoriesSection,
              searchFiltersSection,
            );
            // Array.from(recipesGrid.children).forEach((recipe) => {
            //   recipe.addEventListener("click", (e) => {
            //     console.log("Recipe card clicked", e.currentTarget);
            //     console.log("Meal ID:", e.currentTarget.dataset.mealId);
            //     ds_get_recipe_by_categoryId(
            //       e.currentTarget.dataset.mealId,
            //     ).then((data) => {
            //       console.log("Recipe details:", data.result);
            //       controlSectionsVisibility(sections, [mealDetails]);
            //       mealDetails.innerHTML = "";
            //       mealDetails.insertAdjacentHTML(
            //         "beforeend",
            //         createRecipeDetailsCard(data.result),
            //       );
            //       let backToMealsBtn =
            //         document.getElementById("back-to-meals-btn");
            //       backToMealsBtn.addEventListener("click", () => {
            //         console.log("Back to Meals button clicked");
            //         controlSectionsVisibility(sections, [
            //           allRecipesSection,
            //           mealCategoriesSection,
            //           searchFiltersSection,
            //         ]);
            //       });
            //     });
            //   });
            // });
          },
        );
      });
    });

    //  add event listener for the recipe cards
    attachEventToRecipeCard(
      recipesGrid,
      mealDetails,
      sections,
      allRecipesSection,
      mealCategoriesSection,
      searchFiltersSection,
    );

    searchProductBtn.addEventListener("click", async () => {
      productsGrid.innerHTML = createLoadingSpinner();
      await ds_get_all_products_by_name(productSearchInput.value).then(
        (data) => {
          data
            ? chickData(productsEmpty, productsCount)
            : displayNotFoundCard(productsEmpty, productsCount);

          productsGrid.innerHTML = "";
          productsGrid.insertAdjacentHTML(
            "beforeend",
            data.results
              .map((product) => {
                return createProductCard(product);
              })
              .join(""),
          );
        },
      );
    });

    lookupBarcodeBtn.addEventListener("click", async () => {
      productsGrid.innerHTML = createLoadingSpinner();
      await ds_get_product_by_barcode(barcodeInput.value).then((data) => {

        data
          ? chickData(productsEmpty, productsCount)
          : displayNotFoundCard(productsEmpty, productsCount);

        productsGrid.innerHTML = "";
        productsGrid.insertAdjacentHTML(
          "beforeend",
          Object.entries(data.result)
            .map((key, value) => {
              return createProductCardByBarcode(key, value);
            })
            .join(""),
        );
      });
    });
  }
}

function initializeApp() {
  const app = new App();
  app.showLoadingOverlay();
  app.on_init();
}

initializeApp();
