// serves as in browser data storage system
const ingredientBtn = document.getElementById('getIngredientsBtn');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const ingredientCards = document.getElementsByClassName('ingredientCard');
const recipesContainer = document.getElementById('recipesContainer');
const recipesDiv = document.getElementById("recipeCardsDiv");
const selectedRecipeContainer = document.getElementById('selectedRecipeContainer');
const selectedRecipeDiv = document.getElementById('selectedRecipe');
const formDiv = document.getElementById('subIngredientForm')
const returnBtn = document.getElementById('returnToRecipesBtn');
const addSubIngredientBtn = document.getElementById('substitutIngredientBtn');
let renderedSIForm = false;

class AppContainer {
  constructor() {
    this.ingredientsAdapter = new IngredientsAdapter();
    this.recipesAdapter = new RecipesAdapter();
  }

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

    // eventlistener for Ingredient Card
    ingredientsContainer.addEventListener('click', e => {
      for (const ingredientCard of ingredientCards) {
        // if ingredientCard is clicked
        if ((e.target == ingredientCard) || (e.target.parentNode == ingredientCard)) {
          Ingredient.selectIngredientHandler(ingredientCard)
        }
      }
    });
    // eventlistener for 'Clear All Ingredients' Button
    let clearIngredientsBtn = document.getElementById('clearIngredientsBtn')
    clearIngredientsBtn.addEventListener('click', () => Ingredient.clearIngredientsHandler());

    // eventlistener for Selected Recipe Div
    selectedRecipeContainer.addEventListener('click', e => {
      // Return to Matching Recipes Btn
      if (e.target === returnBtn) {
        ingredientsContainer.style.display = 'block';
        returnBtn.style.display = 'none';
        addSubIngredientBtn.style.display = 'none';
        Recipe.redisplayMatchingRecipes();
      } else if (e.target === addSubIngredientBtn){ // 'Add A Subsitute Ingredient' Btn
        addSubIngredientBtn.style.display = 'none';
        let recipeId = parseInt(selectedRecipeContainer.dataset.recipeId, 10);
        Recipe.renderAddSubIngredientForm(recipeId);
        renderedSIForm = true;
      };
    });

