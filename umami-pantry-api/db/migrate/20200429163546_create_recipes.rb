class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :category
      t.text :directions
      t.integer :serving
      t.integer :time

      t.timestamps
    end
  end
end
