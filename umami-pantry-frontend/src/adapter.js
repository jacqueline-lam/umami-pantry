// rename to AppContainer?
// serves as in browser data storage system

class Adapter {
  constructor(baseUrl='http://localhost:3000/') {
    this.baseUrl = 'http://localhost:3000/'
    this.ingredientsUrl = `${baseUrl}/ingredients`
    this.recipesUrl = `${baseUrl}/recipes`
  }
  ingredients = []
  categories = []
  recipeResults = {}

  // make a fetch request to recipesUrl
  // once we get back a resp, parse JSON from response
  // fetch return Promise and if resolved, do next then until we get a JSON representation of our ingredients
  getIngredients() {
    return fetch(this.recipesUrl)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => alert(err))
  }

  getRecipes(){
    // make a fetch request to /recipes
    // populate recipe and ingredient properties with returned data
      // temporarily persisting to propetrties in container instances
    // call renderRecipes - DOM manipulation via render activities
  }

  getRecipes(){
    //create DOM nodes and insert data into them to render in the DOM
  }
}

// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()