    //eventlistener for Substitute Ingredient Submit btn
    formDiv.addEventListener('submit', e => {
      e.preventDefault();
      Recipe.handleSubmitForm();
    })
  };

  // isSelected(ingredientId) {
  //   return this.selectedIngredients.includes(ingredientId);
  // }

  // // Handle ingredient selections
  // selectIngredientHandler(ingredient) {
  //   let ingredientId = ingredient.dataset.ingredientId;
  //   var index = this.selectedIngredients.indexOf(ingredientId);

  //   // Ingredient DOE in current state, add its id to array
  //   if (index === -1) {
  //     // Select ingredient
  //     this.selectedIngredients.push(ingredientId);
  //     ingredient.setAttribute("style", "background-color: lightgray;");
  //   } else {
  //     // Deselect ingredient
  //     // Ingredient already exists in current state, we should remove its id
  //     this.selectedIngredients.splice(index, 1);
  //     ingredient.setAttribute("style", "background-color: white;");
  //   }
  //   // Above logic *should* enforce uniqueness constraints
  //   // This method just makes absolutely sure
  //   this.selectedIngredients.filter((ing, i, arr) => arr.indexOf(ing) === i);

  //   console.log("Current array IDs: " + this.selectedIngredients);

  //   // Handle GET recipes request for selected ingredients
  //   this.renderMatchingRecipes(this.selectedIngredients);
  // }

  // clearIngredientsHandler() {
  //   //empty selectedIngredients array
  //   this.selectedIngredients.splice(0, this.selectedIngredients.length);
  //   Array.from(ingredientCards).forEach(card => card.setAttribute("style", "background-color: white;"));
  //   while (recipesDiv.firstChild) {
  //     recipesDiv.removeChild(recipesDiv.lastChild);
  //   }
  //   console.log(this.selectedIngredients);
  // };

  // renderMatchingRecipes(ingredientIds) {
  //   let matchingRecipes = [];
  //   this.recipesAdapter.getMatchingRecipes(ingredientIds).then(recipesData => {
  //     recipesData.forEach(recipe => {
  //       let r = Recipe.findById(recipe.id)
  //       r = r || new Recipe(recipe)
  //       matchingRecipes.push(r);
  //     })
  //     this.createRecipeCards(matchingRecipes);
  //   })
  // }

  // createRecipeCards(recipes) {
  //   // Reload recipe cards when a new ingredient is chosen
  //   while (recipesDiv.firstChild) {
  //     recipesDiv.removeChild(recipesDiv.lastChild);
  //   }

  //   // Render no match message
  //   if (recipes.length === 0) {
  //     const p = document.createElement('p')
  //     p.innerText = 'No recipes are found for this combination of ingredients.'
  //     recipesDiv.appendChild(p)
  //   }
  //   //create DOM nodes and insert data into them to render in the DOM
  //   recipes.forEach(recipe => {
  //     // render recipe if recipeCard is not displayed yet
  //     let recipeCard = recipesDiv.appendChild(document.createElement('div'));
  //     recipeCard.classList.add('recipeCard', 'card')
  //     recipeCard.setAttribute('data-recipe-id', recipe.id)

  //     // Recipe name with link
  //     let h3 = document.createElement('h3')
  //     h3.className = 'card-header';
  //     recipeCard.appendChild(h3);

  //     let a = document.createElement('a');
  //     a.textContent = recipe.name;
  //     h3.appendChild(a);

  //     // Recipe image
  //     let recipeImg = recipe.imageUrl;
  //     recipeCard.innerHTML += recipeImg;

  //     //Recipe Category
  //     let categoryDiv = recipeCard.appendChild(document.createElement('div'));
  //     categoryDiv.className = 'card-body';
  //     categoryDiv.innerHTML = `<h5><span class="badge badge-dark">${recipe.category}</span></h5>`;

  //     // Recipe ingredients
  //     let ul = document.createElement('ul');
  //     ul.classList.add( 'list-group', 'list-group-flush');
  //     for (const ingredient of recipe.ingredients) {
  //       let li = document.createElement('li');
  //       li.className = 'list-group-item';
  //       li.setAttribute('data-ingredient-id', ingredient.id);
  //       li.innerText = ingredient['name'];
  //       // display substitute ingredients in teal
  //       if (!!ingredient.substituted_ingredient_id) {
  //         li.classList.add('subIngredient');
  //       }
  //       ul.appendChild(li);
  //     }
  //     recipeCard.appendChild(ul);

  //     recipeCard.children[0].addEventListener('click', e => {
  //       let selectedRecipeId = this.selectedRecipeId || e.target.parentNode.getAttribute('data-recipe-id');
  //       if (!selectedRecipeId) {
  //         selectedRecipeId = this.selectedRecipeId || e.target.parentNode.parentNode.getAttribute('data-recipe-id')
  //       };
  //       recipesContainer.style.display = 'none';
  //       ingredientsContainer.style.display = 'none';
  //       formDiv.style.display = 'none';
  //       this.renderSelectedRecipe(selectedRecipeId);
  //     });
  //   });
  // };

  // // READ SINGLE RECIPE
  // renderSelectedRecipe(recipeId){
  //   this.recipesAdapter.getSelectedRecipe(recipeId)
  //     .then(recipeData => this.createSelectedRecipeDiv(recipeData))
  // }

  // createSelectedRecipeDiv(recipe) {
  //   selectedRecipeContainer.dataset.recipeId = recipe.id
  //   selectedRecipeDiv.innerHTML = '<h1>Selected Recipe:</h1>'

  //   let heading = document.createElement('div')
  //   heading.id = 'recipeHeading'
  //   heading.innerHTML += `<h2>${recipe.name}</h2>${recipe.image_url}`
  //   selectedRecipeDiv.appendChild(heading);

  //   // Recipe time, servings
  //   let row = document.createElement('div')
  //   row.className = 'row'
  //   let col1 = document.createElement('div')
  //   col1.className = 'col-4'
  //   col1.innerHTML += `<ul><li>Servings: ${recipe.servings.toString()}</li><li>Total Time: ${recipe.time.toString()}</li></ul><h3>Ingredients</h3>`

  //   // Ingredient List
  //   let ingredientsTable = document.createElement('table')
  //   ingredientsTable.classList.add('table', 'table-hover');

  //   let tbody = document.createElement('tbody')
  //   let subIngredientsArray = []
  //   recipe.ingredients.forEach(ingredient => {
  //     let tr = document.createElement('tr')
  //     tr.dataset.ingredientId = ingredient.id

  //     let td1 = document.createElement('td')
  //     ingredient.amount ? (td1.innerHTML += `<b>${ingredient.amount}</b>`) : ""

  //     let td2 = document.createElement('td')
  //     td2.textContent = ingredient.name
  //     ingredient.preparation_method ? (td2.innerText += `, ${ingredient.preparation_method}`) : ""
  //     tr.append(td1, td2)

  //     // Render substitute ingredient if any
  //     if (!!ingredient.substituted_ingredient_id) {
  //       let newIngObj = {
  //         ogIngId: ingredient.substituted_ingredient_id,
  //         newIngTr: tr
  //       };
  //       subIngredientsArray.push(newIngObj);
  //       return;
  //     };
  //     tbody.appendChild(tr);
  //   });

  //   ingredientsTable.appendChild(tbody);
  //   col1.appendChild(ingredientsTable);
  //   row.appendChild(col1);
  //   selectedRecipeDiv.appendChild(row);

  //   // Add styling to og vs. substituted ingredient
  //   subIngredientsArray.forEach(newIngObj => {
  //     let ogIngredientTr = document.querySelector(`tr[data-ingredient-id="${newIngObj['ogIngId']}"]`);
  //     ogIngredientTr.className = 'ogIngredient';

  //     let subIngredientTr = newIngObj["newIngTr"];
  //     subIngredientTr.className = 'subIngredient';

  //     // Display substitute ingredient tr right after its og ingredient
  //     ogIngredientTr.insertAdjacentElement('afterend', subIngredientTr)
  //   });

  //   // Recipe Directions
  //   let col2 = document.createElement('div')
  //   col2.classList.add('col-8');
  //   col2.id = 'directions'
  //   col2.innerHTML += `<h3>Directions</h3><hr>${recipe.directions}`
  //   row.appendChild(col2)

  //   // Redislpay buttons
  //   addSubIngredientBtn.style.display = 'inline-block';
  //   returnBtn.style.display = 'inline-block';
  // };

  // redisplayMatchingRecipes(){
  //   selectedRecipeDiv.innerHTML = '';
  //   subIngredientForm.style.display = 'none';
  //   this.recipesAdapter.getMatchingRecipes(this.selectedIngredients);
  //   recipesContainer.style.display = 'block';
  // };

  // renderAddSubIngredientForm(recipeId) {
  //   if (!!renderedSIForm) {
  //     let existingOptions =  Array.from(document.getElementsByClassName('options'));
  //     existingOptions.map(option => option.parentNode.removeChild(option));
  //   }
  //   formDiv.style.display = 'block';
  //   let recipeIngredientIds = [];
  //   let ogIngredientSelect = document.getElementById('ogIngredientSelect');
  //   let recipe = Recipe.findById(recipeId);

  //   // Render ingredient options for substitution
  //   recipe.ingredients.forEach(ingredient => {
  //     if (!ingredient.substituted_ingredient_id) {
  //       let option = `<option class="options" value=${ingredient.id} >${ingredient.name}</option>`
  //       ogIngredientSelect.innerHTML += option
  //       recipeIngredientIds.push(ingredient.id)
  //     }
  //   })

  //   let subIngredientSelect = document.getElementById('subIngredientSelect');
  //   // filter out existing recipe ingredients
  //   const subIngredientOptions = Ingredient.all.filter(ing => !recipeIngredientIds.includes(ing.id))
  //   // optgroup: group by ing categroy
  //   subIngredientOptions.forEach(ingredient => {
  //     let option = `<option class="options" value=${ingredient.id}>${ingredient.name}</option>`
  //     let optGroup = document.getElementById(ingredient.category)
  //     if (!optGroup) {
  //       optGroup = document.createElement('optgroup')
  //       optGroup.setAttribute('label', ingredient.category)
  //       optGroup.id= ingredient.category
  //       subIngredientSelect.appendChild(optGroup)
  //     }
  //     optGroup.innerHTML += option
  //   })

  //   let recipeIdHiddenInput = document.getElementById('recipeId')
  //   recipeIdHiddenInput.setAttribute('value', recipeId)
  // }

  // // Add a substitute ingredient (recipe ingredient)
  // handleSubmitForm() {
  //   let formData = {
  //     recipe_ingredient: {
  //       recipe_id: parseInt(this.formInputs[4].value),
  //       substituted_ingredient_id: parseInt(this.formInputs[0].value, 10),
  //       ingredient_id: parseInt(this.formInputs[1].value, 10),
  //       amount: this.formInputs[2].value,
  //       preparation_method: this.formInputs[3].value,
  //     }
  //   }
  //   this.addSubIngredient(formData)
  //   formDiv.style.display = 'none';
  // }

  // // CREATE RECIPE INGREDIENT
  // // addNewSubIngredient (recipeIngredientObj) {}
  // addSubIngredient(recipeIngredientObj) {
  //   this.recipesAdapter.addSubIngredient(recipeIngredientObj)
  //     .then(recipeData => {
  //       // Update Recipe class objects
  //       Object.assign(Recipe.findById(recipeData.id).ingredients, recipeData.ingredients)
  //       this.renderSelectedRecipe(recipeData)
  //     })
  // }
};