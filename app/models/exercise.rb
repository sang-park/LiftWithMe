class Exercise < ActiveRecord::Base
  validates :name, presence: true

  has_many :workout_exercises
  has_many :workouts,
    through: :workout_exercises,
    source: :workout
end
