// Instantiate AppContainer instance - propagates other actions to happen
const app = new AppContainer
Ingredient.renderAllIngredients();
app.bindEventListeners();