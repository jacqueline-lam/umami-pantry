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

}