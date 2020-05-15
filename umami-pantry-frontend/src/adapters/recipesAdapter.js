class RecipesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/get_recipes'
    this.updateRecipeUrl = 'http://localhost:3000/recipe_ingredients'
  }

  getMatchingRecipes(selectedIngredients) {
    let matchingRecipes = []
    return fetch(`${this.baseUrl}/?selected_ingredients=${selectedIngredients}`)
      .then(resp => resp.json())
      .then(recipesData => {
        recipesData.forEach(recipe => {
          let r = Recipe.findById(recipe.id)
          r = r || new Recipe(recipe)
          matchingRecipes.push(r);
        })
        AppContainer.renderMatchingRecipes(matchingRecipes);
      })
      .catch(err => console.log(err));
  };

  // CREATE RECIPE INGREDIENT
  postSubIngredient(recipeIngredientObj) {
    let configObj = {
      method: 'POST',
      mode: 'cors',
      headers: { // indicate format of data being sent and acceoted in return
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      // data must be sent as text between client and server
      // convert objects to strings
      body: JSON.stringify(recipeIngredientObj)
    }

    fetch(this.updateRecipeUrl, configObj)
      .then(resp => resp.json())
      .then(recipeData => {
        // Update Recipe class objects
        Object.assign(Recipe.findById(recipeData.id).ingredients, recipeData.ingredients)
        AppContainer.renderSelectedRecipe(recipeData)
      })
      .catch(err=> alert(err))
  }
}