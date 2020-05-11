class Ingredient {
  constructor(id, name, category, imageUrl) {
    this.id = id
    this.name = name
    this.category = category
    this.imageUrl = imageUrl
    this.constructor.all.push(this)
  }
  static all = []
  // fetchAndLoadIngredients() {}
}