class RecipeIngredientsController < ApplicationController
  def create
    recipe = Recipe.find_by(id: ri_params[:recipe_id])
    new_ri = recipe.recipe_ingredients.build(ri_params)

    if new_ri.save
      render json: RecipeSerializer.new(recipe).instance_to_serialized_json
    else
      render json: { message: 'Failed to add substitute ingredient to recipe.'}
    end
  end

  private
  def ri_params
    params.require(:recipe_ingredient).permit(:recipe_id, :substituted_ingredient_id, :ingredient_id, :amount, :preparation_method)
  end
end