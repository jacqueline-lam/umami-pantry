class IngredientsController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    # ingredients = Ingredient.all
    ingredients = Ingredient.all
    render json: ingredients, except: [:created_at, :updated_at]
  end
end
