class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :category
      t.text :directions
      t.integer :servings
      t.integer :time
      t.string :image_url
      t.timestamps
    end
  end
end
