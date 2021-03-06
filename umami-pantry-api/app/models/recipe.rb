class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  # Use for future - fuzzy matching recipes
  # Do the given ingredients have SOME or all of this recipe's ingredients
  # def matches_ingredients?(ingredients)
  #   recipe_ingredient_ids = self.recipe_ingredients.map(&:ingredient_id).uniq.sort
  #   return (ingredients.sort & recipe_ingredient_ids) == ingredients.sort
  # end

  # Return unique recipes of selected ingredients
  def self.filter_by_ingredients(ingredientsArray)
    ingredientsArray.map { |selected_ingredient|
      self.joins(:recipe_ingredients).where('ingredient_id = ?', selected_ingredient)
    }.flatten.uniq
  end
end
