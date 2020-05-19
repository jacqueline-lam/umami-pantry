class IngredientsAdapter {
  constructor() {
    // endpoint to access specific pieces of ingredient data
    this.baseUrl = 'http://localhost:3000/get_ingredients'
  }

  // READ INGREDIENTS - GET request to /ingredients
  getIngredients(category) {
    // fetch returns Promise representing what the api sent back
    // call .then on resp/ returned obj (rep data source) + .json() to return content from resp
    return fetch(`${this.baseUrl}/?category=${category}`)
        .then(resp => resp.json())
        .catch(err => alert(err))
    }
  };