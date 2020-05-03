// rename to AppContainer?
// serves as in browser data storage system

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/categorized_ingredients`;
    this.recipesUrl = `${baseUrl}/recipes`;
  }
  static ingredients = [];
  categories = [];
  recipeResults = {};

  ingredientBtn = document.getElementById('getIngredientsBtn');
  ingredientsContainer = document.getElementById('ingredientsContainer');

  // Manage event listeners
  bindEventListeners() {
    // push ingredient_id to an array when ingredient is clicked
    // const btn = document.getElementById('createRecipesBtn');
    // btn.addEventListener('click', getMatchingRecipes);
    // generate recipe results when button is clicked
    ingredientBtn.addEventListener('click', this.getIngredients);
  };


  // make a fetch request to ingredientsUrl
  getIngredients() {
    const categories = ['Grains', 'Protein_Foods','Beans_and_Peas', 'Nuts_and_Seeds', 'Root_Vegetables', 'Dark_Green_Vegetables', 'Other_Vegetables', 'Dairy', 'Soup_and_Broth', 'Fruits', 'Sauce,_Condiments_and_Additives', 'Herb_and_Spices']

    categories.forEach(category => {
    // fetch returns Promise representing what the api sent back
    // call .then on returned obj -> get resp, parse JSON rep of ingredients from resp
      return fetch(`http://localhost:3000/ingredients?category=${category}`).then(resp => resp.json())
        .then(ingredientsData => {
          ingredientsData.forEach(ingredient => {
            const i = `${ingredient.name}: ${ingredient.category}\n`;
            console.log(`${ingredient.name}: ${ingredient.category}`);
            ingredientsContainer.innerHTML += i;
          });
        }).catch(err => alert(err));
      }
  })

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

getMatchingRecipes() {
  // getch request to /recipes
  console.log(this);
  return fetch(this.RecipesUrl)
    .then(resp => resp.json())
    .then(IngredientsData => console.log(data))
    .catch(err => alert(err));
}

// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()


