class Ingredient < ApplicationRecord
  has_many :recipe_ingredients
  has_many :recipes, through: :recipe_ingredients

  # CATEGORY_PRETTY_MAP = {
  #   grains: 'Grains',
  #   protein: 'Protein Foods',
  #   beans_peas: 'Beans & Peas',
  #   nuts_seeds: 'Nuts & Seeds'
  #   root_veg: 'Root Vegetables',
  #   dark_green_veg: 'Dark Green Vegetables',
  #   other_veg: 'Other Vegetables',
  #   dairy: 'Dairy',
  #   broth: 'Soup & Broth',
  #   fruits: 'fruits'
  #   additives: 'Sauce, Condiments & Additives',
  #   herb_spice: 'Herb & Spices',
  # }

  # def category_pretty
  #   return CATEGORY_PRETTY_MAP[self.category]
  # end
end
