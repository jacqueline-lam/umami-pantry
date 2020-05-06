// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const categoryContainers = document.getElementsByClassName('categoryContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard')
// let addIngredient = false;

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/get_ingredients`;
    this.recipesUrl = `${baseUrl}/get_recipes`;
  }
  static ingredients = [];
  categories = [];
  selectedIngredients = []; // to hold ingredientIds, also acts as single frontend state source of truth

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
      // console.log(e.target.parentNode)
      for (const ingredientCard of ingredientCards) {
        // if ingredientCard is clicked
        if ((e.target == ingredientCard) || (e.target.parentNode == ingredientCard)) {
          this.selectIngredientHandler(ingredientCard)
        }
      }
    });
  };

  // isSelected(ingredientId) {
  //   return this.selectedIngredients.includes(ingredientId);
  // }

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

      const img = ingredient.image_url;
      ingredientCard.innerHTML += img;

      const p = document.createElement('p');
      p.innerText = ingredient.name
      ingredientCard.appendChild(p);
    });
  };

  // handle ingredient(s) option
  // @param ingredient: The div DOM element
  selectIngredientHandler(ingredient) {
    let ingredientId = ingredient.dataset.ingredientId;
    var index = this.selectedIngredients.indexOf(ingredientId);

    // Ingredient does not exist in current state
    // And we're selecting it, then we add it in
    if (index === -1) {
      this.selectedIngredients.push(ingredientId);
      ingredient.setAttribute("style", "background-color: lightgray;");
    } else {
      // If ingredient already exists in current state
    // And we're selecting it, then we should remove it
      this.selectedIngredients.splice(index, 1);
      ingredient.setAttribute("style", "background-color: white;");
    }
    // Above logic *should* enforce uniqueness constraints
    // This just makes absolutely sure
    this.selectedIngredients.filter((ing, i, arr) => arr.indexOf(ing) === i);

    console.log("Current array IDs: " + this.selectedIngredients);

    // Handle recipe get for selected ingredients
    this.getMatchingRecipes(this.selectedIngredients);
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

  // get request for all recipes that match ingredientId
  getMatchingRecipes() {
    // http://localhost:3000/get_recipes/?selected_ingredients=1753,1752
    return fetch(`${this.recipesUrl}/?selected_ingredients=${this.selectedIngredients}`)
      .then(resp => resp.json())
      .then(recipesData => this.renderMatchingRecipes(recipesData))
      .catch(err => console.log(err));
  };

  renderMatchingRecipes(recipesData) {
    // const recipeCards = document.querySelectorAll('div.recipeCard')
    // var cards = document.querySelectorAll('.recipeCard)');
    // for (var i = 0; i < cards.length; i++) {
    //     cards[i].parentNode.removeChild(cards[i]);
    // }

    // Reload recipe cards when a new ingredient is chosen
    const recipesNode = document.getElementById("recipeCards");
    while (recipesNode.firstChild) {
      recipesNode.removeChild(recipesNode.lastChild);
    }

    if (recipesData.length === 0) {
      const p = document.createElement('p')
      p.innerText = 'No recipes are found for this combination of ingredients'
      recipeCards.appendChild(p)
    }
    //create DOM nodes and insert data into them to render in the DOM
    recipesData.forEach(recipe => {
      // render recipe if recipeCard is not displayed yet
      let recipeCard = recipeCards.appendChild(document.createElement('div'));
      recipeCard.className = 'recipeCard'
      recipeCard.setAttribute('data-recipe-id', recipe.id)

      let recipeImg = recipe.image_url;
      const recipeName = `<h3>${recipe.name}</h3>`;
      recipeCard.innerHTML += recipeImg;
      recipeCard.innerHTML += recipeName;
      let ingredientsSpan = document.createElement('span')
      ingredientsSpan.innerText = recipe.category
      recipeCard.appendChild(ingredientsSpan);
      // recipeCard.addEventListener('click', renderPopUpRecipe)
    })
  }

  renderPopUpRecipe() {

  }
};
// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()


