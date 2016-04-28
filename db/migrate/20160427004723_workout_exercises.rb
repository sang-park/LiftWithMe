class WorkoutExercises < ActiveRecord::Migration
  def change
    create_table :workout_exercises do |t|
      t.integer :workout_id, null: false
      t.integer :exercise_id, null: false
      t.integer :sets, null: false
      t.integer :reps, null: false
    end
    add_index :workout_exercises, :workout_id
  end
end
