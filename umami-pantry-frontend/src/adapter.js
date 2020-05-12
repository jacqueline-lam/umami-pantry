// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const categoryContainers = document.getElementsByClassName('categoryContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard');
const recipesContainer = document.getElementById('recipesContainer');
const recipesNode = document.getElementById("recipeCards");
const recipeCards = document.getElementsByClassName('recipeCard');
// const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');
const selectedRecipeContainer = document.getElementById('selectedRecipeContainer');
const selectedRecipeDiv = document.getElementById('selectedRecipe');
const formDiv = document.getElementById('subIngredientForm')
const returnBtn = document.getElementById('returnToRecipesBtn');
const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');

class Adapter {
  constructor(baseUrl='http://localhost:3000') {
    this.baseUrl = 'http://localhost:3000';
    this.ingredientsUrl = `${baseUrl}/ingredients`;
    this.findRecipesUrl = `${baseUrl}/get_recipes`;
    this.recipeUrl = `${baseUrl}/recipes/`
    this.recipeIngredientsUrl = `${baseUrl}/recipe_ingredients`
  }
  static ingredients = [];
  selectedIngredients = []; // to hold ingredientIds, also acts as single frontend state source of truth
  // matchingRecipes = {};
  formInputs = document.querySelectorAll('.formInput');

  // Event delegation / Manage event listeners
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
    let clearIngredientsBtn = document.getElementById('clearIngredientsBtn')
    clearIngredientsBtn.addEventListener('click', this.unselectIngredientsHandler.bind(app));

    // eventlistener for Selected Recipe Div
    selectedRecipeContainer.addEventListener('click', e => {
      // Return to Matching Recipes Btn
      if (e.target === returnBtn) {
        returnBtn.style.display = 'none';
        addSubIngredientBtn.style.display = 'none';
        this.displayMatchingRecipes();
      } else if (e.target === addSubIngredientBtn){ // Add A Subsitute Ingredient Btn
        let recipeId = parseInt(selectedRecipeContainer.dataset.recipeId, 10);
        addSubIngredientBtn.style.display = 'none';
        this.createRecipeIngredientHandler(recipeId);
      };
    });

    //eventlistener for Substitute Ingredient Submit btn
    formDiv.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmitForm();
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
    //empty selectedIngredients array
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
          // DEBUG - Recipe class has repeated recipe instances
          recipe instanceof Recipe ? "" : matchingRecipes.push(new Recipe(recipe));
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
      let categoryDiv = recipeCard.appendChild(document.createElement('div'));
      categoryDiv.className = 'card-body';
      // categoryDiv.innerHTML = `<h6 class="card-subtitle text muted">${recipe.category}</h6>`
      categoryDiv.innerHTML = `<h5><span class="badge badge-dark">${recipe.category}</span></h5>`;

