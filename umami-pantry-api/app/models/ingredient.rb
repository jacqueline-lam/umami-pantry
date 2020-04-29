class Ingredient < ApplicationRecord
  has_many :recipe_ingredients
  has_many :recpies, through: :recipe_ingredients
end
