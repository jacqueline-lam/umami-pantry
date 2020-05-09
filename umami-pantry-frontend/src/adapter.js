// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const categoryContainers = document.getElementsByClassName('categoryContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard');
const recipesContainer = document.getElementById('recipesContainer');
const recipesNode = document.getElementById("recipeCards");
const recipeCards = document.getElementsByClassName('recipeCard');
// const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');
const selectedRecipeDiv = document.getElementById('selectedRecipe');

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/ingredients`;
    this.findRecipesUrl = `${baseUrl}/get_recipes`;
    this.recipeUrl = `${baseUrl}/recipes/`
  }
  static ingredients = [];
  selectedIngredients = []; // to hold ingredientIds, also acts as single frontend state source of truth
  // matchingRecipes = {};

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

    // eventlistener for Selected Recipe Div
    selectedRecipeDiv.addEventListener('click', e => {
      const returnBtn = document.getElementById('returnToRecipesBtn');
      const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');
      // Return to Matching Recipes Btn
      if (e.target === returnBtn) {
        this.displayMatchingRecipes();
      } else if (e.target === addSubIngredientBtn){ // Add A Subsitute Ingredient Btn
        let recipeId = selectedRecipeDiv.dataset.recipeId
        this.editRecipeInredientHandler(recipeId);;
      }
    })
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
      fetch(`${this.baseUrl}/get_ingredients/?category=${category}`)
        .then(resp => resp.json())
        .then(ingredientsData => {
          ingredientsData.forEach( ingredient => {
            Adapter.ingredients.push(new Ingredient(ingredient.id, ingredient.name, ingredient.category, ingredient.image_url));
          });
          this.renderIngredients(ingredientsData, category);
        })
        .catch(err => alert(err));
    })
      // fetch(`${this.ingredientsUrl}`)
      //   .then(resp => resp.json())
      //   .then(ingredientsData => {
      //     ingredientsData.forEach(ingredient => {
      //       let newIngredient = new Ingredient(ingredient.name, ingredient.image_url, ingredient.category);
      //       Adapter.ingredients.push(newIngredient);
      //     });
      //     this.renderIngredients();
      //   })
      //   .catch(err => alert(err));
  };

  // display ingredients by categories
  renderIngredients(ingredientsData, category) {
    //create DOM nodes, insert data into them to render in the DOM
      // g flag of regular expression -> indicates global search and replace
    const formattedCategory = category.toLowerCase().replace(new RegExp('_', 'g'), '-');
    const categoryContainer = document.getElementById(formattedCategory);
    ingredientsData.forEach(ingredient => {
      // new Ingredient(ingredient.id, ingredient.name, ingredient.category, ingredient.image_url)

      let ingredientCard = categoryContainer.appendChild(document.createElement('div'));
      ingredientCard.className = 'ingredientCard'
      ingredientCard.setAttribute('data-ingredient-id', ingredient.id)

      const img = ingredient.image_url;
      ingredientCard.innerHTML += img;

      const p = document.createElement('p');
      p.innerText = ingredient.name
      ingredientCard.appendChild(p);
    });

    // Adapter.ingredients.forEach(ingredient => {
    //   // append ingredient based on it category
    //   switch(ingredient.category) {
    //     case 'Grains':
    //       grainsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Protein Foods':
    //       proteinsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Beans and Peas':
    //       beansDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Nuts and Seeds':
    //       nutsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Root Vegetables':
    //       rootsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Dark Green Vegetables':
    //       dgVegsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Other Vegetables':
    //       otherVegsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Dairy':
    //       dairysDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Soup and Broth':
    //       soupsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Fruits':
    //       fruitsDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Additives':
    //       additivesDiv.appendChild(ingredientCard);
    //       break;
    //     case 'Herb and Spices':
    //       herbsDiv.appendChild(ingredientCard);
    //       break;
    //     default:
    //       //code block
    //   }
    // })
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
  };

  // get request for all recipes that match ingredientId
  // populate recipe + associated properties with returned data
  // temporarily persisting to propetrties in container instances
  // call renderMatchingRecipes - DOM manipulation via render activities
  getMatchingRecipes() {
      let matchingRecipes = []
    // http://localhost:3000/get_recipes/?selected_ingredients=1753,1752
    return fetch(`${this.findRecipesUrl}/?selected_ingredients=${this.selectedIngredients}`)
      .then(resp => resp.json())
      .then(recipesData => {
        recipesData.forEach(recipe => {
          matchingRecipes.push(new Recipe(recipe));
        })
        this.renderMatchingRecipes(matchingRecipes);
      })
      .catch(err => console.log(err));
  };

  renderMatchingRecipes(matchingRecipes) {
    // Reload recipe cards when a new ingredient is chosen

    while (recipesNode.firstChild) {
      recipesNode.removeChild(recipesNode.lastChild);
    }

    if (matchingRecipes.length === 0) {
      const p = document.createElement('p')
      p.innerText = 'No recipes are found for this combination of ingredients'
      recipesNode.appendChild(p)
    }
    //create DOM nodes and insert data into them to render in the DOM
    matchingRecipes.forEach(recipe => {
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
      let recipeImg = recipe.imageUrl;
      recipeCard.innerHTML += recipeImg;

      //Recipe Category
      let categoryDiv = recipeCard.appendChild(document.createElement('div'))
      categoryDiv.className = 'card-body'
      // categoryDiv.innerHTML = `<h6 class="card-subtitle text muted">${recipe.category}</h6>`
      categoryDiv.innerHTML = `<h5><span class="badge badge-dark">${recipe.category}</span></h5>`

      // Recipe ingredients
      let ul = document.createElement('ul');
      ul.classList.add( 'list-group', 'list-group-flush');
      for (const ingredient of recipe.ingredients) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = ingredient['name'];
        ul.appendChild(li);
      }
      recipeCard.appendChild(ul);

      recipeCard.children[0].addEventListener('click', e => {
        let selectedRecipeId = this.selectedRecipeId || e.target.parentNode.getAttribute('data-recipe-id')
        if (!selectedRecipeId) {
          selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id');
        }
        this.getSingleRecipe(selectedRecipeId);
        recipesContainer.style.display = 'none'
      });
      // recipeCard.children[0].children[0].addEventListener('click', e => {
      //   const selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id');
      //   this.getSingleRecipe(selectedRecipeId);
      // });
    })
  }

  getSingleRecipe(recipeId){
    console.log("Got recipe ID: " + recipeId);
    return fetch(`${this.recipeUrl}/${recipeId}`)
      .then(resp => resp.json())
      .then(recipeData => this.renderSelectedRecipe(recipeData))
      .catch(err => console.log(err));
  };

  renderSelectedRecipe(recipe) {
    let recipeDiv = document.getElementById('selectedRecipe');
    // let h1 = document.createElement('h1')
    // h1.innerText = 'Selected Recipe:'
    recipeDiv.innerHTML = '<h1>Selected Recipe:</h1>'
    recipeDiv.dataset.recipeId = recipe.id

    let heading = document.createElement('div')
    heading.id = 'recipeHeading'
    heading.innerHTML += `<h2>${recipe.name}</h2>${recipe.image_url}`
    recipeDiv.appendChild(heading);

    // // Recipe time, ingredients list
    let row = document.createElement('div')
    row.className = 'row'
    let col1 = document.createElement('div')
    col1.className = 'col-4'
    col1.innerHTML += `<ul><li>Servings: ${recipe.servings.toString()}</li><li>Total Time: ${recipe.time.toString()}</li></ul><h3>Ingredients</h3>`

    let ingredientsTable = document.createElement('table')
    ingredientsTable.classList.add('table', 'table-hover');

    let tbody = document.createElement('tbody')
    recipe.recipe_ingredients.forEach(ingredient => {
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')

      ingredient.amount ? (td1.innerHTML += `<b>${ingredient.amount}</b>`) : ""
      td2.textContent = `${ingredient.name}`
      ingredient.preparation_method ? (td2.innerText += `, ${ingredient.preparation_method}`) : ""
      tr.append(td1, td2)
      // let td1 = `<td>${ingredient.amount}</td>`
      // let td2 = `<td>${ingredient.name}, ${ingredient.preparation_method}</td>`
      // tr.innerText = td1 + td2
      tbody.appendChild(tr)
    })
    ingredientsTable.appendChild(tbody);
    col1.appendChild(ingredientsTable);
    row.appendChild(col1)
    recipeDiv.appendChild(row)

    // Recipe Directions
    let col2 = document.createElement('div')
    col2.className = 'col-8'
    col2.innerHTML += `<h3>Directions</h3><hr>${recipe.directions}`
    row.appendChild(col2)

    // Add substitute ingredient
    const subIngBtn = document.createElement('button')
    subIngBtn.id = "substitutIngredientBtn"
    subIngBtn.classList.add('btn', 'btn-outline-primary', 'btn-lg')
    subIngBtn.textContent = 'Add a Substitute Ingredient'
    // subIngBtn.addEventListener('click', this.displayMatchingRecipes.bind(app));
    recipeDiv.appendChild(subIngBtn);

    //Back to results
    const returnBtn = document.createElement('button')
    returnBtn.id = "returnToRecipesBtn"
    returnBtn.classList.add('btn', 'btn-outline-danger', 'btn-lg')
    returnBtn.textContent = 'Return to Matching Recipes'
    // returnbtn.addEventListener('click', this.displayMatchingRecipes.bind(app));
    recipeDiv.appendChild(returnBtn);
  };

  displayMatchingRecipes(){
    selectedRecipeDiv.innerHTML = '';
    recipesContainer.style.display = 'block';
  };

  editRecipeInredientHandler(recipeId){
    this.renderAddSubIngredientForm();
    // RecipeIngredient.new();
  }

  renderAddSubIngredientForm() {

    `Replace ingredient: _____ with...`
    `Ingredient: <select>`
    `New amount:`
    `Preparation method (leave blank if none): ______`
  }
};