      // Recipe ingredients
      let ul = document.createElement('ul');
      ul.classList.add( 'list-group', 'list-group-flush');
      for (const ingredient of recipe.ingredients) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-ingredient-id', ingredient.id);
        li.innerText = ingredient['name'];
        // display substitute ingredients in red
        if (!!ingredient.substituted_ingredient_id) {
          li.classList.add('subIngredient');
        }
        ul.appendChild(li);
      }
      recipeCard.appendChild(ul);

      recipeCard.children[0].addEventListener('click', e => {
        let selectedRecipeId = this.selectedRecipeId || e.target.parentNode.getAttribute('data-recipe-id');
        if (!selectedRecipeId) {
          selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id')
        };
        recipesContainer.style.display = 'none';
        ingredientsContainer.style.display = 'none';
        formDiv.style.display = 'none';
        this.getSingleRecipe(selectedRecipeId);
      });
    });
  };

  getSingleRecipe(recipeId){
    console.log("Got recipe ID: " + recipeId);
    return fetch(`${this.recipeUrl}/${recipeId}`)
      .then(resp => resp.json())
      .then(recipeData => (this.renderSelectedRecipe(recipeData)))
      .catch(err => console.log(err))
  };

  renderSelectedRecipe(recipe) {
    selectedRecipeContainer.dataset.recipeId = recipe.id

    selectedRecipeDiv.innerHTML = '<h1>Selected Recipe:</h1>'

    let heading = document.createElement('div')
    heading.id = 'recipeHeading'
    heading.innerHTML += `<h2>${recipe.name}</h2>${recipe.image_url}`
    selectedRecipeDiv.appendChild(heading);

    // // Recipe time, ingredients list
    let row = document.createElement('div')
    row.className = 'row'
    let col1 = document.createElement('div')
    col1.className = 'col-4'
    col1.innerHTML += `<ul><li>Servings: ${recipe.servings.toString()}</li><li>Total Time: ${recipe.time.toString()}</li></ul><h3>Ingredients</h3>`

    let ingredientsTable = document.createElement('table')
    ingredientsTable.classList.add('table', 'table-hover');

    let tbody = document.createElement('tbody')
    let subIngredientsArray = []
    recipe.recipe_ingredients.forEach(ingredient => {
      let tr = document.createElement('tr')
      tr.dataset.ingredientId = ingredient.id

      let td1 = document.createElement('td')
      ingredient.amount ? (td1.innerHTML += `<b>${ingredient.amount}</b>`) : ""

      let td2 = document.createElement('td')
      td2.textContent = ingredient.name
      ingredient.preparation_method ? (td2.innerText += `, ${ingredient.preparation_method}`) : ""
      tr.append(td1, td2)

      // check for substitute ingredient
      if (!!ingredient.substituted_ingredient_id) {
        let newIngObj = {
          ogIngId: ingredient.substituted_ingredient_id,
          newIngTr: tr
        };
        subIngredientsArray.push(newIngObj);
        return;
      };
      tbody.appendChild(tr);
    });

    ingredientsTable.appendChild(tbody);
    col1.appendChild(ingredientsTable);
    row.appendChild(col1);
    selectedRecipeDiv.appendChild(row);

    // add underline to substituted ingredient
    subIngredientsArray.forEach(newIngObj => {
      let ogIngredientTr = document.querySelector(`tr[data-ingredient-id="${newIngObj['ogIngId']}"]`);
      ogIngredientTr.className = 'ogIngredient';

      // let subIngredientTr = document.createElement('tr');
      let subIngredientTr = newIngObj["newIngTr"];
      subIngredientTr.className = 'subIngredient';

      ogIngredientTr.insertAdjacentElement('afterend',subIngredientTr)
    });

    // Recipe Directions
    let col2 = document.createElement('div')
    col2.className = 'col-8'
    col2.innerHTML += `<h3>Directions</h3><hr>${recipe.directions}`
    row.appendChild(col2)

    // Add substitute ingredient
    addSubIngredientBtn.style.display = 'inline-block';

    //Back to results
    returnBtn.style.display = 'inline-block';

  };

  displayMatchingRecipes(){
    selectedRecipeDiv.innerHTML = '';
    recipesContainer.style.display = 'block';
    subIngredientForm.style.display = 'none';
  };

  createRecipeIngredientHandler(recipeId){
    this.renderAddSubIngredientForm(recipeId);
    // RecipeIngredient.new();
  }

  renderAddSubIngredientForm(recipeId) {
    formDiv.style.display = 'block';
    let recipeIngredientIds = [];

    let ogIngredientSelect = document.getElementById('ogIngredientSelect');
    let recipe = Recipe.findById(recipeId);

    recipe.ingredients.forEach(ingredient => {
      let option = `<option value=${ingredient.id}>${ingredient.name}</option>`
      ogIngredientSelect.innerHTML += option
      recipeIngredientIds.push(ingredient.id)
    })

    let subIngredientSelect = document.getElementById('subIngredientSelect');
    // filter out existing recipe ingredients
    const subIngredientOptions = Ingredient.all.filter(ing => !recipeIngredientIds.includes(ing.id))
    // optgroup: group by ing categroy

    // add all options into select tag
    subIngredientOptions.forEach(ingredient => {
      let option = `<option value=${ingredient.id}>${ingredient.name}</option>`
      let optGroup = document.getElementById(ingredient.category)
      if (!optGroup) {
        optGroup = document.createElement('optgroup')
        optGroup.setAttribute('label', ingredient.category)
        optGroup.id= ingredient.category
        subIngredientSelect.appendChild(optGroup)
      }
      optGroup.innerHTML += option
    })

    let recipeIdHiddenInput = document.getElementById('recipeId')
    recipeIdHiddenInput.setAttribute('value', recipeId)
  }

  // Add a substitute ingredient (recipe ingredient object)
  handleSubmitForm() {
    let formData = {
      recipe_ingredient: {
        recipe_id: parseInt(this.formInputs[4].value),
        substituted_ingredient_id: parseInt(this.formInputs[0].value, 10),
        ingredient_id: parseInt(this.formInputs[1].value, 10),
        amount: this.formInputs[2].value,
        preparation_method: this.formInputs[3].value,
      }
    }
    this.postSubIngredient(formData)
  }

  postSubIngredient(recipeIngredientObj) {
    let configObj = {
      method: 'POST',
      mode: 'cors',
      // credentials: 'include',
      headers: { // indicate format of data being sent and acceoted in return
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
     // data must be sent as text between client and server
     // convert objects to strings
      body: JSON.stringify(recipeIngredientObj)
    }

    const url = 'http://localhost:3000/recipe_ingredients';

    fetch(url, configObj)
      .then(resp => resp.json())
      .then(data => {
        this.renderSelectedRecipe(data)
      })
      .catch(err=> alert(err))
  }
};