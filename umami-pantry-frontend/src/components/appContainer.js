// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard');
const recipesContainer = document.getElementById('recipesContainer');
const recipesDiv = document.getElementById("recipeCardsDiv");
const selectedRecipeContainer = document.getElementById('selectedRecipeContainer');
const selectedRecipeDiv = document.getElementById('selectedRecipe');
const formDiv = document.getElementById('subIngredientForm')
const returnBtn = document.getElementById('returnToRecipesBtn');
const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');
let renderedSIForm = false;

class AppContainer {
  constructor() {
    this.ingredientsAdapter = new IngredientsAdapter();
    this.recipesAdapter = new RecipesAdapter();
  }

  // Event delegation / Manage event listeners
  bindEventListeners() {
    this.selectIngredientListener();
    this.clearIngredientsListener();
    this.selectedRecipeDivListener();
    this.addSubIngredientListener();
  };

  // Eventlistener for Ingredient Card
  selectIngredientListener() {
    ingredientsContainer.addEventListener('click', e => {
      for (const ingredientCard of ingredientCards) {
        // if ingredientCard is clicked
        if ((e.target == ingredientCard) || (e.target.parentNode == ingredientCard)) {
          Ingredient.selectIngredientHandler(ingredientCard)
        };
      };
    });
  }

  // Eventlistener for 'Clear All Ingredients' Button
  clearIngredientsListener() {
    let clearIngredientsBtn = document.getElementById('clearIngredientsBtn')
    clearIngredientsBtn.addEventListener('click', () => Ingredient.clearIngredientsHandler());
  };

  // Eventlistener for Selected Recipe Div
  selectedRecipeDivListener() {
    selectedRecipeContainer.addEventListener('click', e => {
      // Return to Matching Recipes Btn
      if (e.target === returnBtn) {
        ingredientsContainer.style.display = 'block';
        returnBtn.style.display = 'none';
        addSubIngredientBtn.style.display = 'none';
        Recipe.redisplayMatchingRecipes();
      } else if (e.target === addSubIngredientBtn){ // 'Add A Subsitute Ingredient' Btn
        addSubIngredientBtn.style.display = 'none';
        let recipeId = parseInt(selectedRecipeContainer.dataset.recipeId, 10);
        Recipe.renderAddSubIngredientForm(recipeId);
        renderedSIForm = true;
      };
    });
  };

  // EventListener for Substitute Ingredient Submission
  addSubIngredientListener() {
    //eventlistener for Substitute Ingredient Submit btn
    formDiv.addEventListener('submit', e => {
      e.preventDefault();
      Recipe.handleSubmitForm();
    });
  };
};