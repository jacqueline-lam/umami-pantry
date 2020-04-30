// rename to Adapter?
class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:8000/'
    this.ingredientsUrl = `${baseUrl}/ingredients`
    this.recipesUrl = `${baseUrl}/recipes`
  }

  // make a fetch request to recipesUrl
  // once we get back a resp, parse JSON from response 
  getIngredients() {
    return fetch(this.recipesUrl)
      .then(resp => resp.json())
  }
}

// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()