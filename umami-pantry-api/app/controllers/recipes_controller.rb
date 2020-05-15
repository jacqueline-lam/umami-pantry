class RecipesController < ApplicationController
  # def index
  #   # Render json (js format used by AJAX lib)
  #     # convert objects from ORM to JSON and render JSON back to browser
  #   recipes = Recipe.all
  #   render json: recipes, include: [:ingredients], except: [:created_at, :updated_at]
  #   # render json: RecipeSerializer.new(recipes).to_serialized_json
  # end

  def get_recipes
    selected_ingredients = params[:selected_ingredients].split(',').map(&:to_i)
    # recipes = Recipe.all.select { |r| r.matches_ingredients?(selected_ingredients) }
    recipes = Recipe.filter_by_ingredients(selected_ingredients)
    render json: RecipeSerializer.new(recipes).instances_to_serialized_json
  end

  def show
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      # include - API to send a resource's data along with its associated resources' data
      render json: RecipeSerializer.new(recipe).instance_to_serialized_json
    else
      render json: { message: 'Recipe not found.' }
    end
  end
end
