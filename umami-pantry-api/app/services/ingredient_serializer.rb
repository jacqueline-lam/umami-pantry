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
          only: [:id, :name]
        },
        recipe_ingredients: {
          only: [:amount, :preparation_method]
        }
      },
      except: [:created_at, :updated_at]
    }

    @recipe.to_json(options)
  end
end