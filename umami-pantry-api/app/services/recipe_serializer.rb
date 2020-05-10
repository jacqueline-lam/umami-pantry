class RecipeSerializer
  # initialize new instance of RecipeSerializer
  def initialize(recipe_object)
    @recipe_collection = recipe_object
  end

  # call to_json on this instance variable
  # handling inclusion and exclusion of attributes
  # get out data customized in JSON string
  def instance_to_serialized_json
    return get_recipe_hash(@recipe_collection).to_json
  end

  def instances_to_serialized_json
    to_return = []
    @recipe_collection.each do|recipe|
      recipe_hash = get_recipe_hash(recipe)
      to_return << recipe_hash
    end
    return to_return.to_json
  end

  def get_recipe_hash(recipe)
    # options = {
    #   # include - API to send resource's data along with its associated resources' data
    #   include: {
    #     ingredients: {
    #       only: [:name]
    #     },
    #     recipe_ingredients: {
    #       only: [:ingredient_id, :amounts, :preparation_method]
    #     }
    #   },
    #   except: [:created_at, :updated_at]
    # }
    # return @recipe.to_json(options)
    recipe_hash = recipe.attributes

    recipe_hash["recipe_ingredients"] = []
    recipe.recipe_ingredients.each do |ri|
      name = ri.ingredient.name
      ri_hash = {
        "id": ri.ingredient_id,
        "name": name,
        "amount": ri.amount,
        "preparation_method": ri.preparation_method,
        "substituted_ingredient_id"= ri.substituted_ingredient_id
      }
      recipe_hash["recipe_ingredients"] << ri_hash
    end
    return recipe_hash
  end
end