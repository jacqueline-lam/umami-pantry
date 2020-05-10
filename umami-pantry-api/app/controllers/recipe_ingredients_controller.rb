class RecipeIngredientsController < ApplicationController
  def create
    binding.pry
    # new recipe_ingredient obj provided by js fetch post request
    recipe = Recipe.find_by(id: ri_arams[:recipe_id])
    ri = {
      :recipe_id => ri_params[:recipe_id],
      :substituted_ingredient_id => ri_params[:substituted_ingredient_id],
      :ingredient_id => ri_params[:ingredient_id],
      :amount => pluralize(ri_params[:amount_q].to_i, ri_params[:amount_unit]),
      :preparation_method => ri_params[:preparation_method],
    }
    new_ri = recipe.recipe_ingredients.build(ri)

    if new_ri.save
      render json: new_ri
      # RecipeIngredientSerializer.new(new_ri).to_serialized_json
    else
      render json: { message: 'Failed to create substitute ingredient'}
    end
  end

  def new
    # ri = {
    #   :recipe_id => ri_params[:recipe_id],
    #   :substituted_ingredient_id => ri_params[:substituted_ingredient_id],
    #   :ingredient_id => ri_params[:ingredient_id],
    #   :amount => pluralize(ri_params[:amount_q].to_i, ri_params[:amount_unit]),
    #   :preparation_method => ri_params[:preparation_method],
    # }
    binding.pry
    new_ri = RecipeIngredient.new()
  end

  private
  def ri_params
    params.require(:recipe_ingredient).permit(:recipe_id, :substituted_ingredient_id, :ingredient_id, :amount_q, :amount_unit, :preparation_method)
  end
end
