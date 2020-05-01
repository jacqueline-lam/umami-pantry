// rename to AppContainer?
// serves as in browser data storage system

class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:8000/'
    this.ingredientsUrl = `${baseUrl}/ingredients`
    this.recipesUrl = `${baseUrl}/recipes`
  }
  ingredients = []
  categories = []
  recipeResults = {}

  // make a fetch request to recipesUrl
  // once we get back a resp, parse JSON from response
  getIngredients() {
    return fetch(this.recipesUrl)
      .then(resp => resp.json())
  }

  getRecipes(){
    // make a fetch request to /recipes
    // populate recipe and ingredient properties with returned data
    // call renderRecipes
  }

  getRecipes(){
    //create DOM nodes and insert data into them to render in the DOM
  }
}

// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()