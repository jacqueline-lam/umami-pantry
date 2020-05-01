class IngredientsController < ApplicationController
  def index
    # Render json (js format used by AJAX lib)
      # convert objects from ORM to JSON and render JSON back to browser
    # ingredients = Ingredient.all
    render json: Ingredient.all
  end

end
