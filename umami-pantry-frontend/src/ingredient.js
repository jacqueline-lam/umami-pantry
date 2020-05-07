class Ingredient {
  constructor(name, imageUrl, category) {
    this.name = name
    this.imageUrl = imageUrl
    this.category = category
    this.constructor.all.push(this)
  }
  static all = []
  // fetchAndLoadIngredients() {}
}

// console.log(Ingredient.all)