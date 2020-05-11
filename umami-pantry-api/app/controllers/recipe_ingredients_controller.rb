class RecipeIngredientsController < ApplicationController
  def create
    binding.pry
    new_ri = RecipeIngredient.new(ri_params)

    if new_ri.save
      render json: new_ri
    else
      render json: { message: 'Failed to create substitute ingredient.'}
    end
  end

  private
  def ri_params
    params.require(:recipe_ingredient).permit(:recipe_id, :substituted_ingredient_id, :ingredient_id, :amount, :preparation_method)
  end
end
