class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.date :date, null: false
      t.time :time, null: false
      t.integer :buddy_id
      t.timestamps null: false
    end
    add_index :workouts, :user_id
    add_index :workouts, :buddy_id
  end
end
