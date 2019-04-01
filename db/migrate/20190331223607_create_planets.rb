class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
    	t.string :name
    	t.float :size
    	t.float :distance
    	t.integer :ordinality
    	t.text :description
    	
    end
  end
end
