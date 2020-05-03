// rename to AppContainer?
// serves as in browser data storage system

class Adapter {
// here


  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/categorized_ingredients`;
    this.recipesUrl = `${baseUrl}/recipes`;
  }
  static ingredients = [];
  categories = [];
  recipeResults = {};

  // Manage event listeners
  bindEventListeners() {
    // push ingredient_id to an array when ingredient is clicked
    // const btn = document.getElementById('createRecipesBtn');
    // btn.addEventListener('click', getMatchingRecipes);
    // generate recipe results when button is clicked

    const ingredientBtn = document.getElementById('getIngredientsBtn');
    ingredientBtn.addEventListener('click', this.getIngredients);

    const ingredientsContainer = document.getElementById('ingredientsContainer');
  };

  getMatchingRecipes() {
    // getch request to /recipes
    console.log(this);
    return fetch(this.RecipesUrl)
      .then(resp => resp.json())
      .then(IngredientsData => console.log(data))
      .catch(err => alert(err));
  }


  // make a fetch request to ingredientsUrl

  // fetch returns an object that represents what the api sent back
  // call .then on returned obj
  getIngredients(category) {
    // once we get back a resp, parse JSON from response
    // fetch return Promise - if resolved, do next then until we get a JSON representation of our ingredients
    return fetch(`http://localhost:3000/ingredients?category=${category}`).then(resp => resp.json())
      .then(ingredientsData => {
        ingredientsData.forEach(ingredient => {
          const i = `${ingredient.name}: ${ingredient.category}\n`;
          console.log(`${ingredient.name}: ${ingredient.category}`);
          document.getElementById('ingredientsContainer').innerHTML += i;
        });
      }).catch(err => alert(err));
  };

  renderIngredients(ingredientsData) {
    //create DOM nodes and insert data into them to render in the DOM
    console.log(typeof ingredientsData);
    ingredientsData.forEach(ingredient => {
      console.log(ingredient);

    });
    // display ingredients by categoroes
    // let IgredientCard = document.createElement('div #ingredient-card');
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


