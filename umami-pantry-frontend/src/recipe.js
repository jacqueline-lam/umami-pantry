class Recipe {
  constructor(recipe) {
    // name, imageUrl, category, serving, time, directions, ingredients
    this.id = recipe.id
    this.name = recipe.name
    this.imageUrl = recipe.image_url
    this.category = recipe.category
    this.serving = recipe.servings
    this.time = recipe.time
    this.directions = recipe.directions
    this.ingredients = recipe.recipe_ingredients
    this.constructor.all.push(this)
  }

  static all = []

  saveIngredients(ingredients){
    // for (const hash of ingredients){
      // hash.
      // hash[:id]
    // }
    // ingredients.forEach(ingredient => {
    //   ingredient
    // })

    // add k-v pair for ingredient name in recipe_ingredient hash
    const recipeIngs = recipeIngridents.map(function (rIngredient, name, value) {
      return Object.assign({}, rIngredient, { [name]: value })
    })

  }
}
