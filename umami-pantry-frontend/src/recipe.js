class Recipe {
  constructor(name, imageUrl, category, serving, time, directions, ingredients, recipe_ingredients){
    this.name = name
    this.imageUrl = imageUrl
    this.category = category
    this.serving = serving
    this.time = time
    this.directions = directions
    this.ingredients = this.saveIngredients(ingredients)

  }
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
