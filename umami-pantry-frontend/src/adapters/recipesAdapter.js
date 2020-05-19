class RecipesAdapter {
  constructor() {
    // endpoints to access specific pieces of data
    this.baseUrl = 'http://localhost:3000/';
    this.recipesUrl = `${this.baseUrl}/get_recipes`;
    this.recipeUrl = `${this.baseUrl}/recipes/`;
    this.recipeIngredientsUrl = `${this.baseUrl}/recipe_ingredients`;
  }

  // READ MATCHING RECIPES
  // GET request for all recipes that match ingredientId
  // populate recipe + associated properties with returned data
  // temporarily persisting to propetrties in container instances
  getMatchingRecipes(ingredientIds) {
    return fetch(`${this.recipesUrl}/?selected_ingredients=${ingredientIds}`)
      .then(resp => resp.json())
      .catch(err => alert(err));
  };

  // READ SINGLE SELECTED RECIPE
  getSelectedRecipe(recipeId) {
    console.log("Got recipe ID: " + recipeId);
    return fetch(`${this.recipeUrl}/${recipeId}`)
      .then(resp => resp.json())
      .catch(err => console.log(err))
  };

  // CREATE RECIPE INGREDIENT
  postSubIngredient(recipeIngredientObj) {
    let configObj = {
      method: 'POST',
      headers: { // indicate format of data being sent and accepted in return
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      // data must be sent as text between client and server
      // convert objects to strings
      body: JSON.stringify(recipeIngredientObj)
    }

    return fetch(this.recipeIngredientsUrl, configObj)
      .then(resp => resp.json())
      .catch(err=> alert(err))
  }
}