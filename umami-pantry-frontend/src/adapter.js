// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const categoryContainers = document.getElementsByClassName('categoryContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard')
const recipesNode = document.getElementById("recipeCards");
const recipeCards = document.getElementsByClassName('recipeCard')
// const

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/get_ingredients`;
    this.findRecipesUrl = `${baseUrl}/get_recipes`;
    this.recipeUrl = `${baseUrl}/recipes/`
  }
  static ingredients = [];
  selectedIngredients = []; // to hold ingredientIds, also acts as single frontend state source of truth

  // Manage event listeners
  bindEventListeners() {
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

    // eventlistener for ingredient card
    ingredientsContainer.addEventListener('click', e => {
      for (const ingredientCard of ingredientCards) {
        // if ingredientCard is clicked
        if ((e.target == ingredientCard) || (e.target.parentNode == ingredientCard)) {
          this.selectIngredientHandler(ingredientCard)
        }
      }
    });
    // eventlistener for 'Clear All Ingredients' btn
    let clearIngredientsBtn = document.getElementById('removeIngredientsBtn')
    clearIngredientsBtn.addEventListener('click', this.unselectIngredientsHandler.bind(app));


    //eventlistener for recipe card
    // recipesNode.addEventListener('click', e => {

    //   for (const recipeCard of recipeCards) {
    //     // let recipeTitle = document.getElementsByTagName('h3')
    //     if ((e.target == recipeCard) || (recipeCard.hasChildNodes(e.target))){
    //       this.selectedRecipeCard = recipeCard;
    //       // console.log(e.target)

    //       // ERROR: SELECTING ALL RECIPES?
    //       // this.getSingleRecipe(recipeCard)
    //     }
    //   }
    // })
    // let recipeTitle = document.getElementById('h3.card-header');
    // recipesNode.addEventListener('click', e => {
    //   console.log(e.target);
    //   console.log(recipeTitle);

    //  let recipeId = recipeTitle.dataset.recipeId
    //   if (e.target == recipeTitle) {
    //     console.log(recipeTitle.dataset.recipeId)
    //     renderRecipe(recipeId);
    //   }
    // })
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

  unselectIngredientsHandler() {
    this.selectedIngredients.splice(0, this.selectedIngredients.length);
    Array.from(ingredientCards).forEach(card => card.setAttribute("style", "background-color: white;"));
    while (recipesNode.firstChild) {
      recipesNode.removeChild(recipesNode.lastChild);
    }
    console.log(this.selectedIngredients);

    // this.selectedIngredients.forEach(ingredient => {
    //   console.log(ingredient)
    // })
    // for (const ingredient of this.selectedIngredients) {
    //   console.log(ingredient)
    //   // this.selectIngredientHandler(ingredient);
    // };
  };

  // get request for all recipes that match ingredientId
  // populate recipe + associated properties with returned data
  // temporarily persisting to propetrties in container instances
  // call renderMatchingRecipes - DOM manipulation via render activities
  getMatchingRecipes() {
    // http://localhost:3000/get_recipes/?selected_ingredients=1753,1752
    return fetch(`${this.findRecipesUrl}/?selected_ingredients=${this.selectedIngredients}`)
      .then(resp => resp.json())
      .then(recipesData => this.renderMatchingRecipes(recipesData))
      .catch(err => console.log(err));
  };

  renderMatchingRecipes(recipesData) {
    // Reload recipe cards when a new ingredient is chosen

    while (recipesNode.firstChild) {
      recipesNode.removeChild(recipesNode.lastChild);
    }

    if (recipesData.length === 0) {
      const p = document.createElement('p')
      p.innerText = 'No recipes are found for this combination of ingredients'
      recipesNode.appendChild(p)
    }
    //create DOM nodes and insert data into them to render in the DOM
    recipesData.forEach(recipe => {
      // render recipe if recipeCard is not displayed yet
      let recipeCard = recipesNode.appendChild(document.createElement('div'));
      recipeCard.classList.add('recipeCard', 'card', 'mb-3')
      recipeCard.setAttribute('data-recipe-id', recipe.id)

      // Recipe name with link
      let h3 = document.createElement('h3')
      h3.className = 'card-header';
      recipeCard.appendChild(h3);

      let a = document.createElement('a');
      // let aHref = `${this.baseUrl}/recipes/${recipe.id}`;
      // a.setAttribute('href', aHref);
      a.textContent = recipe.name;
      h3.appendChild(a);

      // Recipe image
      let recipeImg = recipe.image_url;
      recipeCard.innerHTML += recipeImg;

      //Recipe Category
      let categoryDiv = recipeCard.appendChild(document.createElement('div'))
      categoryDiv.className = 'card-body'
      // categoryDiv.innerHTML = `<h6 class="card-subtitle text muted">${recipe.category}</h6>`
      categoryDiv.innerHTML = `<h5><span class="badge badge-dark">${recipe.category}</span></h5>`

      // Recipe ingredients
      let ul = document.createElement('ul');
      ul.classList.add( 'list-group', 'list-group-flush');
      for (const ingredient of recipe.recipe_ingredients) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = ingredient['name'];
        ul.appendChild(li);
      }

      // recipeCard.innerHTML += recipeImg;
      // recipeCard.innerHTML += recipeName;
      // let ingredientsSpan = document.createElement('span')
      // ingredientsSpan.innerText = recipe.category
      // recipeCard.appendChild(ingredientsSpan);
      recipeCard.appendChild(ul);


      recipeCard.children[0].addEventListener('click', e => {
        let selectedRecipeId = this.selectedRecipeId || e.target.parentNode.getAttribute('data-recipe-id')
        if (!selectedRecipeId) {
          selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id');
        }
        this.getSingleRecipe(selectedRecipeId);
      });
      // recipeCard.children[0].children[0].addEventListener('click', e => {
      //   const selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id');
      //   this.getSingleRecipe(selectedRecipeId);
      // });
    })
  }

  getSingleRecipe(recipeId){
    console.log("Got recipe ID: " + recipeId);
    // return fetch(`${this.recipeUrl}/${recipeId}`)
    //   .then(resp => resp.json())
    //   .then(recipeData => this.renderSelectedRecipe(recipeData))
    //   .catch(err => console.log(err));
  };

  // renderSelectedRecipe(recipe) {
  //   let recipeDiv = document.getElementById('selectedRecipe');
  //   // let h1 = document.createElement('h1')
  //   // h1.innerText = 'Selected Recipe:'

  //   let heading = document.createElement('div')
  //   heading.id = 'recipeHeading'
  //   let h2 = document.createElement('h2')
  //   heading.appendChild(h2)
  //   heading.innerHTML += recipe.image_url

  //   // Recipe time, ingredients list
  //   let row = document.createElement('div')
  //   row.className = 'row'
  //   let col1 = document.createElement('div')
  //   col1.className = 'col-4'
  //   col1.innerHTML += `<li><ul>Servings: ${recipe.servings.toString()}<ul><ul>Total Time: ${recipe.time.toString()}</li>`

  //   let ingredientsTable = document.createElement('table')
  //   ingredientsTable.classList.add('table', 'table-hover');
  //   ingredinetsTable

  //   let tbody = document.createElement('tbody')
  //   recipe.recipe_ingredients.forEach(ingredient => {
  //     let tr = document.createElement('tr')
  //     let th = `<th scope="row">${ingredient.amount}</th>`
  //     let td = `${ingredient.name}, ${preparation_method}`
  //     tr.innerText = th + td
  //     tbody.appendChild(tr)
  //   })
  //   col11.appendChild(tbody)

  //   // Recipe Directions
  //   let col2 = document.createElement('div')
  //   col2.className = 'col-8'
  //   col2.innerHTML += `<h3>Directions</h3>`
  //   // <li><ol></ol></li>

  //   recipeDiv.append(h2, col1, col2)
};
// call method to get particular notes from db and return it
// const ingredients = app.getIngredients()


