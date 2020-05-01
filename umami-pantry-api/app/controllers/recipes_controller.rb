class RecipesController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    render json: Recipe.all
  end

  def show
    recipe = Recipe.find_by(id: params[:id])
    if recipe
      # include - API to send a resource's data along with its associated resources' data
      render json: recipe.to_json(include: {
        ingredients: { only: :name },
        recipe_ingredients: { only: [:ingredient_id, :amount, :preparation_method] }
      }, except: [:created_at, :updated_at])
    else
      render json: { message: 'Recipe not found.' }
    end
  end
end
