// rename to AppContainer?
// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const categoryContainers = document.getElementsByClassName('categoryContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard')
// let addIngredient = false;

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/categorized_ingredients`;
    this.recipesUrl = `${baseUrl}/recipes`;
  }
  static ingredients = [];
  categories = [];
  selectedIngredients = []; // to hold ingredientIds
  recipeResults = {};

  // Manage event listeners
  bindEventListeners() {
    // push ingredient_id to an array when ingredient is clicked
    // const btn = document.getElementById('createRecipesBtn');
    // btn.addEventListener('click', getMatchingRecipes);
    // generate recipe results when button is clicked

    // ingredientBtn.addEventListener('click', this.getIngredients);
    // ingredientCards.forEach(card => {
    //   card.addEventListener('click', e => {
    //     console.log(e.target)
    //     // console.log(e.target);
    //     // if (e.target == card) {
    //     //   this.selectIngredientHandler(card)
    //     // }
    //   })
    // })

    ingredientsContainer.addEventListener('click', e => {
      // console.log(ingredientCards)
      console.log(e.target.parentNode)
      for (const ingredientCard of ingredientCards) {
        // if ingredientCard is clicked
        if ((e.target == ingredientCard) || (e.target.parentNode == ingredientCard)) {
          this.selectIngredientHandler(ingredientCard)
        }
      }
    });
  };

  // make a fetch request to ingredientsUrl
  getIngredients() {
    const categories = ['Grains', 'Protein_Foods','Beans_and_Peas', 'Nuts_and_Seeds', 'Root_Vegetables', 'Dark_Green_Vegetables', 'Other_Vegetables', 'Dairy', 'Soup_and_Broth', 'Fruits', 'Additives', 'Herb_and_Spices'];

    categories.forEach(category => {
    // fetch returns Promise representing what the api sent back
    // call .then on returned obj -> get resp, parse JSON rep of ingredients from resp
      fetch(`${this.ingredientsUrl}?category=${category}`)
        .then(resp => resp.json())
        .then(ingredientsData => this.renderIngredients(category, ingredientsData))
        .catch(err => alert(err));
    })
  };

  // display ingredients by categories
  renderIngredients(category, ingredientsData) {
    //create DOM nodes, insert data into them to render in the DOM
      // g flag of regular expression -> indicates global search and replace
    const formattedCategory = category.toLowerCase().replace(new RegExp('_', 'g'), '-');
    const categoryContainer = document.getElementById(formattedCategory);

    ingredientsData.forEach(ingredient => {
      new Ingredient(ingredient.name, ingredient.image_url, ingredient.category);

      let ingredientCard = categoryContainer.appendChild(document.createElement('div'));
      ingredientCard.className = 'ingredientCard'
      ingredientCard.setAttribute('data-ingredient-id', ingredient.id)
      const ingredientName = `<p>${ingredient.name}</p>`;
      let ingredientImg = ingredient.image_url;

      ingredientCard.innerHTML += ingredientName;
      ingredientCard.innerHTML += ingredientImg;
    });
  };

  // handle ingredient(s) option
  selectIngredientHandler(ingredient) {
    let ingredientId = ingredient.dataset.ingredientId;
    // push ingredientId into Array
    this.selectedIngredients.push(ingredientId);
    this.getMatchingRecipes(this.selectedIngredients);
    // handle display changes
    console.log(this.selectedIngredients);
  }

  getRecipes() {
    // make a fetch request to /recipes
    // populate recipe and ingredient properties with returned data
    // temporarily persisting to propetrties in container instances
    // call renderRecipes - DOM manipulation via render activities
    return fetch(this.recipesUrl)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => alert(err));
  };

  getMatchingRecipes() {
    // getch request to /recipes
    return fetch(this.recipesUrl)
      .then(resp => resp.json())
      .then(recipesData => console.log(recipesData))
      .catch(err => alert(err));
  };

  renderMathchingRecipes() {
    //create DOM nodes and insert data into them to render in the DOM
  };
};
// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()


