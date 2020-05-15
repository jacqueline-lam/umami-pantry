class IngredientsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/get_ingredients'
  }

  // READ INGREDIENTS - GET request to /ingredients
  getIngredients(category) {
    // return Ingredient.categories.map(category => {
    // fetch returns Promise representing what the api sent back
    // call .then on returned obj -> get resp, parse JSON rep of ingredients from resp
    return fetch(`${this.baseUrl}/?category=${category}`)
        .then(resp => resp.json())
        .then(json => json)
        .catch(err => alert(err));
    }
        // .then(ingredientsData => {
        //   ingredientsData.forEach( ingredient => {
        //     AppContainer.ingredients.push(new Ingredient(ingredient.id, ingredient.name, ingredient.category, ingredient.image_url));
        //   });
        //   AppContainer.renderIngredients(ingredientsData, category);
        // })
  };