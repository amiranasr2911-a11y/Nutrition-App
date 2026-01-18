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
  displayNotFoundCard,
  clearProductsGrid,
  createProductCategoryButton,
  handleProductsGrid,
  attachEventToProductCard,
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
// let productDetailModal = document.getElementById("product-detail-modal");
let gridViewBtn = document.getElementById("grid-view-btn");
let listViewBtn = document.getElementById("list-view-btn");
let recipesGridLayout = document.getElementById("recipes-grid-Layout");
// let logMealBtn = document.getElementById("log-meal-btn");

let sections = [
  productsSection,
  foodlogSection,
  allRecipesSection,
  mealCategoriesSection,
  searchFiltersSection,
  mealDetails,
];

console.log("product cat", productCategories.children);

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
      productCategories: [],
    };
  }
  async on_init() {
    this.state.areas = (await ds_get_all_areas()).results;
    this.state.categories = (await ds_get_all_categories()).results;
    this.state.recipes = (await ds_get_all_recipes()).results;
    this.state.productCategories = (
      await ds_get_all_products_category()
    ).results;
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
    productCategories.insertAdjacentHTML(
      "beforeend",
      this.state.productCategories
        .map((cat) => createProductCategoryButton(cat))
        .join(""),
    );
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
      const data = await ds_get_all_products_by_name(productSearchInput.value);
      handleProductsGrid(
        data?.results,
        productsEmpty,
        productsGrid,
        productsCount,
      );
      attachEventToProductCard(
        Array.from(productsGrid.children),

        productsSection,
      );
    });

    lookupBarcodeBtn.addEventListener("click", async () => {
      productsGrid.innerHTML = createLoadingSpinner();
      await ds_get_product_by_barcode(barcodeInput.value).then((data) => {
        if (Object.keys(data?.result).length > 0) {
          console.log("Product found");
          console.log(productsGrid);
          clearProductsGrid(productsEmpty, productsGrid);
          productsCount.innerHTML = `Found 1 product ${data.result.name} with barcode "${barcodeInput.value}"`;
          productsGrid.insertAdjacentHTML(
            "beforeend",
            createProductCardByBarcode(data.result),
          );
          attachEventToProductCard();
        }
        // chickData(productsEmpty, productsCount)
        else displayNotFoundCard(productsEmpty, productsCount);
      });
    });

    Array.from(productCategories.children).forEach((cat) => {
      cat.addEventListener("click", (e) => {
        console.log("clicked category", e.currentTarget.textContent.trim());
        productsGrid.innerHTML = createLoadingSpinner();
        ds_get_products_by_category(e.currentTarget.textContent.trim()).then(
          (data) => {
            console.log("products by category", data.results);
            handleProductsGrid(
              data?.results,
              productsEmpty,
              productsGrid,
              productsCount,
            );
          },
        );
      });
    });
    Array.from(productScore.children).forEach((score) => {
      score.addEventListener("click", (e) => {
        console.log("clicked score", e.currentTarget.dataset.grade);
        const grade = e.currentTarget.dataset.grade || "all";
        const filteredProducts = Array.from(productsGrid.children).filter(
          (p) =>
            p
              .querySelector(".nutri-score-badge")
              .textContent.trim()
              .slice(-1) === grade || grade === "all",
        );
        console.log(
          "filtered products",
          filteredProducts.map((p) => p),
        );
        if (filteredProducts.length > 0) {
          productsGrid.innerHTML = filteredProducts
            .map((p) => p.outerHTML)
            .join("");

          productsCount.innerHTML = `Found ${filteredProducts.length} products with Nutri-Score "${grade.toUpperCase()}"`;
          attachEventToProductCard(Array.from(productsGrid.children));
        } else {
          productsGrid.innerHTML = "";
          displayNotFoundCard(productsEmpty, productsCount);
          productsCount.innerHTML = `Found 0 products with Nutri-Score "${grade.toUpperCase()}"`;
        }
      });
    });

    Array.from(productsGrid.children).forEach((card) => {
      card.addEventListener("click", (e) => {
        console.log("clicked product card", e.currentTarget);
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
