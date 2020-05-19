class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.imageUrl = recipe.image_url;
    this.category = recipe.category;
    this.serving = recipe.servings;
    this.time = recipe.time;
    this.directions = recipe.directions;
    this.ingredients = recipe.ingredients;
    this.constructor.all.push(this)
  };

  static all = [];

  static findById(id) {
    return Recipe.all.find(recipe => recipe.id === id)
  };

  static renderMatchingRecipes(ingredientIds) {
    let matchingRecipes = [];
    app.recipesAdapter.getMatchingRecipes(ingredientIds)
    .then(recipesData => {
      recipesData.forEach(recipe => {
        let r = Recipe.findById(recipe.id);
        // temporarily persisting to propetrties in recipe container instances
        r = r || new Recipe(recipe);
        matchingRecipes.push(r);
      })
      this.createRecipeCards(matchingRecipes);
    });
  };

  static clearExistingRecipeCards () {
    while (recipesDiv.firstChild) {
      recipesDiv.removeChild(recipesDiv.lastChild)
    };
  };

  static handleNoMatchingRecipes(recipes) {
    if (recipes.length === 0) {
      const p = document.createElement('p');
      p.innerText = 'No matching recipes found.';
      recipesDiv.appendChild(p);
    };
  };

  // Event listener for recipe
  static recipeCardListener(recipeCard) {
    recipeCard.children[0].addEventListener('click', e => {
      let selectedRecipeId = this.selectedRecipeId || e.target.parentNode.getAttribute('data-recipe-id');
      if (!selectedRecipeId) {
        selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id');
      };
      recipesContainer.style.display = 'none';
      ingredientsContainer.style.display = 'none';
      formDiv.style.display = 'none';
      this.renderSelectedRecipe(selectedRecipeId);
    });
  };

  static createRecipeCards(recipes) {
    // Reload recipe cards when a new ingredient is chosen
    this.clearExistingRecipeCards();
    // Render no match message
    this.handleNoMatchingRecipes(recipes);

    //create DOM nodes and insert data into them to render in the DOM
    recipes.forEach(recipe => {
      let recipeCard = recipesDiv.appendChild(document.createElement('div'));
      recipeCard.classList.add('recipeCard', 'card');
      recipeCard.setAttribute('data-recipe-id', recipe.id);

      // Recipe name
      let h3 = document.createElement('h3');
      h3.className = 'card-header';
      recipeCard.appendChild(h3);
      let a = document.createElement('a');
      a.textContent = recipe.name;
      h3.appendChild(a);

      // Recipe image
      let recipeImg = recipe.imageUrl;
      recipeCard.innerHTML += recipeImg;

      //Recipe Category
      let categoryDiv = recipeCard.appendChild(document.createElement('div'));
      categoryDiv.className = 'card-body';
      categoryDiv.innerHTML = `<h5><span class="badge badge-dark">${recipe.category}</span></h5>`;

      // Recipe ingredients
      let ul = document.createElement('ul');
      ul.classList.add( 'list-group', 'list-group-flush');
      for (const ingredient of recipe.ingredients) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-ingredient-id', ingredient.id);
        li.innerText = ingredient['name'];
        // display substitute ingredients in teal
        if (!!ingredient.substituted_ingredient_id) {
          li.classList.add('subIngredient')
        };
        ul.appendChild(li);
      }
      recipeCard.appendChild(ul);

      // Event listener for recipe
      this.recipeCardListener(recipeCard);
    });
  };

  // READ SINGLE RECIPE
  static renderSelectedRecipe(recipeId){
    app.recipesAdapter.getSelectedRecipe(recipeId)
      .then(recipeData => this.createSelectedRecipeDiv(recipeData))
  };

  static createSelectedRecipeDiv(recipe) {
    selectedRecipeContainer.dataset.recipeId = recipe.id;
    selectedRecipeDiv.innerHTML = '<h1>Selected Recipe:</h1>';

    let header = document.createElement('div');
    header.id = 'recipeHeading';
    header.innerHTML += `<h2>${recipe.name}</h2>${recipe.image_url}`;
    selectedRecipeDiv.appendChild(header);

    // Recipe time, servings
    let recipeRow = document.createElement('div');
    recipeRow.className = 'row';
    let recipeCol1 = document.createElement('div');
    recipeCol1.className = 'col-4';
    recipeCol1.innerHTML += `<ul><li>Servings: ${recipe.servings.toString()}</li><li>Total Time: ${recipe.time.toString()} min</li></ul><h3>Ingredients</h3>`;

    // Ingredient List
    let ingredientsTable = document.createElement('table');
    ingredientsTable.classList.add('table', 'table-hover');

    let tbody = document.createElement('tbody');
    let subIngredientsArray = [];
    recipe.ingredients.forEach(ingredient => {
      let tr = document.createElement('tr');
      tr.dataset.ingredientId = ingredient.id;

      let td1 = document.createElement('td');
      ingredient.amount ? (td1.innerHTML += `<b>${ingredient.amount}</b>`) : "";
      let td2 = document.createElement('td');
      td2.textContent = ingredient.name;
      ingredient.preparation_method ? (td2.innerText += `, ${ingredient.preparation_method}`) : "";
      tr.append(td1, td2);

      // Render substitute ingredient if any
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
    recipeCol1.appendChild(ingredientsTable);
    recipeRow.appendChild(recipeCol1);
    selectedRecipeDiv.appendChild(recipeRow);

    // Add styling to og vs. substituted ingredient
    subIngredientsArray.forEach(newIngObj => {
      let ogIngredientTr = document.querySelector(`tr[data-ingredient-id="${newIngObj['ogIngId']}"]`);
      ogIngredientTr.className = 'ogIngredient';

      let subIngredientTr = newIngObj["newIngTr"];
      subIngredientTr.className = 'subIngredient';

      // Display substitute ingredient tr right after its og ingredient
      ogIngredientTr.insertAdjacentElement('afterend', subIngredientTr);
    });

    // Recipe Directions
    let recipeCol2 = document.createElement('div');
    recipeCol2.classList.add('col-8');
    recipeCol2.id = 'directions';
    recipeCol2.innerHTML += `<br><h3>Directions</h3><hr>${recipe.directions}`;
    recipeRow.appendChild(recipeCol2);

    // Redisplay buttons
    addSubIngredientBtn.style.display = 'inline-block';
    returnBtn.style.display = 'inline-block';
  };

  static redisplayMatchingRecipes(){
    selectedRecipeDiv.innerHTML = '';
    subIngredientForm.style.display = 'none';
    this.renderMatchingRecipes(Ingredient.selectedIngredients);
    recipesContainer.style.display = 'block';
  };

  // ADD SUBSTITUTE INGREDIENT FORM
  static removePreviousFormOptions() {
    if (!!renderedSIForm) {
      let existingOptions =  Array.from(document.getElementsByClassName('options'));
      existingOptions.map(option => option.remove());
    };
  };

  static renderAddSubIngredientForm(recipeId) {
    this.removePreviousFormOptions();
    formDiv.style.display = 'block';
    let recipeIngredientIds = [];
    let ogIngredientSelect = document.getElementById('ogIngredientSelect');
    let recipe = Recipe.findById(recipeId);

    // Render ingredient options for substitution
    recipe.ingredients.forEach(ingredient => {
      if (!ingredient.substituted_ingredient_id) {
        let option = `<option class="options" value=${ingredient.id} >${ingredient.name}</option>`;
        ogIngredientSelect.innerHTML += option;
        recipeIngredientIds.push(ingredient.id);
      };
    });

    let subIngredientSelect = document.getElementById('subIngredientSelect');
    // filter out existing recipe ingredients
    const subIngredientOptions = Ingredient.all.filter(ing => !recipeIngredientIds.includes(ing.id));
    // optgroup: group by ingredient categroy
    subIngredientOptions.forEach(ingredient => {
      let option = `<option class="options" value=${ingredient.id}>${ingredient.name}</option>`;
      let optGroup = document.getElementById(ingredient.category);
      if (!optGroup) {
        optGroup = document.createElement('optgroup');
        optGroup.setAttribute('label', ingredient.category);
        optGroup.id= ingredient.category;
        subIngredientSelect.appendChild(optGroup);
      };
      optGroup.innerHTML += option;
    });
  };

  // Add a substitute ingredient (recipe ingredient)
  static handleSubmitForm() {
    const formInputs = document.querySelectorAll('.formInput');
    let formData = {
      recipe_ingredient: {
        recipe_id: parseInt(selectedRecipeContainer.dataset.recipeId),
        substituted_ingredient_id: parseInt(formInputs[0].value, 10),
        ingredient_id: parseInt(formInputs[1].value, 10),
        amount: formInputs[2].value,
        preparation_method: formInputs[3].value,
      }
    };
    this.addSubIngredient(formData);
    formDiv.style.display = 'none';
  }

  // CREATE RECIPE INGREDIENT
  static addSubIngredient(recipeIngredientObj) {
    app.recipesAdapter.postSubIngredient(recipeIngredientObj)
      .then(recipeData => {
        // Update Recipe class objects
        Object.assign(Recipe.findById(recipeData.id).ingredients, recipeData.ingredients);
        this.renderSelectedRecipe(recipeData.id);
      })
  };
}
