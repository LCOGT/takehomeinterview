class CreatePlanets < ActiveRecord::Migration[5.2]
  def change
    create_table :planets do |t|
      t.string :name, null: false
      t.float :size
      t.float :distance
      t.integer :ordinality, null: false
      t.string :description

      t.timestamps
    end
    add_index :planets, :name, unique: true
    add_index :planets, :ordinality, unique: true
  end
end
