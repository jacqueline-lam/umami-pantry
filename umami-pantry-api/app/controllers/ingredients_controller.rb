class IngredientsController < ApplicationController
  # render JSON to include ingrdients of specific category
  def get_ingredients
    category = params[:category].gsub('_', ' ')
    ingredients = Ingredient.where(category: category)
    if ingredients.any?
      # convert objects from ORM to JSON and render JSON back to browser
      render json: ingredients
    else
      render json: { message: category + ' ingredients cannot be found.'}
    end
  end
end
