// rename to AppContainer?
// serves as in browser data storage system

class Adapter {
  constructor(baseUrl='http://localhost:3000/') {
    this.baseUrl = 'http://localhost:3000/';
    this.ingredientsUrl = `${baseUrl}/ingredients`;
    this.recipesUrl = `${baseUrl}/recipes`;
  }
  ingredients = [];
  categories = [];
  recipeResults = {};

  // Manage event listeners
  bindEventListeners() {
    // push ingredient_id to an array when ingredient is clicked
    const btn = document.getElementById('createRecipesBtn');
    btn.addEventListener('click', getMatchingRecipes)
    // generate recipe results when button is clicked
  };

  getMatchingRecipes() {
    console.log('find a way to get recipes!')
  }


  // make a fetch request to ingredientsUrl
  // once we get back a resp, parse JSON from response
  // fetch return Promise and if resolved, do next then until we get a JSON representation of our ingredients

  // fetch returns an object that represents what the api sent back
  // call .then on returned obj
  getIngredients() {
    return fetch(this.ingredientsUrl)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => alert(err));
  };

  renderIngredients() {
    //create DOM nodes and insert data into them to render in the DOM
  };

  getRecipes() {
    // make a fetch request to /recipes
    // populate recipe and ingredient properties with returned data
      // temporarily persisting to propetrties in container instances
    // call renderRecipes - DOM manipulation via render activities
    return fetch(this.recipesUrl)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => alert(err));
  }

  renderRecipes() {
    //create DOM nodes and insert data into them to render in the DOM
  };
};

// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()