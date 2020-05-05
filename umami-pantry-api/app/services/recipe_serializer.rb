class RecipeSerializer
  # initialize new instance of RecipeSerializer
  def initialize(recipe_object)
    @recipe = recipe_object
  end

  # call to_json on this instance variable
  # handling inclusion and exclusion of attributes
  # get out data customized in JSON string
  def to_serialized_json
    options = {
      # include - API to send resource's data along with its associated resources' data
      include: {
        ingredients: {
          only: [:name]
        },
        recipe_ingredients: {
          only: [:ingredient_id, :amounts, :preparation_method]
        }
      },
      except: [:created_at, :updated_at]
    }
    return @recipe.to_json(options)
    binding.pry

  #   to_return = []
  #   @recipe.each do |recipe|
  #     recipe_hash = recipe.attributes

  #     recipe_hash["recipe_ingredients"] = []
  #     recipe.recipe_ingredients.each do |ri|
  #       name = ri.ingredient.name
  #       ri_hash = {
  #         "name": name,
  #         "amount": ri.amount,
  #         "ingredient_id": ri.ingredient_id,
  #         "preparation_method": ri.preparation_method,
  #       }
  #       recipe_hash["recipe_ingredients"] << ri_hash
  #     end
  #     to_return << recipe_hash
  #   end
  #   return to_return.to_json

  end
end