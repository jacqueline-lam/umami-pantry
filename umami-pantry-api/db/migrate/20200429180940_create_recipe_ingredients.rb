class CreateRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :recipe_ingredients do |t|
      t.string :amount
      t.string :preparation_method
      t.references :recipe, null: false, foreign_key: true
      t.references :ingredient, null: false, foreign_key: true
    end
  end
end
