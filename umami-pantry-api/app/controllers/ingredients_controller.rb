class IngredientsController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    # ingredients = Ingredient.all
    ingredients = Ingredient.all
    render json: ingredients, except: [:created_at, :updated_at]
  end

  # render JSON to include ingrdients of specific category
  def get_ingredients
    category = params[:category].gsub('_', ' ')
    ingredients = Ingredient.where(category: category)
    if ingredients.any?
      render json: ingredients, except: [:created_at, :updated_at]
    else
      render json: { message: category + ' ingredients cannot be found.'}

    end
  end
end
