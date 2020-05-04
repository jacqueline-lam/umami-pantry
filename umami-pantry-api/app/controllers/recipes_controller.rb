class RecipesController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    recipes = Recipe.all
    render json: recipes.to_json(include: {
      ingredients: { only: [:id, :name] },
        recipe_ingredients: { only: [:amount, :preparation_method] }
      }, except: [:created_at, :updated_at])
  end

  def show
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      # include - API to send a resource's data along with its associated resources' data
      render json: recipe.to_json(include: {
        ingredients: { only: [:id, :name] },
        recipe_ingredients: { only: [:amount, :preparation_method] }
      }, except: [:created_at, :updated_at])
    else
      render json: { message: 'Recipe not found.' }
    end
  end
end
