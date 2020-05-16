class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.category = ingredient.category;
    this.imageUrl = ingredient.image_url;
    this.constructor.all.push(this);
  }
  static categories = ['Grains', 'Protein_Foods','Beans_and_Peas', 'Nuts_and_Seeds', 'Root_Vegetables', 'Dark_Green_Vegetables', 'Other_Vegetables', 'Dairy', 'Soup_and_Broth', 'Fruits', 'Additives', 'Herb_and_Spices'];
  static all = []
  // to hold ingredientIds, also acts as single frontend state source of truth
  static selectedIngredients = [];

  static renderAllIngredients() {
    Ingredient.categories.forEach(category => {
      // parse JSON representation of ingredients from Fetch resp
      const ingredientsAdapter = new IngredientsAdapter();
      ingredientsAdapter.getIngredients(category)
      .then(ingredientsData => {
        ingredientsData.forEach(ingredient => new Ingredient(ingredient));
        this.createIngredientCards(ingredientsData, category);
      })
    });
  }

  // Display ingredients by categories
  static createIngredientCards(ingredientsData, category) {
    //create DOM nodes, insert data into them to render in the DOM
    // g flag of regular expression -> indicates global search and replace
    const formattedCategory = category.toLowerCase().replace(new RegExp('_', 'g'), '-');
    const categoryContainer = document.getElementById(formattedCategory);
    ingredientsData.forEach(ingredient => {
      // Apend ingredientCard to specified category
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

  // Handle ingredient selections
  static selectIngredientHandler(ingredient) {
    let ingredientId = ingredient.dataset.ingredientId;
    var index = this.selectedIngredients.indexOf(ingredientId);

    // Ingredient DOE in current state, add its id to array
    if (index === -1) {
      // Select ingredient
      this.selectedIngredients.push(ingredientId);
      ingredient.setAttribute("style", "background-color: lightgray;");
    } else {
      // Deselect ingredient
      // Ingredient already exists in current state, we should remove its id
      this.selectedIngredients.splice(index, 1);
      ingredient.setAttribute("style", "background-color: white;");
    }
    // Above logic *should* enforce uniqueness constraints
    // This method just makes absolutely sure
    this.selectedIngredients.filter((ing, i, arr) => arr.indexOf(ing) === i);

    console.log("Current array IDs: " + this.selectedIngredients);

    // Handle GET recipes request for selected ingredients
    Recipe.renderMatchingRecipes(this.selectedIngredients);
  }

  static clearIngredientsHandler(e) {
    //empty selectedIngredients array
    this.selectedIngredients.splice(0, this.selectedIngredients.length);
    Array.from(ingredientCards).forEach(card => card.setAttribute("style", "background-color: white;"));
    while (recipesDiv.firstChild) {
      recipesDiv.removeChild(recipesDiv.lastChild);
    }
    console.log(this.selectedIngredients);
  };

}