class RecipesController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    # recipes = Recipe.all
    ingredientIds = params[:ingredients]
    # binding.pry
    # matching_recipes = Recipe.where
    # ingredientIds.map {|id|}

    # render json: RecipeSerializer.new(recipes).to_serialized_json
  end

  def get_recipes
    selected_ingredients = params[:selected_ingredients].split(',').map(&:to_i)
    recipes = RecipeIngredient.where(ingredient_id: selected_ingredients).map(&:recipe).uniq

    if recipes.any?
      render json: recipes
    else
      render json: { message: 'No recipes found for this combination of ingredients.'}
    end
  end

  def show
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      # include - API to send a resource's data along with its associated resources' data
      render json: RecipeSerializer.new(recipe).to_serialized_json
    else
      render json: { message: 'Recipe not found.' }
    end
  end
end
