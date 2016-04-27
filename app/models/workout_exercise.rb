class WorkoutExercise < ActiveRecord::Base
  validates :workout_id, :exercise_id, presence: true
  belongs_to :workout
  belongs_to :exercise
end
