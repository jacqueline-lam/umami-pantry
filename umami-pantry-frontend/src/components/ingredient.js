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
}