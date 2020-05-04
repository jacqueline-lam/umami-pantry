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
